	$.fbuilder.typeList.push(
		{
			id:"ffile",
			name:"Upload File",
			control_category:1
		}
	);
	$.fbuilder.controls[ 'ffile' ] = function(){};
	$.extend(
		true,
		$.fbuilder.controls[ 'ffile' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"ffile",
			required:false,
			exclude:false,
			size:"medium",
			accept:"",
			upload_size:"",
			multiple:false,
			preview: false,
			thumb_width: '80px',
			thumb_height: '',
			initAdv:function(){
				delete this.advanced.css.input;
				if ( ! ( 'file' in this.advanced.css ) ) this.advanced.css.file = {label: 'File field',rules:{}};
				if ( ! ( 'thumbnail' in this.advanced.css ) ) this.advanced.css.thumbnail = {label: 'Thumbnail image',rules:{}};
			},
			display:function( css_class )
				{
					css_class = css_class || '';
					let id = 'field'+this.form_identifier+'-'+this.index;
					return '<div class="fields '+this.name+' '+this.ftype+' '+css_class+'" id="'+id+'" title="'+this.controlLabel('Upload File')+'"><div class="arrow ui-icon ui-icon-grip-dotted-vertical "></div>'+this.iconsContainer()+'<label for="'+id+'-box">'+cff_sanitize(this.title, true)+''+((this.required)?"*":"")+'</label><div class="dfield">'+this.showColumnIcon()+'<input id="'+id+'-box" type="file" disabled class="field disabled '+this.size+'" /><span class="uh">'+cff_sanitize(this.userhelp, true)+'</span></div><div class="clearer"></div></div>';
				},
			editItemEvents:function()
				{
					var evt = [
							{s:"#sAccept",e:"change keyup", l:"accept", x:1},
							{s:"#sUpload_size",e:"change keyup", l:"upload_size", x:1},
							{s:"#sThumbWidth",e:"change keyup", l:"thumb_width", x:1},
							{s:"#sThumbHeight",e:"change keyup", l:"thumb_height", x:1},
							{s:"#sMultiple",e:"click", l:"multiple",f:function(el){return el.is(":checked");}},
							{s:"#sPreview",e:"click", l:"preview",f:function(el){return el.is(":checked");}}
						];
					$.fbuilder.controls[ 'ffields' ].prototype.editItemEvents.call(this,evt);
				},
			showSpecialDataInstance: function()
				{
					return '<label for="sAccept">Accept these file extensions [<a class="helpfbuilder" text="Extensions comma separated and without the dot.\n\nExample: jpg,png,gif,pdf">help?</a>]</label><input type="text" name="sAccept" id="sAccept" value="'+cff_esc_attr(this.accept)+'" class="large"><label for="sUpload_size">Maximum upload size in kB [<a class="helpfbuilder" text="1024 kB = 1 MB.\n\nThe support for this HTML5 feature may be partially available or not available in some browsers.">help?</a>]</label><input type="text" name="sUpload_size" id="sUpload_size" value="'+cff_esc_attr(this.upload_size)+'" class="large"><label><input type="checkbox" id="sMultiple" name="sMultiple" '+((typeof this.multiple != 'undefined' && this.multiple) ? 'CHECKED' : '')+' /> Upload multiple files</label><hr /><label><input type="checkbox" id="sPreview" name="sPreview" '+((typeof this.preview != 'undefined' && this.preview) ? 'CHECKED' : '')+' /> Show preview of images</label><label for="sThumbWidth">Thumbnail width</label><input type="text" id="sThumbWidth" name="sThumbWidth" value="'+cff_esc_attr(this.thumb_width)+'" class="large" /><label for="sThumbHeight">Thumbnail height</label><input type="text" id="sThumbHeight" name="sThumbHeight" value="'+cff_esc_attr(this.thumb_height)+'" class="large" /><hr />';
				}
	});