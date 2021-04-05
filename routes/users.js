/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require("express");
const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');



module.exports = (db) => {
  router.get("/login", (req, res) => {
    res.render('login')
  });

  const getUserWithEmail = function (email) {
    return db
      .query(
        `
        SELECT * FROM users
        WHERE email = $1`,
        [email.toLowerCase()]
      )

      .then((res) => {
        console.log(res.rows);
        let user = res.rows[0] || null;
        return user;
      });
  };
  exports.getUserWithEmail = getUserWithEmail;


  const login = function (email, password) {
    return getUserWithEmail(email).then((user) => {
      if (password === user.password) {
        return user;
      }
      return null;
    });
  };
  exports.login = login;

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        if (email === "admin@summer.com") {
          req.session.userId = user.id;
          res.send("redirect to dashboard");
          return;
        }

        req.session.userId = user.id;
        res.send("we're going to redirect here");
      })
      .catch(e => res.send(e));
  });


  return router;
};
