const jwt = require("jsonwebtoken");
const JWT_SECRET = "strongKeyPassword_jwt";

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
   
  } catch (err) {
    res.status(401).send({ error: "Access Denied (inavlid token)" })
  }

  next();
};

module.exports = fetchuser;
