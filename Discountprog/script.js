// Get the elements from the HTML that we'll need to interact with
var promoCodeInput = document.getElementById('promoCode');
var finalPriceElement = document.getElementById('finalPrice');
var promoForm = document.getElementById('promoForm'); 
var basePrice = '50';  // base ticket price

finalPriceElement.textContent = `Ticket Price: $${basePrice}`;  // initially display the base ticket price

// Calculate the discount based on the user's promo code
function applyDiscount(basePrice, userCode) {
  var discountRate = 0;  // default discount rate is 0%
  if (userCode === "HALF") {  // if the user enters "HALF", set discount rate to 50%
    discountRate = 0.5;
  }
  var finalPrice = basePrice - basePrice * discountRate;  // calculate the final price after applying the discount
  return finalPrice;
}

// When the user submits the form (after entering their promo code)
promoForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior    
    
  var userCode = promoCodeInput.value;  // get the user's entered promo code
  var finalPrice = applyDiscount(basePrice, userCode);  // calculate the final price using the entered promo code
  
  if (finalPrice < basePrice) {  // if the final price is less than the base price (meaning a discount was applied)
    finalPriceElement.textContent = `Final Ticket Price: $${finalPrice}`;  // update the display to show the discounted price
    promoCodeInput.placeholder = '';  // clear the input placeholder
  } else {  // if no discount was applied
    promoCodeInput.placeholder = 'Invalid Promo Code!';  // show an error message in the input placeholder
  }
  promoCodeInput.value = '';  // clear the input field for the next use
});