const { assert, expect, request, Item } = require('../common');

const validItem = {
  "price": 399.99,
  "stock": 10,
  "descShort": "short description",
  "descLong": "long description",
  "category": "bike",
};

describe('Item', function () {
  describe('Get all items', function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then(() => {
          request
            .get('/items')
            .expect(function (res) {
              console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Create an item', function () {
    it('Return 200', function (done) {
      request
        .put('/items')
        .send(validItem)
        .expect(function (res) {
          console.log(res.body);
        })
        .expect(200)
        .end(done);
    });
  });

  describe('Delete an item', function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then((item) => {
          request
            .delete('/items/' + item.id)
            .expect(function (res) {
              console.log(res.body);
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
});
