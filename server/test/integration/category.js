const { assert, expect, request, Category } = require('../common');

const validCategory = {
  "name": "bike"
};

const invalidCategory = {
  "??": "???"
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

  describe('Get all Parent Categories', function () {
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

  describe('Get Category by id', function () {
    it('Invalid ID returns 404', function (done) {
      Category.create(validCategory)
        .then((category) => {
          Category.create({
            "name": "mountain",
            "type": null,
            "parentId": category.id,
          })
            .then((category) => {
              request
                .get('/categories/9999')
                .expect(function (res) {
                  //console.log(res.body);
                })
                .expect(404)
                .end(done);
            });
        });
    });

    it('Valid ID returns 200', function (done) {
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
    it('Invalid request body returns 403', function (done) {
      request
        .put('/categories')
        .send(invalidCategory)
        .expect(function (res) {
          //console.log(res.body)
        })
        .expect(403)
        .end(done);
    });

    it('Valid request body returns 200', function (done) {
      request
        .put('/categories')
        .send(validCategory)
        .expect(function (res) {
          //console.log(res.body)
        })
        .expect(200)
        .end(done);
    });
  });

  describe('Delete a category', function () {
    it('Invalid ID returns 200', function (done) {
      Category.create(validCategory)
        .then((category) => {
          request
            .delete('/categories/9999')
            .expect(function (res) {
              //console.log(res.body)
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid ID returns 200', function (done) {
      Category.create(validCategory)
        .then((category) => {
          request
            .delete('/categories/' + category.id)
            .expect(function (res) {
              //console.log(res.body)
              assert.equal(Object.keys(res.body).length, 1);
              assert.equal(res.body.deleted, true);
            })
            .expect(200)
            .end(done);
        });
    });
  });
});