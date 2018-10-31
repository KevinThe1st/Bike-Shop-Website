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
  } = req.body;

  var missingFields = []
  if(!username){
    missingFields.push("username");
  }
  if(!password){
    missingFields.push("password");
  }
  if(!lastName){
    missingFields.push("lastName");
  }
  if(!firstName){
    missingFields.push("firstName");
  }
  if(missingFields == []){
    return res.status(422).json({
      missing: missingFields
    });
  }

  User.findOne({ where: { username } }).then(user => {
    if(user) {
      return res.status(403).json({
        error: "username already taken."
      });
    }
    User.create({
      username,
      password,
      lastName,
      firstName,
      type:"Customer",
    }).then((item) => {
      res.json({ created: 'Success' });
    }).catch(() => {
      res.status(403).json({ created: 'Failure' });
    });
  });
});

module.exports = router;
