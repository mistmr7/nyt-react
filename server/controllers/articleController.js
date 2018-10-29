const db = require('../models')

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findSaved: function(req, res) {
    db.Article
      .find({"saved": true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body, function(err, result){
        if (err) {
          return err
        } else {
          res.json(result)
        }
      })
      // .then(dbModel => res.json(dbModel))
      // .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeAll: function(req, res) {
    console.log()
    db.Article
      .deleteMany({})
      // .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(423).json(err));
  }
};