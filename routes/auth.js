const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //to hash password
const jwt = require("jsonwebtoken"); // to create secure tokens for users

const JWT_SECRET = "strongKeyPassword_jwt";
const fetchuser = require("../middleware/fetchuser.js");

//Route 1 : creating a user using : POST "/api/auth/createuser" no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isString(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.send({ error: result.array() });
    }

    //check if user already exists
    

    if (user) {
      return res
        .status(400)
        .json({ error: "A user account with this email id already exists" });
    }

    //genrating salt to use it with hash function for more secured hashed password
    const salt = await bcrypt.genSalt(10);
    //hashing function
    const hashedPassword = await bcrypt.hash(`${req.body.password}`, salt);

    user = User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
      .then((user) => {
        const data = {
          user: {
            id: user.id,
          },
        };
        const jwt_create_Token = jwt.sign(data, JWT_SECRET);
        res.json({success:true,jwt:jwt_create_Token});
      })
      .catch((err) => {
        console.log(`error in User creation : ${err.message}`);
        res.status(500).send("some error occured");
      });
  }
);

//Route 2 : authorizing a user using : POST "/api/auth/login" no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result) {
      return res.json({ error: result.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });//user exisrts\
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please Enter correct credentials" }); //dont write attacker understanding prompts
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Please Enter correct credentials" }); //dont write attacker understanding prompts
      }

      const payLoad = {
        user: {
          id: user.id,
        },
      };

      const jwt_auth_Token = jwt.sign(payLoad, JWT_SECRET);
      res.json({success:true, jwt:jwt_auth_Token});
    } catch (error) {
      console.log(`error in login:  ${error.message}`);
      res.status(500).send("some error occured"); //dont
    }
  }
);

//Route 3 : getting details of a logged in  user using : post "/api/auth/getuser" login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = await req.user.id;
    let user = await User.findById(userID).select("-password");
    res.send(user)
  } catch (error) {
    res.send(" internal server error")
  }
});

module.exports = router;
