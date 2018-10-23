var express = require('express');
var router = express.Router();
const { User } = require('../models');

/* CREATE user. */
router.put('/', function(req, res) {
  const {
    username,
    password,
    lastName,
    firstName,
    type,
  } = req.body;
  User.create({
    username,
    password,
    lastName,
    firstName,
    type,
  }).then((item) => {
    res.json({ created: 'Success' });
  }).catch(() => {
    //// TODO: check if user already made and return appropiate message
    res.json({ created: 'Failure' });
  });
});

module.exports = router;
