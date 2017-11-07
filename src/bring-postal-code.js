'use strict';

const bringZipCodes = document.querySelectorAll('.bring-zip');
const bringResultInputs = document.querySelectorAll('.bring-result');
const bringClientURL = 'https://google.com/';
let bringCount;

if (bringZipCodes.length) {
	for (bringCount = 0; bringZipCodes.length > bringCount; bringCount++) {

		let bringZipInput = bringZipCodes[bringCount].querySelector('input');
		let bringResultItem = bringResultInputs[bringCount];
		let bringResultInput = bringResultItem.querySelector('input');

		bringZipInput.addEventListener('keyup', function() {

			let bringZipValue = parseInt(this.value);

			fetch('https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=' + bringClientURL + '&pnr=' + bringZipValue)
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
