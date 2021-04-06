const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/:id/shopping-cart-increment", (req, res) => {
    db.query(
      `
      INSERT INTO shopping_cart(user_id, product_id, quantity)
      VALUES(${req.session.user_id}, ${req.params.id}, 1)
      ON CONFLICT(product_id, user_id) DO UPDATE
      SET quantity = shopping_cart.quantity +1
      WHERE user_id = ${req.session.user_id}
      AND product_id = ${req.params.id};`
    ).then(res => console.log(res))
    .catch(e => (e))
  });
  return router;
  //INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES (1, 1, 1) ON CONFLICT(product_id, user_id) DO UPDATE SET quantity = shopping_cart.quantity +1;

  // return quantity;
  //return new value
  // router.post("/products/:id/shopping-cart-decrement", (req, res) => {
  //   db.query(`
  //     INSERT INTO shopping_cart(user_id, product_id, quantity)
  //     VALUES(req.session.user_id, req.params.id, 1)
  //     ON CONFLICT DO UPDATE
  //     SET quantity = quantity -1
  //     WHERE user_id = req.session.user_id
  //     AND product_id = req.params.id;`);

  //   return quantity;
  //   //return new value
  // });
};
