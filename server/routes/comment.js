const router = require("express").Router();
const Controller = require("../controllers/commentController");
const isLogin = require("../middleware/isLogin");
const autDataComment = require("../middleware/authDataComment");

router.post("/:id", isLogin, Controller.create);
router.put("/update/:id", isLogin, autDataComment, Controller.update);
router.delete("/remove/:id", isLogin, autDataComment, Controller.remove);

module.exports = router;
