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


  User.create({
    username,
    password,
    lastName,
    firstName,
    type:"Customer",
  }).then((item) => {
    res.json({ created: 'Success' });
  }).catch(() => {
    //// TODO: check if user already made and return appropiate message
    res.json({ created: 'Failure' });
  });
});

module.exports = router;
