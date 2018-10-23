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

router.get('/login', function(req, res) {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  User.findOne({where: { username: user.username}}).then(u => {
    if(u.password = user.password) {
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
