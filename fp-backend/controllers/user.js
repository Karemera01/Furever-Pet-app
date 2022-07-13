const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const PRIVATE_KEY = "C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeS";

exports.signUp = async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const user = await User.create(req.body);
      const salt = await bcrypt.genSalt(5);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      return res.status(201).json({ msg: "Account succesfully created" });
    }
    return res.status(400).json({ msg: "Email is already registered" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const salt = await bcrypt.genSalt(5);
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          PRIVATE_KEY
        );
        return res.status(200).json({ token });
      }
    }
    return res.status(400).json({ msg: "please provide valid credentials" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.checkPassword = async (req, res) => {
  try {
    const email = req.params.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return res.status(200).send(user);
      }
    }
    return res.status(400).json({ msg: "please provide valid credentials" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};
