const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login_user = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      await user.save();
      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const registrate_user = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }
    // check if user already exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(`error ${err}`);
  }
};

const logout_user = async (req, res) => {
  console.log(req.params.id);
  try {
    await User.updateOne({ _id: req.params.id }, { $set: { token: "" } }).catch(
      (error) => {
        console.log(error);
      }
    );
    console.log("user updated");

    return res.status(200).json({
      message: "user-logout-succsses",
    });
  } catch {
    return res.status(404).json({
      message: "user-logout-not-succsses",
    });
  }
};

module.exports = {
  registrate_user,
  login_user,
  logout_user,
};
