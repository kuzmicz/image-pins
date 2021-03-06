/*
 * imagePins - Plugin that allows you to add and show pins on the images. You can customize pin image, add inputs, make pins removal and make pins responsive.
 *
 * Version:  1.0
 * Home:   https://github.com/kuzmicz/image-pins
 * Author:   Mateusz Kuźmicz (kuzmicz.it)
 * License:  MIT
 *
 * Copyright (c) 2016 kuzmicz.it
 */
(function($){

	$.fn.imagePins = function(method) {

		var settings = {
			'pinImage': 'img/pin.png',
			'wrapper': '.imagePin',
			'event': 'click',
			'responsive': true,
			'inputs': true,
			'pinClass': 'pin',
			'zindex': 0,
			'removal': false,
			'removeClass' : 'remove_pin',
			'pinsData' : ''
		};

	var methods = {
		
		init: function(options) {

			var options =  $.extend(settings, options), 
				thisImage = this,
				offset = thisImage.offset(),
				imageWidth = thisImage.width(),
				imageHeight = thisImage.height(),
				pin,
				x_pixels = 0,
				y_pixels = 0,
				x_percent = 0,
				y_percent = 0,
				pinPosition = '',
				zindex = options.zindex,
				position = 0,
				field = '',
				buttonRemoval = '';

			$(options.wrapper).css({'width': imageWidth, 'height' : imageHeight, 'position': 'relative'});

			thisImage.on(options.event, function(event) {

				pin = $('<div class="pin_wrapper"><img src='+ options.pinImage +' class='+ options.pinClass +'></div>');
				++zindex;
				pin.css({'z-index': zindex});
				
				x_pixels = (event.pageX - offset.left);
				y_pixels = (event.pageY - offset.top);
					
				if(options.responsive) {

					x_percent = [((event.pageX) - offset.left) / (thisImage.width())] * 100,
					y_percent = [((event.pageY - 32) - offset.top) / (thisImage.height())] * 100;

					pinPosition = {
						'position': 'absolute',
						'top' : y_percent + '%', 
						'left': x_percent + '%',
					};

					xInputPosition = [(event.pageX - offset.left) / (thisImage.width())] * 100;
					
					inputCoords = {
						'position': 'absolute',
						'top' : y_percent + '%', 
						'left': xInputPosition + '%', 
					};

					removalCoords = {
						'top' : y_pixels + 'px', 
						'left': xInputPosition + 'px', 
						'position': 'absolute'
					};

				} else {

					pinPosition = {
						'position': 'absolute',
						'top' : y_pixels - 32 + 'px', 
						'left': x_pixels + 'px', 
					};

					inputCoords = {
						'top' : y_pixels - 32 + 'px', 
						'left': x_pixels + options.inputOffset + 'px', 
						'position': 'absolute'
					};
					
					removalCoords = {
						'top' : y_pixels + 'px', 
						'left': x_pixels + options.inputOffset + 'px', 
						'position': 'absolute'
					};
				}

				pin.css(pinPosition);

				if(options.inputs) {
					field = $('<input type="text" name="pin_value[]" class="pin_input" data-x="'+ x_pixels +'" data-y="'+ y_pixels +'">');
					field.appendTo(pin);
				}

				pin.appendTo(thisImage.parent());

				if(options.removal) {
					buttonRemoval = $('<button class="'+ options.removeClass +'">delete</button>');
		    		buttonRemoval.appendTo(pin);
					$('.'+options.removeClass).on(options.event, function() {
						$(this).parent().remove();
					});
		    	}
			});

		},
		
		showPins: function(options) {
		
			var options =  $.extend(settings, options),
				thisImage = this,
				pin = '',
				pinPosition = '',
				imageWidth = thisImage.width(),
				imageHeight = thisImage.height(),
				x_pixels = 0,
				y_pixels = 0,
				x_percent = 0,
				y_percent = 0;

			$(options.wrapper).css({'width': imageWidth, 'height' : imageHeight, 'position': 'relative'});

			options.pinsData.forEach(function(pinData) {
				pin = $('<div class="pin_wrapper_show"><img src='+ options.pinImage +' class='+ options.pinClass +'></div>');
				pin.appendTo(thisImage.parent());

				if(options.responsive) {
					x_percent = [(pinData.x / thisImage.width())] * 100;
					y_percent = [(pinData.y - 32) / thisImage.height()] * 100;

					pinPosition = {
						'position': 'absolute',
						'top' : y_percent + '%', 
						'left': x_percent + '%',
					};
				} else {
					pinPosition = {
						'position': 'absolute',
						'top' : pinData.y - 32 + 'px', 
						'left': pinData.x + 'px', 
					};
				}

				pin.css(pinPosition);

				if(options.inputs && pinData['text']) {
					var text = $('<div class="pinText">' + pinData['text'] + '</div>');
					text.appendTo(pin);
				}
		    });
		},
	};

	if (methods[method]) {
		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if (typeof method === 'object' || !method) {
		return methods.init.apply(this, arguments);
	}

}

})($);
