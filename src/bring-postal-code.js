'use strict';

function bringPostalCode(bringArgs) {

	if (typeof bringArgs === 'undefined') {
		var bringArgs = {};
	}

	if (!bringArgs.country) {
		bringArgs.country = 'no';
	}

	const bringZipCodes = document.querySelectorAll('.bring-zip');
	const bringResultInputs = document.querySelectorAll('.bring-result');
	const bringClientURL = window.location.protocol + '//' + window.location.host + '/';
	let bringCount;

	if (bringZipCodes.length && bringResultInputs.length) {
		for (bringCount = 0; bringZipCodes.length > bringCount; bringCount++) {

			let bringZipType = bringZipCodes[bringCount].nodeName;
			let bringResultType = bringResultInputs[bringCount].nodeName;
			let bringZipInput;
			let bringResultInput;

			if (bringZipType === 'INPUT') {
				bringZipInput = bringZipCodes[bringCount];
			}
			else {
				bringZipInput = bringZipCodes[bringCount].querySelector('input');
			}

			if (bringResultType === 'INPUT') {
				bringResultInput = bringResultInputs[bringCount];
			}
			else {
				bringResultInput = bringResultInputs[bringCount].querySelector('input');
			}

			bringZipInput.addEventListener('keyup', function() {

				let bringZipValue = parseInt(this.value);

				fetch('https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=' + bringClientURL + '&pnr=' + bringZipValue + '&country=' + bringArgs.country)
					.then(bringCheckStatus)
					.then(bringGetJSON)
					.then(function(data) {
						if (data.valid === true) {
							bringResultInput.value = data.result;
						}
						else {
							bringResultInput.value = '';
						}
					})
					.catch(function(err) {
						console.log('ERROR', err);
					});

			});

		}
	}

}

function bringCheckStatus(response) {
	if (response.status === 200) {
		return Promise.resolve(response);
	}
	else {
		return Promise.reject(
			new Error(response.statusText)
		);
	}
}

function bringGetJSON(response) {
	return response.json();
}
