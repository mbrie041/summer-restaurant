$(document).ready(function () {
  $(".increment-button").on("click", function(event) {
    const userID = $('#hidden_userID').val();
    if(userID){
    console.log("event target value",event.currentTarget.value);
  $.post(`/api/products/${event.currentTarget.value}/shopping-cart-increment`).then((results) => {
    console.log("post was done", results);
    $(this).siblings(".textbox").html(results.results.quantity)
   });
  } else {
    window.location.replace("/api/users/login?");
  }

  });
  $(".decrement-button").on("click", function(event) {
    const userID = $('#hidden_userID').val();
    if(userID){
    console.log("event target value",event.currentTarget.value);
  $.post(`/api/products/${event.currentTarget.value}/shopping-cart-decrement`).then((results) => {
    console.log("post was done", results);
    if(results.results) {
    $(this).siblings(".textbox").html(results.results.quantity)
    } else {
      $(this).siblings(".textbox").html(0)
    }
   });
  } else {
    window.location.replace("/api/users/login?");
  }
  })
});



// SELECT products.*, shopping_cart.quantity as cart_quantity
// FROM products
// JOIN shopping_cart ON products.id = shopping_cart.product_id
// WHERE isApp IS TRUE;
