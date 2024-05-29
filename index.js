const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;
//establish connection
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect("mongodb://127.0.0.1:27017/mongodb-userproject-1")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(() => {
    console.log("database not connected");
  });
///create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);
//create model
const userModal = mongoose.model("newusers", userSchema);

//get all users
app.get("/users", async (req, res) => {
  const users = await userModal.find({});

  return res.status(201).json(users);
});

//add a new user
app.post("/users", async (req, res) => {
  const currUser = req.body;
  const user = await userModal.create({
    firstName: currUser.first_name,
    lastName: currUser.last_name,
    email: currUser.email,
    gender: currUser.gender,
    role: currUser.role,
  });

  return res.status(201).json({ msg: "user added to database" });
});

//get details of a particular user
app.get("/users/:id", async (req, res) => {
  const user = await userModal.findById(req.params.id);
  return res.status(201).json({ user });
});

// delete a particular user
app.delete("/users/:id", async (req, res) => {
  const user = await userModal.findByIdAndDelete(req.params.id);

  return res.status(201).json({ message: "delete successful" });
});

//update a particular user
app.patch("/users/:id", async (req, res) => {
  const updatedUser = await userModal.findByIdAndUpdate(req.params.id, {
    lastName: "scotland",
  });
  return res.status(201).json({ message: "update successful" });
});
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
