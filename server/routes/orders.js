var express = require('express');
var router = express.Router();
const { Item, OrderItem, Order, User } = require('../models');

router.get('/', function (req, res) {
  Order.findAll().then((orders) => {
    res.json({ orders });
  });
});

router.get('/items/:id', function (req, res) {
  let itemList = [];
  Order.findById(req.params.id)
    .then((order) => {
      OrderItem.findAll({ where: { orderId: order.id } })
        .then((orderItems) => {
          let numberOfAsyncReturns = 0;
          orderItems.forEach(orderItem => {
            Item.findById(orderItem.ItemId)
              .then((item) => {
                itemList.push(item);
                numberOfAsyncReturns++;
                if (numberOfAsyncReturns == orderItems.length) {
                  res.json(itemList);
                };
              });
          });
        });
    }).catch(() => {
      res.status(404).json({ error: "Not Found" });
    });
});

router.get('/cart/:userId', function (req, res) {
  Order.findOne({ where: { userId: req.params.userId, shippingStatus: 'Cart' } })
    .then((order) => {
      if (order) {
        return res.json({ order });
      }
      else {
        User.findById(req.params.userId).then((user) => {
          var orderT = Order.build({
            shippingStatus: "Cart",
            totalPrice: 0.0,
            storePickup: false
          });
          orderT.setUser(user, { save: false });
          orderT.save().then((orderNew) => {
            return res.json({ orderT });
          });
        });
      }
    });
});

router.get('/:id', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    return res.json({ order });
  });
});

router.get('/user/:userId', function (req, res) {
  Order.findAll({
    where: {
      userId: req.param.userId,
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
      order.setUser(user, { save: false });
      order.save().then((order) => {
        res.json({ created: true })
      });
    })
    .catch(() => {
      res.json({ created: false });
    });
});

router.patch('/:id/:shippingStatus', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    order.updateAttributes({
      shippingStatus: req.params.shippingStatus,
    }).then((order1) => {
      res.json({ updated: true })
    });
  });
});

router.patch('/pickup/:id/:pickupBool', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    order.updateAttributes({
      storePickup: req.params.pickupBool,
    }).then((order1) => {
      res.json({ updated: true })
    });
  });
});

router.patch('/price/:id/:totalPrice', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    order.updateAttributes({
      totalPrice: req.params.totalPrice,
    }).then((order1) => {
      res.json({ updated: true })
    });
  }).catch(() => {
    res.status(403).json({ updated: false })
  })
});

router.delete('/:id', function (req, res) {
  Order.findById(req.params.id).then((order) => {
    order.destroy().then(() => {
      res.json({ deleted: true });
    });
  }).catch(() => {
    res.status(404).json({ deleted: false });
  });
});

module.exports = router;
