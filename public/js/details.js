const renderPage = (file) =>{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", file, true)
        xhr.onprogress = () => {
            document.getElementById("details-dash").innerHTML = "Loading ..."
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = () => {
            if (xhr.status == 200){
                const response = xhr.responseText;
                const newResponse  = response.split("</style>", 2)
                console.log(response)
                document.getElementById("details-dash").innerHTML = response;
            }
        }
        xhr.send();
}

const getProfile = () =>{
    renderPage("profile.ejs")
}