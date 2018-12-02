var express = require('express');
var router = express.Router();
const { Address, User } = require('../models');

router.get('/', function (req, res) {
  Address.findAll().then((addresses) => {
    res.json({ addresses });
  });
});

router.get('/:id', function (req, res) {
  Address.findById(req.params.id).then((address) => {
    res.json({ address });
  }).catch(() => {
    res.status(404).json({ error: "Not Found" });
  });
});

router.get('/user/:userId', function (req, res) {
  Address.findAll({ where: { userId: req.params.userId } }).then((addresses) => {
    return res.json({ addresses });
  }).catch(() => {
    res.status(404).json({ error: "Not Found" });
  });
});

router.put('/', function (req, res) {
  const {
    type,
    street1,
    street2,
    state,
    city,
    zip,
    userId
  } = req.body;

  User.findById(userId)
    .then((user) => {
      var address = Address.build({
        type,
        street1,
        street2,
        state,
        city,
        zip
      })
      address.setUser(user, { save: false });
      address.save().then((address) => {
        res.json({ created: true })
      });
    })
    .catch(() => {
      res.json({ created: false });
    });
});

router.delete('/:id', function (req, res) {
  Address.findById(req.params.id).then((address) => {
    address.destroy().then(() => {
      res.json({ deleted: true });
    });
  }).catch(() => {
    res.status(404).json({ deleted: false });
  });
});

module.exports = router;
