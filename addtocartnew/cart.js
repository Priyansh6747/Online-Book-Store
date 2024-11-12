//Global Variables
const CartMap = new Map();
let TotalQuantity = document.querySelector("#CartQuantity");
let Subtotal = document.querySelector("#Subtotal");
let TotalItems = document.querySelector("#Subtotal");

function increaseQuantity(button) {
    const quantityInput = button.previousElementSibling;
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateSubtotal(0);
}

function decreaseQuantity(button) {
    const quantityInput = button.nextElementSibling;
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
        updateSubtotal(0);
    }
}

function updateSubtotal(change) {
    let CurrentQuantity = parseInt(Subtotal.textContent);
    CurrentQuantity = CurrentQuantity + change;
    Subtotal.textContent = CurrentQuantity.toString();
}
//for all the function calls on page load
function awake(){
    FetchCart(localStorage.getItem("UID"));
}awake();

function FetchCart(UID){
    let Cdata = {uid:UID};
    fetch("http://localhost/ONLINEBOOKSTORE/GetCart.php",{
        method:"POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(Cdata),
    }).then((response) => {
        if(!response.ok) throw new Error('HTTP error! Status: ' + response.status);
        else return response.json();
    }).then(data=>{
        console.log(data);
        data.forEach((item) => {
            const BID = parseInt(item.B_id);
            const Quantity = parseInt(item.Quantity);
            CartMap.set(BID,Quantity);
            TotalQuantity.textContent = (Quantity + parseInt(TotalQuantity.textContent)).toString();
            LoadBook(BID,Quantity);
        })
        console.log(CartMap);
    }).catch(error => {
        console.error("Error fetching cart:", error);
    });
}

function LoadBook(BID,Quantity){
    const bid = {bid:BID};
    fetch("http://localhost/ONLINEBOOKSTORE/GetBook.php",{
        method:"POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(bid),
    }).then((response) => {
        if(!response.ok) throw new Error('HTTP error! Status: ' + response.status);
        else return response.json();
    }).then(data=>{
        const name = data.Name;
        const price = data.Price;
        const url = data.URL;
        CreateBook(name, price,url,Quantity);
        updateSubtotal(parseInt(price) * Quantity);
    })
}

function CreateBook(Name,Price,URL,Quantity){
    let container = document.querySelector("#CartContainer");
    let CartItem = document.createElement("div")
    CartItem.classList.add("cart-item");

    let img = document.createElement("img");
    img.src = URL;
    CartItem.appendChild(img);

    let details = document.createElement("div");
    details.classList.add("cart-details");

    let name = document.createElement("h4");
    name.textContent = Name;
    details.appendChild(name);

    let price = document.createElement("p");
    price.textContent = "$" + Price;
    price.classList.add("price");
    details.appendChild(price);

    let QDiv = document.createElement("div");
    QDiv.classList.add("quantity");
    let minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    QDiv.appendChild(minusBtn);
    let quantity = document.createElement("input");
    quantity.type = "text";
    quantity.value = Quantity;
    quantity.readOnly = true;
    QDiv.appendChild(quantity);
    let plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    QDiv.appendChild(plusBtn);

    details.appendChild(QDiv);
    CartItem.appendChild(details);

    let remove = document.createElement("div");
    remove.classList.add("remove");
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    remove.appendChild(removeButton);
    CartItem.appendChild(remove);

    container.appendChild(CartItem);

    plusBtn.addEventListener("click", ()=>{

    })
}