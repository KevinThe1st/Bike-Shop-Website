var express = require('express');
var router = express.Router();
const { User } = require('../models');
const { Order } = require('../models');
const { Item } = require('../models');
const { OrderItem } = require('../models');

// function updateOrderTotal(order, orderItem, res){
//   order.totalPrice += orderItem.price;
//   order.save().then((order) => {
//     return res.json({ updated: 'Success' });
//   });
// }

function updateCartOrder(order, itemId, quantity, res) {
  Item.findOne({ where: {
    id: itemId
  }}).then((item) => {
    OrderItem.findOne({ where: {
      orderId: order.id,
      itemId
    } }).then((orderItem) => {
      if (orderItem) {
        order.totalPrice -= orderItem.price;
        orderItem.quantity += quantity;
        orderItem.price = item.price * orderItem.quantity;
        orderItem.save().then((orderItem) => {
          return res.json({ updated: 'Success' });
        });
      }
      else {
        var orderItemT = OrderItem.build({
          quantity,
          price: item.price * quantity
        });
        orderItemT.setOrder(order, {save: false});
        orderItemT.setItem(item, {save: false});
        orderItemT.save().then((orderItemNew) => {
          return res.json({ updated: 'Success' });
        });
      }
    });
  });
}

router.get('/:orderId', function (req, res) {
  OrderItem.findAll({ where: { orderId: req.params.orderId } }).then((items) => {
    return res.json({items});
  });
});

router.put('/cart', function (req, res) {
  const {
    userId,
    itemId,
    quantity,
  } = req.body;
  Order.findOne({
    where: {
      userId,
      shippingStatus: 'Cart'
    }
  }).then((order) => {
    if (order){
      updateCartOrder(order, itemId, quantity, res)
    }
    else{
      User.findById(userId).then((user) => {
        var orderT = Order.build({
          shippingStatus: "Cart",
          totalPrice: 0.0,
          storePickup: false
        });
        orderT.setUser(user, {save: false});
        orderT.save().then((orderNew) => {
          updateCartOrder(orderNew, itemId, quantity, res)
        });
      });
    }
  }).catch(() => {
    res.status(403).json({ updated: 'Failure' });
  });
});

router.put('/deleteItemFromCart', function (req, res) {
  const {
    itemId,
    orderId,
  } = req.body;
  OrderItem.destroy({
    where: {
      itemId: itemId,
      orderId: orderId
    },
    truncate: false
  }).then((orderItem) => {
    res.json({deleted: true})
  }).catch(() => {
    res.status(403).json({ deleted: false });
  });
});

module.exports = router;
