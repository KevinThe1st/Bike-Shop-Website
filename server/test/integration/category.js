const { assert, expect, request, Category } = require('../common');

const validCategory = {
  "name": "bike",
  "type": null,
};

describe('Category', function () {
  describe('Get all Categories', function () {
    it('Return 200', function (done) {
      Category.create(validCategory)
        .then((category) => {
          Category.create({
            "name": "mountain",
            "type": null,
            "parentId": category.id,
          })
            .then(() => {
              request
                .get('/categories')
                .expect(function (res) {
                  //console.log(res.body);
                })
                .expect(200)
                .end(done);
            });
        });
    });
  });

  describe('Get all parent Categories', function () {
    it('Return 200', function (done) {
      Category.create(validCategory)
        .then((category) => {
          Category.create({
            "name": "mountain",
            "type": null,
            "parentId": category.id,
          })
            .then(() => {
              request
                .get('/categories/parents')
                .expect(function (res) {
                  //console.log(res.body);
                })
                .expect(200)
                .end(done);
            });
        });
    });
  });

  describe('Get category by id', function () {
    it('Return 200', function (done) {
      Category.create(validCategory)
        .then((category) => {
          Category.create({
            "name": "mountain",
            "type": null,
            "parentId": category.id,
          })
            .then((category) => {
              request
                .get('/categories/' + category.parentId)
                .expect(function (res) {
                  //console.log(res.body);
                })
                .expect(200)
                .end(done);
            });
        });
    });
  });

  describe('Create a category', function () {
    it('Return 200', function (done) {
      request
        .put('/categories')
        .send(validCategory)
        .expect(200)
        .end(done);
    });
  });

  describe('Delete a category', function () {
    it('Return 200', function (done) {
      Category.create(validCategory)
        .then((category) => {
          request
            .delete('/categories/' + category.id)
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