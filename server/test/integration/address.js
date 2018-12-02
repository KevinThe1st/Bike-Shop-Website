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

describe('Address', function () {
  describe('Get all addresses', function () {
    it('Return 200', function (done) {
      createAddress()
        .then(() => {
          request
            .get('/addresses')
            .expect(function (res) {
              console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });
  /*
  describe('Get, function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then(() => {
          Item.create(validItemExpensive)
            .then(() => {
              Item.create(validItemCheap)
                .then(() => {
                  request
                    .get('/items?search=c')
                    .expect(function (res) {
                      //console.log(res.body);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });
  /*
  describe('Get all items by updatedAt', function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then(() => {
          Item.create(validItemExpensive)
            .then(() => {
              Item.create(validItemCheap)
                .then(() => {
                  request
                    .get('/items/new')
                    .expect(function (res) {
                      //console.log(res.body);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Get all items by price low to high', function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then(() => {
          Item.create(validItemExpensive)
            .then(() => {
              Item.create(validItemCheap)
                .then(() => {
                  request
                    .get('/items/pricesLow')
                    .expect(function (res) {
                      //console.log(res.body);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Get all items by price high to low', function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then(() => {
          Item.create(validItemExpensive)
            .then(() => {
              Item.create(validItemCheap)
                .then(() => {
                  request
                    .get('/items/pricesHigh')
                    .expect(function (res) {
                      //console.log(res.body);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Create an item with categories', function () {
    it('Return 200', function (done) {
      Category.create(validCategory)
        .then((category) => {
          request
            .put('/items')
            .send({
              "name": "chair",
              "price": 399.99,
              "stock": 10,
              "descShort": "short description",
              "descLong": "long description",
              "picName": "pic",
              "categories": [category.id]
            })
            .expect(function (res, err) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Delete an item', function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then((item) => {
          request
            .delete('/items/' + item.id)
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .expect(function (res) {
              assert.equal(Object.keys(res.body).length, 1);
              assert.equal(res.body.delete, true);
            })
            .end(done);
        });
    });
  });
  */
});
