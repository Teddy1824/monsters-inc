const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (request, response) => {
  pool.query('SELECT * FROM habitats ORDER BY id ASC', (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
  })
});

router.post('/', (request, response, next) => {
    const { name, climate, temperature } = request.body;

    pool.query('INSERT INTO habitats(name, climate, temperature) VALUE($1, $2, $3)',
    [name, climate, temperature],
    (err, res) => {
        if (err) return next(err);

        response.redirect('/habitats');
    }
    )
});

module.exports = router;