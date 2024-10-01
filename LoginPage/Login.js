
const btn = document.getElementById("Submit");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const UserNameInput = document.getElementById("Username").value;
    const PasswordInput = document.getElementById("Pass").value;
    fetch("http://localhost/OnlineBookStore/UserInfo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(UserNameInput)})
        .then(response => {
            if(!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            else return response.json();
        })
        .then(data => {
            if(data.Password === PasswordInput) window.location.href = "../HomePage/HomePage.html";
            else alert("Username or Password incorrect.");
        })
})