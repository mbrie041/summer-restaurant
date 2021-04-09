///Events when + and -buttones are clicked
$(document).ready(function () {
//Plus button
  $(".increment-button").on("click", function (event) {
    const userID = $("#hidden_userID").val();
    if (userID) { //check if user is logged in
      $.post( //post request to increase values in shopping chart table
        `/api/products/${event.currentTarget.value}/shopping-cart-increment`
      ).then((results) => { //reflect updates in the shopping cart table on the checkout icon and beside the buttons
        $(this).siblings(".textbox").html(results.results.quantity);
        let cartCount = Number($("#cartID").text());
        cartCount++;
        $("#cartID").text(cartCount);
        let cartPrice = Number($("#priceID").text());
        let priceToAdd = Number(
          $(this).parents().siblings().children(".price").text()
        );
        let displayedPrice = priceToAdd + cartPrice;
        $("#priceID").text(displayedPrice);
      });
    } else { //if not logged in redirect to login page
      window.location.replace("/api/users/login?");
    }
  });
//Minus button
  $(".decrement-button").on("click", function (event) {
    const userID = $("#hidden_userID").val();
    if (userID) { //check if user is logged in
      $.post( //post request to decrease values in shopping chart table
        `/api/products/${event.currentTarget.value}/shopping-cart-decrement`
      ).then((results) => { //reflect updates in the shopping cart table on the checkout icon and beside the buttons
        if (results) {
          if (results.results) {
            $(this).siblings(".textbox").html(results.results.quantity);
          } else {
            $(this).siblings(".textbox").html(0);
          } let cartCount = Number($("#cartID").text());
          cartCount--;
          $("#cartID").text(cartCount);
          let cartPrice = Number($("#priceID").text());
          let priceToAdd = Number(
            $(this).parents().siblings().children(".price").text()
          );
          let displayedPrice = cartPrice - priceToAdd;
          $("#priceID").text(displayedPrice);
        }
      });
    } else { //if not logged in redirect to login page
      window.location.replace("/api/users/login?");
    }
  });
});
