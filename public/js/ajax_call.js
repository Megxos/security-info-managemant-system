const getElement = (element) =>{
    return document.getElementById(element)
}

const ajax_call = (file, element, data) =>{
    getElement(element).innerHTML = "Loading...";
    const hreq = new XMLHttpRequest()
    hreq.open("GET", file, true)
    hreq.setRequestHeader("Content-type", "application/x-www-urlencoded")
    hreq.onreadystatechange = () =>{
        if( hreq.readyState == 4 && hreq.status == 200){
            getElement(element).innerHTML = hreq.responseText
            console.log(hreq.statusText)
        }
    }
    hreq.send(data)
}

const records = () =>{
    ajax_call("/records", "container", null)
}
const home = () =>{
    ajax_call("/home", "container", null)
}
const report = () =>{
    ajax_call("/report", "container", null)
}

//this is for the post to new record
var newRecord = (element) =>{
    // e.preventDefault()
    var xhr = new XMLHttpRequest();
    var params = "name="+$("#name").val()+"&matric_no="+ $("#matric_no").val()+"&department="+$("#department").val() + "&gender=" + $("#gender").val();
    xhr.open("POST", "/report/new", true)
    xhr.onprogress = () =>{
        // getElement(element).innerHTML = "Loading...";
        $("#save").text("")
        $("#save").addClass("spinner-border")
    };
    console.log(xhr.readyState);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = () =>{
        if(xhr.status == 200){
            $("#save").addClass("spinner-border");
            window.location.href = "/";
            // getElement(element).innerHTML = xhr.responseText;
            console.log(xhr.readyState)
            // home()
        }
    }
    xhr.send(params)
}

var callRecord = () =>{
    newRecord("container")
    console.log("I was called")
}