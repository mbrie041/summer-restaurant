/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    let query = `SELECT * FROM shopping_cart WHERE user_id = $1`;
    // console.log(query);
    db.query(query, [req.session.userId])
      .then(data => {
        const order = data.rows;
        res.json({ order });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/dashboard", (req, res) => {
    let query = `SELECT * FROM orders WHERE order_confirmed=false`;
    // console.log(query);
    db.query(query)
      .then(data => {
        if (req.session.userId === 1) {
          res.json(data.rows)
        } else {
          res.send('You are not authorized to access this function')
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/checkout/submitted", (req, res) => {
    let query = `SELECT * FROM orders WHERE user_id = $1`;
    // console.log(query);
    db.query(query, [req.session.userId])
      .then(data => {
        res.send(`Your order has been submitted, check 'Orders' to get the current status of your order`)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id/orders", (req, res) => {
    let query = `SELECT * FROM orders WHERE user_id = $1`;
    db.query(query, [req.session.userId])
      .then(data => {
        if (req.params.id = req.session.userId) {
          res.send(data.rows)
        }
        else {
          res.send('You are only allowed to see your own orders')
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/checkout/submitted", (req, res) => {
    let order;
    return db.query(`INSERT INTO orders (user_id, order_confirmed) VALUES ($1,'true') RETURNING *`, [req.session.userId])
      .then(data => {
        order = data.rows[0]
        return order
      })
      .then(data => { return db.query(`SELECT * FROM shopping_cart WHERE user_id=$1`, [req.session.userId]) })
      .then(data => { return data.rows })
      .then(data => { return db.query(`INSERT INTO items_orders (product_id, order_id, quantity) VALUES (${data.rows.product_id}, ${order.id}, ${data.rows.quantity}) RETURNING*`) })
      .then(data => { return db.query(`DELETE FROM shopping_cart WHERE user_id =$1`, [req.session.userId]) })
      .then(data => { return db.query(`SELECT products.name, items_orders.quantity, products.price, (items_orders.quantity * products.price) as total_price, FROM items_orders JOIN products ON products.id = items_orders.product_id WHERE items_orders.order_id = ${order.id} GROUP BY products.name, items_orders.quantity, products.price_cents`) })
      .then(data => data.rows)
      .catch(err => {
        console.log('error', err);
        return err;
      });
  })



  return router;
};
