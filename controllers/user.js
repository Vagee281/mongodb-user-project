const userModal = require("../models/user");

async function getAllUsers(req, res) {
  const users = await userModal.find({});

  return res.status(201).json(users);
}

async function addNewUser(req, res) {
  const currUser = req.body;
  const user = await userModal.create({
    firstName: currUser.first_name,
    lastName: currUser.last_name,
    email: currUser.email,
    gender: currUser.gender,
    role: currUser.role,
  });

  return res.status(201).json({ msg: "user added to database" });
}

async function getParticularUser(req, res) {
  const user = await userModal.findById(req.params.id);
  return res.status(201).json({ user });
}

async function deleteAUser(req, res) {
  const user = await userModal.findByIdAndDelete(req.params.id);

  return res.status(201).json({ message: "delete successful" });
}

async function updateAUser(req, res) {
  const updatedUser = await userModal.findByIdAndUpdate(req.params.id, {
    lastName: "scotland",
  });
  return res.status(201).json({ message: "update successful" });
}

module.exports = {
  getAllUsers,
  addNewUser,
  getParticularUser,
  deleteAUser,
  updateAUser,
};
