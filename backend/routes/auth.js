const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //to hash password
const jwt = require("jsonwebtoken"); // to create secure tokens for users
require("dotenv").config();
const fetchuser = require("../middleware/fetchuser.js");
const JWT_SECRET = process.env.JWT_SECRET;

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
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return res.send({ error: result.array() });
      }

      //check if user already exists
      let user = await User.findOne({ email: req.body.email });

      // if user does exists send 409 - conflict status code
      if (user) {
        return res
          .status(409)
          .json({ error: "A user account with this email id already exists" });
      }

      //genrating salt to use it with hash function for more secured hashed password
      const salt = await bcrypt.genSalt(10);
      //hashing function
      const hashedPassword = await bcrypt.hash(`${req.body.password}`, salt);

      // user creation using mongoose
      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      }).then((user) => {
        const data = {
          user: {
            id: user.id,
          },
        };
        //JWT token creation
        const jwt_create_Token = jwt.sign(data, JWT_SECRET);
        // After Successful user creation a JWT token is sent
        res.json({ success: true, jwt: jwt_create_Token });
      });
    } catch (error) {
      res.status(500).send("internal server error"); //dont write attacker understanding prompts
    }
  }
);

//Route 2 : verifying the user mail id by sending jwt token
router.get("/verify/:Authtoken", async (req, res) => {
  try {
    const token = req.params.Authtoken;

    if (!token) {
      res.status(400).json({ error: "not found" });
    }
    //verifying the jwt token
    jwt.verify(token, JWT_SECRET, async function (error, info) {
      if (error) {
        res.send("Email verification failed");
      } else {
        //After successful email verification user's verified paramater is updated to be true
        let user = await User.findById(info.user.id);
        user.verified = true;
        user
          .save()
          .then(() => {
            res.send({ success: true });
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      }
    });
  } catch (error) {
    res.status(500).send("internal server error"); //dont write attacker understanding prompts
  }
});

//Route 3 : authorizing a user using : POST "/api/auth/login" no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result) {
        return res.json({ error: result.array() });
      }

      //destructuring
      const { email, password } = req.body;
      //checking if user exists
      let user = await User.findOne({ email });

      // if user does not exists send 400 - not found status code
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please Enter correct credentials" }); //dont write attacker understanding prompts
      }

      //password comparision
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Please Enter correct credentials" }); //dont write attacker understanding prompts
      }

      //checking if user's email verification is done or not
      if (!user.verified) {
        res.json({ e_verification: false });
      } else {
        const payLoad = {
          user: {
            id: user.id,
          },
        };
        //JWT token creation
        const jwt_auth_Token = jwt.sign(payLoad, JWT_SECRET);
        // After Successful user login a JWT token is sent
        res.json({ success: true, jwt: jwt_auth_Token });
      }
    } catch (error) {
      res.send("internal server error"); //dont write attacker understanding prompts
    }
  }
);

//Route 4 : getting details of a logged in  user using : post "/api/auth/getuser" login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = await req.user.id;
    let user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send(" internal server error");
  }
});

module.exports = router;
