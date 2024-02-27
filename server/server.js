const express = require("express");
require("dotenv").config(); //importing dotenv
const app = express();
const router = require("./router/auth-router"); // importing router just like a react component
const connectDB = require("../server/utils/db"); // importing db connectDB function

app.use(express.json()); //allowing the server to use json

app.use("/", router); //Mounting middleware function (router) to path ("/")

// to keep this file clean we shifted this functionality to auth-router.js
// app.get("/", (req,res)=>{   //home page
//     res.status(200).send("Welcome from server");
// })

// app.get("/register", (req,res)=>{   //home page
//     res.status(200).send("This is the registration page");
// })

connectDB().then(() => {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
