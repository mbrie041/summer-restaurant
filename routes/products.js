router.get("/products/:id/shopping-cart-increment", (req, res) => {
INSERT INTO shopping_cart(user_id, product_id, quantity)
VALUES(req.session.user_id, req.params.id, 1)
ON CONFLICT DO UPDATE
SET quantity = quantity + 1
WHERE user_id = req.session.user_id
AND product_id = req.params.id;


return quantity;
//return new value
})

router.get("/products/:id/shopping-cart-decrement", (req, res) => {
  INSERT INTO shopping_cart(user_id, product_id, quantity)
  VALUES(req.session.user_id, req.params.id, 1)
  ON CONFLICT DO UPDATE
  SET quantity = quantity -1
  WHERE user_id = req.session.user_id
  AND product_id = req.params.id;


  return quantity;
  //return new value
  })
