const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

// ROUTES

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
