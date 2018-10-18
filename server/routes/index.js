const router = require("express").Router();
const routerUser = require("./user");
const routerArticle = require("./article");
const routerCategories = require("./category");
const routerComment = require("./comment");

router.use("/users", routerUser);
router.use("/articles", routerArticle);
router.use("/categories", routerCategories);
router.use("/comments", routerComment);

module.exports = router;
