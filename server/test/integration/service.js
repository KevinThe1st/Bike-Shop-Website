const { assert, expect, request, Service } = require('../common');

const validService = {
  "name": "Bike Fix",
  "desc": "Fix bike",
  "picName": "dudefixingbike.gif"
};

describe('Service', function () {
  describe('Get All Services', function () {
    it('Returns 200', function (done) {
      Service.create(validService)
        .then(() => {
          request
            .get('/services')
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Create Specific Service', function () {
    it('Invalid request body returns 404', function (done) {
      request
        .put('/textbox')
        .send({ desc: "Yo what up" })
        .expect(function (res) {
          //console.log(res.body);
        })
        .expect(404)
        .end(done);
    });

    it('Valid request body returns 200', function (done) {
      request
        .put('/textbox')
        .send(validService)
        .expect(function (res) {
          //console.log(res.body);
        })
        .expect(200)
        .end(done);
    });
  });
});