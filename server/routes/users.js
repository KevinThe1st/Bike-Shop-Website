var express = require('express');
var router = express.Router();
const { User } = require('../models');

/* GET users listing. */
router.get('/', function(req, res) {
  User.findAll().then((items) => {
    res.json({items});
  });
});

/* GET specific user listing. */
router.get('/:id', function(req, res) {
  User.findById(req.params.id).then((item) => {
    res.json({item});
  });
});

router.delete('/:id', function(req, res) => {
  const idToDelete = req.params.id;
  //// TODO: make sure person calling is admin
  Item.findById(idToDelete).then((item) => {
    item.destroy().then(() => {
      res.json({ delete: true });
    });
  }).catch(() => {
    res.json({ delete: false });
  });
});

module.exports = router;
