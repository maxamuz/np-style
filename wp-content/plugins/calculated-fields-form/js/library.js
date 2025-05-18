jQuery(function () {
    var $ = jQuery,

    categories = {},

    /* Templates */
    dialog_tpl = `
		<div class="cff-form-library-cover">
			<div class="cff-form-library-container">
				<div class="cff-form-library-column-left">
					<div class="cff-form-library-search-box">
						<div class="cff-form-library-close"></div>
						<input type="search" placeholder="Search..." oninput="cff_filteringFormsByText(this)">
					</div>
					<div class="cff-form-library-website-forms">
						<ul>
							<li><a href="javascript:void(0);" onclick="cff_templatesInCategory(this,-1);">Use My Forms As Template</a></li>
						</ul>
					</div>
					<div class="cff-form-library-categories">
						<ul>
							<li><a href="javascript:void(0);" onclick="cff_templatesInCategory(this);" class="cff-form-library-active-category">All Categories</a></li>
						</ul>
					</div>
				</div>
				<div class="cff-form-library-column-right">
					<div>
						<div class="cff-form-library-blank-form">
							<input type="text" placeholder="Form name..." id="cp_itemname_library">
							<input type="button" value="Create Basic Form" class="button-primary" onclick="cff_getTemplate(0);">
						</div>
						<div class="cff-form-library-close"></div>
						<div style="clear:both"></div>
					</div>
					<div class="cff-form-library-main">
						<div class="cff-form-library-no-form">No form meets the search criteria</div>
					</div>
				</div>
			</div>
		</div>
	`,

    form_tpl = `
		<div class="cff-form-library-form">
			<div class="cff-form-library-form-top">
				<div class="cff-form-library-form-title"></div>
				<div class="cff-form-library-form-description"></div>
			</div>
			<div class="cff-form-library-form-bottom">
				<div class="cff-form-library-form-category"></div>
				<div>
					<input type="button" class="button-primary cff-select-form" value="Use It" />
					<!--<input type="button" class="button-secondary cff-preview-form" value="Preview" />-->
				</div>
			</div>
		</div>
	`,

	form_name_library_field;

    $.expr.pseudos.contains = $.expr.createPseudo(function (arg) {
        return function (elem) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    function openDialog(explicit) {

        var version 	= 'free',
			version_n 	= {'free': 1, 'pro': 2, 'dev': 3, 'plat': 4},
			form_name_field = $('[id="cp_itemname"]'),
			form_tag 	= form_name_field.closest('form')[0],
			data 		= [];

		form_name_field.val(form_name_field.val().replace(/^\s*/, '').replace(/\s*$/, ''));

		if( ( typeof explicit == 'undefined' || !explicit ) && 'reportValidity' in form_tag && !form_tag.reportValidity()) return;

        if (!$('.cff-form-library-container').length) {
            $('body').append(dialog_tpl);

            if (typeof cpcff_forms_library_config != 'undefined' && 'version' in cpcff_forms_library_config) {
                version = cpcff_forms_library_config['version'];
            }

            if (typeof cff_forms_templates != 'undefined') {
				for(var j in cff_forms_templates ) {
					data = cff_forms_templates[j];
					for (var i in data) {

						let templates_categories = data[i]['category'].split('|');
						for ( let j in templates_categories ) {
							categories[templates_categories[j]] = '<li><a href="javascript:void(0);" onclick="cff_templatesInCategory(this,\'' + templates_categories[j] + '\')">' + templates_categories[j] + '</a></li>';
						}

						let tmp = $(form_tpl);
						if (version_n[version] < version_n[j]) {
							tmp.addClass( 'cff-form-library-form-disabled' ).append('<div class="cff-form-library-form-lock"></div>').on('click', function(){window.open('https://cff.dwbooster.com/download', '_blank');});
							tmp.find('[type="button"]')
								.prop( 'disabled', true )
								.on(
									'click',
									function(){ window.open('https://cff.dwbooster.com/download', '_blank'); }
								);
						} else {
							tmp.find('[type="button"].cff-select-form').on(
								'click',
								(function (id) {
									return function () {
										cff_getTemplate(id);
									};
								})(data[i]['id'])
							);
						}
						tmp.attr('data-category', data[i]['category']);
						if ( 'thumb' in data[i] ) {
							tmp.find('.cff-form-library-form-title').before('<div class="cff-form-library-form-thumb"><img src="https://cdn.statically.io/gh/cffdwboostercom/formtemplates/main/'+data[i]['thumb']+'"></div>');
						}
						tmp.find('.cff-form-library-form-title').text(data[i]['title']);
						tmp.find('.cff-form-library-form-description').text(data[i]['description']);
                        tmp.find('.cff-form-library-form-category').text(data[i]['category'].replace(/\|/g, ', '));

						tmp.appendTo('.cff-form-library-main');
					}
				}
			}

			for (var i in categories) {
				$(categories[i]).appendTo('.cff-form-library-categories ul');
			}

			// Website forms.
			if (typeof cpcff_forms_library_config != 'undefined' && 'website_forms' in cpcff_forms_library_config) {
				let data  = cpcff_forms_library_config['website_forms'];
				for ( let i in data ) {
					let tmp = $(form_tpl);
					tmp.find('[type="button"].cff-select-form').on(
						'click',
						(function (id) {
							return function () {
								cff_getTemplate(id, true);
							};
						})(data[i]['id'])
					);
					tmp.attr('data-category', '-1');
					tmp.find('.cff-form-library-form-title').text( '('+data[i]['id']+') ' + data[i]['form_name']);
					tmp.find('.cff-form-library-form-description').text(data[i]['description']);
					tmp.find('.cff-form-library-form-category').text(data[i]['category']);
					tmp.appendTo('.cff-form-library-main');
				}
            }
        };

		$(document).on('keyup', '[id="cp_itemname_library"]', function(evt){
			var keycode = (evt.keyCode ? evt.keyCode : evt.which);
            if(keycode == 13){
                cff_getTemplate(0);
            }
		});

        // Initialize
        showNoFormMessage();
        $('.cff-form-library-search-box input').val('');
        $('.cff-form-library-categories ul>li:first-child a').trigger('click');
        $('.cff-form-library-cover').show();

		form_name_library_field = $('[id="cp_itemname_library"]');
		form_name_library_field.val(form_name_field.val());
    };

    function closeDialog() {
		$('.cff-form-library-cover').animate({ opacity: 0 }, 'slow', function() {
			$(this).remove();
		});
    };

    function showNoFormMessage() {
        $('.cff-form-library-no-form').show();
    };

    function hideNoFormMessage() {
        $('.cff-form-library-no-form').hide();
    };

    function displayTemplates(me, category) {
        hideNoFormMessage();
        $('.cff-form-library-search-box input').val('');
        $('.cff-form-library-active-category').removeClass('cff-form-library-active-category');
        $(me).addClass('cff-form-library-active-category');

        if (typeof category == 'undefined') {
            $('.cff-form-library-form').show();
            $('.cff-form-library-form[data-category="-1"]').hide();
        } else {
            $('.cff-form-library-form').hide();
            $('.cff-form-library-form[data-category*="' + category + '"]').show();
        }
    };

    function formsByText(me) {

        var v = String(me.value).trim();

        $('.cff-form-library-active-category').removeClass('cff-form-library-active-category');

        $('.cff-form-library-form').hide();

        $('.cff-form-library-form:contains("' + v + '")').each(function () {
            $(this).show();
        });

        if ($('.cff-form-library-form:visible').length) {
            hideNoFormMessage();
        } else {
            showNoFormMessage();
        }
    };

    function getTemplate(id, is_website_form) {
		is_website_form = is_website_form || false;
        var form_name = encodeURIComponent(form_name_library_field.val() || ''),
        category_name = encodeURIComponent($('[id="calculated-fields-form-category"]').val() || ''),
        url;

        if (typeof cpcff_forms_library_config != 'undefined' && 'website_url' in cpcff_forms_library_config) {
            url = cpcff_forms_library_config['website_url'] + '&name=' + form_name + '&category=' + category_name;
            if (id) url += '&ftpl=' + encodeURIComponent(id);
			if (is_website_form) url += '&from_website=1';
            document.location.href = url;
            closeDialog();
            return;
        }

        if ('cp_addItem' in window)
            cp_addItem();
    };

	$(document).on('keyup', function(evt){ if ( evt.keyCode == 27 ) { cff_closeLibraryDialog(); } });
	$(document).on('click', '.cff-form-library-close', closeDialog);

    // Export
    window['cff_openLibraryDialog'] = openDialog;
    window['cff_closeLibraryDialog'] = closeDialog;
    window['cff_getTemplate'] = getTemplate;
    window['cff_templatesInCategory'] = displayTemplates;
    window['cff_filteringFormsByText'] = formsByText;
});