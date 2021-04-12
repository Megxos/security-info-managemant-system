$(document).ready(async function(){

   let active = await localStorage.getItem("active");
   $(".nav-item .nav-link").removeClass("active");
   $(`#${active}`).addClass("active");


   $(".nav-item .nav-link").on("click", async function () {
      await localStorage.setItem("active", this.id);
      active = await localStorage.getItem("active");
      $(".nav-item .nav-link").removeClass("active");
      $(`#${active}`).addClass("active");
   });
});
