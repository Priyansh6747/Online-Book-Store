let SubBtn = document.getElementById("SubmitBTN");
SubBtn.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bookName', document.getElementById('bookName').value);
    formData.append('url', document.getElementById('url').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('rating', document.getElementById('rating').value);
    formData.append('authorName', document.getElementById('authorName').value);
    formData.append('authorBio', document.getElementById('authorBio').value);
    formData.append('Author_URL', document.getElementById('Author_URL').value);

    // Send data to PHP server using fetch
    fetch("http://localhost/ONLINEBOOKSTORE/AddBook.php", {
        method: "POST",headers: {
            "Content-Type": "application/json",},
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })