var express = require('express');
var router = express.Router();
const { Address, User } = require('../models');

router.get('/', function (req, res) {
  Address.findAll().then((addresses) => {
    res.json({ addresses });
  });
});

router.get('/:addressId', function (req, res) {
  Address.findById(req.params.addressId).then((address) => {
    res.json({ address });
  });
});

router.get('/user/:userId', function (req, res) {
     Address.findAll({ where: { userId: req.params.userId } }).then((addresses) => {
       return res.json({ addresses });
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
        res.json({ created: 'Success' })
      });
    })
    .catch(() => {
      res.json({ created: 'Failure' });
    });
});

router.delete('/:id', function (req, res) {
  Address.findById(req.params.id).then((address) => {
    address.destroy().then(() => {
      res.json({ deleted: 'Success' });
    });
  }).catch(() => {
    res.json({ deleted: 'Failure' });
  });
});

module.exports = router;
