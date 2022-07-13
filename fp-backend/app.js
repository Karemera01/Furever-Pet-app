const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const petRouter = require("./routes/pet");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/users", userRouter);
app.use("/pets", petRouter);

app.use((err, req, res, next) => {
  res.send(err.message);
});

mongoose.connect("mongodb://localhost:27017/fureverDB", (err) => {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log("connected to DB ....");
  }
});

app.listen(8000, () => console.log("listening on port 8000"));
