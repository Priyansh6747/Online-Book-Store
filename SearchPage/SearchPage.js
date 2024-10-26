const searchQuery = localStorage.getItem('SearchQ');
let SearchText = document.querySelector('#SearchQuery');
SearchText.textContent = searchQuery;
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

            Book_item.classList.add("RemoveOnSeeLess");
            Container.appendChild(Book_item);
        })
    }
})