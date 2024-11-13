document.addEventListener("DOMContentLoaded", () => {

//Global variables for cart
const CartMap = new Map();
let TotalQuantity = document.querySelector("#CartQuantity");
let IsLoggedIn = false;
let CurrentDisplayedBook =0;

//Awake function for everything that happens when page loads
function HomePage() {
    //loading the cart based on individual user id  
    FetchCart(localStorage.getItem("UID"));

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



    //Get To Know Section
    let Author1 = document.getElementById("Author1");
    let Author2 = document.getElementById("Author2");
    let Author1Info = document.getElementById("AboutAuthor1");
    let Author2Info = document.getElementById("AboutAuthor2");
    let Auth1Img = document.getElementById("Author1Img");
    let Auth2Img = document.getElementById("Author2Img");
    function getRandomElements(arr) {
        if (arr.length < 2) return [arr[0], arr[0]];
        let index1 = Math.floor(Math.random() * arr.length);
        let index2;
        do index2 = Math.floor(Math.random() * arr.length); while (index2 === index1);
        return [arr[index1], arr[index2]];
    }
    fetch("http://localhost/ONLINEBOOKSTORE/GetAuthors.php")
        .then(res => {
            if (!res.ok)
                throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            let random = getRandomElements(data);
            let aut1 = random[0];
            let aut2 = random[1];
            Author1.textContent = aut1.Author_Name;
            Author1Info.textContent = aut1.Author_Bio;
            Auth1Img.src = aut1.Image;
            Author2.textContent = aut2.Author_Name;
            Author2Info.textContent = aut2.Author_Bio;
            Auth2Img.src = aut2.Image;
        })
        .catch(error => {
            console.log(error);
        })
}
HomePage();

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
        //Add 4 books on page awake as non-removable
        for(let i = 0; i < 4; i++){
            LoadBook(CurrentDisplayedBook,"NonRemovableBook");
            CurrentDisplayedBook++;
        }

        if(localStorage.getItem("isLoggedIn") === "false") TotalQuantity.textContent = "0";
    }).catch(error => {
        console.error("Error fetching cart:", error);
    });
}


let logout = document.getElementById("LogOut");
logout.addEventListener("click", logOut)
function logOut() {
    IsLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
    console.log(localStorage.getItem("isLoggedIn"));
    window.location.reload();
}
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




//search button
document.querySelector("#Search").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem('SearchQ', document.getElementById("search_book").value);
    window.location.href = "../SearchPage/Search.html";
})



//BestSeller
function LoadBook(CurrentNoOfBooks,Tag){
    let mainContainer = document.querySelector("#BestSellerContainer");
    fetch("http://localhost/ONLINEBOOKSTORE/Getbookitem.php")
        .then(res => {
            if (!res.ok) throw new Error('HTTP error! Status: ' + res.status);
            else
                return res.json();
        })
        .then(data => {
            if(CurrentNoOfBooks  === data.length) return;
            if(CurrentNoOfBooks + 1 === data.length) ShowMoreBTN.style.display = "none";
            let item = data[CurrentNoOfBooks];
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
            price.textContent = "$" + item.Price;
            price.classList.add("price");
            book_details.appendChild(price);
            Book_item.appendChild(book_details);

            //book author para
            let author = document.createElement("p");
            author.textContent = "by: " + item.Author_Name;
            author.classList.add("author");
            Book_item.appendChild(author);

            //Rating div
            let rating = document.createElement("div");
            rating.classList.add("rating");
            let i = 1;
            for (; i <= item.Rating; i++) {
                let icon = document.createElement("i");
                icon.classList.add("fa", "fa-star");
                rating.appendChild(icon);
            }
            Book_item.appendChild(rating);

            let AddToCartBtn = document.createElement("button");
            AddToCartBtn.textContent = "Add";
            AddToCartBtn.classList.add("add-book-button");
            let CartIcon = document.createElement("i");
            CartIcon.classList.add("fa-solid", "fa-cart-plus");
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

            Book_item.classList.add(Tag);
            mainContainer.appendChild(Book_item);

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
        .catch(error => {
            console.log(error);
        })
}

const ShowMoreBTN = document.querySelector("#ShowMoreButton");
const BSeeAllBtn = document.getElementById("BestSellerSeeAll");
BSeeAllBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (BSeeAllBtn.textContent === "SeeAll") {
        for(let i = 0; i < 4 ; i++) {
            LoadBook(CurrentDisplayedBook,"RemoveOnSeeLess");
            CurrentDisplayedBook++;
        }
        ShowMoreBTN.style.display = "block";
        BSeeAllBtn.textContent = "See Less";
    }
    else {
        let remove = document.querySelectorAll(".RemoveOnSeeLess");
        remove.forEach((item) => {
            item.remove();
            CurrentDisplayedBook--;
        });
        BSeeAllBtn.textContent = "SeeAll";
    }
})

ShowMoreBTN.addEventListener("click", (event) => {
    for(let i =0; i < 4; i++){
        LoadBook(CurrentDisplayedBook,"RemoveOnSeeLess");
        CurrentDisplayedBook++;
    }
})

});