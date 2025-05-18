import * as webllm from "https://esm.run/@mlc-ai/web-llm";

/*************** WebLLM logic ***************/
let variables = "";
let topic = 'js';

const messages = [{
		content: `You are a code generator for JavaScript, CSS, and HTML. Always output your answer as the code block. No pre-amble. Do not respond to unrelated question.`,
		role: "system",
	},
];

let selectedModel;
selectedModel = "Qwen2.5-Coder-3B-Instruct-q4f32_1-MLC";

let loadedModel   = false;

// UI components
let aiDlgCrl 			= document.getElementById("cff-ai-assistant-container");
let statusCrl 			= document.getElementById("cff-ai-assistant-status");
let progressBarCrl 		= document.getElementById("cff-ai-assistant-progress-bar");
let userQuestionCtrl 	= document.getElementById("cff-ai-assistant-question");
let chatBoxCtrl 		= document.getElementById("cff-ai-assistant-answer-row");
let chatStatsCtrl 		= document.getElementById("cff-ai-assistant-stats");
let sendBtnCtrl 		= document.getElementById("cff-ai-assistan-send-btn");
let unmountBtnCtrl 		= document.getElementById("cff-ai-assistant-unmount");
let closeBtnCtrl 		= document.getElementById("cff-ai-assistant-close");

// Resize button.
function btnHeight() {
	sendBtnCtrl.style.height = userQuestionCtrl.offsetHeight + 'px';
}

const resizeObserver = new ResizeObserver(entries => {
  btnHeight();
});

resizeObserver.observe(userQuestionCtrl);

// Callback function for initializing progress
function updateEngineInitProgressCallback(report) {
    console.log("initialize", report.progress);
    statusCrl.textContent = report.text;
	if (report.progress !== undefined)  progressBarCrl.style.width = `${report.progress * 100}%`;
}

function setPlaceholder() {
	userQuestionCtrl.setAttribute(
		"placeholder",
		(
			'cff_ai_texts' in window ?
			(
				'placeholder_' + topic in window['cff_ai_texts'] ?
				window['cff_ai_texts']['placeholder_' + topic] :
				window['cff_ai_texts']['placeholder']
			) :
			'Please, enter your question ...'
		)
	);
}

// Create engine instance
let engine = new webllm.MLCEngine();
engine.setInitProgressCallback(updateEngineInitProgressCallback);

async function initializeWebLLMEngine() {
    statusCrl.style.display = 'block';
    let config = {
        temperature: 0.0,
        top_p: 1,
		context_window_size: -1,
		sliding_window_size: 2048,
		attention_sink_size: 1024,
    };

	if ( typeof navigator == 'undefined' || ! navigator.gpu ) {
		document.getElementById('cff-ai-gpu-error').style.display = 'block';
		document.getElementById('cff-ai-gpu-error').parentElement.classList.add('cff-ai-assistance-error-message');
		sendBtnCtrl.disabled = true;
		userQuestionCtrl.disabled = true;
		return;
	}

	if ( typeof window == 'undefined' || ! window.caches ) {
		document.getElementById('cff-ai-caches-error').style.display = 'block';
		document.getElementById('cff-ai-caches-error').parentElement.classList.add('cff-ai-assistance-error-message');
		sendBtnCtrl.disabled = true;
		userQuestionCtrl.disabled = true;
		return;
	}

	await engine.reload(selectedModel, config);
	await engine.resetChat();
	loadedModel = true;
}

async function streamingGenerating(messages, onUpdate, onFinish, onError) {
    try {
        let curMessage = "";
		let usageMessage = "";
		let finalChunk;

        const completion = await engine.chat.completions.create({
            stream: true,
            messages,
			stream_options: { include_usage: true }
        });

        for await(const chunk of completion) {
			try {
				const curDelta = chunk.choices[0].delta.content;
				if (curDelta) {
					curMessage += curDelta;
				}
				onUpdate(curMessage);
			} catch (err) {}
			finalChunk = chunk;
        }

		if (finalChunk.usage) {
			if ( 'extra' in finalChunk.usage ) {
				let message_components = [];
				if ('prefill_tokens_per_s' in finalChunk.usage['extra']) {
					message_components.push( 'prefill: '+finalChunk.usage['extra']['prefill_tokens_per_s'].toFixed(4)+' tk/s');
				}

				if ('time_per_output_token_s' in finalChunk.usage['extra']) {
					message_components.push( 'decoding: '+finalChunk.usage['extra']['time_per_output_token_s'].toFixed(4)+' tk/s');
				}
				usageMessage = message_components.join(', ');
			}
		}
        const finalMessage = await engine.getMessage();
        onFinish(finalMessage, usageMessage);
    } catch (err) {
        onError(err);
    }
}

/*************** UI logic ***************/
async function onMessageSend() {

	const input = userQuestionCtrl.value.trim();
    if (input.length === 0) {
        return;
    }

	let message = input;

	switch(topic) {
		case 'css':
			message = "Only output CSS code wrapped between triple backticks (```), nothing else. Follow this structure exactly. Use class selectors as descendants of the #fbuilder ID selector. Always include !important for every rule.\nExample:\n```css\n#fbuilder .pbSubmit {\nfont-weight: 700 !important;\nbackground-color: green !important;\ncolor: white !important;\n}```\n\n"+
			"Styles request: " + input;
		break;
		case 'html':
			message = "Create an block of HTML tags, including style attributes when required. To display the fields values within the tags, use the data-cff-field attribute in the corresponding text. Enclose the code between ``` symbols." + ( "" != variables ? " You have access to the fields:\n" + variables + "Use these fields in code when appropriate. Example: ```html\n<div>User name: <span data-cff-field=\"fieldname1\"></span></div><br><div>Email: <span data-cff-field=\"fieldname2\"></span></div><br><div>Message: <p data-cff-field=\"fieldname3\"></p></div>```" : "" ) + "\nDescription: " + input;
		break;
		default:
			message = "Create an immediately invoked JavaScript function expressions (IIFE) that run automatically. It must start with (function(){ and enter with })(). It must include a return statement with the result as scalar value. Use only valid JavaScript syntax. Test your code mentally for syntax errors before submitting. Do not include any non-JavaScript text or characters. Keep the code simple and focused on the calculation. Enclose the code between ``` symbols. DO NOT include commentS into the function code." + ( "" != variables ? " \n\n CRITICAL INSTRUCTION: The following variables ALREADY EXIST in the system and contain values. DO NOT DEFINE OR INITIALIZE THEM IN YOUR CODE:\n" + variables : "" ) + "\n\nFunction description: " + input.replace(/equation/ig, 'function');
	}

    sendBtnCtrl.disabled = true;

	await engine.resetChat();
	messages.splice(1);

    messages.push({content: message, role: "user"});
    appendMessage({content: input, role: "user"});

    userQuestionCtrl.value = "";
    userQuestionCtrl.setAttribute("placeholder", ( 'cff_ai_texts' in window ? window['cff_ai_texts']['generating'] : 'Generating...' ) );

    const aiMessage = {
        content: ( 'cff_ai_texts' in window ? window['cff_ai_texts']['typing'] : "typing..." ),
        role: "assistant",
    };

    appendMessage(aiMessage);

    const onFinishGenerating = (finalMessage, usageMessage) => {
		updateLastMessage(finalMessage);
        sendBtnCtrl.disabled = false;
		setPlaceholder();
		chatStatsCtrl.textContent = usageMessage;
    };

    streamingGenerating(
        messages,
        updateLastMessage,
        onFinishGenerating,
		function(err){
			sendBtnCtrl.disabled = false;
			console.error(err);
		}
	);
}

function appendMessage(message) {

	const newMessage = document.createElement("div");
    newMessage.classList.add("cff-ai-assistance-message");

    if (message.role === "user") {
        newMessage.classList.add("cff-ai-assistance-user-message");
    } else {
		newMessage.classList.add("cff-ai-assistance-bot-message");
    }
	newMessage.textContent = message.content;

    chatBoxCtrl.appendChild(newMessage);
    chatBoxCtrl.scrollTop = chatBoxCtrl.scrollHeight; // Scroll to the latest message
}

function updateLastMessage(content) {
	function escapeHTML(str) {
		return str
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}

	function formatMessage(message) {
		message = message.replace(/fieldname(\d+)/ig, 'fieldname$1');
		// Split message into parts: text and code blocks
		const parts = [];
		let lastIndex = 0;
		const regex = /```(?:\w+)?\n([\s\S]*?)```/g;
		let match;

		while ((match = regex.exec(message)) !== null) {
			const before = message.slice(lastIndex, match.index);
			const code = match[1];

			// Escape and add the text before the code block
			parts.push(`<p>${escapeHTML(before)}</p>`);

			// Add the raw code block
			const escapedCode = escapeHTML(code);
			const copy_text = ( 'cff_ai_texts' in window ? window['cff_ai_texts']['copy_btn'] : 'Copy' );
			parts.push(
				`<pre><div style="text-align:right;margin-bottom:10px;"><button type="button" id="cff-ai-assistant-copy-btn" class="button-secondary" onclick="cff_ai_assistant_copy(this);">${copy_text}</button></div><code>${escapedCode}</code></pre>`
			);

			lastIndex = regex.lastIndex;
		}

		// Add any remaining text after the last code block
		const remaining = message.slice(lastIndex);
		if (remaining.trim()) {
			parts.push(`<p>${escapeHTML(remaining)}</p>`);
		}

		return parts.join("");
	}



    const messageDoms = chatBoxCtrl.querySelectorAll(".cff-ai-assistance-message");
    const lastMessageDom = messageDoms[messageDoms.length - 1];
    lastMessageDom.innerHTML = formatMessage(content);
}

window['cff_ai_assistant_copy'] = function ( btn ) {
	const codeElement = btn.parentElement.parentElement.querySelector('code');
	const copy_text = ( 'cff_ai_texts' in window ? window['cff_ai_texts']['copy_btn'] : 'Copy' );
	const copied_text = ( 'cff_ai_texts' in window ? window['cff_ai_texts']['copied_btn'] : 'Copied !!!' );
	if (codeElement) {
		const text = codeElement.textContent;
		navigator.clipboard.writeText(text).then(() => {
			btn.textContent = copied_text;
		}).catch(err => {
			console.error('Failed to copy code: ', err);
		});
	}
	setTimeout(function(){ btn.textContent = copy_text; }, 3000);
};

window['cff_ai_assistant_open'] = function( answer_topic ){
	variables = '';
	topic = answer_topic || 'js';

	setPlaceholder();
	// Get variables.
	window.cff_form.fBuild.getItems().forEach( (item) => {
		if (
			'ftype' in item &&
			['ftext', 'fcurrency', 'fnumber', 'fslider', 'fcolor', 'femail', 'fdate', 'ftextarea', 'fcheck', 'fradio', 'fdropdown', 'ffile', 'fpassword', 'fPhone', 'fhidden', 'frecordsetds', 'ftextds', 'femailds', 'ftextareads', 'fcheckds', 'fradiods', 'fPhoneds', 'fdropdownds', 'fhiddends', 'fnumberds', 'fcurrencyds', 'fdateds', 'fqrcode', 'fCalculated'].indexOf(item.ftype) != -1
		) {
			let l = ( 'title' in item ) ? String( item.title ).trim() : '';
			l = ( '' == l && 'shortlabel' in item ) ? String( item.shortlabel ).trim() : l;
			l = ( '' == l && 'userhelp' in item ) ? String(item.userhelp) : l;
			if( 'dformat' in item && item['dformat'] == 'percent') l += ' ( it is the decimal value, it is not required to divide the variable value by 100 )';
			variables += item.name + " (existing constant that represents " + l + ")\n";
		}
	} );

	if ( ! loadedModel ) {
		initializeWebLLMEngine().then(() => {
			sendBtnCtrl.disabled = false;
			unmountBtnCtrl.style.display = 'inline-block';
		}).catch(() => {
			initializeWebLLMEngine().then(() => {
				sendBtnCtrl.disabled = false;
				unmountBtnCtrl.style.display = 'inline-block';
			});
		});
	} else {
		unmountBtnCtrl.style.display = 'inline-block';
		sendBtnCtrl.disabled = false;
	}
	aiDlgCrl.style.display = 'flex';
	btnHeight();
};

/*************** UI binding ***************/
closeBtnCtrl.addEventListener("click", async function () {
	aiDlgCrl.style.display = 'none';
});
unmountBtnCtrl.addEventListener("click", async function (evt) {
	const confirm_message = ( 'cff_ai_texts' in window ? window['cff_ai_texts']['unload'] : 'Would you like to proceed?' );
	if (loadedModel && window.confirm(confirm_message)) {
		try {
			await engine.unload();
			caches.keys().then(names => names.forEach(n =>{if( /^webllm\//i.test(n)) caches.delete(n);}));
			loadedModel = false;
		} catch( err ) { console.log(err); }
	}
	evt.target.style.display = 'none';
	aiDlgCrl.style.display = 'none';
});
sendBtnCtrl.addEventListener("click", function () {
    onMessageSend();
});