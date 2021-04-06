$(document).ready(function () {
  $(".increment-button").on("click", function(event) {
    console.log("event target value",event.currentTarget.value);
  $.post(`/api/products/${event.currentTarget.value}/shopping-cart-increment`).then(() => {
    console.log("post was done");
   });
  });

  $(".decrement-button").on("click", function(event) {
    console.log("event target value",event.currentTarget.value);
  $.post(`/api/products/${event.currentTarget.value}/shopping-cart-decrement`).then(() => {
    console.log("post was done");
   });
  })
});

