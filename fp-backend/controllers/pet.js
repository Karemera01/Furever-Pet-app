const Pet = require("../models/pet");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.createPet = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.body.user_Id);
  try {
    const pet = await Pet.create(req.body);
    const user = await User.findById(userId);
    const petId = mongoose.Types.ObjectId(pet._id);
    user.pets.push(petId);
    user.save();
    return res.status(201).json({ msg: "succfully created", pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getAllPets = async (req, res) => {
  const { role } = req.user;
  const userId = mongoose.Types.ObjectId(req.user.userId);
  try {
    if (role.toLowerCase() === "breeder") {
      await User.findById(userId)
        .populate("pets")
        .exec()
        .then((user) => {
          res.status(200).json({ pets: user.pets });
        });
    } else {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const long = Number(req.query.long);
      const lat = Number(req.query.lat);

      if (page && limit) {
        const start = (page - 1) * limit;
        const pets = await Pet.find();
        const result = await Pet.find()
          .limit(limit)
          .skip(start)
          .sort({ createdAt: 1, location: 1 })
          .exec();
        return res.status(200).json({ pets: result, total: pets.length });
      }
      if (long && lat) {
        const nearbyPets = await Pet.find({
          location: { $near: [long, lat], $maxDistance: 0.1 },
        });
        return res.status(200).json({ pets: nearbyPets });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getSinglePet = async (req, res) => {
  const _id = req.params.id;
  try {
    const pet = await Pet.findOne({ _id });
    return res.status(200).json({ pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updatePet = async (req, res) => {
  const _id = req.params.id;
  try {
    const pet = await Pet.updateOne({ _id }, { $set: req.body });
    return res.status(200).json({ pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.patchImage = async (req, res) => {
  const _id = req.params.id;
  try {
    const pet = await Pet.updateOne({ _id }, { $set: { img: req.file.path } });
    return res.status(200).json({ pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deletePet = async (req, res) => {
  const _id = req.params.id;
  try {
    const pet = await Pet.deleteOne({ _id });
    return res.status(200).json({ pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.addRequest = async (req, res) => {
  const pet_id = req.params.pet_id;
  try {
    const pet = await Pet.updateOne(
      { _id: pet_id },
      { $push: { adoptionRequests: req.body } }
    );
    return res.status(200).send(pet);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.removeRequest = async (req, res) => {
  const { pet_id, request_id } = req.params;
  try {
    const pet = await Pet.updateOne(
      { _id: pet_id },
      { $pull: { adoptionRequests: { _id: request_id } } }
    );
    return res.status(200).send(pet);
  } catch (error) {
    res.status(500).json({ error });
  }
};
