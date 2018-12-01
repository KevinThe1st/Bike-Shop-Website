const { assert, expect, request, Category, Item } = require('../common');

const validItem = {
  "name": "chair",
  "price": 399.99,
  "stock": 10,
  "descShort": "short description",
  "descLong": "long description",
  "picName": "pic",
};

const validItemExpensive = {
  "name": "car",
  "price": 399999.99,
  "stock": 10,
  "descShort": "short description",
  "descLong": "long description",
  "picName": "pic",
};

const validItemCheap = {
  "name": "bag",
  "price": 3.99,
  "stock": 10,
  "descShort": "short description",
  "descLong": "long description",
  "picName": "pic",
};

const validCategory = {
  "name": "Overpriced",
  "type": null,
};

describe('Item', function () {
  describe('Get all items', function () {
    it('Return 200', function (done) {
      Item.create(validItem)
        .then(() => {
          Item.create(validItemExpensive)
            .then(() => {
              Item.create(validItemCheap)
                .then(() => {
                  request
                    .get('/items')
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

  describe('Get items with prefix \'c\'', function () {
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

  describe('Create an item', function () {
    it('Return 200', function (done) {
      request
        .put('/items')
        .send(validItem)
        .expect(function (res) {
          //console.log(res.body);
        })
        .expect(200)
        .end(done);
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
});
