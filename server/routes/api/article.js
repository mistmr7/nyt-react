const router = require("express").Router();
const articleController = require("../../controllers/articleController");

// Matches with "/api/articles"
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create)
  .delete(articleController.removeAll);

  
// Matches with "/api/articles/saved/
router.route("/saved")
  .get(articleController.findSaved)
  .delete(articleController.removeAll);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;
