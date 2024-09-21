﻿//validate form
function ValidateForm()
{
    //variables with DOM
    const Name = document.getElementById("Name").value;
    const Username = document.getElementById("Username").value;
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("Pass").value;
    const CPassword = document.getElementById("CPass").value;
    //variables to object
    const userdata = {Name: Name, Username: Username, Email: Email, Password: Password};
    if(Password !== CPassword) {
        alert("Passwords don't match");
        return false;
    }
    fetch("http://localhost/OnlineBookStore/CreateUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",},
        body: JSON.stringify(userdata),
    })
        .then(response => {
            if(!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            else
                return response.json();
        })
        .then(data => {
            console.log(data);
            window.location.href = "Login.html";
        })
        .catch(error => {
            console.log(error);
        })
}