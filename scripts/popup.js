function updatePopup() {
	var drops = document.getElementById("resv0");
	var events = document.getElementById("resv1");

	chrome.storage.local.get(['drops', 'events'], function (data) {
		let dropl = document.createElement('a');
		dropl.innerText = data.drops.title;
		dropl.href = data.drops.href;
		dropl.target = '_blank';
		dropl.title = data.drops.title;
		drops.appendChild(dropl);

		let eventl = document.createElement('a');
		eventl.innerText = data.events.title;
		eventl.href = data.events.href;
		eventl.target = '_blank';
		eventl.title = data.events.title;
		events.appendChild(eventl);

		if(data.drops.title.includes('inactive') !== false) {
			dropl.style.color = '#757575';
			dropl.style.background = '#dbdbdb';
			dropl.style.borderColor = '#757575';
		} else {
			dropl.style.color = '#267b14';
			dropl.style.background = '#b5dda7';
			dropl.style.borderColor = '#267b14';
			
		}
		
		if(data.events.title.includes('no ongoing') !== false) {
			eventl.style.color = '#757575';
			eventl.style.background = '#dbdbdb';
			eventl.style.borderColor = '#757575';
		} else {
			eventl.style.color = '#267b14';
			eventl.style.background = '#b5dda7';
			eventl.style.borderColor = '#267b14';
			
		}
	});
}

document.addEventListener('DOMContentLoaded', updatePopup);