//Navbar
//Sign In redirect
const SignInBtn =document.getElementById("SignIn");
SignInBtn.addEventListener("click", () =>{
    window.location.href = "../LoginPage/Login.html";
    event.preventDefault();
})

//BestSeller
const BSeeAllBtn =document.getElementById("BestSellerSeeAll");
BSeeAllBtn.addEventListener("click", () =>{
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
                console.log(data);
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

                    let price = document.createElement("p");
                    price.textContent = item.Price;
                    price.classList.add("price");
                    book_details.appendChild(price);

                    Book_item.appendChild(book_details);

                    let auther = document.createElement("p");
                    auther.textContent = item.name;
                    auther.classList.add("auther");
                    Book_item.appendChild(auther);

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