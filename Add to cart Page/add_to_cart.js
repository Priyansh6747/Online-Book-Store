// Sample data structure for cart items
const cartItems = [
    { id: 1, title: "Book Title 1", author: "Author 1", price: 20, quantity: 1 },
    { id: 2, title: "Book Title 2", author: "Author 2", price: 25, quantity: 1 },
];

function updateCart() {
    const totalElement = document.querySelector(".total-price");
    const itemElements = document.querySelectorAll(".cart-item");

    let totalPrice = 0;

    itemElements.forEach((item, index) => {
        const quantity = cartItems[index].quantity;
        const price = cartItems[index].price;
        const itemTotalPrice = item.querySelector(".item-total-price p");

        itemTotalPrice.innerText = `$${(price * quantity).toFixed(2)}`;
        totalPrice += price * quantity;
    });

    totalElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

function incrementQuantity(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity++;
        document.getElementById(`quantity${itemId}`).innerText = item.quantity;
        updateCart();
    }
}

function decrementQuantity(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        document.getElementById(`quantity${itemId}`).innerText = item.quantity;
        updateCart();
    }
}

function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        document.querySelector(`.cart-item[data-id="${itemId}"]`).remove();
        updateCart();
    }
}

// Initialize cart with update function
document.addEventListener("DOMContentLoaded", updateCart);
