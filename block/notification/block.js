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

	blocks.registerBlockType( 'organic/notification-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Notification' ), // The title of our block.
		icon: 'warning', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		supports: { anchor: true, },
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			dismissNotification: {
				type: 'boolean',
				default: true,
			},
			textAlignment: {
				type: 'string',
				default: 'left',
			},
			blockAlignment: {
				type: 'string',
				default: '',
			},
			textColor: {
				type: 'string',
				default: '#609010',
			},
			bgColor: {
				type: 'string',
				default: '#d0eaa7',
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
			var dismissNotification = props.attributes.dismissNotification;
			var textColor = props.attributes.textColor;
			var bgColor = props.attributes.bgColor;

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { textAlignment: newAlignment } );
			}

			function updateBlockAlignment( newBlockAlignment ) {
				props.setAttributes( { blockAlignment: newBlockAlignment } );
			}

			function toggleDismiss( newDismiss ) {
				props.setAttributes( { dismissNotification: newDismiss } );
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
					el( components.PanelBody, { title: i18n.__( 'Display Settings' ) },
						el(
							components.ToggleControl,
							{
								label: i18n.__( 'Dismissible' ),
								checked: !! dismissNotification,
								onChange: toggleDismiss,
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
						el( blocks.RichText, {
							tagName: 'p',
							inlineToolbar: 'true',
							style: { color: attributes.textColor },
							placeholder: i18n.__( 'Add your notification text...' ),
							value: attributes.content,
							onChange: function( newContent ) {
								props.setAttributes( { content: newContent } );
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
					style: { backgroundColor: attributes.bgColor } },
					el( 'div', { className: 'organic-block-content', style: { textAlign: attributes.textAlignment } },
						attributes.content && el( 'p', { style: { color: attributes.textColor } }, attributes.content ),
					),
					attributes.dismissNotification && el( 'button', { className: 'dismiss-notification' },
						el( 'i', { className: 'fa fa-times' } )
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
