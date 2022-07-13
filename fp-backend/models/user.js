const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  birthDate: { type: Date },
  phone: { type: Number },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["breeder", "buyer"],
  },
  pets: [{ type: mongoose.Types.ObjectId, ref: "Pet" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
