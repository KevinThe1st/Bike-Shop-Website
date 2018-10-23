var express = require('express');
var { User } = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post((req, res) => {
  const {
    username,
    password,
    lastName,
    firstName,
    type,
    createdAt,
    updatedAt,
  } = req.body;
  // validate potentially here
  User.create({
    username,
    password,
    lastName,
    firstName,
    type,
    createdAt,
    updatedAt,
  }).then((user) => {
    res.json(user);
  });
});

module.exports = router;
