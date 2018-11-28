var express = require('express');
var router = express.Router();
const { Order } = require('../models');

router.get('/', function (req, res) {
  Order.findAll().then((orders) => {
    res.json({ orders });
  });
});

router.get('/:userId', function (req, res) {
  Order.findAll({ where: { userId: req.params.userId } }).then((orders) => {
    return res.json({ orders });
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
