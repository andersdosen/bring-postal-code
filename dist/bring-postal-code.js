'use strict';

bringPostalCode();

function bringPostalCode(bringArgs) {

	if (typeof bringArgs === 'undefined') {
		var bringArgs = {};
	}

	if (!bringArgs.country) {
		bringArgs.country = 'no';
	}

	var bringZipCodes = document.querySelectorAll('.bring-zip');
	var bringResultInputs = document.querySelectorAll('.bring-result');
	var bringClientURL = window.location.protocol + '//' + window.location.host + '/';
	var bringCount = void 0;

	if (bringZipCodes.length && bringResultInputs.length) {
		var _loop = function _loop() {

			var bringZipType = bringZipCodes[bringCount].nodeName;
			var bringResultType = bringResultInputs[bringCount].nodeName;
			var bringZipInput = void 0;
			var bringResultInput = void 0;

			if (bringZipType === 'INPUT') {
				bringZipInput = bringZipCodes[bringCount];
			} else {
				bringZipInput = bringZipCodes[bringCount].querySelector('input');
			}

			if (bringResultType === 'INPUT') {
				bringResultInput = bringResultInputs[bringCount];
			} else {
				bringResultInput = bringResultInputs[bringCount].querySelector('input');
			}

			bringZipInput.addEventListener('keyup', function () {

				var bringZipValue = parseInt(this.value);

				fetch('https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=' + bringClientURL + '&pnr=' + bringZipValue + '&country=' + bringArgs.country).then(bringCheckStatus).then(bringGetJSON).then(function (data) {
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