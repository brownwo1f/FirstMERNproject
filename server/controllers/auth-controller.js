const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome from controller");
  } catch (error) {
    console.log(error);
  }
};

/* Regitration logic
  1. get registration data (username, email, password)
  2. check if email already registered 
  3. securely hash the password 
  4. create user with the hashed password
  5. save user data to db
  6. respond with registration successful message
*/

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    /*1. */
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json("Email already exists"); /* 2. if email registered*/
    }

    /*3. hashing password moved to user_model.js*/
    // const salt_Round = 10;
    // const hash_password = await bcrypt.hash(password, salt_Round); //using bcryptjs

    /*4 making user 5. saving data to db*/
    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      msg: "Registration Successfull" /*6. response with successfull message */,
      token:
        await userCreated.generateToken() /* waiting for the token from user_model.js*/,
      userId:
        userCreated._id.toString() /*converted the id generated to string also */,
    }); // else make a new user
    /* 
    
      it is good practice to convert userID into string as it esures consistency
      and compatibility across different JWT libraries and systems
      
      */
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = { home, register };
