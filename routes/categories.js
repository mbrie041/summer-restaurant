const express = require("express");
const router = express.Router();


const getApps = function (db) {
  return db.query(`SELECT * FROM products WHERE isApp IS TRUE;`)
    .then(data => {
      const apps = data.rows;
      return apps;
    })
}

const getDinner = function (db) {
  return db.query(`SELECT * FROM products WHERE isDinner IS TRUE;`)
    .then(data => {
      const dinner = data.rows;
      return dinner;
    })
}

const getDesserts = function (db) {
  return db.query(`SELECT * FROM products WHERE isDessert IS TRUE;`)
    .then(data => {
      const desserts = data.rows;
      return desserts;
    })
}

const getDrinks = function (db) {
  return db.query(`SELECT * FROM products WHERE isDrink IS TRUE;`)
    .then(data => {
      const drinks = data.rows;
      return drinks;
    })
}

module.exports = (db) => {
  //displays apps page
  router.get("/apps", (req, res) => {
    const userID = req.session.userId || null;
    return getApps(db).then(function (resolvedFoods) {
      const templateVars = {
        user: req.session.userId,
        foods: resolvedFoods, userID
      }
      return res.render("food-menu", templateVars);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //displays dinner page
  router.get("/dinner", (req, res) => {
    const userID = req.session.userId || null;
    return getDinner(db).then(function (resolvedFoods) {
      const templateVars = {
        user: req.session.userId,
        foods: resolvedFoods, userID
      }
      return res.render("food-menu", templateVars);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //displays desserts page
  router.get("/desserts", (req, res) => {
    const userID = req.session.userId || null;
    return getDesserts(db).then(function (resolvedFoods) {
      const templateVars = {
        user: req.session.userId,
        foods: resolvedFoods, userID
      }
      return res.render("food-menu", templateVars);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //displays drinks page
  router.get("/drinks", (req, res) => {
    const userID = req.session.userId || null;
    return getDrinks(db).then(function (resolvedFoods) {
      const templateVars = {
        user: req.session.userId,
        foods: resolvedFoods, userID
      }
      return res.render("food-menu", templateVars);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
