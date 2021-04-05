DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price_cents INTEGER NOT NULL,
  isApp BOOLEAN DEFAULT false,
  isDinner BOOLEAN DEFAULT false,
  isDessert BOOLEAN DEFAULT false,
  isDrink BOOLEAN DEFAULT false
);
