//Global variables for cart
const CartMap = new Map();
let TotalQuantity = document.querySelector("#CartQuantity");

const searchQuery = localStorage.getItem('SearchQ');
let SearchText = document.querySelector('#SearchQuery');
SearchText.textContent = searchQuery;
FetchCart(localStorage.getItem("UID"));
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
        data.forEach((item) => {
            const BID = parseInt(item.B_id);
            const Quantity = parseInt(item.Quantity);
            CartMap.set(BID,Quantity);
            TotalQuantity.textContent = (Quantity + parseInt(TotalQuantity.textContent)).toString();
        })
    }).catch(error => {
        console.error("Error fetching cart:", error);
    });
}
fetch(`http://localhost/ONLINEBOOKSTORE/SearchBook.php?q=${encodeURIComponent(searchQuery)}`)
.then(res => res.json())
.then(data => {
    const Container = document.getElementById('bookResultsContainer');
    Container.innerHTML = '';
    if(data.length > 0){
        data.forEach((item) => {
            //BookItem div
            let Book_item = document.createElement("div");
            Book_item.classList.add("book_item");
            //Image
            let img = document.createElement("img");
            img.classList.add("book-image");
            img.src = item.URL;
            Book_item.appendChild(img);

            //Book Details div
            let book_details = document.createElement("div");
            book_details.classList.add("book-details");
            let Name = document.createElement("p");
            Name.textContent = item.Name;
            Name.classList.add("book-title");
            book_details.appendChild(Name);

            //price div
            let price = document.createElement("p");
            price.textContent = "$"+item.Price;
            price.classList.add("price");
            book_details.appendChild(price);
            Book_item.appendChild(book_details);

            //book author para
            let author = document.createElement("p");
            author.textContent = item.name;
            author.classList.add("author");
            Book_item.appendChild(author);

            //Rating div
            let rating = document.createElement("div");
            rating.classList.add("rating");
            let i=1;
            for(; i<= item.Rating ; i++){
                let icon = document.createElement("i");
                icon.classList.add("fa","fa-star");
                rating.appendChild(icon);
            }
            Book_item.appendChild(rating);

            let AddToCartBtn = document.createElement("button");
            AddToCartBtn.textContent = "Add To Cart";
            AddToCartBtn.classList.add("add-book-button");
            let CartIcon = document.createElement("i");
            CartIcon.classList.add("fa-solid,fa-cart-plus");
            AddToCartBtn.appendChild(CartIcon);
            Book_item.appendChild(AddToCartBtn);

            let ModifyBookBtn = document.createElement("div");
            ModifyBookBtn.classList.add("ModifyBook")
            let MinusBtn = document.createElement("button");
            MinusBtn.textContent = "-";
            MinusBtn.classList.add("Modify_button");
            ModifyBookBtn.appendChild(MinusBtn);

            let Quantity = document.createElement("p");
            Quantity.textContent = "1";
            ModifyBookBtn.appendChild(Quantity);
            let plusBtn = document.createElement("button");
            plusBtn.textContent = "+";
            plusBtn.classList.add("Modify_button");
            ModifyBookBtn.appendChild(plusBtn);
            ModifyBookBtn.style.display = "none";
            Book_item.appendChild(ModifyBookBtn);

            Book_item.classList.add("RemoveOnSeeLess");
            Container.appendChild(Book_item);

            if(CartMap.size >0 && CartMap.has(parseInt(item.B_id))){
                AddToCartBtn.style.display= "none";
                ModifyBookBtn.style.display = "flex";
                Quantity.textContent = CartMap.get(parseInt(item.B_id)).toString();
            }

            //event listener for add to cart
            AddToCartBtn.addEventListener("click", (e) => {
                if(localStorage.getItem("isLoggedIn") === "false")
                    window.location.href = "../LoginPage/Login.html";
                else{
                    AddToCart(item.B_id,1)
                    TotalQuantity.textContent = (parseInt(TotalQuantity.textContent) + 1).toString()
                    AddToCartBtn.style.display= "none";
                    ModifyBookBtn.style.display = "flex";
                }
            })

            //event listener for ModifyBookBtn
            plusBtn.addEventListener("click", () => {
                let currentQuantity = parseInt(Quantity.textContent);
                currentQuantity++;
                Quantity.textContent = currentQuantity.toString();
                UpdateCart(item.B_id,1);
                let CurrentQuantity = parseInt(TotalQuantity.textContent);
                CurrentQuantity++;
                TotalQuantity.textContent = CurrentQuantity.toString();
            })
            MinusBtn.addEventListener("click", () => {
                if(parseInt(Quantity.textContent) > 1){
                    Quantity.textContent = (parseInt(Quantity.textContent) - 1).toString();
                    UpdateCart(item.B_id,-1);
                }
                else{
                    DeleteFromCart(item.B_id);
                    ModifyBookBtn.style.display = "none";
                    AddToCartBtn.style.display = "flex";
                }
                TotalQuantity.textContent = (parseInt(TotalQuantity.textContent) - 1).toString();
            })
            if(CartMap.size >0 && CartMap.has(parseInt(item.B_id))){
                AddToCartBtn.style.display= "none";
                ModifyBookBtn.style.display = "flex";
                Quantity.textContent = CartMap.get(parseInt(item.B_id)).toString();
            }
        })
    }
})

function logOut() {
    IsLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
    console.log(localStorage.getItem("isLoggedIn"));
    window.location.reload();
}
if (localStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("UserAccount").style.display = "block";
    document.getElementById("SignIn").style.display = "none";
    localStorage.setItem("isLoggedIn", "true");
    document.getElementById("AccountUserName").innerHTML = localStorage.getItem("username");
}
const SignInBtn = document.getElementById("SignIn");
SignInBtn.addEventListener("click", (e) => {
    window.location.href = "../LoginPage/Login.html";
    e.preventDefault();
})

//search button
document.querySelector("#Search").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem('SearchQ', document.getElementById("search_book").value);
    window.location.href = "../SearchPage/Search.html";
})

//Functions to manage Cart
function AddToCart(BookID,Quantity){
    const CData = {UID:localStorage.getItem("UID"), BID:BookID,Quantity:Quantity};
    fetch("http://localhost/ONLINEBOOKSTORE/AddToCart.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(CData),
    }).then(response => {
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        else return response.json();
    }).then(data => {
        console.log(data);
    })
}

function DeleteFromCart(BookID){
    const CData = {UID:localStorage.getItem("UID"), BID:BookID};
    fetch("http://localhost/ONLINEBOOKSTORE/DeleteFromAddToCart.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(CData),
    }).then(response => {
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        else return response.json();
    }).then(data => {
        console.log(data);
    })
}
//change can be +ve for addition and -ve for subtraction
function UpdateCart(BookID,change){
    const CData = {UID:localStorage.getItem("UID"), BID:BookID ,Quantity:change};
    fetch("http://localhost/ONLINEBOOKSTORE/UpdateCart.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(CData)
    }).then(response => {
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        else return response.json();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error("Fetch error:", error);
    });
}

