document.addEventListener("DOMContentLoaded", () => {

    // Global Variables
    const CartMap = new Map();
    let TotalQuantity = document.querySelector("#CartQuantity");
    let Subtotal = document.querySelector("#Subtotal");
    let TotalItems = document.querySelector("#TotalSubitems");

    // Function to update the subtotal value
    function updateSubtotal(change) {
        // Ensure subtotal is parsed correctly and update it with the change value
        let CurrentQuantity = parseFloat(Subtotal.textContent) || 0;
        CurrentQuantity += parseFloat(change);
        Subtotal.textContent = CurrentQuantity.toFixed(2);
    }

    // Function to initialize page
    function awake(){
        FetchCart(localStorage.getItem("UID"));
        if (localStorage.getItem("isLoggedIn") === "true") {
            document.getElementById("UserAccount").style.display = "block";
            document.getElementById("SignIn").style.display = "none";
            localStorage.setItem("isLoggedIn", "true");
            document.getElementById("AccountUserName").innerHTML = localStorage.getItem("username");
        } else {
            window.location.href = "../LoginPage/Login.html";
        }

        const SignInBtn = document.getElementById("SignIn");
        SignInBtn.addEventListener("click", (e) => {
            window.location.href = "../LoginPage/Login.html";
            e.preventDefault();
        })

        // Search button event listener
        document.querySelector("#Search").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem('SearchQ', document.getElementById("search_book").value);
            window.location.href = "../SearchPage/Search.html";
        })
    }
    awake();

    // Function to fetch cart items
    function FetchCart(UID){
        let Cdata = {uid: UID};
        fetch("http://localhost/ONLINEBOOKSTORE/GetCart.php",{
            method:"POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(Cdata),
        }).then((response) => {
            if(!response.ok) throw new Error('HTTP error! Status: ' + response.status);
            else return response.json();
        }).then(data => {
            console.log(data);
            data.forEach((item) => {
                const BID = parseInt(item.B_id);
                const Quantity = parseInt(item.Quantity);
                CartMap.set(BID, Quantity);
                TotalQuantity.textContent = (Quantity + parseInt(TotalQuantity.textContent)).toString();
                LoadBook(BID, Quantity);
                TotalItems.textContent = TotalQuantity.textContent;
            })
            console.log(CartMap);
        }).catch(error => {
            console.error("Error fetching cart:", error);
        });
    }

    // Function to load book details
    function LoadBook(BID, Quantity){
        const bid = {bid: BID};
        fetch("http://localhost/ONLINEBOOKSTORE/GetBook.php", {
            method:"POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(bid),
        }).then((response) => {
            if(!response.ok) throw new Error('HTTP error! Status: ' + response.status);
            else return response.json();
        }).then(data => {
            const name = data.Name;
            const price = data.Price;
            const url = data.URL;
            CreateBook(name, price, url, Quantity, BID);
            updateSubtotal(parseFloat(price) * Quantity);
        })
    }

    // Function to create a book entry in the cart
    function CreateBook(Name, Price, URL, Quantity, bid) {
        let container = document.querySelector("#CartContainer");
        let CartItem = document.createElement("div");
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

        // Event listener for the plus button
        plusBtn.addEventListener("click", () => {
            quantity.value  = (parseInt(quantity.value) + 1).toString();
            UpdateCart(bid, 1);

            // Update the subtotal with the item's price
            updateSubtotal(parseFloat(Price));
            TotalQuantity.textContent = (parseInt(TotalQuantity.textContent) + 1).toString();
            TotalItems.textContent = TotalQuantity.textContent;
        });

        // Event listener for the minus button
        minusBtn.addEventListener("click", () => {
            if (parseInt(quantity.value) > 1) {
                quantity.value  = (parseInt(quantity.value) - 1).toString();
                UpdateCart(bid, -1);
                updateSubtotal(parseFloat(Price) * (-1));
            } else {
                DeleteFromCart(bid);
                CartItem.remove();
                updateSubtotal(parseFloat(Price) * (-1));
            }
            TotalQuantity.textContent = (parseInt(TotalQuantity.textContent) - 1).toString();
            TotalItems.textContent = TotalQuantity.textContent;
        });

        // Event listener for the remove button
        removeButton.addEventListener("click", () => {
            DeleteFromCart(bid);
            CartItem.remove();
            updateSubtotal(parseFloat(Price) * (-1) * parseInt(quantity.value));
            TotalQuantity.textContent = (parseInt(TotalQuantity.textContent) - parseInt(quantity.value)).toString();
            TotalItems.textContent = TotalQuantity.textContent;
        });
    }

    // Function to delete an item from the cart
    function DeleteFromCart(BookID) {
        const CData = {UID: localStorage.getItem("UID"), BID: BookID};
        fetch("http://localhost/ONLINEBOOKSTORE/DeleteFromAddToCart.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(CData),
        }).then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            else return response.json();
        }).then(data => {
            console.log(data);
        });
    }

    // Function to update the cart with a change in quantity
    function UpdateCart(BookID, change) {
        const CData = {UID: localStorage.getItem("UID"), BID: BookID, Quantity: change};
        fetch("http://localhost/ONLINEBOOKSTORE/UpdateCart.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(CData)
        }).then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            else return response.json();
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error("Fetch error:", error);
        });
    }
});
