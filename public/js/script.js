const page = window.location.pathname.split("/")[1];
$(`#${page}`).addClass("active");

// for complaints page
function populateData() {
  const data = this.document.activeElement.dataset;
  const modalBody = document.querySelector(".modal-body");

  modalBody.innerHTML = `
        <ul>
          <li><strong>Name: </strong><br>${data.name}</li>
          <li><strong>Address: </strong><br>${data.address}</li>
          <li><strong>Phone Number: </strong><br>${data.phone_number}</li>
          <li><strong>Gender: </strong><br>${data.gender}</li>
          <li><strong>Description: </strong><br>${data.description}</li>
        </ul>`;
}

//for search feature
const search = () => {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/search", true);
  if ($("#search-bar").val() < 1) {
    $(".search-data").slideUp(300);
  }
  xhr.onprogress = () => {
    $(".loading").addClass("spinner-border");
  };
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = () => {
    if (xhr.status == 200) {
      $(".search-data").slideDown(300);
      $("#list").html("");
      $(".loading").removeClass("spinner-border");
      const required = JSON.parse(xhr.response);
      required.map((data) => {
        $("#list").append(
          `<a href="/records/${data._id}">${data.name} - ${data.matric_number}</a>`
        );
      });
    }
  };
  const body = JSON.stringify({
    filter: $("#filter").val(),
    keyword: $("#search-bar").val(),
  });

  xhr.send(body);
};
$("#search-bar").on("change paste keyup", () => {
  if ($("#search-bar").val().length >= 3) return search();
  else return $(".search-data").slideUp(300);
});

//   const renderPage = (file) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", file, true);
//     xhr.onprogress = () => {
//       document.getElementById("details-dash").innerHTML = "Loading ...";
//     };
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.onload = () => {
//       if (xhr.status == 200) {
//         const response = xhr.responseText;
//         const newResponse = response.split("</style>", 2);
//         document.getElementById("details-dash").innerHTML = response;
//       }
//     };
//     xhr.send();
//   };

//   const getProfile = () => {
//     renderPage("profile.ejs");
//   };
