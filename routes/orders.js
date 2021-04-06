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
  })


  return router;
};
