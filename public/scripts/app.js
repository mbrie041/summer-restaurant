$(document).ready(function () {
  $(".increment-button").on("click", function(event) {
    const userID = $('#hidden_userID').val();
    if(userID){
    console.log("event target value",event.currentTarget.value);
  $.post(`/api/products/${event.currentTarget.value}/shopping-cart-increment`).then(() => {
    console.log("post was done");
   });
  } else {
    window.location.replace("/api/users/login?");
  }

  });
  $(".decrement-button").on("click", function(event) {
    const userID = $('#hidden_userID').val();
    if(userID){
    console.log("event target value",event.currentTarget.value);
  $.post(`/api/products/${event.currentTarget.value}/shopping-cart-decrement`).then(() => {
    console.log("post was done");
   });
  } else {
    window.location.replace("/api/users/login?");
  }
  })
});



