const express = require("express");
const mongoose = require("mongoose");
const uuid = require("uuid");

const mongoDB =
  "mongodb://root:rootpassword@mongo:27017/?authMechanism=DEFAULT";

const app = express();

const PORT = process.env.PORT || 8080;

const TodoModelSchema = new mongoose.Schema({
  todo: String,
  createdAt: Date,
});

const TodoModel = mongoose.model("TodoModel", TodoModelSchema);

mongoose
  .connect(mongoDB)
  .then(() => console.log("MongoDb connected"))
  .catch((e) => console.log("Error connecting to mongodb", e));

app.get("/", async (req, res) => {
  const todo = await new TodoModel({
    todo: uuid.v4(),
    createdAt: new Date(),
  }).save();
  console.log(todo);
  const todos = await TodoModel.find();
  return res.status(200).json({
    status: 200,
    message: "Hit!",
    todo,
    todos,
  });
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
