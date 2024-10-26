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
    window.location.reload();
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

//Get To Know Section
let Author1 = document.getElementById("Author1");
let Author2 = document.getElementById("Author2");
let Author1Info = document.getElementById("AboutAuthor1");
let Author2Info = document.getElementById("AboutAuthor2");
let Auth1Img = document.getElementById("Author1Img");
let Auth2Img = document.getElementById("Author2Img");
function getRandomElements(arr) {
    if (arr.length < 2) return [arr[0],arr[0]];
    let index1 = Math.floor(Math.random() * arr.length);
    let index2;
    do index2 = Math.floor(Math.random() * arr.length); while (index2 === index1);
    return [arr[index1], arr[index2]];
}
fetch("http://localhost/ONLINEBOOKSTORE/GetAuthors.php")
.then(res =>{
    if(!res.ok)
        throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
})
    .then(data => {
        let random =getRandomElements(data);
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