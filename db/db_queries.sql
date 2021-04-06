-- DROP TABLE IF EXISTS shopping_cart CASCADE;
-- CREATE TABLE shopping_cart (
--   id SERIAL PRIMARY KEY,
--   product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   quantity INTEGER NOT NULL,
--   UNIQUE(product_id, user_id)
-- );


-- INSERT INTO shopping_cart (product_id, user_id, quantity) VALUES (1,2,2);
-- INSERT INTO shopping_cart (product_id, user_id, quantity) VALUES (2,2,1);
-- INSERT INTO shopping_cart (product_id, user_id, quantity) VALUES (7,2,1);



let order;
return db.query(`INSERT INTO orders (user_id, order_confirmed) VALUES ($1,'true') RETURNING *`, [req.session.userId])
.then(data => {
  order = data.rows[0];
  return order});
.then(data=> {return db.query(`SELECT * FROM shopping_cart WHERE user_id=$1`,[req.session.userId])})
.then(data => {return data.rows})
.then(data => {return db.query(`INSERT INTO items_orders (product_id, order_id, quantity) VALUES (${data.rows.product_id}, ${order.id}, ${data.rows.quantity}) RETURNING*`)})
.then(data => {return db.query(`DELETE FROM shopping_cart WHERE user_id =$1`,[req.session.userId])})
.then(data => {return db.query(`SELECT products.name, items_orders.quantity, products.price, (items_orders.quantity * products.price) as total_price, FROM items_orders JOIN products ON products.id = items_orders.product_id WHERE items_orders.order_id = ${order.id} GROUP BY products.name, items_orders.quantity, products.price_cents`)})
.then(data => data.rows)
.catch(err => {
  console.log('error', err);
  return err;
});




