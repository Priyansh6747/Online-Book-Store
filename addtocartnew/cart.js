function increaseQuantity(button) {
    const quantityInput = button.previousElementSibling;
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateSubtotal();
}

function decreaseQuantity(button) {
    const quantityInput = button.nextElementSibling;
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
        updateSubtotal();
    }
}

function updateSubtotal() {
    // Code to update subtotal based on the quantity changes
    // This function will calculate and update the subtotal amount
}
