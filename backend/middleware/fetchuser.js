const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  //get the JWT token from request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Access Denied (inavlid token)" });
  }

  // verify the JWT Token if matches send the payload to user else terminates
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Access Denied (inavlid token)" });
  }
};

module.exports = fetchuser;
