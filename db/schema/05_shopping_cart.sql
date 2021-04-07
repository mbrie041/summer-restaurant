DROP TABLE IF EXISTS shopping_cart CASCADE;
CREATE TABLE shopping_cart (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  constraint quantity_nonnegative check (quantity >= 0),
  UNIQUE(product_id, user_id)
);
