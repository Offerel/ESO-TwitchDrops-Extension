function updatePopup() {
	var drops = document.getElementById("resv0");
	var events = document.getElementById("resv1");

	chrome.storage.local.get(['drops', 'events'], function (data) {
		let dropl = document.createElement('a');
		dropl.innerText = data.drops.title;
		dropl.href = data.drops.href;
		dropl.target = '_blank';
		drops.appendChild(dropl);

		let eventl = document.createElement('a');
		eventl.innerText = data.events.title;
		eventl.href = data.events.href;
		eventl.target = '_blank';
		events.appendChild(eventl);

		if(data.drops.title.includes('inactive') !== false) {
			dropl.style.color = 'red';
		} else {
			dropl.style.color = 'green';
			
		}
	});
}

document.addEventListener('DOMContentLoaded', updatePopup);