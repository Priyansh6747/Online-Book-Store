﻿const form = document.getElementById("Form");
form.addEventListener('submit', (e) => {e.preventDefault()});
const btn = document.getElementById("Submit");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const UserNameInput = document.getElementById("Username").value;
    const PasswordInput = document.getElementById("Pass").value;
    const User = {Username : UserNameInput, Password: PasswordInput};
    fetch("http://localhost/OnlineBookStore/UserInfo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(User),
    })
        .then(response => {
            if(!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            else return response.json();
        })
        .then(data => {
            console.log(data);
            if(data.Password === PasswordInput) window.location.href = "../HomePage/HomePage.html";
            else alert("Username or Password incorrect.");
        })
        .catch(error => {
            console.log(error);
        });
})