

window.onload = function () {
document.getElementById("sub").addEventListener("click", displayDate);

function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}
}
// Get references to the DOM elements we'll be working with
var wishlistItems = document.getElementById('wishlist-items');
var itemNameInput = document.getElementById('item-name');
var addItemButton = document.getElementById('add-item-button');

// An array to store the wishlist items
var wishlist = [];

// Function to add an item to the wishlist
function addItem(itemName) {
	// Add the item to the wishlist array
	wishlist.push(itemName);

	// Clear the input field
	itemNameInput.value = '';

	// Redraw the wishlist items
	redrawItems();
}

// Function to remove an item from the wishlist
function removeItem(index) {
	// Remove the item from the wishlist array
	wishlist.splice(index, 1);

	// Redraw the wishlist items
	redrawItems();
}

// Function to redraw the wishlist items
function redrawItems() {
	// Clear the existing items
	wishlistItems.innerHTML = '';

	// Add each item to the list
	wishlist.forEach(function(item, index) {
		var li = document.createElement('li');
		li.innerHTML = item + ' <button onclick="removeItem(' + index + ')">Remove</button>';
		wishlistItems.appendChild(li);
	});
}

// Add a click event listener to the "Add" button
addItemButton.addEventListener('click', function() {
	addItem(itemNameInput.value);
});

// Call redrawItems to initialize the list
redrawItems();





