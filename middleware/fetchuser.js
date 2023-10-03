const jwt = require("jsonwebtoken");
const JWT_SECRET = "strongKeyPassword_jwt";

const fetchuser = (req, res, next) => {
    console.log("hi")
  //get the user from jwt token and add id to req object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Access Denied (inavlid token)" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
   
  } catch (err) {
    res.status(401).send({ error: "Access Denied (inavlid token)" })
  }

  next();
};

module.exports = fetchuser;
