const mongoose = require("mongoose");

const PetSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    petName: { type: String },
    birthDate: { type: Date },
    breed: { type: String },
    expectedSize: { type: Number },
    price: { type: Number },
    weight: { type: Number },
    parentBreed: { mom: { type: String }, dad: { type: String } },
    img: { type: String },
    adoptionRequests: [
      {
        type: new mongoose.Schema(
          {
            name: { type: String },
            email: { type: String },
            comment: { type: String },
          },
          { timestamps: true }
        ),
      },
    ],
    location: {
      type: [Number],
      required: true,
    },
    adopted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
