var express = require('express');
var router = express.Router();
const { User } = require('../models');
const Auth = require('./authenticator');

/* CREATE user. */
router.post('/', function(req, res) {
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
  if(missingFields.length > 0){
    /*
     * I know I said I wanted this to be a 403 but the problem with
     * returning an error code is that I can't get any request
     * data back - chiefly the list of missing fields. Using
     * a 203 code for now.
     */
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
