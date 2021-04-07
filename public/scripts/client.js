// $(document).ready(() => {

// const createFood = (foodsData) => {
//   const $food = $("<article>").addClass(".food-menu");
//   const html = `<li class="product">
//     <h4 class="food-name">${foodsData.name}</h4>
//     <img id="food_image" src="${foodsData.food_url}">
//     <p>${foodsData.price_cents / 100}</p>
//     <button><i class="far fa-minus-square"></i></button>
//     <button><i class="far fa-plus-square"></i></button>
// </li>`;
// const foodMenu = $food.append(html);
// return foodMenu;
// }

// const renderFoods = (foods) => {
//   const foodMenu = $('.food-menu');
//   foodMenu.empty();

//   foods.forEach((food) => {
//     const eachFood = createFood(food);
//     foodMenu.prepend(eachFood);
//   });

// };

// const loadFoods = function(apps) {

//   $.ajax({
//     url: './routes/categories/apps',
//     method: 'GET',
//     success: (apps) => {
//       renderFoods (apps);
//     },
//     error: (error) => {
//       console.error(error);
//     }
//   });
// };

// loadFoods();

// });
