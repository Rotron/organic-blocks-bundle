( function( blocks, components, i18n, element ) {
	var el = element.createElement;
	var RichText = wp.blocks.RichText;
	var registerBlockType = wp.blocks.registerBlockType;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var BlockAlignmentToolbar = wp.blocks.BlockAlignmentToolbar;
	var MediaUpload = wp.blocks.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.components.TextControl;
	// var PanelColor = wp.components.PanelColor;
	var ColorPalette = wp.components.ColorPalette;
	var ContrastChecker = wp.components.ContrastChecker;

	registerBlockType( 'organic/team-member-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Team Member' ), // The title of our block.
		description: i18n.__( 'A custom block for displaying personal profiles.' ), // The description of our block.
		icon: 'businessman', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'h5',
			},
			bio: {
				type: 'array',
				source: 'children',
				selector: 'p',
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
			facebookURL: {
				type: 'url',
			},
			twitterURL: {
				type: 'url',
			},
			instagramURL: {
				type: 'url',
			},
			linkedURL: {
				type: 'url',
			},
			emailAddress: {
				type: 'text',
			},
			textColor: {
				type: 'string',
				default: '#000000',
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

			// var focus = props.focus;
			var attributes = props.attributes;
			var alignment = props.attributes.alignment;
			var blockAlignment = props.attributes.blockAlignment;
			var facebookURL = props.attributes.facebookURL;
			var twitterURL = props.attributes.twitterURL;
			var instagramURL = props.attributes.instagramURL;
			var linkedURL = props.attributes.linkedURL;
			var emailAddress = props.attributes.emailAddress;
			var textColor = props.attributes.textColor;
			var bgColor = props.attributes.bgColor;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			function updateBlockAlignment( newBlockAlignment ) {
				props.setAttributes( { blockAlignment: newBlockAlignment } );
			}

			return [
				el( BlockControls, { key: 'controls' },  // Display controls when the block is clicked on.
					el( 'div', { className: 'components-toolbar' },
						el( MediaUpload, {
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
						} )
					),
					el( BlockAlignmentToolbar, {
						value: blockAlignment,
						onChange: updateBlockAlignment,
						controls: [ 'wide', 'full' ],
					} ),
					el( AlignmentToolbar, {
						value: alignment,
						onChange: onChangeAlignment,
					} )
				),
				el( InspectorControls, { key: 'inspector' },
					el( components.PanelBody, {
						title: i18n.__( 'Social Media Links' ),
						className: 'team-member-block-social-links',
						initialOpen: true,
					},
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Facebook URL' ),
							value: facebookURL,
							onChange: function( newFacebook ) {
								props.setAttributes( { facebookURL: newFacebook } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Twitter URL' ),
							value: twitterURL,
							onChange: function( newTwitter ) {
								props.setAttributes( { twitterURL: newTwitter } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Instagram URL' ),
							value: instagramURL,
							onChange: function( newInstagram ) {
								props.setAttributes( { instagramURL: newInstagram } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'LinkedIn URL' ),
							value: linkedURL,
							onChange: function( newLinkedIn ) {
								props.setAttributes( { linkedURL: newLinkedIn } );
							},
						} ),
						el( TextControl, {
							type: 'text',
							label: i18n.__( 'Email Address' ),
							value: emailAddress,
							onChange: function( newEmail ) {
								props.setAttributes( { emailAddress: newEmail } );
							},
						} ),
					),
					el( components.PanelColor, { title: i18n.__( 'Text Color' ), colorValue: textColor, initialOpen: false },
						el( ColorPalette, {
							value: textColor,
							onChange: function( colorValue ) {
								props.setAttributes( { textColor: colorValue } );
							},
						} )
					),
					el( components.PanelColor, { title: i18n.__( 'Background Color' ), colorValue: bgColor, initialOpen: false },
						el( ColorPalette, {
							value: bgColor,
							onChange: function( colorValue ) {
								props.setAttributes( { bgColor: colorValue } );
							},
						} )
					)
				),
				el( 'div', { className: props.className, style: { backgroundColor: attributes.bgColor } },
					el( 'div', {
						className: attributes.mediaID ? 'organic-team-member-image image-active' : 'organic-team-member-image image-inactive',
						style: attributes.mediaID ? { backgroundImage: 'url('+attributes.mediaURL+')' } : {}
					},
						el( MediaUpload, {
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
					el( 'div', { className: 'organic-team-member-content', style: { textAlign: alignment } },
						el( RichText, {
							tagName: 'h3',
							placeholder: i18n.__( 'Team Member Name' ),
							keepPlaceholderOnFocus: true,
							style: { color: attributes.textColor },
							value: attributes.title,
							isSelected: false,
							onChange: function( newTitle ) {
								props.setAttributes( { title: newTitle } );
							},
						} ),
						el( RichText, {
							tagName: 'h5',
							placeholder: i18n.__( 'Subtitle' ),
							keepPlaceholderOnFocus: true,
							style: { color: attributes.textColor },
							value: attributes.subtitle,
							isSelected: false,
							onChange: function( newSubtitle ) {
								props.setAttributes( { subtitle: newSubtitle } );
							},
						} ),
						el( RichText, {
							tagName: 'p',
							placeholder: i18n.__( 'Write a brief bio...' ),
							keepPlaceholderOnFocus: true,
							style: { color: attributes.textColor },
							value: attributes.bio,
							onChange: function( newBio ) {
								props.setAttributes( { bio: newBio } );
							},
						} ),
						el( 'div', { className: 'organic-team-member-social' },
							attributes.facebookURL && el( 'a', {
									className: 'social-link',
									href: attributes.facebookURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-facebook', } ),
							),
							attributes.twitterURL && el( 'a', {
									className: 'social-link',
									href: attributes.twitterURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-twitter', } ),
							),
							attributes.instagramURL && el( 'a', {
									className: 'social-link',
									href: attributes.instagramURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-instagram', } ),
							),
							attributes.linkedURL && el( 'a', {
									className: 'social-link',
									href: attributes.linkedURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-linkedin', } ),
							),
							attributes.emailAddress && el( 'a', {
									className: 'social-link',
									href: 'mailto:' + attributes.emailAddress,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-envelope', } ),
							),
						),
					),
				)
			];
		},

		save: function( props ) {

			var attributes = props.attributes;
			var alignment = props.attributes.alignment;
			var blockAlignment = props.attributes.blockAlignment;
			var facebookURL = props.attributes.facebookURL;
			var twitterURL = props.attributes.twitterURL;
			var instagramURL = props.attributes.instagramURL;
			var linkedURL = props.attributes.linkedURL;
			var emailAddress = props.attributes.emailAddress;
			var textColor = props.attributes.textColor;
			var bgColor = props.attributes.bgColor;

			return (
				el( 'div', {
					className: props.className,
					className: attributes.blockAlignment === 'wide' || attributes.blockAlignment === 'full' ? 'align'+attributes.blockAlignment : null,
					style: { backgroundColor: attributes.bgColor } },
					el( 'div', {
						className: 'organic-team-member-image',
						style: { backgroundImage: 'url('+attributes.mediaURL+')' }
					},
						el( 'img', {
							src: attributes.mediaURL
						} ),
					),
					el( 'div', { className: 'organic-team-member-content', style: { textAlign: attributes.alignment } },
						el( RichText.Content, {
							tagName: 'h3',
							value: attributes.title,
							style: { color: attributes.textColor }
						} ),
						el( RichText.Content, {
							tagName: 'h5',
							value: attributes.subtitle,
							style: { color: attributes.textColor }
						} ),
						el( RichText.Content, {
							tagName: 'p',
							value: attributes.bio,
							style: { color: attributes.textColor }
						} ),
						el( 'div', { className: 'organic-team-member-social' },
							attributes.facebookURL && el( 'a', {
									className: 'social-link',
									href: attributes.facebookURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-facebook', } ),
							),
							attributes.twitterURL && el( 'a', {
									className: 'social-link',
									href: attributes.twitterURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-twitter', } ),
							),
							attributes.instagramURL && el( 'a', {
									className: 'social-link',
									href: attributes.instagramURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-instagram', } ),
							),
							attributes.linkedURL && el( 'a', {
									className: 'social-link',
									href: attributes.linkedURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-linkedin', } ),
							),
							attributes.emailAddress && el( 'a', {
									className: 'social-link',
									href: 'mailto:' + attributes.emailAddress,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-envelope', } ),
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
