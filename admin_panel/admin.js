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