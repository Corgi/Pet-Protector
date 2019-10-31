// ==UserScript==
// @name        Neopets - Pet Protector
// @namespace   http://reddit.com/u/Etryn, http://reddit.com/u/TalkingHawk, http://reddit.com/u/birdoge
// @description Protects your Neopets by hiding them at the Lab Ray, Rainbow Fountain, etc. Updated Oct 2019
// @include     http://www.neopets.com/quickref.phtml
// @include     http://www.neopets.com/lab2.phtml
// @include     http://www.neopets.com/pool/
// @include     http://www.neopets.com/iteminfo.phtml?obj_id=*
// @include     http://www.neopets.com/pound/abandon.phtml
// @include     http://www.neopets.com/petpetlab.phtml
// @grant       none
// @version     1.3.1
// ==/UserScript==

// Modify PETNAME with the names of the pets you want to protect (properly spelled and capitalized!)
var pets = ["PETNAME", "PETNAME", "PETNAME", "PETNAME"];

// List of Dangerous Items that can alter pet color/species
var dangerousItems = [
	"Morphing Potion",
	"Magical",
	"Transmogrification Potion",
	"Flask of Rainbow Fountain Water",
	"Mysterious Swirly Potion",
	"8-bit Power-Up Potion",
	"Turnip Tonic",
	"Potato Potion",
	"Kaleideonegg",
	"Witchy Negg",
	"Vortex Negg",
	"Plaid Negg",
	"Vengeful Scroll",
	"One-Use Robotification Zappermajig",
	"Glowing Jelly",
];

// Set hidePet to an empty function
var hidePet = function () {};

// Set hidePet based on web address
if (window.location.pathname.match("lab2")) {
	hidePet = function(index,petName) {
		$('input[value="'+petName+'"]').parent().hide();
	};
} else if (window.location.pathname.match("pool")) {
	hidePet = function(index,petName) {
		$('input[value="'+petName+'"]').parent().parent().hide();
	};
} else if (window.location.pathname.match("iteminfo")) {
	var isDangerous = false
	$.each(dangerousItems,function(index,itemName) {
		if($('td:contains("'+itemName+'")').length > 0) {
			isDangerous = true;
		}
	});
	if(isDangerous) {
		hidePet = function(index,petName) {
			$('option[value*="'+petName+'"]').remove();
		};
	}
} else if (window.location.pathname.match("abandon")) {
	hidePet = function(index,petName) {
		$('input[value="'+petName+'"]').parent().parent().hide();
	};
} else if (window.location.pathname.match("petpetlab")) {
	hidePet = function(index,petName) {
		$('table table td:contains("'+petName+'")').remove();
	};
} else if (window.location.pathname.match("quickref")) {
	$('a[href*="convert_pet"]').parent().hide();
}

// Hide the pets!
$.each(pets,hidePet);
