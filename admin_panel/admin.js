const b_form = document.getElementById('bookForm');

b_form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bookName', document.getElementById('bookName').value);
    formData.append('url', document.getElementById('url').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('rating', document.getElementById('rating').value);
    formData.append('authorName', document.getElementById('authorName').value);
    formData.append('authorBio', document.getElementById('authorBio').value);

    // Send data to PHP server using fetch
    fetch('add_book.php', {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add the book');
            }
            return response.text();
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })