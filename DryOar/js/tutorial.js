$(".tut_options").hide();
$($(document).ready(function() {
  $(".tut_options").click(function(){
    if ($(this).next().is(".hidden")){
      $(this).next().slideDown("fast");
    } else {
      $(this).next().hide();
    }
  });
});
