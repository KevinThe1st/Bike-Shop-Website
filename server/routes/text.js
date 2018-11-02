var express = require('express');
var router = express.Router();
const { Textbox } = require('../models');

/* GET specific item listing. */
router.get('/:name', function(req, res) {
  Textbox.findOne({ where: { name: req.params.name } }).then(item => {
    res.json({item});
  });
});

router.put('/', function(req, res) {
  const {
    name,
    text,
  } = req.body;
  Textbox.findOne({ where: { name: name } }).then(item => {
    if(item) {
      item.text = text;
      item.save().then(item => {
        return res.json({ updated: item.name });
      });
    }
    Textbox.create({
      name,
      text,
    }).then((item) => {
      res.json({ created: item.name })
    }).catch(() => {
      res.status(403).json({ created: false });
    });
  });
});

module.exports = router;
