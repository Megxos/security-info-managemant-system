$(document).ready(()=>{
    const search = () =>{
        const xhr = new XMLHttpRequest();

        //data to send along with request
        if($("#search-bar").val().length >=1){
            var params = "keyword=" + $("#search-bar").val() + "&search_by=" + $("#search_by").val();
            var newParam = params.slice(0, 8) + params[8].toUpperCase() + params.slice(9, );
        }
        xhr.open("POST", "/search", true)
         if ($("#search-bar").val() < 1) {
             $(".search-data").slideUp(300)
         }
        xhr.onprogress = () =>{
            $(".loading").addClass("spinner-border")
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = () =>{
            if(xhr.status == 200){
                $(".search-data").slideDown(300);
                $("#list").html("");
                $(".loading").removeClass("spinner-border");
                const required = JSON.parse(xhr.responseText);
                required.map(data=>{
                    $("#list").append(`<a href="/dashboard/${data._id}">${data.name} - ${data.matric_number}</a>`);
                });
            }
        };

        //this is to make sure that the search bar has at least two characters before sending a request
        if (newParam && newParam != "keyword=" && newParam.length > 10)
            xhr.send(newParam)
    }
    $("#search-bar").on("change paste keyup", () =>{
        search();
    })
})