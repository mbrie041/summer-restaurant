/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    const userID = req.session.userId || null;
    let query = `SELECT products.name, products.id, products.price_cents, products.food_url, shopping_cart.user_id, shopping_cart.quantity FROM products JOIN shopping_cart ON products.id=product_id WHERE user_id = $1`;
    // console.log(query);
    db.query(query, [userID])
      .then((data) => {
        const orders = data.rows;
        const templateVars = {
          user: req.session.userId,
          orders,
          userID,
          cart: req.cart,
          cartPrice: req.cartPrice,
        };
        res.render("checkout", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/dashboard", (req, res) => {
    let query = `SELECT orders.id, orders.order_time, SUM(items_orders.quantity*products.price_cents) AS total FROM orders JOIN items_orders ON orders.id = order_id JOIN products ON items_orders.product_id = products.id WHERE order_confirmed=false GROUP BY orders.id;`;
    db.query(query)
      .then((data) => {
        if (req.session.userId === 1) {
          const dashOrders = data.rows;
          const templateVars = {
            user: req.session.userId,
            dashOrders,
            cart: req.cart,
            cartPrice: req.cartPrice,
          };
          res.render("dashboard", templateVars);
        } else {
          res.send("You are not authorized to access this function");
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/checkout/submitted", (req, res) => {
    let query = `SELECT * FROM orders WHERE user_id = $1`;
    db.query(query, [req.session.userId])
      .then((data) => {
        const submitOrders = data.rows;
        const templateVars = {
          user: req.session.userId,
          submitOrders,
          cart: req.cart,
          cartPrice: req.cartPrice,
        };
        res.render("submit", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/orders", (req, res) => {
    let query = `SELECT * FROM orders WHERE user_id = $1`;
    db.query(query, [req.session.userId])
      .then((data) => {
        if ((req.params.id = req.session.userId)) {
          const clientOrders = data.rows;
          const templateVars = {
            user: req.session.userId,
            clientOrders,
            cart: req.cart,
            cartPrice: req.cartPrice,
          };
          res.render("client-dashboard", templateVars);
        } else {
          res.send("You are only allowed to see your own orders");
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/checkout", (req, res) => {
    let order;
    let shoppingCart;
    return db
      .query(
        `INSERT INTO orders (user_id, order_pending) VALUES ($1,'true') RETURNING *`,
        [req.session.userId]
      )
      .then((data) => {
        order = data.rows[0];
        return order;
      })
      .then((data) => {
        return db.query(`SELECT * FROM shopping_cart WHERE user_id=$1`, [
          req.session.userId,
        ]);
      })
      .then((data) => {
        shoppingCart = data.rows;
        return shoppingCart;
      })
      .then((data) => {
        return db.query(
          `INSERT INTO items_orders (product_id, order_id, quantity) SELECT shopping_cart.product_id, ${order.id}, shopping_cart.quantity FROM shopping_cart JOIN orders ON orders.user_id = shopping_cart.user_id WHERE shopping_cart.user_id = ${req.session.userId} RETURNING *;`
        );
      })
      .then((data) => {
        return db.query(`DELETE FROM shopping_cart WHERE user_id =$1`, [
          req.session.userId,
        ]);
      })
      .then((data) => {
        return db.query(
          `SELECT products.name, items_orders.quantity, products.price_cents, (items_orders.quantity * products.price_cents) as total_price FROM items_orders JOIN products ON products.id = items_orders.product_id WHERE items_orders.order_id = ${order.id} GROUP BY products.name, items_orders.quantity, products.price_cents;`
        );
      })
      .then((data) => {
        return db.query(`SELECT * FROM users WHERE id =1`).then((data) => {
          const phoneNumber = data.rows[0].phone_number;
          res.redirect("checkout/submitted");
          console.log(`'${phoneNumber}'`);
          client.messages
            .create({
              body:
                "You received a new order request, log into your Admin Dashboard to accept or deny the request.",
              from: "+18646592214",
              to: `'${phoneNumber}'`,
            })
            .then((message) => console.log(message.sid));
        });
      })
      .catch((err) => {
        console.log("error", err);
        return err;
      });
  });

  router.post("/dashboard/confirmation/:id", (req, res) => {
    return db
      .query(`UPDATE orders SET order_confirmed=true WHERE id=$1 RETURNING*`, [
        req.params.id,
      ])
      .then((data) => {
        const userId = data.rows[0].user_id;
        return db
          .query(`SELECT * FROM users WHERE id =$1`, [userId])
          .then((data) => {
            const phoneNumber = data.rows[0].phone_number;
            res.redirect("/api/orders/dashboard");
            client.messages
              .create({
                body:
                  "Your order has been confirmed by the restaurant and will be ready for pick up in 30 minutes",
                from: "+18646592214",
                to: `'${phoneNumber}'`,
              })
              .then((message) => console.log(message.sid));
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

//Mikes from number 18646592214
//Lucas' from number 12267776716
