const express = require("express");
const { connectMongodb } = require("./connection");
const { logreqres } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;
//establish connection
connectMongodb("mongodb://127.0.0.1:27017/mongodb-userproject-1")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("mongodb not connected");
  });

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logreqres("./log.txt"));

//routes
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
