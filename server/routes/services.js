var express = require('express');
var router = express.Router();
const { Service } = require('../models');

router.get('/', function(req, res) {
  Service.findAll().then((items) => {
    res.json({items});
  });
});

router.put('/', function(req, res) {
  const {
    name,
    desc,
    picName,
  } = req.body;
  if (name == null || name.length == 0)
    return res.status(404).json({ error: "Service needs a name" });
  Service.findOne({ where: { name: name } }).then(item => {
    if(item) {
      item.desc = desc;
      item.picName = picName;
      item.save().then(item => {
        return res.json({ updated: item.name });
      });
    }
    Service.create({
      name,
      desc,
      picName
    }).then((item) => {
      res.json({ created: item.name })
    }).catch(() => {
      res.status(403).json({ created: false });
    });
  });
});

module.exports = router;
