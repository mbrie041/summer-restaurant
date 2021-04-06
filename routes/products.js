const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/products/:id/shopping-cart-increment", (req, res) => {
    db.query(`
      INSERT INTO shopping_cart(user_id, product_id, quantity)
      VALUES(req.session.user_id, req.params.id, 1)
      ON CONFLICT(product_id, user_id) DO UPDATE
      SET quantity = shopping_cart.quantity + 1
     `);

    return quantity;
    //return new value
  });

  router.get("/products/:id/shopping-cart-decrement", (req, res) => {
    db.query(`
    INSERT INTO shopping_cart(user_id, product_id, quantity)
    VALUES(req.session.user_id, req.params.id, 1)
    ON CONFLICT(product_id, user_id) DO UPDATE
    SET quantity = shopping_cart.quantity -1
    `);

    return quantity;
    //return new value
  });
};
