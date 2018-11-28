var express = require('express');
var router = express.Router();
const { Order } = require('../models');
const { OrderItem } = require('../models');

router.get('/:orderId', function (req, res) {
  OrderItem.findAll({ where: { orderId: req.params.orderId } }).then((items) => {
    return res.json({items});
  });
});

module.exports = router;
