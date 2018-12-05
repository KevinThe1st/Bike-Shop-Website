const { assert, expect, request, Address, User } = require('../common');

const createUser = () => User.create({
  "username": `username${new Date().getTime()}`,
  "password": "password",
  "lastName": "Cho",
  "firstName": "Justin",
})

const createAddress = () => createUser().then((user) => {
  var address = Address.build({
    "type": "Billing",
    "street1": "123 Sesame Street",
    "street2": "AAAAAAAAAAAA",
    "city": "New York",
    "state": "NY",
    "zip": "45678",
  })
  address.setUser(user, {save: false});
  return address.save();
});

//Deadlock issue: Run one at a time

describe.skip('Address', function () {
  describe('Get all Addresses', function () {
    it('Return 200', function (done) {
      createAddress()
        .then(() => {
          request
            .get('/addresses')
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Get Address by ID', function () {
    it('Invalid ID returns 404', function (done) {
      createAddress()
        .then(() => {
          request
            .get('/addresses/9999')
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid ID returns 200', function (done) {
      createAddress()
        .then((address) => {
          request
            .get('/addresses/' + address.id)
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Create Specific Address', function () {
    it('Invalid user ID returns 404', function (done) {
      createUser()
        .then((user) => {
          request
            .put('/addresses/')
            .send({
              "type": "Billing",
              "street1": "123 Sesame Street",
              "street2": "AAAAAAAAAAAA",
              "city": "New York",
              "state": "NY",
              "zip": "45678",
              "userId": 9999
            })
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid request body returns 200', function (done) {
      createUser()
        .then((user) => {
          request
            .put('/addresses/')
            .send({
              "type": "Billing",
              "street1": "123 Sesame Street",
              "street2": "AAAAAAAAAAAA",
              "city": "New York",
              "state": "NY",
              "zip": "45678",
              "userId": user.id
            })
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Delete Specific Address', function () {
    it('Invalid ID returns 404', function (done) {
      createAddress()
        .then(() => {
          request
            .delete('/addresses/9999')
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid ID returns 200', function (done) {
      createAddress()
        .then((address) => {
          request
            .delete('/addresses/' + address.id)
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });
});
