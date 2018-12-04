var express = require('express');
var router = express.Router();
const { User } = require('../models');
const Auth = require('./authenticator');

/* GET users listing. */
router.get('/', function (req, res) {
  User.findAll().then((users) => {
    res.json({ users });
  });
});

/* GET specific user listing. */
router.get('/:id', function (req, res) {
  User.findById(req.params.id).then((user) => {
    if (user == null) {
      res.status(404).json({ user });
    } else {
      res.json({ user });
    }
  });
});

router.put('/login', function (req, res) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if (!password) {
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

router.delete('/:id', function (req, res) {
  User.findById(req.params.id).then((user) => {
    if (user == null) {
      res.status(404).json({ deleted: false });
    }
    else {
      user.destroy().then(() => {
        res.json({ deleted: true });
      });
    }
  });
});

module.exports = router;
