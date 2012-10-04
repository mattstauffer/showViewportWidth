/**
 * jQuery showScreenWidth
 * https://github.com/jiolasa/showScreenWidth
 * Author: Matt Stauffer ( http://mattstaufferdesign.com/ )
 *
 * Shows the pixel width in a small banner at the top or bottom of the page.
 */
(function($) {
	"use strict";
	
	var defaults, methods;

	defaults = {
		position: 'top'
	};

	methods = {
		// init
		init: function(options) {
			var settings, selector, opposite_selector, marker, marker_style;

			options   = (typeof options === "object") ? options : {};
			settings  = $.extend({}, defaults, options);

			switch( settings.position ) {
				case 'top':
					opposite_selector = 'bottom';
					break;
				case 'bottom':
					opposite_selector = 'top';
					break;
				default:
					$.error("Sorry, but "+settings.position+" is not a valid position for showScreenWidth.");
			}
			
			// @todo: Is it better to just create this in html?
			marker = document.createElement('div');
			marker_style = {
				'background' : '#111',
				'color' : '#ddd',
				'font-size' : '12px',
				'left' : 0,
				'padding' : '8px',
				'position' : 'fixed',
				'right' : 0,
				'text-align' : 'center',
				'z-index' : '999'
			};
			marker_style[ settings.position ] = 0;
			marker_style[ 'border-'+opposite_selector ] = '1px solid #fff';
			
			$( marker )
				.attr( 'id', 'showScreenWidth' )
				.html( 'Width: ' + $( window ).width() +'px' )
				.css( marker_style )
				.appendTo( $("body") );

			$('body').css( 'margin-'+settings.position, '31px' );
			
			// Add watcher
			$(window).resize(function() {
				$( marker ).html( 'Width: ' + $( window ).width() +'px' );
			});
		}
	};

	// start the plugin
	$.fn.showPixelWidth = function(method) {
		return methods.init.apply(this, arguments);
	};
})(jQuery);