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

router.put('/login', function(req, res) {
  const { username, password } = req.body;
  if(!username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  User.findOne({where: { username: username}}).then(u => {
    if(u != null && u.password == password) {
      return res.json({ id: u.id, success: true });
    }
    else{
      return res.json({success: false});
    }
  });
});

router.delete('/:id', function(req, res) {
  const idToDelete = req.params.id;
  //// TODO: make sure person calling is admin
  User.findById(idToDelete).then((item) => {
    item.destroy().then(() => {
      res.json({ delete: true });
    });
  }).catch(() => {
    res.json({ delete: false });
  });
});

module.exports = router;
