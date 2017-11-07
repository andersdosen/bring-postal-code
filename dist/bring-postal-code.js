'use strict';

// Postal Code Lookup – https://developer.bring.com/api/postal-code/#lookup-postal-code

var bringZipCodes = document.querySelectorAll('.bring-zip');
var bringResultInputs = document.querySelectorAll('.bring-result');
var bringClientURL = 'https://google.com/';
var bringCount = void 0;

if (bringZipCodes.length) {
	var _loop = function _loop() {

		var bringZipInput = bringZipCodes[bringCount].querySelector('input');
		var bringResultItem = bringResultInputs[bringCount];
		var bringResultInput = bringResultItem.querySelector('input');

		bringZipInput.addEventListener('keyup', function () {

			var bringZipValue = parseInt(this.value);

			fetch('https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=' + bringClientURL + '&pnr=' + bringZipValue).then(bringCheckStatus).then(bringGetJSON).then(function (data) {
				if (data.valid === true) {
					bringResultInput.value = data.result;
				} else {
					bringResultInput.value = '';
				}
			}).catch(function (err) {
				console.log('ERROR', err);
			});
		});
	};

	for (bringCount = 0; bringZipCodes.length > bringCount; bringCount++) {
		_loop();
	}
}

function bringCheckStatus(response) {
	if (response.status === 200) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function bringGetJSON(response) {
	return response.json();
}