var express = require('express');
var router = express.Router();
const { Category } = require('../models');

router.get('/', function (req, res) {
  Category.findAll().then((categories) => {
    return res.json({ categories });
  });
});

router.get('/parents', function (req, res) {
  Category.findAll({ where: { parentId: null } }).then((categories) => {
    return res.json({ categories });
  });
});

router.get('/:id', function (req, res) {
  Category.findById(req.params.id).then((category) => {
    return res.json({ category });
  });
});

router.get('/parent/:id', function (req, res) {
  Category.findAll({where: {parentId: req.params.id}}).then((category) => {
    return res.json({ category });
  });
});

router.put('/', function (req, res) {
  const {
    name,
    type,
    parentId,
  } = req.body;
  Category.create({
    name,
    type,
    parentId,
  }).then((category) => {
    res.json({ created: 'Success' });
  }).catch(() => {
    res.json({ created: 'Failure' });
  });
});

router.delete('/:id', function (req, res) {
  const idToDelete = req.params.id;
  Category.findById(idToDelete).then((category) => {
    category.destroy().then(() => {
      res.json({ delete: true });
    });
  }).catch(() => {
    res.json({ delete: false });
  });
});

module.exports = router;
