let orderItems = [];
let totalPrice = 0;

function addItem(name, price, quantity) {
    quantity = parseInt(quantity);
    if (quantity <= 0) return;

    let itemIndex = orderItems.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        orderItems[itemIndex].quantity += quantity;
    } else {
        orderItems.push({ name, price, quantity });
    }

    totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateOrderSummary();
    
}

function updateOrderSummary() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "";

    orderItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} (x${item.quantity}) - Rs. ${item.price * item.quantity}`;
        orderList.appendChild(listItem);
    });

    document.getElementById("total-price").innerText = `${totalPrice}`;

}

function generateBill() {
    if (orderItems.length === 0) {
        alert("No items selected. Please add items to your order.");
    } else {
        const finalBillingList = document.getElementById("final-billing-list");
        finalBillingList.innerHTML = "";

        orderItems.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${item.name} (x${item.quantity})- Rs. ${item.price * item.quantity}`;
            finalBillingList.appendChild(listItem);
        });

        document.getElementById("final-total-price").innerText = `${totalPrice}`;
        document.querySelector(".order-summary").style.display = "none";
        document.getElementById("final-billing-summary").style.display = "block";
    }
}

function clearOrder() {
    orderItems = [];
    totalPrice = 0;
    document.querySelector(".order-summary").style.display = "block";
    document.getElementById("final-billing-summary").style.display = "none";
    updateOrderSummary();
}