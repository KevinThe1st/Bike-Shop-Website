var express = require('express');
var router = express.Router();
const { Item } = require('../models');
const { ItemCategory } = require('../models');

router.get('/', function(req, res) {
  Item.findAll().then((items) => {
    res.json({items});
  });
});

router.get('/byCat', function(req, res) {
  ItemCategory.findAll({ where: { parentId: req.body }}).then((items) => {
    return res.json({items});
  });
});

router.get('/:id', function(req, res) {
  Item.findById(req.params.id).then((item) => {
    return res.json({item});
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
    return res.json({ created: 'Success' });
  }).catch(() => {
    return res.json({ created: 'Failure' });
  });
});

router.delete('/:id', function(req, res) {
  const idToDelete = req.params.id;
  Item.findById(idToDelete).then((item) => {
    item.destroy().then(() => {
      return res.json({ delete: true });
    });
  }).catch(() => {
    return res.json({ delete: false });
  });
});

module.exports = router;
