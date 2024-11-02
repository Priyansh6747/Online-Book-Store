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
    SubBtn.style.display = "none";
    const Loader = document.querySelector(".loadingBar");
    Loader.style.display = "flex";
    setTimeout(() => {
        window.location.reload();
    },3500)
    })

function DeleteBook(BookBID) {
    fetch("http://localhost/ONLINEBOOKSTORE/DeleteBook.php",{
        method: "POST",headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({B_id:BookBID}),
    })
        .then(res =>{
            if(!res.ok) throw new Error('HTTP error! Status: ' + res.status);
            else return res.json();
        })
        .then(data =>{
            console.log(data.message);
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function DeleteUser(UID){
    fetch("http://localhost/ONLINEBOOKSTORE/DeleteUser.php",{
        method: "POST",headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({uid:UID}),
    })
        .then(res =>{
            if(!res.ok) throw new Error('HTTP error! Status: ' + res.status);
            else return res.json();
        })
        .then(data=>{
            console.log(data.message);
        })
        .catch(error => {
            console.log('Error:', error);
        })
    console.log({UID});
}

function LoadAllUsers(){
    let MainContainer = document.querySelector(".UserContainer");
    fetch("http://localhost/ONLINEBOOKSTORE/GetUsers.php")
        .then(res =>{
            if(!res.ok) throw new Error('HTTP error! Status: ' + res.status);
            else return res.json();
        })
        .then(data =>{
            data.forEach((item) => {
                let card = document.createElement("div");
                card.classList.add("UserCard");

                let icon = document.createElement("i");
                icon.classList.add("fa","fa-user");
                icon.style.fontSize = "24px";
                card.appendChild(icon);

                let UID = document.createElement("p");
                UID.textContent = item.UID;
                UID.classList.add("UserText");
                card.appendChild(UID);

                let Name = document.createElement("p");
                Name.textContent = item.Name;
                Name.classList.add("UserText");
                card.appendChild(Name);

                let UserName = document.createElement("p");
                UserName.textContent = item.Username;
                UserName.classList.add("UserText");
                card.appendChild(UserName);

                let Email = document.createElement("p");
                Email.textContent = item.Email;
                Email.classList.add("UserText");
                card.appendChild(Email);

                let DeleteBTN = document.createElement("Button");
                DeleteBTN.textContent= "Delete";
                DeleteBTN.classList.add("DeleteBTN");
                DeleteBTN.addEventListener("click", function (e) {
                    DeleteUser(UID.textContent)
                    DeleteBTN.textContent = "deleting..";
                    setTimeout(()=>{
                        window.location.reload();
                    }, 3500);
                })
                card.appendChild(DeleteBTN);
                card.classList.add("RemovableUsers");
                MainContainer.appendChild(card);
            })
        })
}

let i=1;
let SeeAllBtn = document.getElementById("SAAB");
let BookContainer = document.getElementById("BookContainer");
SeeAllBtn.addEventListener("click", function (e) {
    if(i === 0) {
        i++;
        SeeAllBtn.textContent = "SeeAllBooks";
        let book = document.querySelectorAll(".RemovableBook");
        book.forEach(item => {item.remove();})
        return;
    }
    SeeAllBtn.textContent = "Hide"
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
                let BID = item.B_id
                let img = document.createElement("img");
                img.src = item.URL;
                card.appendChild(img);
                let BName = document.createElement("p");
                BName.textContent = item.Name;
                card.appendChild(BName);
                let BAuthor = document.createElement("p");
                BAuthor.textContent = item.Author_Name;
                card.appendChild(BAuthor);
                let rating = document.createElement("div");
                rating.classList.add("rating");
                for(let j=0; item.Rating - j >=1 ; j++){
                    let star = document.createElement("i");
                    star.classList.add("fa" ,"fa-star");
                    rating.appendChild(star);
                }
                card.appendChild(rating);
                let DeleteBTN = document.createElement("Button");
                DeleteBTN.textContent= "Delete";
                DeleteBTN.classList.add("DeleteBTN");
                DeleteBTN.addEventListener("click", function (e) {
                    DeleteBook(BID);
                    DeleteBTN.textContent = "deleting..";
                    setTimeout(()=>{
                        window.location.reload();
                    }, 3500);
                })
                card.appendChild(DeleteBTN);
                card.classList.add("RemovableBook");
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

const AddUserBTN = document.getElementById("SAU");
AddUserBTN.addEventListener("click", function (e) {
    if(AddUserBTN.textContent === "See All Users"){
        LoadAllUsers();
        AddUserBTN.textContent = "Hide";
    }else{
        AddUserBTN.textContent = "See All Users";
        let Users = document.querySelectorAll('.RemovableUsers');
        Users.forEach(item => {
            item.remove();
        })
    }
})