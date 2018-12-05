const { assert, expect, request, Textbox } = require('../common');

const validText = {
  "name": "Notifications",
  "text": "Yo what up"
};

describe('Textbox', function () {
  describe('Get Specific Textbox', function () {
    it('Invalid name returns 404', function (done) {
      Textbox.create(validText)
        .then(() => {
          request
            .get('/textbox/notfound')
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(404)
            .end(done);
        });
    });

    it('Valid name returns 200', function (done) {
      Textbox.create(validText)
        .then(() => {
          request
            .get('/textbox/' + validText.name)
            .expect(function (res) {
              //console.log(res.body);
            })
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Create Specific Textbox', function () {
    it('Invalid request body returns 404', function (done) {
      request
        .put('/textbox')
        .send({ name : "", text: "Yo what up" })
        .expect(function (res) {
          //console.log(res.body);
        })
        .expect(404)
        .end(done);
    });

    it('Valid request body returns 200', function (done) {
      request
        .put('/textbox')
        .send(validText)
        .expect(function (res) {
          //console.log(res.body);
        })
        .expect(200)
        .end(done);
    });
  });
});