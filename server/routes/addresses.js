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
    if (address == null)
      return res.status(404).json({ error: "Not Found" });
    return res.json({ address });
  });
});

router.get('/user/:userId', function (req, res) {
  Address.findAll({ where: { userId: req.params.userId } }).then((addresses) => {
    return res.json({ addresses });
  }).catch(() => {
    res.status(404).json({ error: "Not Found" });
  });
});


router.put('/edit', function(req, res) {
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
      if (user == null)
        return res.status(404).json({ created: false });
      Address.findAll({ where: { userId: req.params.userId } }).then((addresses) => {
      if (addresses) {
           for (var i = 0; i < addresses.length; i++) {
                if (addresses[i].type == type) {
                    addresses[i].street1 = street1;
                    addresses[i].street2 = street2;
                    addresses[i].city = city;
                    addresses[i].state = state;
                    addresses[i].zip = zip;
                    addresses[i].save().then(address => {
                    return res.json({ updated: address.id });
                   });
                   break;
               }
           }
      }
      else {
        console.log("dab");
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
            return res.json({ created: true })
         })
      }
    })
    }).catch(() => {
      return res.status(403).json({ created: false });
    })
    .catch(() => {
      return res.status(403).json({ created: false });
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
      if (user == null)
        return res.status(404).json({ created: false });
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
        return res.json({ created: true })
      })
    }).catch(() => {
      return res.status(403).json({ created: false });
    })
    .catch(() => {
      return res.status(403).json({ created: false });
    });
});

router.delete('/:id', function (req, res) {
  Address.findById(req.params.id).then((address) => {
    if (address == null)
      return res.status(404).json({ deleted: false });
    address.destroy().then(() => {
      res.json({ deleted: true });
    });
  })
});

module.exports = router;
