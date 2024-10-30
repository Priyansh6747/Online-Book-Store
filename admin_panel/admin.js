let BF = document.querySelector("#BaseForm")
BF.addEventListener("submit", function (e) {
    e.preventDefault()
})

let SubBtn = document.getElementById("SubmitBTN");
SubBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const bookData = {
        bookName: document.getElementById('bookName').value,
        url: document.getElementById('url').value,
        price: parseFloat(document.getElementById('price').value),
        rating: parseFloat(document.getElementById('rating').value),
        authorName: document.getElementById('authorName').value,
        authorBio: document.getElementById('authorBio').value,
        Author_URL: document.getElementById('Author_URL').value
    };
    // Send data to PHP server using fetch
    fetch("http://localhost/ONLINEBOOKSTORE/AddBook.php", {
        method: "POST",headers: {
            "Content-Type": "application/json",},
        body: JSON.stringify(bookData),
    })
        .then(response => {
            console.log("response ok");
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            else return response.json();
        })
        .then(result => {
            console.log(result.message);
        })
        .catch(error => {
            console.log('Error:', error);
        });
    })
let i=1;
let SeeAllBtn = document.getElementById("SAAB");
let BookContainer = document.getElementById("BookContainer");
SeeAllBtn.addEventListener("click", function (e) {
    if(i !== 1) return;
    i--;
    fetch("http://localhost/ONLINEBOOKSTORE/Getbookitem.php")
    .then(response => {
        if(!response.ok) throw new Error('HTTP error! Status: ' + response.status);
        else return response.json();
    })
        .then(result => {
            result.forEach((item) => {
                let card = document.createElement("div");
                card.classList.add("BookCard");
                let BID = document.createElement("p");
                BID.textContent = item.B_id;
                card.appendChild(BID);
                let img = document.createElement("img");
                img.src = item.URL;
                card.appendChild(img);
                let BName = document.createElement("p");
                BName.textContent = item.Name;
                card.appendChild(BName);
                let BAuthor = document.createElement("p");
                BAuthor.textContent = item.Author_Name;
                card.appendChild(BAuthor);
                let editBTN = document.createElement("Button");
                editBTN.textContent= "Edit";
                editBTN.classList.add("EditBTN");
                card.appendChild(editBTN);
                //event listener
                let DeleteBTN = document.createElement("Button");
                DeleteBTN.textContent= "Delete";
                DeleteBTN.classList.add("DeleteBTN");
                card.appendChild(DeleteBTN);
                //event listener
                BookContainer.appendChild(card);
            })
        })
})

const AddBookContainer = document.getElementById("AddBookContainer");
AddBookContainer.style.display = "none";
const AddBookBTN = document.getElementById("AddBook");
AddBookBTN.addEventListener("click", function (e) {
    if(AddBookBTN.textContent === "Add")
    {
        AddBookContainer.style.display = "block";
        AddBookBTN.textContent = "Cancel";
        AddBookBTN.classList.remove("AddBTN");
        AddBookBTN.classList.add("DeleteBTN");
    }else{
        AddBookContainer.style.display = "none";
        AddBookBTN.textContent = "Add";
        AddBookBTN.classList.remove("DeleteBTN");
        AddBookBTN.classList.add("AddBTN");
    }
})