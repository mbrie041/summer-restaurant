const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/:id/shopping-cart-increment", (req, res) => {
    db.query(
      `
      INSERT INTO shopping_cart(user_id, product_id, quantity)
      VALUES(${req.session.userId}, ${req.params.id}, 1)
      ON CONFLICT(product_id, user_id) DO UPDATE
      SET quantity = shopping_cart.quantity + 1
      WHERE shopping_cart.user_id = ${req.session.userId}
      AND shopping_cart.product_id = ${req.params.id}
      RETURNING *;`
    ).then((data) => {
      // console.log("returned data>>>", data);
      let results = data.rows[0];
      res.status(200).send({ results });
    });
  });

//   router.post("/:id/shopping-cart-decrement", (req, res) => {
//     const firstQuery = `SELECT * FROM shopping_cart
//     WHERE user_id = ${req.session.userId}
//     AND product_id = ${req.params.id}
//     ;`;
//     // console.log(firstQuery);
//     return db
//       .query(firstQuery)
//       .then((data) => {
//         if (!data.rows[0]) {
//           return;
//         }
//         if (data.rows[0].quantity > 1) {
//           const queryString = `
//         UPDATE shopping_cart
//         SET quantity = shopping_cart.quantity - 1
//         WHERE user_id = ${req.session.userId}
//         AND product_id = ${req.params.id};
//         `;
//           console.log("Query string>>>>",queryString);
//           db.query(queryString);
//         }
//         if (data.rows[0].quantity === 1) {
//           db.query(`
//           DELETE FROM shopping_cart
//           WHERE user_id = ${req.session.userId}
//           AND product_id = ${req.params.id};
//           `);
//         }
//       })
//       .then((data) => {
//         console.log("returned data>>>", data);
//         let results = data.rows[0];
//         res.status(200).send({ results })
//       })
//       .catch((e) => console.log(e));
//   });
//   return router;
// };

router.post("/:id/shopping-cart-decrement", (req, res) => {
  const firstQuery = `SELECT * FROM shopping_cart
  WHERE user_id = ${req.session.userId}
  AND product_id = ${req.params.id}
  ;`;
  console.log(firstQuery);
  return db
    .query(firstQuery)
    .then((data) => {
      if (!data.rows[0]) {
        return;
      }
      if (data.rows[0].quantity > 1) {
        const queryString = `
      UPDATE shopping_cart
      SET quantity = shopping_cart.quantity - 1
      WHERE user_id = ${req.session.userId}
      AND product_id = ${req.params.id};
      `;
        console.log(queryString);
        return db.query(queryString);
      }
      if (data.rows[0].quantity === 1) {
        return db.query(`
        DELETE FROM shopping_cart
        WHERE user_id = ${req.session.userId}
        AND product_id = ${req.params.id};
        `);
      }
    })
    .then(() => res.status(200).end())
    .catch((e) => console.log(e));
});
return router;
};
