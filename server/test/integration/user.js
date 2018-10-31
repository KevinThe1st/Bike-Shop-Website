const {assert, expect, request, User} = require('../common');

const validUser = {
  "username": "jccho",
  "password": "password",
  "lastName": "Cho",
  "firstName": "Justin",
};

describe('User', function() {
  describe('Get all users', function() {
    it('Return 200', function(done) {
      User.create(validUser)
      .then(() => {
        request
        .get('/users')
        .expect(200)
        .expect(function(res) {
          assert.equal(Object.keys(res.body).length, 1);
          assert(res.body.items)
        })
        .end(done);
      });
    });
  });
  
  describe('Register a user', function() {
    it('Return 200', function(done) {
      request
      .put('/register')
      .send(validUser)
      .expect(200)
      .end(done);
    });
  });
  
  describe('Delete a user', function() {
    it('Return 200', function(done) {
      User.create(validUser)
      .then((user) => {
        request
        .delete('/users/' + user.id)
        .expect(200)
        .expect(function(res) {
          assert.equal(Object.keys(res.body).length, 1);
          assert.equal(res.body.delete, true);
        })
        .end(done);
      });
    });
  });
});
