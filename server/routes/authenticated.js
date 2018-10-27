const { User } = require('../models');
const Auth = require('./authenticator');

function notAuthenticated(response) {
  response.status(403).json({
    msg: 'You must be authenticated to access this resource'
  });
}

function authenticated(req, res, next) {
  const userId = req.get('user_id');
  if (userId) {
    User.findById(userId).then(user => {
      if (user) {
        Auth.isAuthenticated(user).then(isAuthenticated => {
          if (isAuthenticated) {
            req.authenticatedUser = user;
            next();
          } else {
            notAuthenticated(res);
          }
        });
      } else {
        notAuthenticated(res);
      }
    });
  } else {
    notAuthenticated(res);
  }
}

module.exports = authenticated;
