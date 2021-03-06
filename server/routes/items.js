var express = require('express');
var router = express.Router();
const { Item, ItemCategory } = require('../models');

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
  ItemCategory.findAll({ where: { categoryId: req.params.categoryId } }).then((itemCats) => {
    if (itemCats.length == 0)
      return res.status(404).json({ itemCats });
    var ids = []
    for (var i = 0; i < itemCats.length; i++) {
      ids.push(itemCats[i].getDataValue('ItemId'))
    }
    Item.findAll({ where: { id: ids } }).then((items) => {
      if (items.length == 0)
        return res.status(404).json({ items });
      return res.json({ items });
    });
  });
});

router.put('/list', function (req, res) {
  const { ids } = req.body;
  Item.findAll({ where: { id: ids } })
    .then((items) => {
      if (items.length == 0) {
        return res.status(404).json({ items });
      }
      return res.json({ items });
    });
});

router.get('/:id', function (req, res) {
  Item.findById(req.params.id).then((item) => {
    if (item == null) {
      return res.status(404).json({ error: "Not Found" });
    }
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
    picName,
    categories,
  } = req.body;
  Item.create({
    name,
    price,
    stock,
    descShort,
    descLong,
    picName,
  }).then((item) => {
    if (categories.length == 0) {
      return res.status(403).json({ created: 'Failure', id: item.id });
    };
    categories.forEach(catId => {
      var newItemCategory = ItemCategory.create({
        ItemId: item.id, // don't know why these have to capital also but I spent way too much time trying to figure that out
        CategoryId: catId
      });
    });
    // console.log("adding: " + Object.keys(ItemCategory.rawAttributes));
    return res.json({ created: 'Success' });
  }).catch(() => {
    return res.status(403).json({ created: 'Failure', id: item.id });
  });
});

router.put('/modifyItem', function (req, res) {
  const {
    id,
    name,
    price,
    stock,
    descShort,
    descLong,
  } = req.body;
  Item.findById(id).then((item) => {
    item.name = name;
    item.price = price;
    item.stock = stock;
    item.descShort = descShort;
    item.descLong = descLong;
    item.save().then(() => {
      return res.json({ modified: true, id: item.id });
    });
  }).catch(() => {
    return res.status(403).json({ modified: false });
  });
});

router.patch('/addStock/:id/:amount', function (req, res) {
  Item.findById(req.params.id).then((order) => {
    var newNum = order.stock + Number(req.params.amount);
    order.updateAttributes({
      stock: newNum,
    }).then((order1) => {
      res.json({ updated: true })
    });
  }).catch(() => {
    res.status(403).json({ updated: false })
  })
});

router.delete('/:id', function (req, res) {
  const idToDelete = req.params.id;
  Item.findById(idToDelete).then((item) => {
    item.destroy().then(() => {
      return res.json({ deleted: true });
    });
  }).catch(() => {
    return res.status(404).json({ deleted: false });
  });
});

module.exports = router;
