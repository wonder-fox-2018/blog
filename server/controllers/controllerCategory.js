const Category = require('../models/categoryModel')

class CategoryController {

  static getCategory(req, res) {
    Category.find()
      .then(data => {

        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (data[i].name < data[j].name) {
              let swapper = data[i]
              data[i] = data[j]
              data[j] = swapper
            }
          }
        }

        res.status(200).json({
          status: 'success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: 'Failed to get categories'
        })
      })
  }

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
