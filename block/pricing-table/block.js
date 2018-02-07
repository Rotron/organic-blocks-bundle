( function( blocks, components, i18n, element ) {
	var el = element.createElement;
	var children = blocks.source.children;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	// var MediaUpload = wp.blocks.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.blocks.InspectorControls.TextControl;
	var ColorPalette = wp.blocks.ColorPalette;
	var ContrastChecker = wp.blocks.ContrastChecker;

	blocks.registerBlockType( 'organic/pricing-table-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Pricing Table' ), // The title of our block.
		icon: 'tag', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				// type: 'text',
				source: 'text',
				selector: 'h2',
			},
			subtitle: {
				// type: 'array',
				source: 'text',
				selector: 'h4',
			},
			price: {
				// type: 'array',
				source: 'text',
				// selector: 'p',
				selector: '.organic-pricing-table-price',
			},
			details: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			// mediaID: {
			// 	type: 'number',
			// },
			// mediaURL: {
			// 	type: 'string',
			// 	source: 'attribute',
			// 	selector: 'img',
			// 	attribute: 'src',
			// },
			alignment: {
				type: 'string',
				default: 'center',
			},
			features: {
				type: 'array',
				source: 'children',
				selector: '.organic-pricing-features',
			},
			purchase: {
				source: 'text',
				selector: '.organic-pricing-purchase-button',
			},
			backgroundColor: {
				type: 'string',
			}
		},

		edit: function( props ) {

			var focus = props.focus;
			var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var backgroundColor = props.attributes.backgroundColor;
			// var purchase = props.attributes.purchase || 'Buy Package';

			// var onSelectImage = function( media ) {
			// 	return props.setAttributes( {
			// 		mediaURL: media.url,
			// 		mediaID: media.id,
			// 	} );
			// };

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			return [
				!! focus && el( // Display controls when the block is clicked on.
					blocks.BlockControls,
					{ key: 'controls' },
					el(
						blocks.AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					)
					// el( 'div', { className: 'components-toolbar' },
					// 	el(
					// 		blocks.MediaUpload,
					// 		{
					// 			onSelect: onSelectImage,
					// 			type: 'image',
					// 			render: function( obj ) {
					// 				return el( components.Button, {
					// 					className: 'components-icon-button components-toolbar__control',
					// 					onClick: obj.open
					// 					},
					// 					el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
					// 						el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3h2v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1h4c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
					// 					)
					// 				);
					// 			}
					// 		},
					// 	)
					// )
				),
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
					el( 'h2', {}, i18n.__( 'Background Color' ) ), // A title for our social media link options.
					el(
						blocks.ColorPalette,
						{
							value: backgroundColor,
							onChange: function( colorValue ) {
								props.setAttributes( { backgroundColor: colorValue } );
							},
						}
					)
				),
				el( 'div', { className: props.className, style: { backgroundColor: attributes.backgroundColor } },
					// el( 'div', {
					// 	className: attributes.mediaID ? 'organic-pricing-table-image image-active' : 'organic-pricing-table-image image-inactive',
					// 	style: attributes.mediaID ? { backgroundImage: 'url('+attributes.mediaURL+')' } : {}
					// },
					// 	el( blocks.MediaUpload, {
					// 		onSelect: onSelectImage,
					// 		type: 'image',
					// 		value: attributes.mediaID,
					// 		render: function( obj ) {
					// 			return el( components.Button, {
					// 				className: attributes.mediaID ? 'image-button' : 'button button-large',
					// 				onClick: obj.open
					// 				},
					// 				! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
					// 			);
					// 		}
					// 	} )
					// ),
					el( 'div', {
						className: 'organic-pricing-table-content', style: { textAlign: alignment } },
						el( blocks.Editable, {
							tagName: 'h2',
							// inline: false,
							placeholder: i18n.__( 'Package Title' ),
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
							tagName: 'h4',
							// inline: false,
							placeholder: i18n.__( 'Package Subtitle' ),
							value: attributes.subtitle,
							onChange: function( newSubtitle ) {
								props.setAttributes( { subtitle: newSubtitle } );
							},
							focus: focusedEditable === 'subtitle' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'subtitle' } ) );
							},
						} ),
						el( blocks.Editable, {
							className: 'organic-pricing-table-price',
							tagName: 'span',
							// inline: true,
							placeholder: i18n.__( '$299' ),
							value: attributes.price,
							onChange: function( newPrice ) {
								props.setAttributes( { price: newPrice } );
							},
							focus: focusedEditable === 'price' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'price' } ) );
							},
						} ),
						el( blocks.Editable, {
							className: 'organic-pricing-table-details',
							tagName: 'p',
							inline: true,
							placeholder: i18n.__( 'Pricing details' ),
							value: attributes.details,
							onChange: function( newDetails ) {
								props.setAttributes( { details: newDetails } );
							},
							focus: focusedEditable === 'details' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'details' } ) );
							},
						} ),
						el( blocks.Editable, {
							className: 'organic-pricing-features',
							tagName: 'ul',
							multiline: 'li',
							placeholder: i18n.__( 'Write a list of features…' ),
							value: attributes.features,
							onChange: function( value ) {
								props.setAttributes( { features: value } );
							},
							focus: focusedEditable === 'features' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'features' } ) );
							},
						} ),
						el( 'div', { className: 'organic-pricing-table-purchase' },
							el( blocks.Editable, {
								className: 'organic-pricing-purchase-button',
								tagName: 'a',
								placeholder: i18n.__( 'Buy Package' ),
								value: attributes.purchase,
								onChange: function( newPurchase ) {
									props.setAttributes( { purchase: newPurchase } );
								},
								focus: focusedEditable === 'purchase' ? focus : null,
								onFocus: function( focus ) {
									props.setFocus( _.extend( {}, focus, { editable: 'purchase' } ) );
								},
							} ),
						),
					),
				)
			];
		},

		save: function( props ) {
			var attributes = props.attributes;
			var alignment = props.attributes.alignment;

			return (
				el( 'div', { className: props.className, style: { backgroundColor: attributes.backgroundColor } },
					// attributes.mediaURL &&
					// el( 'div', { className: 'organic-pricing-table-image', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
					// 	el( 'img', { src: attributes.mediaURL } ),
					// ),
					el( 'div', { className: 'organic-pricing-table-content', style: { textAlign: attributes.alignment } },
						el( 'h2', {}, attributes.title ),
						attributes.subtitle && el( 'h4', {}, attributes.subtitle ),
						attributes.price && el( 'span', { className: 'organic-pricing-table-price' }, attributes.price ),
						attributes.details && el( 'p', {}, attributes.details ),
						el( 'ul', { className: 'organic-pricing-features' }, attributes.features ),
						attributes.purchase && el( 'a', { className: 'organic-pricing-purchase-button' }, attributes.purchase ),
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
