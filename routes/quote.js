var express = require('express');
var router = express.Router();
var Quote = require('../controllers/Quote');

/* GET home page. */
router.post('/add', function (req, res, next) {
  let quote = (() => {
    let text = req.body.quote;
    let author = req.body.author;

    return {
      author,
      text
    }
  })();

  Quote.add(quote.author, quote.text).then(saved => {
    if (saved)
      res.json(saved).end();
    else
      res.send('Duplicate quote').end();
  },
    err => console.log(err))
    .catch(next);
})

router.get('/get', function (req, res) {

  Quote.get().then(data => res.json(data)).catch(err => res.json(err));
})

module.exports = router;