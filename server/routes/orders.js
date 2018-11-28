var express = require('express');
var router = express.Router();
const { Order, User } = require('../models');

router.get('/', function (req, res) {
  Order.findAll().then((orders) => {
    res.json({ orders });
  });
});

router.get('/:id', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    res.json({ order });
  });
});

router.get('/user/:id', function (req, res) {
  Order.findAll({
    where: {
      userId: req.param.id,
    }
  }).then((orders) => {
    res.json({ orders });
  });
});

router.put('/', function (req, res) {
  const {
    shippingStatus,
    totalPrice,
    storePickup,
  } = req.body;
  Order.create({
    shippingStatus,
    totalPrice,
    storePickup,
  }).then((order) => {
    res.json({ created: 'Success' });
  }).catch(() => {
    res.json({ created: 'Failure' });
  });
});

router.delete('/:id', function (req, res) {
  const idToDelete = req.params.id;
  Order.findById(idToDelete).then((order) => {
    Order.destroy().then(() => {
      res.json({ delete: true });
    });
  }).catch(() => {
    res.json({ delete: falseitem });
  });
});

module.exports = router;
