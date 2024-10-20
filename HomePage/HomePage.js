//Navbar
//Sign In redirect
let IsLoggedIn = false;
if(localStorage.getItem("isLoggedIn") == "true") {
    document.getElementById("UserAccount").style.display = "block";
    document.getElementById("SignIn").style.display = "none";
    localStorage.setItem("isLoggedIn", "true");
    document.getElementById("AccountUserName").innerHTML = localStorage.getItem("username");
}
function logOut(){
    IsLoggedIn = false;
    localStorage.setItem("isLoggedIn","false");
    console.log(localStorage.getItem("isLoggedIn"));
    //window.location.reload();
}
const SignInBtn =document.getElementById("SignIn");
SignInBtn.addEventListener("click", (e) =>{
    window.location.href = "../LoginPage/Login.html";
    e.preventDefault();
})
//search button
document.querySelector("#Search").addEventListener("click", (e) =>{
    e.preventDefault();
    localStorage.setItem('SearchQ', document.getElementById("search_book").value);
    window.location.href = "../SearchPage/Search.html";
})
//BestSeller
const BSeeAllBtn =document.getElementById("BestSellerSeeAll");
BSeeAllBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    if(BSeeAllBtn.textContent === "SeeAll"){
        //Getting variables
        let mainContainer = document.querySelector("#BestSellerContainer");
        //fetching JSON
        fetch("http://localhost/ONLINEBOOKSTORE/Getbookitem.php")
            .then(res => {
                if(!res.ok) throw new Error('HTTP error! Status: ' + res.status);
                else
                    return res.json();
            })
            .then(data => {
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

                    Book_item.classList.add("RemoveOnSeeLess");
                    mainContainer.appendChild(Book_item);
                })
                BSeeAllBtn.textContent = "See Less";
            })
            .catch(error => {
                console.log(error);
            })
    }
    else
    {
        let remove = document.querySelectorAll(".RemoveOnSeeLess");
        remove.forEach((item) => {item.remove();});
        BSeeAllBtn.textContent = "SeeAll";
        console.log("remove");
    }

})