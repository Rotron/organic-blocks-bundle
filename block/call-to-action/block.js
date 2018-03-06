( function( blocks, components, i18n, element ) {
	var el = element.createElement;
	var children = blocks.source.children;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var BlockAlignmentToolbar = wp.blocks.BlockAlignmentToolbar;
	var InspectorControls = wp.blocks.InspectorControls;
	var ColorPalette = wp.blocks.ColorPalette;
	var ContrastChecker = wp.blocks.ContrastChecker;
	var UrlInput = wp.blocks.UrlInput;

	blocks.registerBlockType( 'organic/action-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Call To Action' ), // The title of our block.
		icon: 'megaphone', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			textAlignment: {
				type: 'string',
				default: 'center',
			},
			blockAlignment: {
				type: 'string',
				default: '',
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
				selector: '.organic-action-button-link',
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
				default: '#f4f4f4',
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
			var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
			var attributes = props.attributes;
			var textAlignment = props.attributes.textAlignment;
			var blockAlignment = props.attributes.blockAlignment;
			var buttonText = props.attributes.buttonText;
			var buttonLink = props.attributes.buttonLink;
			var titleColor = props.attributes.titleColor;
			var textColor = props.attributes.textColor;
			var buttonColor = props.attributes.buttonColor;
			var bgColor = props.attributes.bgColor;

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { textAlignment: newAlignment } );
			}

			function updateBlockAlignment( newBlockAlignment ) {
				props.setAttributes( { blockAlignment: newBlockAlignment } );
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
					)
				),
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
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
				el( 'div', { className: props.className, style: { backgroundColor: attributes.bgColor } },
					el( 'div', { className: 'organic-block-content', style: { textAlign: textAlignment } },
						el( blocks.Editable, {
							tagName: 'h2',
							inlineToolbar: true,
							style: { color: attributes.titleColor },
							placeholder: i18n.__( 'Call To Action Title' ),
							value: attributes.title,
							onChange: function( newTitle ) {
								props.setAttributes( { title: newTitle } );
							},
							focus: focusedEditable === 'title' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'title' } ) );
							},
						} ),
						el( blocks.Editable, {
							tagName: 'p',
							inlineToolbar: true,
							style: { color: attributes.textColor },
							placeholder: i18n.__( 'Add your body content...' ),
							value: attributes.content,
							onChange: function( newDetails ) {
								props.setAttributes( { content: newDetails } );
							},
							focus: focusedEditable === 'content' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'content' } ) );
							},
						} ),
						el( 'span', { key: 'button', className: 'organic-action-button', style: { backgroundColor: attributes.buttonColor } },
							el( blocks.Editable, {
								className: 'organic-action-button-link',
								tagName: 'span',
								formattingControls: [ 'bold', 'italic', 'strikethrough' ],
								placeholder: i18n.__( 'Button Text' ),
								value: attributes.buttonText,
								onChange: function( newButtonText ) {
									props.setAttributes( { buttonText: newButtonText } );
								},
								focus: focusedEditable === 'buttonText' ? focus : null,
								onFocus: function( focus ) {
									props.setFocus( _.extend( {}, focus, { editable: 'buttonText' } ) );
								},
							} )
						),
						!! focus && el( 'form', {
								key: 'form-link',
								className: 'blocks-button__inline-link',
								style: { margin: '0 auto' },
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

			return (
				el( 'div', {
					className: props.className,
					className: attributes.blockAlignment === 'wide' || attributes.blockAlignment === 'full' ? 'align'+attributes.blockAlignment : null,
					style: { backgroundColor: attributes.bgColor } },
					el( 'div', { className: 'organic-block-content', style: { textAlign: attributes.textAlignment } },
						el( 'h2', { style: { color: attributes.titleColor } }, attributes.title ),
						attributes.content && el( 'p', { style: { color: attributes.textColor } }, attributes.content ),
						attributes.buttonLink && el( 'a', { className: 'organic-action-button', style: { backgroundColor: attributes.buttonColor }, href: attributes.buttonLink },
							el( 'span', { className: 'organic-action-button-link' }, attributes.buttonText ),
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
