const Category = require('../models/categoryModel')

class CategoryController {

  static createCategory(req, res) {
    let data = {
      name: req.body.name
    }

    let category = new Category(data)

    category.save()
      .then(data => {
        res.status(201).json({
          status: 'success',
          message: `creating category ${data.name} success`,
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: 'failed when creating categories'
        })
      })
  }

}

module.exports = CategoryController
