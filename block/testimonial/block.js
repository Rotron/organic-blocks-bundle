( function( blocks, components, i18n, element, _ ) {
	var el = element.createElement;
	var children = blocks.source.children;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var FormatToolbar = wp.blocks.FormatToolbar;
	var BlockAlignmentToolbar = wp.blocks.BlockAlignmentToolbar;
	var MediaUpload = wp.blocks.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.blocks.InspectorControls.TextControl;
	var ColorPalette = wp.blocks.ColorPalette;
	var ContrastChecker = wp.blocks.ContrastChecker;

	blocks.registerBlockType( 'organic/testimonial-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Testimonial' ), // The title of our block.
		icon: 'testimonial', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			content: {
				type: 'array',
				source: 'children',
				selector: '.organic-testimonial-content',
			},
			author: {
				type: 'array',
				source: 'children',
				selector: '.organic-testimonial-author',
			},
			position: {
				type: 'array',
				source: 'children',
				selector: '.organic-testimonial-position',
			},
			business: {
				type: 'array',
				source: 'children',
				selector: '.organic-testimonial-business',
			},
			businessURL: {
				type: 'url',
				default: '#',
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			alignment: {
				type: 'string',
				default: 'center',
			},
			blockAlignment: {
				type: 'string',
				default: '',
			},
			textColor: {
				type: 'string',
				default: '#000000',
			},
			bgColor: {
				type: 'string',
				default: '#ffffff',
			}
		},

		getEditWrapperProps( attributes ) {
			var blockAlignment = attributes.blockAlignment;
			if ( 'wide' === blockAlignment || 'full' === blockAlignment ) {
				return { 'data-align': blockAlignment };
			}
		},

		edit: function( props ) {

			var focus = props.focus;
			var attributes = props.attributes;
			var alignment = props.attributes.alignment;
			var blockAlignment = props.attributes.blockAlignment;
			var businessURL = props.attributes.businessURL;
			var textColor = props.attributes.textColor;
			var bgColor = props.attributes.bgColor;
			// var state = { fieldFocused: false };
			var focusedEditable = props.focus ? props.focus.editable || 'content' : null;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			function onChangeFormat( newFormat ) {
				props.setAttributes( { alignment: newFormat } );
			}

			function updateBlockAlignment( newBlockAlignment ) {
				props.setAttributes( { blockAlignment: newBlockAlignment } );
			}

			// function onFocusField() {
			// 	if ( ! state.fieldFocused ) {
			// 		props.setState( { fieldFocused: true } );
			// 	}
			// }

			return [
				!! focus && el( // Display controls when the block is clicked on.
					blocks.BlockControls,
					{ key: 'controls' },
					el(
						blocks.BlockAlignmentToolbar,
						{
							value: blockAlignment,
							onChange: updateBlockAlignment,
							controls: [ 'wide', 'full' ],
						}
					),
					el(
						blocks.AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					),
					// el(
					// 	blocks.FormatToolbar,
					// 	{
					// 		value: alignment,
					// 		onChange: onChangeAlignment,
					// 	}
					// ),
					el( 'div', { className: 'components-toolbar' },
						el(
							blocks.MediaUpload,
							{
								onSelect: onSelectImage,
								type: 'image',
								render: function( obj ) {
									return el( components.Button, {
										className: 'components-icon-button components-toolbar__control',
										onClick: obj.open
										},
										el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
											el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
										)
									);
								}
							}
						)
					)
				),
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
					// el( 'div', { className: 'components-block-description' }, // A brief description of our block in the inspector.
					// 	el( 'p', {}, i18n.__( 'Add links to your social media profiles.' ) ),
					// ),
					el( 'h2', {}, i18n.__( 'Author Link' ) ), // A title for our social media link options.
					el(
						TextControl,
						{
							type: 'url',
							label: i18n.__( 'Website URL' ),
							value: businessURL,
							onChange: function( newWebsite ) {
								props.setAttributes( { businessURL: newWebsite } );
							},
						}
					),
					el( components.PanelColor, { title: i18n.__( 'Text Color' ), colorValue: textColor, initialOpen: false },
						el(
							blocks.ColorPalette,
							{
								value: textColor,
								onChange: function( colorValue ) {
									props.setAttributes( { textColor: colorValue } );
								},
							}
						)
					),
					el( components.PanelColor, { title: i18n.__( 'Background Color' ), colorValue: bgColor, initialOpen: false },
						el(
							blocks.ColorPalette,
							{
								value: bgColor,
								onChange: function( colorValue ) {
									props.setAttributes( { bgColor: colorValue } );
								},
							}
						)
					)
				),
				el( 'div', { className: props.className, style: { backgroundColor: attributes.bgColor } },
					el( 'div', {
						className: attributes.mediaID ? 'organic-testimonial-image image-active' : 'organic-testimonial-image image-inactive',
						style: attributes.mediaID ? { backgroundImage: 'url('+attributes.mediaURL+')' } : {}
					},
						el( blocks.MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
									className: attributes.mediaID ? 'image-button' : 'button button-large',
									onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
								);
							}
						} )
					),
					el( 'div', { className: 'organic-testimonial-content', style: { textAlign: alignment } },
						el( blocks.RichText, {
							tagName: 'p',
							className: 'organic-testimonial-content',
							placeholder: i18n.__( 'Write a testimonial...' ),
							style: { color: attributes.textColor },
							value: attributes.content,
							onChange: function( newContent ) {
								props.setAttributes( { content: newContent } );
							},
							// focus: focus,
							// onFocus: props.setFocus,
							// onFocus: onFocusField,
							// isSelected: state.fieldFocused,
							isSelected: props.isSelected,
							formattingControls: [ 'bold', 'italic', 'strikethrough' ],
							focus: focusedEditable === 'organic-testimonial-content' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'organic-testimonial-content' } ) );
							},
							// isSelected: function( isSelected ) {
							// 	props.isSelected( _.extend( {}, focus, { editable: 'content' } ) );
							// },
							// inlineToolbar: true,
						} ),
						el( blocks.RichText, {
							tagName: 'p',
							className: 'organic-testimonial-author',
							placeholder: i18n.__( 'Name' ),
							style: { color: attributes.textColor },
							value: attributes.author,
							onChange: function( newAuthor ) {
								props.setAttributes( { author: newAuthor } );
							},
							isSelected: props.isSelected,
							formattingControls: [ 'bold', 'italic', 'strikethrough' ],
							focus: focusedEditable === 'organic-testimonial-author' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'organic-testimonial-author' } ) );
							},
						} ),
						el( blocks.RichText, {
							tagName: 'p',
							className: 'organic-testimonial-position',
							placeholder: i18n.__( 'Position' ),
							style: { color: attributes.textColor },
							value: attributes.position,
							onChange: function( newPosition ) {
								props.setAttributes( { position: newPosition } );
							},
							focus: focus,
							onFocus: props.setFocus,
						} ),
						el( blocks.RichText, {
							tagName: 'p',
							className: 'organic-testimonial-business',
							placeholder: i18n.__( 'Business Name' ),
							style: { color: attributes.textColor },
							value: attributes.business,
							onChange: function( newBusiness ) {
								props.setAttributes( { business: newBusiness } );
							},
							focus: focus,
							onFocus: props.setFocus,
						} ),
					)
				)
			];
		},

		save: function( props ) {

			var attributes = props.attributes;

			return (
				el( 'div', {
					className: props.className,
					className: attributes.blockAlignment === 'wide' || attributes.blockAlignment === 'full' ? 'align'+attributes.blockAlignment : null,
					style: { backgroundColor: attributes.bgColor, textAlign: attributes.alignment } },
					attributes.mediaURL && el( 'div', { className: 'organic-testimonial-image', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
						el( 'img', { src: attributes.mediaURL } ),
					),
					el( 'div', { className: 'organic-testimonial-content' },
						attributes.content && el( 'p', { style: { color: attributes.textColor } }, attributes.content ),
						attributes.author && el( 'p', { className: 'organic-testimonial-author', style: { color: attributes.textColor } }, attributes.author ),
						attributes.position && el( 'p', { className: 'organic-testimonial-position', style: { color: attributes.textColor } }, attributes.position ),
						attributes.business && el( 'p', { className: 'organic-testimonial-business', style: { color: attributes.textColor } },
							el( 'a', {
									className: 'business-link',
									href: attributes.businessURL,
									target: '_blank',
								},
								attributes.business,
							)
						)
					)
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
	window._,
);
