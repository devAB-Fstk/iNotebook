const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

//Token Signature
const JWT_SECRET = "firsttimeinnode2024";

//ROUTE-1 : Create a user using POST: '/api/auth/createuser' ------------------------------------------------------>>
router.post(
  "/createuser",
  [
    query("name", "Enter a valid name").isLength({ min: 3 }),
    query("email", "Enter a valid Email").isEmail(),
    query("password", " Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //if there are ERRORS , return bad request and the errors
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.status(400).json({ success,  error: toHaveErrorMessage.array() });
    }
    //check whether the user is already existing email or not
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ success, error: "user with this email is alredy exist" });
      }
      //hashing a password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      //Create JWT Token
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
     
      //  res.json(user);
      success=true;
      res.json({ success, authToken });
      //Error message
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE-2 : Authenticate a user using POST: '/api/auth/login'. No login required--------------------------------------------->>
router.post(
  "/login",
  [
    query("email", "Enter a valid email").isEmail(),
    query("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are ERRORS , return bad request and the errors
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.status(400).json({ error: toHaveErrorMessage.array() });
    }

    const { email, password } = req.body;
    try {
      //Check email is exist or not
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .send({ message: "Please enter valid credentials" });
      }
      //Check password is exist or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .send({ success, message: "Please enter valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      //Create JWT Token
      const authToken = jwt.sign(data, JWT_SECRET);
      //  res.json(user);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//ROUTE-3 : Get login user details using POST: '/api/auth/getuser'. Login required--------------------------------------------->>
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
