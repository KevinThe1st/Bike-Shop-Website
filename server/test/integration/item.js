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

describe.only('Item', function () {
  describe('Get all items', function () {
    it('Returns 200 and all added items', function (done) {
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
                      assert.equal(res.body.items.length, 3);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Get items with prefix \'b\'', function () {
    it('Returns 200 and all items with prefix', function (done) {
      Item.create(validItem)
        .then(() => {
          Item.create(validItemExpensive)
            .then(() => {
              Item.create(validItemCheap)
                .then(() => {
                  request
                    .get('/items?search=b')
                    .expect(function (res) {
                      //console.log(res.body);
                      expect(res.body.items[0]).to.containSubset(validItemCheap);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Get all items by updatedAt', function () {
    it('Returns 200 and all items in chronological order', function (done) {
      Item.create(validItem)
        .then(() => {
          ;
          Item.create(validItemExpensive)
            .then(() => {
              Item.create(validItemCheap)
                .then(() => {
                  request
                    .get('/items/new')
                    .expect(function (res) {
                      //console.log(res.body);
                      expect(res.body.items[0]).to.containSubset(validItem);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Get all items by price low to high', function () {
    it('Returns 200 and all items sorted by price', function (done) {
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
                      expect(res.body.items[0]).to.containSubset(validItemCheap);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Get all items by price high to low', function () {
    it('Returns 200 and all items sorted by price', function (done) {
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
                      expect(res.body.items[0]).to.containSubset(validItemExpensive);
                    })
                    .expect(200)
                    .end(done);
                });
            });
        });
    });
  });

  describe('Get items with category id', function () {
    it('Invalid category id returns 404 and item as null', function (done) {
      Category.create(validCategory)
        .then((category) => {
          Item.create(validItem)
            .then(() => {
              request
                .get('/items/byCat/9999')
                .expect(function (res) {
                  //console.log(res.body);
                  assert.equal(res.body.item, null);
                })
                .expect(404)
                .end(done);
            });
        });
    });

    it('No item with category returns 404 and empty item array', function (done) {
      Category.create(validCategory)
        .then((category) => {
          Item.create(validItem)
            .then(() => {
              request
                .get('/items/byCat/' + category.id)
                .expect(function (res, err) {
                  //console.log(res.body);
                  assert.equal(res.body.itemCats.length, 0);
                })
                .expect(404)
                .end(done);
            });
        });
    });
  });

  describe('Get items with list of Item IDs', function () {
    it('All IDs invalid returns 404 and empty item array', function (done) {
      Item.create(validItem)
        .then(() => {
          request
            .put('/items/list')
            .send({
              ids: [9999]
            })
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.items.length, 0);
            })
            .expect(404)
            .end(done);
        });
    });

    it('At least one ID valid returns 200 and array with item', function (done) {
      Item.create(validItem)
        .then((item) => {
          request
            .put('/items/list')
            .send({
              ids: [item.id]
            })
            .expect(function (res, err) {
              //console.log(res.body);
              expect(res.body.items[0]).to.containSubset(validItem);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Get specific item by Item ID', function () {
    it('Invalid ID returns 404 and null item', function (done) {
      Item.create(validItem)
        .then(() => {
          request
            .get('/items/9999')
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.item, null)
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid ID returns 200 and correct item', function (done) {
      Item.create(validItem)
        .then((item) => {
          request
            .get('/items/' + item.id)
            .expect(function (res) {
              //console.log(res.body);
              expect(res.body.item).to.containSubset(validItem);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Create an item with categories', function () {
    it('Empty categories array returns 403 and "created: Failure"', function (done) {
      Category.create(validCategory)
        .then(() => {
          request
            .put('/items')
            .send({
              "name": "chair",
              "stock": 10,
              "descShort": "short description",
              "descLong": "long description",
              "picName": "pic",
              "categories": []
            })
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.created, 'Failure');
            })
            .expect(403)
            .end(done);
        });
    });

    it.skip('Valid request returns 200 and "created: Success"', function (done) {
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
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.created, 'Success');
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Delete an item', function () {
    it('Invalid ID returns 404 and "deleted: false"', function (done) {
      Item.create(validItem)
        .then(() => {
          request
            .delete('/items/9999')
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.deleted, false);
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid ID returns 200 and "deleted: true"', function (done) {
      Item.create(validItem)
        .then((item) => {
          request
            .delete('/items/' + item.id)
            .expect(function (res) {
              //console.log(res.body);
              assert.equal(res.body.deleted, true);
            })
            .expect(200)
            .end(done);
        });
    });
  });
});
