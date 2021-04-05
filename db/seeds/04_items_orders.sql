INSERT INTO items_orders (product_id, order_id, quantity) VALUES (1, 1, 1);
INSERT INTO items_orders (product_id, order_id, quantity) VALUES (2, 1, 1);
INSERT INTO items_orders (product_id, order_id, quantity) VALUES (3, 1, 1);
INSERT INTO items_orders (product_id, order_id, quantity) VALUES (4, 1, 1);
INSERT INTO items_orders (product_id, order_id, quantity) VALUES (5, 1, 1);







-- DROP TABLE IF EXISTS items_orders CASCADE;
-- CREATE TABLE items_orders (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id) DELETE ON CASCADE,
--   orders_id INTEGER REFERENCES orders(id) DELETE ON CASCADE,
--   quantity INTEGER NOT NULL
-- );
