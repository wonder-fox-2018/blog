const Category = require("../models/category");

module.exports = {
  create: function(req, res) {
    Category.create({ name: req.body.name })
      .then(category => {
        res.status(201).json({
          category,
          message: `create category : ${req.body.name} success`
        });
      })
      .catch(err => {
        res.status(500).json({
          err: err.errors.name.message,
          message: `create category : ${req.body.name} failed`
        });
      });
  },
  findAll: function(req, res) {
    Category.find()
      .then(categories => {
        res.status(201).json({
          categories
        });
      })
      .catch(err => {
        res.status(404).json({ err });
      });
  }
};
