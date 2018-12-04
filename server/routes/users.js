var express = require('express');
var router = express.Router();
const { User } = require('../models');
const Auth = require('./authenticator');

/* GET users listing. */
router.get('/', function(req, res) {
  User.findAll().then((users) => {
    res.json({users});
  });
});

/* GET specific user listing. */
router.get('/:id', function(req, res) {
     User.findById(req.params.id).then((user) => {
       res.json({user});
     });
   });

router.put('/edit', function(req, res) {
  const { id, firstName, lastName, username, password } = req.body;
  User.findById(id).then((user) => {
    if(user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.password = password;
        user.save().then(user => {
          return res.json({ updated: user.id });
        });
    }
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

  Auth.login(username, password).then(
    session => {
      if (session) {
        session.getUser().then(user => {
          res.json({ user_id: user.id, type: user.type });
        });
      } else {
        res.status(403).json({ error: 'you are not logged in' });
      }
    },
    error => {
      res.status(403).json({ error: error.message });
    }
  );
});

router.delete('/:id', function(req, res) {
  const idToDelete = req.params.id;
  //// TODO: make sure person calling is admin
  User.findById(idToDelete).then((user) => {
    user.destroy().then(() => {
      res.json({ delete: true });
    });
  }).catch(() => {
    res.json({ delete: false });
  });
});

module.exports = router;
