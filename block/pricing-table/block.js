( function( blocks, components, i18n, element ) {
	var el = element.createElement;
	var RichText = wp.blocks.RichText;
	var registerBlockType = wp.blocks.registerBlockType;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.components.TextControl;
	var ColorPalette = wp.components.ColorPalette;
	var ContrastChecker = wp.components.ContrastChecker;
	var UrlInput = wp.blocks.UrlInput;

	registerBlockType( 'organic/pricing-table-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Pricing Table' ), // The title of our block.
		description: i18n.__( 'A custom block for displaying a pricing table.' ), // The description of our block.
		icon: 'tag', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'h4',
			},
			price: {
				type: 'array',
				source: 'children',
				selector: 'h6',
			},
			details: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			alignment: {
				type: 'string',
				default: 'center',
			},
			features: {
				type: 'array',
				source: 'children',
				selector: '.organic-pricing-features',
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
				selector: '.organic-pricing-button-link',
			},
			headerTextColor: {
				type: 'string',
				default: '#000000',
			},
			headerBGColor: {
				type: 'string',
				default: '#eeeeee',
			},
			backgroundColor: {
				type: 'string',
				default: '#f4f4f4',
			},
			buttonColor: {
				type: 'string',
			},
			textColor: {
				type: 'string',
				default: '#000000',
			}
		},

		edit: function( props ) {

			// var focus = props.focus;
			//var isSelected = props.isSelected;
			var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var buttonText = props.attributes.buttonText;
			var buttonLink = props.attributes.buttonLink;
			var textColor = props.attributes.textColor;
			var buttonColor = props.attributes.buttonColor;
			var backgroundColor = props.attributes.backgroundColor;
			var headerBGColor = props.attributes.headerBGColor;
			var headerTextColor = props.attributes.headerTextColor;

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			return [
				el( BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
					el( AlignmentToolbar, {
						value: alignment,
						onChange: onChangeAlignment,
					} )
				),
				el( InspectorControls, { key: 'inspector' },
					el( components.PanelColor, { title: i18n.__( 'Header Text Color' ), colorValue: headerTextColor, initialOpen: false },
						el( ColorPalette, {
							value: headerTextColor,
							onChange: function( colorValue ) {
								props.setAttributes( { headerTextColor: colorValue } );
							},
						} )
					),
					el( components.PanelColor, { title: i18n.__( 'Body Text Color' ), colorValue: textColor, initialOpen: false },
						el( ColorPalette, {
							value: textColor,
							onChange: function( colorValue ) {
								props.setAttributes( { textColor: colorValue } );
							},
						} )
					),
					el( components.PanelColor, { title: i18n.__( 'Button Background Color' ), colorValue: buttonColor, initialOpen: false },
						el( ColorPalette, {
							value: buttonColor,
							onChange: function( colorValue ) {
								props.setAttributes( { buttonColor: colorValue } );
							},
						} )
					),
					el( components.PanelColor, { title: i18n.__( 'Header Background Color' ), colorValue: headerBGColor, initialOpen: false },
						el( ColorPalette, {
							value: headerBGColor,
							onChange: function( colorValue ) {
								props.setAttributes( { headerBGColor: colorValue } );
							},
						} )
					),
					el( components.PanelColor, { title: i18n.__( 'Background Color' ), colorValue: backgroundColor, initialOpen: false },
						el( ColorPalette, {
							value: backgroundColor,
							onChange: function( colorValue ) {
								props.setAttributes( { backgroundColor: colorValue } );
							},
						} )
					)
				),
				el( 'div', { className: props.className, style: { backgroundColor: attributes.backgroundColor } },
					el( 'div', { className: 'organic-pricing-table-content', style: { textAlign: alignment } },
						el( 'div', { className: 'organic-pricing-table-header', style: { backgroundColor: attributes.headerBGColor } },
							!! focus && el( RichText, {
								tagName: 'h2',
								inlineToolbar: true,
								style: { color: attributes.headerTextColor },
								placeholder: i18n.__( 'Package Title' ),
								keepPlaceholderOnFocus: true,
								value: attributes.title,
								// isSelected: false,
								focus: focus,
								onFocus: props.setFocus,
								// focus: focusedEditable === 'title' ? focus : null,
								// onFocus: function( focus ) {
								// 	props.setFocus( {}, focus, { editable: 'title' } );
								// },
								onChange: function( newTitle ) {
									props.setAttributes( { title: newTitle } );
								},
							} ),
							el( RichText, {
								tagName: 'h4',
								inlineToolbar: true,
								style: { color: attributes.headerTextColor },
								placeholder: i18n.__( 'Package Subtitle' ),
								keepPlaceholderOnFocus: true,
								value: attributes.subtitle,
								isSelected: false,
								onChange: function( newSubtitle ) {
									props.setAttributes( { subtitle: newSubtitle } );
								},
							} ),
						),
						el( 'div', { className: 'organic-pricing-table-price' },
							el( RichText, {
								tagName: 'h6',
								inlineToolbar: true,
								style: { color: attributes.textColor },
								placeholder: i18n.__( '$299' ),
								keepPlaceholderOnFocus: true,
								value: attributes.price,
								isSelected: false,
								onChange: function( newPrice ) {
									props.setAttributes( { price: newPrice } );
								},
							} ),
							el( RichText, {
								tagName: 'p',
								inlineToolbar: true,
								style: { color: attributes.textColor },
								placeholder: i18n.__( 'Pricing details' ),
								keepPlaceholderOnFocus: true,
								value: attributes.details,
								onChange: function( newDetails ) {
									props.setAttributes( { details: newDetails } );
								},
							} ),
						),
						el( RichText, {
							className: 'organic-pricing-features',
							tagName: 'ul',
							multiline: 'li',
							style: { color: attributes.textColor },
							inlineToolbar: true,
							placeholder: i18n.__( 'Write a list of features...' ),
							keepPlaceholderOnFocus: true,
							value: attributes.features,
							onChange: function( value ) {
								props.setAttributes( { features: value } );
							},
						} ),
						el( 'div', { className: 'organic-pricing-table-footer' },
							el( 'span', { key: 'button', className: 'organic-pricing-button', style: { backgroundColor: attributes.buttonColor } },
								el( RichText, {
									className: 'organic-pricing-button-link',
									tagName: 'span',
									inlineToolbar: true,
									formattingControls: [ 'bold', 'italic', 'strikethrough' ],
									placeholder: i18n.__( 'Buy Package' ),
									keepPlaceholderOnFocus: true,
									value: attributes.buttonText,
									onChange: function( newButtonText ) {
										props.setAttributes( { buttonText: newButtonText } );
									},
								} )
							),
							el( 'form', {
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
								el( UrlInput, {
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
				)
			];
		},

		save: function( props ) {

			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var buttonText = props.attributes.buttonText;
			var buttonLink = props.attributes.buttonLink;
			var textColor = props.attributes.textColor;
			var buttonColor = props.attributes.buttonColor;
			var backgroundColor = props.attributes.backgroundColor;
			var headerBGColor = props.attributes.headerBGColor;
			var headerTextColor = props.attributes.headerTextColor;

			return (
				el( 'div', { className: props.className, style: { backgroundColor: attributes.backgroundColor } },
					el( 'div', { className: 'organic-pricing-table-content', style: { textAlign: attributes.alignment } },
						el( 'div', { className: 'organic-pricing-table-header', style: { backgroundColor: attributes.headerBGColor } },
							// el( 'h2', { style: { color: attributes.headerTextColor } }, attributes.title ),
							// attributes.subtitle && el( 'h4', { style: { color: attributes.headerTextColor } }, attributes.subtitle ),
							el( RichText.Content, {
								tagName: 'h2',
								value: attributes.title,
								style: { color: attributes.headerTextColor }
							} ),
							el( RichText.Content, {
								tagName: 'h4',
								value: attributes.subtitle,
								style: { color: attributes.headerTextColor }
							} ),
						),
						el( 'div', { className: 'organic-pricing-table-price' },
							// attributes.price && el( 'h6', { style: { color: attributes.textColor } }, attributes.price ),
							// attributes.details && el( 'p', { style: { color: attributes.textColor } }, attributes.details ),
							el( RichText.Content, {
								tagName: 'h6',
								value: attributes.price,
								style: { color: attributes.textColor }
							} ),
							el( RichText.Content, {
								tagName: 'p',
								value: attributes.details,
								style: { color: attributes.textColor }
							} ),
						),
						//attributes.features && el( 'ul', { className: 'organic-pricing-features', style: { color: attributes.textColor } }, attributes.features ),
						el( RichText.Content, {
							tagName: 'ul',
							className: 'organic-pricing-features',
							value: attributes.features,
							style: { color: attributes.textColor }
						} ),
						attributes.buttonLink && el( 'div', { className: 'organic-pricing-table-footer' },
							el( 'a', { className: 'organic-pricing-button', style: { backgroundColor: attributes.buttonColor }, href: attributes.buttonLink },
								el( 'span', { className: 'organic-pricing-button-link' }, attributes.buttonText ),
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
);
