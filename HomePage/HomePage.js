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
    if(BSeeAllBtn.value === "See all"){
        //Getting variables
        let mainContainer = document.querySelector("#BestSellerSeeAll");
        //fetching JSON
        fetch("http://localhost/ONLINEBOOKSTORE/Getbookitem.php")
            .then(res => {
                if(!res.ok){throw new Error('HTTP error! Status: ' + res.status)}
                else
                    return res.json();
            })
            .then(data => {
                console.log(data);
                let template;
                data.forEach((item) => {
                    template = mainContainer.querySelector(".template");
                    template.style.display = "block";
                    template.classList.add("removable");
                    template.classList.remove("template");
                    template.querySelector("img").src = item.URL;
                    template.querySelector("img").alt = item.Name;
                    template.querySelector(".book-details").querySelector("#BookTitle").textContent = item.Name;
                    template.querySelector(".book-details").querySelector("#BookPrice").textContent = item.Price;
                })
                mainContainer.appendChild(template);
            })
            .catch(error => {
                console.log(error);
            })
    }
    else
    {
        //remove the extra books
    }

})