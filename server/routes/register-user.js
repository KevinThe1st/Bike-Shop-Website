var express = require('express');
var router = express.Router();
const { User } = require('../models');
const Auth = require('./authenticator');

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
    return res.status(203).json({
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
      Auth.login(item.username, item.password).then(
        session => {
          if (session) {
            res.json({ user_id: item.id });
          } else {
            res.status(403).json({ error: 'you are not logged in' });
          }
        },
        error => {
          res.status(403).json({ error: error.message });
        }
      );
    }).catch(() => {
      res.status(403).json({ created: 'Failure' });
    });
  });
});

module.exports = router;
