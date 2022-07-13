const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeS";

exports.autherizeAll = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.status(400).send("Forbiden");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("Unauthorized--");
  }
};

exports.authBreeder = (req, res, next) => {
  if (req.user.role.toLowerCase() === "breeder") {
    next();
  } else {
    res.json({ msg: "Unauthorized..." });
  }
};

exports.authBuyer = (req, res, next) => {
  if (req.user.role.toLowerCase() === "buyer") {
    next();
  } else {
    res.json({ msg: "Unauthorized..." });
  }
};
