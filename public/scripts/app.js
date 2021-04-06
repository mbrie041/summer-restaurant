// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
const incrementItem = (value) => {
  $.post(`/products/${value}/shopping-cart-increment`).then(() => {
    (console.log("item incremented by 1"));
  });
};

const decrementItem = (value) => {
  $.post(`/products/${value}/shopping-cart-decrement`).then(() => {
    (console.log("item decrement by 1"));
  });
};


$(document).ready(function () {
  const createAppetizerMenu = (dbObject) => {
    const $appetizerMenu = `
    <section class="food-title">
    <h3>${dbObject.product}</h3>
    <h4 class="food-name">Egg Roll</h4>
    <img id="food_image" src="/images/eggrolls.jpg">
    <p class="food-description">Delicious egg roll!</p>
    <p>$3.00</p>
    <button onclick="decrementItem(${dbObject.product})"><i class="far fa-minus-square"></i></button>
    <button onclick="incrementItem(${dbObject.product})"><i class="far fa-plus-square"></i></button>
  </section>`;
  };
});
