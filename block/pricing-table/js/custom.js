( function( $ ) {

	'use strict';

	function modifyBlock() {

    $(':not(.wp-block-organic-pricing-table-block) + .wp-block-organic-pricing-table-block, * > .wp-block-organic-pricing-table-block:first-of-type').each(function() {
      $(this).nextUntil(':not(.wp-block-organic-pricing-table-block)').addBack().wrapAll('<div class="organic-pricing-table-wrapper" />');
    });

	}

	$( document )
	.ready( modifyBlock )
	.on( 'post-load', modifyBlock );

})( jQuery );
