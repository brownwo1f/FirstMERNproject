const express = require("express");
require("dotenv").config(); //importing dotenv
const app = express();
const router = require("./router/auth-router"); // importing router just like a react component
const connectDB = require("../server/utils/db"); // importing db connectDB function
const errorMiddleware = require("./middlewares/error-middleware");

app.use(express.json()); //allowing the server to use json

app.use("/", router); //Mounting middleware function (router) to path ("/")

// to keep this file clean we shifted this functionality to auth-router.js
// app.get("/", (req,res)=>{   //home page
//     res.status(200).send("Welcome from server");
// })

// app.get("/register", (req,res)=>{   //home page
//     res.status(200).send("This is the registration page");
// })

app.use(errorMiddleware); //! by adding this every next() will go to errorMiddleware

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
