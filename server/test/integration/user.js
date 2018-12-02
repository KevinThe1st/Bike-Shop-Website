const { assert, expect, request, User } = require('../common');

const validUser = {
  "username": "jccho",
  "password": "password",
  "lastName": "Cho",
  "firstName": "Justin",
};

describe('User', function () { 
  describe('Register a user', function () {
    it('Valid body returns 200', function (done) {
      request
        .put('/register')
        .send(validUser)
        .expect(function (res) {
          //console.log(res.body);
        })
        .expect(200)
        .end(done);
    });
  });
  
  describe('Get all users', function () {
    it('Returns 200', function (done) {
      User.create(validUser)
        .then(() => {
          request
            .get('/users')
            .expect(200)
            .expect(function (res) {
              //console.log(res.body);
            })
            .end(done);
        });
    });
  });

  describe('Get user by id', function () {
    it('Valid id returns 200', function (done) {
      User.create(validUser)
        .then((user) => {
          request
            .get('/users/' + user.id)
            .expect(200)
            .expect(function (res) {
              //console.log(res.body);
            })
            .end(done);
        });
    });
  });

  describe('Delete a user', function () {
    it('Valid id returns 200', function (done) {
      User.create(validUser)
        .then((user) => {
          request
            .delete('/users/' + user.id)
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(Object.keys(res.body).length, 1);
              assert.equal(res.body.deleted, true);
            })
            .expect(200)
            .end(done);
        });
    });
  });
});
