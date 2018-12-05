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
    if (category == null)
      return res.status(404).json({ category });
    return res.json({ category });
  });
});

router.get('/parent/:id', function (req, res) {
  Category.findAll({ where: { parentId: req.params.id } }).then((category) => {
    return res.json({ category });
  });
});

router.put('/', function (req, res) {
  const {
    name,
    parentId,
  } = req.body;
  if (name == null)
    return res.status(403).json({ created: false });
  Category.create({
    name,
    parentId,
  }).then((category) => {
    res.json({ created: true });
  }).catch(() => {
    res.status(403).json({ created: false });
  });
});

router.delete('/:id', function (req, res) {
  const idToDelete = req.params.id;
  Category.findById(idToDelete).then((category) => {
    category.destroy().then(() => {
      res.json({ deleted: true });
    });
  }).catch(() => {
    res.status(404).json({ deleted: false });
  });
});

module.exports = router;
