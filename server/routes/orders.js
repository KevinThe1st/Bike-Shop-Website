var express = require('express');
var router = express.Router();
const { Order, User } = require('../models');

router.get('/', function (req, res) {
  Order.findAll().then((orders) => {
    res.json({ orders });
  });
});

router.get('/cart/:userId', function (req, res) {
  Order.findOne({ where: { userId: req.params.userId, shippingStatus: 'Cart' } }).then((order) => {
    if (order) {
      return res.json({ order });
    }
    else{
      User.findById(req.params.userId).then((user) => {
        var orderT = Order.build({
          shippingStatus: "Cart",
          totalPrice: 0.0,
          storePickup: false
        });
        orderT.setUser(user, {save: false});
        orderT.save().then((orderNew) => {
          return res.json({ orderT });
        });
      });
    }
  });
});

router.get('/:userId', function (req, res) {
  Order.findAll({ where: { userId: req.params.userId } }).then((orders) => {
    return res.json({ orders });
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
    userId
  } = req.body;

  User.findById(userId)
    .then((user) => {
      var order = Order.build({
        shippingStatus,
        totalPrice,
        storePickup,
      })
      order.setUser(user, {save: false});
      order.save().then((order) => {
        res.json({ created: 'Success' })
      });
    })
    .catch(() => {
      res.json({ created: 'Failure' });
    });
  /*
  Order.create({
    shippingStatus,
    totalPrice,
    storePickup,
    //userId,
  }).then((order) => {
    res.json({ created: 'Success' });
  }).catch(() => {
    res.json({ created: 'Failure' });
  });
  */
});

router.patch('/:id/:shippingStatus', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    order.updateAttributes({
      shippingStatus: req.params.shippingStatus,
    });
  });
});

router.delete('/:id', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    order.destroy().then(() => {
      res.json({ delete: true });
    });
  }).catch(() => {
    res.json({ delete: falseitem });
  });
});

module.exports = router;
