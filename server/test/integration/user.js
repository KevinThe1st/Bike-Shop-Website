const { assert, expect, request, User } = require('../common');

const missingPasswordUser = {
  "username": "jccho",
  "lastName": "Cho",
  "firstName": "Justin",
};

const invalidUser = {
  "username": "jccho",
  "password": 123,
  "lastName": "Cho",
  "firstName": "Justin",
};

const validUser = {
  "username": "jccho",
  "password": "password",
  "lastName": "Cho",
  "firstName": "Justin",
};

describe('User', function () {
  describe('Get all users', function () {
    it('Returns 200 and added user appears in list', function (done) {
      User.create(validUser)
        .then(() => {
          request
            .get('/users')
            .expect(function (res) {
              //console.log(res.body);
              assert.containsAllKeys(res.body, ['users']);
              expect(res.body.users[0]).to.containSubset(validUser);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Get user by id', function () {
    it('Invalid id returns 404 and null user', function (done) {
      User.create(validUser)
        .then(() => {
          request
            .get('/users/' + 9999)
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.user, null);
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid id returns 200 and correct item', function (done) {
      User.create(validUser)
        .then((user) => {
          request
            .get('/users/' + user.id)
            .expect(function (res) {
              //console.log(res.body);
              expect(res.body.user).to.containSubset(validUser);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Create a user', function () {
    it('Missing param request body returns 203 and "missing: <param>"', function (done) {
      request
        .put('/register')
        .send(missingPasswordUser)
        .expect(function (res) {
          //console.log(res.body);
          expect(res.body.missing).to.contain('password');
        })
        .expect(203)
        .end(done);
    });

    it('Invalid request body returns 403 and "incorrect username or password"', function (done) {
      request
        .put('/register')
        .send(invalidUser)
        .expect(function (res) {
          //console.log(res.body);
          assert.equal(res.body.error, 'incorrect username or password');
        })
        .expect(403)
        .end(done);
    });

    it('Valid request body returns 200 and userId', function (done) {
      request
        .put('/register')
        .send(validUser)
        .expect(function (res) {
          //console.log(res.body);
          assert.containsAllKeys(res.body, ['user_id']);
        })
        .expect(200)
        .end(done);
    });
  });

  describe('Delete a user', function () {
    it('Invalid id returns 404 and "deleted: false"', function (done) {
      User.create(validUser)
        .then(() => {
          request
            .delete('/users/' + 9999)
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.deleted, false);
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid id returns 200 and "deleted: true"', function (done) {
      User.create(validUser)
        .then((user) => {
          request
            .delete('/users/' + user.id)
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.deleted, true);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Login a user', function () {
    it('Invalid pair returns 403 and "incorrect username or password "', function (done) {
      User.create(validUser)
        .then(() => {
          request
            .put('/users/login')
            .send({
              "username": "jccho",
              "password": "wrong"
            })
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.error, 'incorrect username or password');
            })
            .expect(403)
            .end(done);
        });
    });

    it.skip('Valid pair returns 200 (needs front end)', function (done) {
      User.create(validUser)
        .then(() => {
          request
            .put('/users/login')
            .send({
              "username": "jccho",
              "password": "password"
            })
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });
});
