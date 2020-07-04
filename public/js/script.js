$(document).ready(function(){
   $("#menu_btn").on("click", function(){
      $(this).toggleClass("is-active")
   })
   $("#description span").click( function(){
      $(this).toggleClass("btn btn-primary")
   })
   $("#ratings span").click(function(){
      $("#rating-input").val($(this).text())
      var value = $(this).text()
      if(value == 5){
         if ($(this).hasClass("badge-danger") == false){
                     $(this).toggleClass("badge-danger")
                     $("#ratings span:nth-child(5)").addClass("badge-warning")
                     $("#ratings span:nth-child(3)").addClass("badge-primary")
                     $("#ratings span:nth-child(2)").addClass("badge-secondary")
                     $("#ratings span:nth-child(4)").addClass("badge-success")

         }
      }else if(value == 4){
         if($(this).hasClass("badge-warning") == false){
            $(this).toggleClass("badge-warning")
            $("#ratings span:nth-child(3)").addClass("badge-primary")
            $("#ratings span:nth-child(1)").addClass("badge-secondary")
            $("#ratings span:nth-child(4)").addClass("badge-success")
         }else{
             $("#ratings span:nth-child(6)").removeClass("badge-danger ")
         }
      } else if (value == 3) {
         if ($(this).hasClass("badge-success") == false) {
            $(this).toggleClass("badge-success")
            $("#ratings span:nth-child(3)").addClass("badge-primary")
            // $("#ratings span:nth-child(1)").addClass("badge-secondary")
         } else {
            $("#ratings span:nth-child(5)").removeClass("badge-warning")
            $("#ratings span:nth-child(6)").removeClass("badge-danger ")
         }
      } else if (value == 2) {
         if ($(this).hasClass("badge-primary") == false) {
            $(this).toggleClass("badge-primary")
            $("#ratings span:nth-child(2)").addClass("badge-primary")
            $("#ratings span:nth-child(1)").addClass("badge-secondary")
         } else {
            $("#ratings span:nth-child(4)").removeClass("badge-success")
            $("#ratings span:nth-child(5)").removeClass("badge-warning")
            $("#ratings span:nth-child(6)").removeClass("badge-danger ")
         }
      } else if (value == 1) {
            $("#ratings span:nth-child(3)").removeClass("badge-primary")
            $("#ratings span:nth-child(4)").removeClass("badge-success")
            $("#ratings span:nth-child(5)").removeClass("badge-warning")
            $("#ratings span:nth-child(6)").removeClass("badge-danger")
      }
   })
   $("#report").on("click", function(){
      $("#home_container").fadeOut(100)
      $("#report_container").fadeIn()
   })
   $("#home").on("click", function(){
      $("#home_container").fadeIn()
      $("#report_container").css("display", "none")
   })
})

// var ratings = document.querySelectorAll(".ratings")
// ratings.addEventsListener("click", function(){
//    this.style.background = "gold"
// })