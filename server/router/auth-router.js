const express = require("express"); //imported express just like react
const router = express.Router(); //Refer notes
// const { home, register } = require("../controllers/auth-controller"); line gets too long
const authController = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

// router.get("/", (req,res)=>{   //home page
//     res.status(200).send("Welcome from router");
// })                                                 use that V instead of this ^

// router.route("/").get((req, res) => {
//   //home page
//   res.status(200).send("Welcome from router");
// });                                                 now use controller one V

router.route("/").get(authController.home);

router.route("/register").post(validate(signupSchema), authController.register); //! passing signupSchema to validator middleware

router.route("/login").post(authController.login); //making login functionality starts here

module.exports = router;
