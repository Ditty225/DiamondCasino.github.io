<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rex's Diner Calculator</title>
  <style>
    /* CSS cleanup and optimization */
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh; /* Change height to viewport height */
      text-align: center;
      background-color: grey; /* Change background color */
    }

    .total-box {
      margin-top: 20px;
    }

    .button {
      width: 150px;
      margin-top: 20px;
    }

    .menu-items div img {
      width: 50px;
      height: 50px;
      margin-left: 10px;
    }

    h3 {
      border: 1px solid black;
      padding: 5px;
      margin-top: 20px; /* Move margin here for consistency */
    }

    /* Add more CSS rules as needed */

  </style>
</head>
<body>
  <img src="RexDinerLogo.png" alt="Company Logo">
  <h1>Rex's Diner Calculator</h1>

  <h2>Menu Items</h2>

  <!-- Use semantic HTML for better structure -->
  <section class="menu-section">
    <h3>Drinks</h3>
    <div class="menu-items">
      <!-- Use unique IDs or classes for checkboxes -->
      <div>
        <input type="checkbox" id="motor-oil-coffee" value="200">
        <label for="motor-oil-coffee">Motor Oil Coffee - $200</label>
        <input type="number" value="1" min="1">
        <img src="motor-oil-coffee.jpg" alt="Motor Oil Coffee">
      </div>
      <!-- Add more drink items -->
    </div>
  </section>

  <!-- Repeat the structure for other menu sections -->

  <div class="total-box">
    <span>Total: $</span>
    <span id="total">0.00</span>
  </div>

  <div class="total-box">
    <span>Commission (15%): $</span>
    <span id="discount-total">0.00</span>
  </div>

  <!-- Use a single button class for consistency -->
  <div class="button-container">
    <button class="button" id="calculate-button">Calculate Total</button>
    <button class="button" id="submit-button">Submit Order</button>
    <button class="button" id="reset-button">Reset</button>
  </div>

  <script>
    // Function to calculate total and discount
    function calculateTotal() {
      var total = 0;
      var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

      checkboxes.forEach(function(checkbox) {
        var quantityInput = checkbox.nextElementSibling.nextElementSibling; // Adjust for HTML structure
        var quantity = parseInt(quantityInput.value);
        var price = parseFloat(checkbox.value);

        total += price * quantity;
      });

      var discountTotal = total * 0.15;
      var totalWithDiscount = total - discountTotal;

      document.getElementById('total').textContent = totalWithDiscount.toFixed(2);
      document.getElementById('discount-total').textContent = discountTotal.toFixed(2);
    }

    // Function to submit order
    function submitOrder() {
      // Your existing submitOrder function
    }

    // Function to reset calculator
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
      document.getElementById('discount-total').textContent = '0.00';
    }

    // Attach event listeners to buttons
    document.getElementById('calculate-button').addEventListener('click', calculateTotal);
    document.getElementById('submit-button').addEventListener('click', submitOrder);
    document.getElementById('reset-button').addEventListener('click', resetCalculator);
  </script>
</body>
</html>
