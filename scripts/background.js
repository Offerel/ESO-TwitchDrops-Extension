init();

chrome.notifications.onClicked.addListener(openDrops);

function init() {
	chrome.storage.local.get(null, function(options) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", 'https://eso-hub.com/', true);
		xhr.onload = function () {
			if( xhr.status < 200 || xhr.status > 226) {
				message = "Check webpage failed. State: "+xhr.status;
				console.log(message);
			} else {
				let response = xhr.responseText;
				let htmlDoc = new DOMParser().parseFromString(response, "text/html");
				var children = [].slice.call(htmlDoc.querySelector('.col-xl-4 .text-right').children);
				var elements = [];

				children.forEach(function(e){
					if(e.localName == 'a') {
						elements.push({href:e.href, title:e.innerText});

						if(e.href.includes('drops')) {
							if(!e.innerText.includes('inactive')) {
								notify('0', e.innerText);
							}
						}
					}
				});

				if(elements.length > 1) {
					chrome.storage.local.set({ 'drops': elements[0] });
					chrome.storage.local.set({ 'events': elements[1] });
				}
			}
		}
		xhr.send();
	});
}

function openDrops(id) {
	try {
		chrome.storage.local.get(['drops'], function (data) {
			chrome.tabs.create({url: data.drops.href});
		});
	} catch(error) {
		console.log(error);
	}
}