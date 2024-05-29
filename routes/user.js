const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addNewUser,
  getParticularUser,
  deleteAUser,
  updateAUser,
} = require("../controllers/user");
router.route("/").get(getAllUsers).post(addNewUser);

//get details of a particular user
router
  .route("/:id")
  .get(getParticularUser)
  .delete(deleteAUser)
  .patch(updateAUser);

module.exports = router;
