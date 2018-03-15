/*
 * Take Back the Archive - Item Show Page
 *
 * Author: Katherine Donnally
 *
 * External Libraries: Hammer.js
 *
 */

// set up AJAX functionality
/* (function() {
 	var //btn,
 		item,
 		httpRequest;

 	itemContainer = document.querySelector('.carousel-item-container');
 	

 	httpRequest = new XMLHttpRequest();
 	console.log('test');

 	var url = 'http://takeback.scholarslab.org/api/items/' + itemContainer.getAttribute('data-item');
 	console.log(url);
 		
 	httpRequest.onreadystatechange = populateItem;
 	httpRequest.open('GET', url, true);
 	httpRequest.send();

 	function populateItem() {
 		if (httpRequest.readyState === XMLHttpRequest.DONE) {
 			if (httpRequest.status === 200) {
 				var imgParent = document.querySelector(".files__pic");
 				var response = JSON.parse(httpRequest.responseText);
 				console.log(response);

 				// fetch title
 				for (var i=0; i < response.element_texts.length; i++) {
 					if (response.element_texts[i].element.name === "Title") {
 						var title = response.element_texts[i].text;
 					}
 				}

 				// fetch image
 				var files = response.files.url;

 				var requestTwo = new XMLHttpRequest();
 				requestTwo.onreadystatechange = myFunction;

 				function myFunction() {
 					if (requestTwo.readyState === XMLHttpRequest.DONE) {
 						if (requestTwo.status === 200) {
 							var responseTwo = JSON.parse(requestTwo.responseText);
 							var use = responseTwo[0];
 							var img = use.file_urls.fullsize;
 							console.log(img);
 					//		imgParent.style.height = "200px";
 					//		imgParent.innerHTML = `<img src="${img}" height="200px"><br/><div>${title}</div>`;
 						} else {
// 							alert('There was an error in processing your request.');
 						}
 					}
 				};
 				requestTwo.open('GET', files, true);
 				requestTwo.send();
			

 			} else {
 //				alert('There was an error in processing your request.');
 			}
 		}
 	}
 })(); */
// fill carousel w/ PHP-generated array
(function() {
 	var itemContainer,
 		itemArray,
 		i,
 		item;

 	itemContainer = document.querySelector('.carousel-item-container');
 	console.log(itemContainer.children.length);
 	console.log(imageDataArray.length);
 	// ^fix so not just getting ones w/ images!

	itemArray = itemContainer.children; 	

 	for (i=0; i < imageDataArray.length; i++) {
 		itemArray[i].innerHTML = imageDataArray[i][0];
 		itemArray[i].setAttribute("id", imageDataArray[i][1]);

 		if (itemId == imageDataArray[i][1]) {
 			item = {
 					width: 				itemArray[i].offsetWidth + 
 						   				(2 * parseInt(window.getComputedStyle(itemArray[i], null).marginLeft)),
 					get translate() {
 										return (itemId - 2) * this.width;
 					},
 					};
 			// translation on initial load - put in other function! awesome
 			console.log(item.translate);
 		}
 }
})();


 (function() {
 	var slide,
 		slideList,
 		slideTrack,
 		itemId,
 		gallery,
 		btnLeft,
 		btnRight;

 	slideList 		= document.getElementsByClassName('carousel-item');
 	slideTrack 		= document.querySelector('.carousel-item-container');
 	btnLeft 		= document.querySelector('.left');
 	btnRight 		= document.querySelector('.right');
//	itemId			= slideTrack.getAttribute('data-item'); // = fetched in PHP doc
 	gallery 		= {
 					  elem: 	 		document.querySelector('.carousel-wrapper--visible'),
 					  get width() {
 										return this.elem.offsetWidth;
 					  },
 					  get padding() {
 					  					return parseInt(window.getComputedStyle(this.elem, null).paddingLeft);
 					  },
 					  get visibleWidth() {
 					  					return this.width - (2 * this.padding);
 					  }
 					  };
 	slide 			= {
 					  height: 	 		slideList[0].offsetHeight,
 					  divWidth:  		slideList[0].offsetWidth,
 					  margin: 	 		parseInt(window.getComputedStyle(slideList[0], null).marginLeft),
 					  percentOfTotal: 	100 / slideList.length,
 					  get width() {
 						  				return this.divWidth + (2 * this.margin);
 					  }
 					  };
 	
 	// set track width, margin, translation
 	slideTrack.style.width = slide.width * slideList.length + 'px';
 	slideTrack.setAttribute('data-translateX', "0");

 	// set track translation depending on current item
 	var currentLinkSelector = `a[href*="${itemId}"]`;
 	var currentLink = document.querySelector(currentLinkSelector);
 	var initialTranslate = -100 * (currentLink.getBoundingClientRect().left - slideTrack.getBoundingClientRect().left - 16) / slideTrack.offsetWidth;
 	slideTrack.style.transform = `translateX(${initialTranslate}%)`;
 	slideTrack.setAttribute('data-translateX', initialTranslate);

 	// recognize pan and swipe events on slide track
 	var sliderManager = new Hammer.Manager(slideTrack, {
 	recognizers: [
 		[Hammer.Pan,{ threshold:0 }],
 		[Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
 	]
 	});

 	var lastDelta,
 		percentage,
 		moveBy,
 		numSlidesVisible,
 		alignTest;

 	// set max translation
 	var maxTranslateX = -100 + (((gallery.elem.offsetWidth - (2 * gallery.padding)) / slideTrack.offsetWidth) * 100);
 	console.log(maxTranslateX);

 	// pan slides on touch
 	sliderManager.on('panright panleft panend pancancel', function(e) {
 		console.log(e.type);
 		lastDelta = slideTrack.getAttribute("data-translateX");
 		if (e.type === 'panleft') {
 			btnLeft.classList.remove('hide-btn');
 			btnLeft.removeAttribute('disabled');
 		}
 		if (e.type === 'panright') {
 			btnRight.classList.remove('hide-btn');
 			btnRight.removeAttribute('disabled');
 		}
 		percentage = 100 * e.deltaX / (slide.width * slideList.length);
 		moveBy = percentage + parseFloat(lastDelta);
 		slideTrack.style.transform = `translateX(${moveBy}%)`;

 		sliderManager.on('panend', function(e) {
 			slideTrack.setAttribute('data-translateX', moveBy);
 			if (parseFloat(moveBy) >= 0) {
 				btnLeft.classList.add('hide-btn');
 				btnLeft.setAttribute('disabled', 'true');
 				slideTrack.style.transform = `translateX(0)`;
 				slideTrack.setAttribute('data-translateX', 0);
 			} else if (parseFloat(moveBy) <= maxTranslateX) {
 				btnRight.classList.add('hide-btn');
 				btnRight.setAttribute('disabled', 'true');
 				slideTrack.style.transform = `translateX(${maxTranslateX}%)`;
 				slideTrack.setAttribute('data-translateX', maxTranslateX);
 			}
 		});
 	});

 	// hide nav if active slide on load is 1st/last in collection
 	if (slideTrack.getAttribute("data-translateX") >= 0) {
 		btnLeft.classList.add('hide-btn');
 		btnLeft.setAttribute('disabled', 'true');
 	}
 	if (slideTrack.getAttribute("data-translateX") <= maxTranslateX) {
 		btnRight.classList.add('hide-btn');
 		btnRight.setAttribute('disabled', 'true');
 	}

 	// enable button nav
 	btnRight.addEventListener('click', carouselBtn, false);
 	btnLeft.addEventListener('click', carouselBtn, false);

 	function carouselBtn(e) {
 		var maxTranslateX = -100 + (((gallery.elem.offsetWidth - (2 * gallery.padding)) / slideTrack.offsetWidth) * 100);
 		lastDelta = slideTrack.getAttribute("data-translateX");
 		numSlidesVisible = Math.floor(gallery.visibleWidth / slide.width);
 		percentage = 100 * numSlidesVisible / slideList.length;
 		if (e.target.classList.contains("right")) {
 			percentage = percentage * -1;
 		}
 		moveBy = percentage + parseFloat(lastDelta);
 		alignTest = lastDelta / slide.percentOfTotal;

 		console.log(maxTranslateX - lastDelta);
 		console.log(maxTranslateX - moveBy);
 		console.log(moveBy.toFixed(1));
 		// how to move content
 		if (Math.abs((maxTranslateX - lastDelta)) < slide.percentOfTotal && (maxTranslateX - lastDelta) < 0) {
 			slideTrack.style.transform = `translateX(${maxTranslateX}%)`;
 			slideTrack.setAttribute('data-translateX', maxTranslateX);
 		} else if (moveBy.toFixed(1) == 0) {
 			slideTrack.style.transform = `translateX(0)`;
 			slideTrack.setAttribute('data-translateX', 0);
 		} else if ((alignTest.toFixed(1) % 1) === 0) {
 			slideTrack.style.transform = `translateX(${moveBy}%)`;
 			slideTrack.setAttribute('data-translateX', moveBy);	
 		} else {
 			moveBy = moveBy - ((alignTest % 1) * slide.percentOfTotal);
 			slideTrack.style.transform = `translateX(${moveBy}%)`;
 			slideTrack.setAttribute('data-translateX', moveBy);
 		}
 		// show/hide buttons
 		if (slideTrack.getAttribute("data-translateX") < 0) {
 			btnLeft.classList.remove('hide-btn');
 			btnLeft.removeAttribute('disabled');
 		} else if (slideTrack.getAttribute("data-translateX") >= 0) {
 			btnLeft.classList.add('hide-btn');
 			btnLeft.setAttribute('disabled', 'true');
 		}

 		if (slideTrack.getAttribute("data-translateX") <= maxTranslateX) {
 			btnRight.classList.add('hide-btn');
 			btnRight.setAttribute('disabled', 'true');
 		} else if (slideTrack.getAttribute("data-translateX") > maxTranslateX) {
 			btnRight.classList.remove('hide-btn');
 			btnRight.removeAttribute('disabled');
 		}
 	}
 })();
