const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //displays apps page
  router.get("/apps", (req, res) => {
    db.query(`SELECT * FROM products WHERE isApp IS TRUE;`)
      .then(data => {
        const apps = data.rows;
        res.json({ apps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      res.render('food-menu');
  });
  //displays dinner page
  router.get("/dinner", (req, res) => {
    db.query(`SELECT * FROM products WHERE isDinner IS TRUE;`)
      .then(data => {
        const dinners = data.rows;
        res.json({ dinners });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      res.render('food-menu');
  });

  //displays desserts page
  router.get("/desserts", (req, res) => {
    db.query(`SELECT * FROM products WHERE isDessert IS TRUE;`)
      .then(data => {
        const desserts = data.rows;
        res.json({ desserts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      res.render('food-menu');
  });

  //displays drinks page
  router.get("/drinks", (req, res) => {
    db.query(`SELECT * FROM products WHERE isDrink IS TRUE;`)
      .then(data => {
        const drinks = data.rows;
        res.json({ drinks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      res.render('food-menu');
  });
  return router;
};

