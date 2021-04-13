$(document).ready(() => {
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
            `<a href="/dashboard/${data._id}">${data.name} - ${data.matric_number}</a>`
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
});
