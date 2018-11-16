var express = require('express');
var router = express.Router();
const { Item } = require('../models');
const { ItemCategory } = require('../models');

router.get('/', function (req, res) {
  if (req.query.search == undefined) {
    Item.findAll().then((items) => {
      return res.json({ items });
    });
  } else {
    Item.findAll({
      where: { name: { $like: req.query.search + '%' } },
      order: [['name', 'ASC']]
    }).then((items) => {
      return res.json({ items });
    });
  };
});

router.get('/new', function (req, res) {
  Item.findAll({ order: [['updatedAt', 'DESC']] }).then((items) => {
    return res.json({ items });
  });
});

router.get('/pricesHigh', function (req, res) {
  Item.findAll({ order: [['price', 'DESC']] }).then((items) => {
    return res.json({ items });
  });
});

router.get('/pricesLow', function (req, res) {
  Item.findAll({ order: [['price', 'ASC']] }).then((items) => {
    return res.json({ items });
  });
});

// axios set params for array
router.get('/byCat/:categoryId', function (req, res) {
  ItemCategory.findAll({ where: { categoryId: req.params.categoryId } }).then((items) => {
    var ids = []
    for (var i = 0; i < items.length; i++) {
      ids.push(items[i].getDataValue('ItemId'))
    }
    Item.findAll({ where: { id: ids } }).then((items) => {
      return res.json({ items });
    });
  });
});

router.get('/:id', function (req, res) {
  Item.findById(req.params.id).then((item) => {
    return res.json({ item });
  });
});

router.put('/', function (req, res) {
  const {
    name,
    price,
    stock,
    descShort,
    descLong,
    categoryId,
  } = req.body;
  Item.create({
    name,
    price,
    stock,
    descShort,
    descLong,
  }).then((item) => {
    ItemCategory.create({
      itemId: item.id,
      categoryId
    }).then((ic) => {
      return res.json({ created: 'Success' });
    });
  }).catch(() => {
    return res.status(403).json({ created: 'Failure' });
  });
});

router.delete('/:id', function (req, res) {
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
