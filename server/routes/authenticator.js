const { Session, User } = require('../models');

const Auth = {
  login: (username, password) =>
    User.findOne({ where: { username } }).then(user => {
      if (user && user.password === password) {
        return user.getSession().then(session => {
          let foundSession = session;
          if (!foundSession) {
            foundSession = Session.build();
          }
          foundSession.expiration = new Date(new Date().getTime() + 30 * 60000);
          foundSession.save().then(updatedSession => user.setSession(updatedSession));
          return foundSession;
        });
      }
      return Promise.reject(new Error('incorrect username or password'));
    }),
  logout: user =>
    user.getSession().then(session => {
      if (session) {
        return session.destroy().then(() => true);
      }
      return Promise.resolve(true);
    }),
  isAuthenticated: user =>
    user.getSession().then(
      session => {
        if (session) {
          if (session.expiration.getTime() > new Date().getTime()) {
            const updateSession = session;
            updateSession.expiration = new Date(new Date().getTime() + 30 * 60000);
            return session.save().then(() => true);
          }
          return this.logout(user).then(() => false);
        }
        return false;
      },
      () => false
    )
};

module.exports = Auth;
