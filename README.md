<html>
<head>
  <title>Menu Calculator</title>
    <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 250vh;
      text-align: center;
    }
	.total-box {
		display: flex;
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
		margin-top: 20px;
	}}
	
	 .calculate-button {
      width: 150px; /* Adjust the desired width */
      height: 50px; /* Adjust the desired height */
    }
	
	.submit-button {
      width: 150px; /* Adjust the desired width */
      height: 40px; /* Adjust the desired height */
    }
	
	.reset-button {
      width: 150px; /* Adjust the desired width */
      height: 30px; /* Adjust the desired height */
    }
    
    h1 {
      margin-bottom: 20px;
    }
    
    h2 {
      margin-top: 20px;
    }
	
	h3 {
      border: 1px solid black; /* Adjust the border style as needed */
      padding: 5px; /* Add padding to create space around the heading */
    }
    
    .menu-items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 10px;
    }
    
    .menu-items div {
      display: flex;
      align-items: center;
    }
    
    .total-box {
      display: flex;
      justify-content: flex-end;
      align-self: Center;
      margin-top: 20px;
    }
    
    .button-container {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
	
	.menu-items div img {
      width: 50px; /* Adjust the desired width */
      height: 50px; /* Adjust the desired height */
      margin-left: 10px; /* Add margin as per your preference */
    }
    {
    button {
      margin-top: 20px;
	}}}}}}
  </style>
  <script>
    function calculateTotal() {
    var total = 0;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(function(checkbox) {
      var quantityInput = checkbox.parentNode.querySelector('input[type="number"]');
      var quantity = parseInt(quantityInput.value);
      var price = parseFloat(checkbox.value);

      if (checkbox.value === '-25%') {
        var itemPrice = total * 0.25;
        total -= itemPrice;
      } else if (checkbox.value === '-30%') {
        var itemPrice = total * 0.3;
        total -= itemPrice;
      } else if (checkbox.value === '-50%') {
        var itemPrice = total * 0.5;
        total -= itemPrice;
      } else {
        total += price * quantity;
      }
    });

    var totalElement = document.getElementById('total');
    totalElement.textContent = total.toFixed(2);

    var discountTotalElement = document.getElementById('discount-total');
    var discount = total * 0.15;
    discountTotalElement.textContent = discount.toFixed(2);
  }
  
    function submitOrder() {
    var name = document.getElementById('name').value;
    if (name.trim() === '') {
      alert('Please enter a name.');
      return;
    }

    // Collect selected items and their quantities
    var selectedItems = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
      var itemName = checkbox.nextElementSibling.textContent;
      var quantityInput = checkbox.parentNode.querySelector('input[type="number"]');
      var quantity = parseInt(quantityInput.value);
      var price = parseFloat(checkbox.value);
      selectedItems.push({ name: itemName, quantity: quantity, price: price });
    });

    var total = 0;
    var discountTotal = 0;

    selectedItems.forEach(function (item) {
      if (item.price < 0) {
        var discountPercentage = Math.abs(item.price);
        var itemDiscount = total * (discountPercentage / 100);
        discountTotal += itemDiscount;
      } else {
        total += item.price * item.quantity;
      }
    });

    var commission = (total * 0.15).toFixed(2);
    var totalWithDiscount = total - discountTotal;

    alert('Order submitted!');

    var discordWebhookURL = 'https://discordapp.com/api/webhooks/1173524631177670717/7OulHbdgxQLuS2Qd-SClogA5LwpOmZ_fY9XJ9lxZlNYi4DOZacY5IucqtsMXUCrtoRTm';


    var xhr = new XMLHttpRequest();
    xhr.open('POST', discordWebhookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    var message = {
      content: 'New order!',
      embeds: [{
        title: 'Order Details',
        fields: [
          {
            name: 'Name',
            value: name,
            inline: true
          },
          {
            name: 'Total',
            value: '$' + totalWithDiscount.toFixed(2),
            inline: true
          },
          {
            name: 'Discount Total',
            value: '$' + discountTotal.toFixed(2),
            inline: true
          },
          {
            name: 'Commission (15%)',
            value: '$' + commission,
            inline: true
          },
          {
            name: 'Ordered Items',
            value: selectedItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n'),
            inline: false
          }
        ]
      }]
    };

    xhr.send(JSON.stringify(message));
  }

    
function resetCalculator() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var quantityInputs = document.querySelectorAll('input[type="number"]');
  
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
  
  quantityInputs.forEach(function(quantityInput) {
    quantityInput.value = 1;
  });
  
  document.getElementById('total').textContent = '0.00';
}
	function submitAndReset() {
	submitOrder();
	resetCalculator();
}

  </script>
</head>
<body>
	
<div style="margin-bottom: 25px;"></div>
 
<body style="background-color:grey;">
	<img src="RexDinerLogo.png" alt="Company Logo!">
  <h1>Rex's Diner Calculator</h1>
  
  <h2>Menu Items</h2>

  <div style="margin-bottom: 10px;"></div>
  
  <h3>Drinks</h3>
  <!-- Individual items -->
  <div>
  <input type="checkbox" id="uwueats" value="200$">
  <label for="Velmachoice">Motor Oil Coffee - 200$</label>
  <input type="number" value="1" min="1">
  <img src="motor-oil-coffee.png" alt="Motor Oil Coffee">
</div>
  <div>
  <input type="checkbox" id="Davechoice" value="150$">
  <label for="Davechoice">Engine Coolant Ice Tea - 150$</label>
  <input type="number" value="1" min="1">
  <img src="engine-coolant-ice-tea.png" alt="Engine Coolant Ice Tea">
</div>
  <div>
  <input type="checkbox" id="Davechoice" value="100$">
  <label for="Davechoice">eCola - 100$</label>
  <input type="number" value="1" min="1">
</div>
   <div>
  <input type="checkbox" id="Davechoice" value="100$">
  <label for="Davechoice">Sprunk - 100$</label>
  <input type="number" value="1" min="1">
</div>
  <div>
  <input type="checkbox" id="Davechoice" value="200$">
  <label for="Davechoice">Radiator Flush Lemonade - 200$</label>
  <input type="number" value="1" min="1">
</div>


<h3>Main Dish</h3>

<div style="margin-bottom: 10px;"></div>
<div>
<input type="checkbox" id="uwueats" value="100$">
<label for="Velmachoice">Garage Fries - 100$</label>
<input type="number" value="1" min="1">
<img src="garage-fries.png" alt="Garage Fries">
</div>
<div>
<input type="checkbox" id="uwueats" value="100$">
<label for="Velmachoice">Piston Poppers - 100$</label>
<input type="number" value="1" min="1">
<img src="piston-poppers.png" alt="Piston Poppers">
</div>
<div>
<input type="checkbox" id="uwueats" value="100$">
<label for="Velmachoice">Gasket Quesadillas - 100$</label>
<input type="number" value="1" min="1">
<img src="gasket-quesadillas.png" alt="Gasket Quesadillas">
</div>
 <div>
<input type="checkbox" id="uwueats" value="100$">
<label for="Velmachoice">Spare Tire Tots - 100$</label>
<input type="number" value="1" min="1">
<img src="spare_tire_tots.png" alt="Spare Tire Tots">
</div>
<div>
<input type="checkbox" id="uwueats" value="100$">
<label for="Velmachoice">Dipstick Dippers - 100$</label>
<input type="number" value="1" min="1">
<img src="dipstick_dippers.png" alt="Dipstick Dippers">
</div>
<div>
<input type="checkbox" id="uwueats" value="100$">
<label for="Velmachoice">Oil Change Onion Ringa - 100$</label>
<input type="number" value="1" min="1">
<img src="oil_change_onion_rings.png" alt="Oil Change Onion Rings">
</div>
<div>
<input type="checkbox" id="uwueats" value="225$">
<label for="Velmachoice">Clutch Burger - 225$</label>
<input type="number" value="1" min="1">
<img src="clutch_burger.png" alt="Clutch Burger">
</div>
<div>
<input type="checkbox" id="uwueats" value="225$">
<label for="Velmachoice">Carburetor Grilled Chicken Sandwich - 225$</label>
<input type="number" value="1" min="1">
<img src="carburetor-grilled-chicken-sandwich.png" alt="Carburetor Grilled Chicken Sandwich">	
</div>
<div>
<input type="checkbox" id="uwueats" value="225$">
<label for="Velmachoice">Carburetor Fried Chicken Sandwich - 225$</label>
<input type="number" value="1" min="1">
<img src="carburetor-fried-chicken-sandwich.png" alt="Carburetor Fried Chicken Sandwich">	
</div>
<div>
<input type="checkbox" id="uwueats" value="225$">
<label for="Velmachoice">Fuel Line Frank - 225$</label>
<input type="number" value="1" min="1">
<img src="fuel-line-frank.png" alt="Fuel Line Frank">
</div>
<div>
<input type="checkbox" id="uwueats" value="225$">
<label for="Velmachoice">V8 Steak Charger - 225$</label>
<input type="number" value="1" min="1">
<img src="v8-steak-charger.png" alt="V8 Steak Charger">
</div>

  <h3>Refuel</h3>

  <div>
    <input type="checkbox" id="uwueats" value="175$">
    <label for="Velmachoice">Chocolate Milkshake Manifold- 175$</label>
    <input type="number" value="1" min="1">
    <img src="chocolate-milkeshake.png" alt="Chocolate Milkshake">
  </div>
   <div>
    <input type="checkbox" id="uwueats" value="175$">
    <label for="Velmachoice">Chocolate Milkshake Manifold- 175$</label>
    <input type="number" value="1" min="1">
    <img src="strawberry-milkshake.png" alt="Strawberry Milkshake">
  </div>
   <div>
    <input type="checkbox" id="uwueats" value="175$">
    <label for="Velmachoice">Chocolate Milkshake Manifold- 175$</label>
    <input type="number" value="1" min="1">
    <img src="vanilla-milkshake.png" alt="Vanilla Milkshake">
  </div>
   <div>
    <input type="checkbox" id="uwueats" value="175$">
    <label for="Velmachoice">Wrench Waffles- 175$</label>
    <input type="number" value="1" min="1">
    <img src="wrench-waffles.png" alt="Wrench Waffles">
  </div>
   <div>
    <input type="checkbox" id="uwueats" value="175$">
    <label for="Velmachoice">Battery Boost Brownie Sundae- 175$</label>
    <input type="number" value="1" min="1">
    <img src="battery-boost-brownie-sundae.png" alt="Battery Boost Brownie Sundae">
  </div>


  <h3> Employee Discount</h3> 

<div>
  <input type="checkbox" id="25off" value="-25%">
  <label for="50off">Employee Discount - 25% off</label>
  <input type="number" value="1" min="1" max="1">
</div>

<div>
    <label for="name">Rex's Employee Name:</label>
    <input type="text" id="name">
  </div>
  

<div style="margin-bottom: 25px;"></div>
 
<div class="total-box">
  <span>Total: $</span>
  <span id="total">0.00</span>
</div>

<div class="total-box">
  <span>Commision (15%): $</span>
  <span id="discount-total">0.00</span>
</div>
 
  <div style="margin-bottom: 45px;"></div>
  

  <button class="calculate-button" onclick="calculateTotal()">Calculate Total</button>
  <button class="submit-button" onclick="submitAndReset()">Submit Order</button>
  <button class="reset-button" onclick="resetCalculator()">Reset</button>

 
  
  
  <div style="margin-bottom: 10px;"></div>
