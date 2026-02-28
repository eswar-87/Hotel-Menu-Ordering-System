let orderItems = [];
let totalPrice = 0;

function addItem(name, price, quantity) {
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity <= 0) return;

    const itemIndex = orderItems.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        orderItems[itemIndex].quantity += quantity;
    } else {
        orderItems.push({ name, price, quantity });
    }

    totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    if (orderItems.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-state';
        emptyLi.textContent = 'No items added yet.';
        orderList.appendChild(emptyLi);
    } else {
    orderItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${item.name} <small style="color:#9ca3af">&times;${item.quantity}</small></span>
        <span><strong>Rs. ${item.price * item.quantity}</strong></span>
      `;
        orderList.appendChild(listItem);
    });
  }

    document.getElementById('total-price').textContent = totalPrice;
}

function generateBill() {
    if (orderItems.length === 0) {
        alert('No items selected. Please add items to your order.');
        return;
    }

    const finalBillingList = document.getElementById('final-billing-list');
    finalBillingList.innerHTML = '';

    orderItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
      <span>${item.name} <small style="color:#9ca3af">&times;${item.quantity}</small></span>
      <span><strong>Rs. ${item.price * item.quantity}</strong></span>
    `;
      finalBillingList.appendChild(listItem);
  });

    document.getElementById('final-total-price').textContent = totalPrice;
    document.querySelector('.order-summary').style.display = 'none';
    document.getElementById('final-billing-summary').style.display = 'block';
}

function clearOrder() {
    orderItems = [];
    totalPrice = 0;

    // Reset all quantity inputs to 0
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = 0;
    });

    document.querySelector('.order-summary').style.display = 'block';
    document.getElementById('final-billing-summary').style.display = 'none';
    updateOrderSummary();
}

// Initialize empty state on load
updateOrderSummary();