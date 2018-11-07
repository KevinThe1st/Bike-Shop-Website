var express = require('express');
var router = express.Router();
const { Item } = require('../models');

router.get('/', function(req, res) {
  Item.findAll().then((items) => {
    res.json({items});
  });
});

router.get('/:id', function(req, res) {
  Item.findById(req.params.id).then((item) => {
    res.json({item});
  });
});

router.post('/', function(req, res) {
  const {
    price,
    stock,
    descShort,
    descLong,
    category,
  } = req.body;
  Item.create({
    price,
    stock,
    descShort,
    descLong,
    category,
  }).then((item) => {
    res.json({ created: 'Success' });
  }).catch(() => {
    res.json({ created: 'Failure' });
  });
});

router.delete('/:id', function(req, res) {
  const idToDelete = req.params.id;
  Item.findById(idToDelete).then((item) => {
    item.destroy().then(() => {
      res.json({ delete: true });
    });
  }).catch(() => {
    res.json({ delete: false });
  });
});

module.exports = router;
