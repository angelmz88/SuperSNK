document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");
  const totalBeforeTax = document.getElementById("total-before-tax");
  const totalAfterTax = document.getElementById("total-after-tax");
  let cart = {};

  items.forEach((item) => {
    const addButton = item.querySelector(".add-btn");
    const removeAllButton = item.querySelector(".remove-all-btn");
    const removeOneButton = item.querySelector(".remove-one-btn");
    const quantitySpan = item.querySelector(".quantity");
    const price = parseFloat(
      item.querySelector(".price").textContent.replace("$", "")
    );

    addButton.addEventListener("click", function () {
      const itemName = item.querySelector(".name").textContent;
      if (cart[itemName]) {
        cart[itemName]++;
      } else {
        cart[itemName] = 1;
      }
      updateCart();
    });

    removeAllButton.addEventListener("click", function () {
      const itemName = item.querySelector(".name").textContent;
      delete cart[itemName];
      updateCart();
      // Reiniciar contador
      quantitySpan.textContent = "0";
    });

    removeOneButton.addEventListener("click", function () {
      const itemName = item.querySelector(".name").textContent;
      if (cart[itemName] && cart[itemName] > 0) {
        cart[itemName]--;
        if (cart[itemName] === 0) {
          delete cart[itemName];
          // Reiniciar contador
          quantitySpan.textContent = "0";
        }
        updateCart();
      }
    });
  });

  function updateCart() {
    let total = 0;
    for (const item in cart) {
      const itemName = item;
      const quantity = cart[item];
      const itemElement = Array.from(items).find(
        (item) => item.querySelector(".name").textContent === itemName
      );
      const price = parseFloat(
        itemElement.querySelector(".price").textContent.replace("$", "")
      );
      total += price * quantity;
      itemElement.querySelector(".quantity").textContent = quantity;
    }
    totalBeforeTax.textContent = "$" + total.toFixed(2);
    totalAfterTax.textContent = "$" + (total * 1.16).toFixed(2);
  }
});
