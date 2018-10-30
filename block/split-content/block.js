( function( blocks, components, i18n, element ) {
	var el = element.createElement;
	var children = blocks.source.children;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var BlockAlignmentToolbar = wp.blocks.BlockAlignmentToolbar;
	var InspectorControls = wp.blocks.InspectorControls;
	var MediaUpload = wp.blocks.MediaUpload;
	var ColorPalette = wp.blocks.ColorPalette;
	var ContrastChecker = wp.blocks.ContrastChecker;
	var UrlInput = wp.blocks.UrlInput;
	var RichText = wp.blocks.RichText;

	blocks.registerBlockType( 'organic/split-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Split Content' ), // The title of our block.
		icon: 'image-flip-horizontal', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h4',
			},
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			textTools: {
				type: 'string',
			},
			textAlignment: {
				type: 'string',
				default: 'center',
			},
			blockAlignment: {
				type: 'string',
				default: '',
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
			buttonLink: {
				type: 'string',
				source: 'attribute',
				selector: 'a',
				attribute: 'href',
			},
			buttonText: {
				type: 'array',
				source: 'children',
				selector: '.organic-split-button-link',
			},
			flipContent: {
				type: 'boolean',
				default: false,
			},
			titleColor: {
				type: 'string',
				default: '#000000',
			},
			textColor: {
				type: 'string',
				default: '#666666',
			},
			buttonColor: {
				type: 'string',
				default: '#99cc33',
			},
			bgColor: {
				type: 'string',
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
			var textAlignment = props.attributes.textAlignment;
			var blockAlignment = props.attributes.blockAlignment;
			var buttonText = props.attributes.buttonText;
			var buttonLink = props.attributes.buttonLink;
			var flipContent = props.attributes.flipContent;
			var titleColor = props.attributes.titleColor;
			var textColor = props.attributes.textColor;
			var buttonColor = props.attributes.buttonColor;
			var bgColor = props.attributes.bgColor;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			var flipClass = attributes.flipContent ? ' organic-flip-content' : '';

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { textAlignment: newAlignment } );
			}
			function onChangeFormat( newFormat ) {
				props.setAttributes( { textTools: newFormat } );
			}

			function updateBlockAlignment( newBlockAlignment ) {
				props.setAttributes( { blockAlignment: newBlockAlignment } );
			}

			function toggleFlipContent( newFlipContent ) {
				props.setAttributes( { flipContent: newFlipContent } );
			}

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
							value: textAlignment,
							onChange: onChangeAlignment,
						}
					),
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
							},
						)
					)
				),
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
					el( components.PanelBody, { title: i18n.__( 'Display Settings' ) },
						el(
							components.ToggleControl,
							{
								label: i18n.__( 'Flip Content' ),
								checked: !! flipContent,
								onChange: toggleFlipContent,
							}
						)
					),
					el( components.PanelColor, { title: i18n.__( 'Title Text Color' ), colorValue: titleColor, initialOpen: false },
						el(
							blocks.ColorPalette,
							{
								value: titleColor,
								onChange: function( colorValue ) {
									props.setAttributes( { titleColor: colorValue } );
								},
							}
						)
					),
					el( components.PanelColor, { title: i18n.__( 'Body Text Color' ), colorValue: textColor, initialOpen: false },
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
					el( components.PanelColor, { title: i18n.__( 'Button Background Color' ), colorValue: buttonColor, initialOpen: false },
						el(
							blocks.ColorPalette,
							{
								value: buttonColor,
								onChange: function( colorValue ) {
									props.setAttributes( { buttonColor: colorValue } );
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
				el( 'div', {
					className: props.className + flipClass,
					style: { backgroundColor: attributes.bgColor }
					},
					el( 'div', {
						className: attributes.mediaID ? 'organic-split-image image-active' : 'organic-split-image image-inactive',
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
					el( 'div', { className: 'organic-split-content', style: { textAlign: textAlignment } },
						el( blocks.RichText, {
							tagName: 'h4',
							inlineToolbar: true,
							style: { color: attributes.titleColor },
							placeholder: i18n.__( 'Title' ),
							value: attributes.title,
							onChange: function( newTitle ) {
								props.setAttributes( { title: newTitle } );
							},
							focus: focus,
							onFocus: props.setFocus,
						} ),
						el( blocks.RichText, {
							tagName: 'p',
							inlineToolbar: true,
							formattingControls: [ 'bold', 'italic', 'strikethrough' ],
							style: { color: attributes.textColor },
							placeholder: i18n.__( 'Add your body content...' ),
							value: attributes.content,
							onChange: function( newContent ) {
								props.setAttributes( { content: newContent } );
							},
							focus: focus,
							onFocus: props.setFocus,
						} ),
						el( 'span', { key: 'button', className: 'organic-split-button', style: { backgroundColor: attributes.buttonColor } },
							el( blocks.RichText, {
								className: 'organic-split-button-link',
								tagName: 'span',
								formattingControls: [ 'bold', 'italic', 'strikethrough' ],
								placeholder: i18n.__( 'Button Text' ),
								value: attributes.buttonText,
								onChange: function( newButtonText ) {
									props.setAttributes( { buttonText: newButtonText } );
								},
								focus: focus,
								onFocus: props.setFocus,
							} )
						),
						!! focus && el( 'form', {
								key: 'form-link',
								className: 'blocks-button__inline-link',
								style: { margin: '0 auto', textAlign: textAlignment },
								onSubmit: function( event ) {
									event.preventDefault();
								}
							},
							el( components.Dashicon, {
								icon: 'admin-links',
							} ),
							el( blocks.UrlInput, {
								value: attributes.buttonLink,
								onChange: function( newButtonLink ) {
									props.setAttributes( { buttonLink: newButtonLink } );
								}
							}	),
							el( components.IconButton, {
								type: 'submit',
								label: i18n.__( 'Apply' ),
								icon: 'editor-break',
							} )
						)
					)
				)
			];
		},

		save: function( props ) {

			var attributes = props.attributes;
			var flipClass = attributes.flipContent ? ' organic-flip-content' : '';
			var alignClass = attributes.blockAlignment === 'wide' || attributes.blockAlignment === 'full' ? 'align'+attributes.blockAlignment : null;

			return (
				el( 'div', {
					className: props.className,
					className: alignClass + flipClass,
					style: { backgroundColor: attributes.bgColor } },
					el( 'div', { className: 'organic-split-image', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
						el( 'img', { src: attributes.mediaURL } ),
					),
					el( 'div', { className: 'organic-split-content', style: { textAlign: attributes.textAlignment } },
						el( 'h4', { style: { color: attributes.titleColor } }, attributes.title ),
						attributes.content && el( 'p', { style: { color: attributes.textColor } }, attributes.content ),
						attributes.buttonLink && el( 'a', { className: 'organic-split-button', style: { backgroundColor: attributes.buttonColor }, href: attributes.buttonLink },
							el( 'span', { className: 'organic-split-button-link' }, attributes.buttonText ),
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
);
