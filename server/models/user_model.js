//Schema defines the structure of the documents within a collection.
//It specifies the fields, their types, and any additional constraints or validations

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/* securing password using bcrypt and pre method for simple method 
check auth-controller.js*/

userSchema.pre("save", async function () {
  // pre method will make sure that before(pre) data is saved perform this action
  // console.log("pre method", this);   /* show the data which is going to be stored but not yet  */
  const user = this; //written for clarity -- refering to the user object

  if (!user.isModified("password")) {
    next(); // same work as .then() method
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

/* comparing password */
userSchema.methods.passwordValid = async function (password) {
  const result = bcrypt.compare(password, this.password);
  return result;
};

/* JSON WEB TOKENS */ //--> Its like a id card in short
/*
JWT is a standard for securely transmitting information between parties as a 
JSON object. It is commonly used for authentication and authorization in web 
applications.

JWTs are commonly used for authentication. After a user logs in, the server 
generates a JWT containing the user's identity (claims) and sends it back to
the client. The client then includes the JWT in subsequent requests to 
authenticate itself to the server.

Overall, JSON Web Tokens provide a secure and efficient way to transmit 
information between parties in a web application, enabling stateless 
authentication and authorization. They are widely used in modern web 
development for implementing authentication mechanisms and securing APIs.

Authenticate = confirming the identity of a user
Authorization = what actions a user can perform

Structure: JWTs consist of three parts separated by dots: 
header, payload, and signature. These parts are Base64 encoded JSON objects.
 1. The header typically contains information about the type of token and the 
 signing algorithm. 
 2. The payload contains the claims, which are statements 
 about an entity (typically, the user) and additional metadata. 
 3.  The signature is used to verify that the sender of the JWT is who it says it
 is and to ensure that the message wasn't changed along the way.
*/

userSchema.methods.generateToken = async function () {
  //like we made hashed password we are making token in this section
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      //
      process.env.JWT_KEY,
      //
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
}; /* this is called making an instance method -- 
  we are making a method of a class using methods keyword
  using this we can make as many methods as we want to make */

/*
Model acts as a higher level abstraction
 that interacts with the database based on the defined schema.
 It represents a collection and provides an interface for querying , creating
 , updating, and deleting documents in that collection.

 Models are created from schemas and enable you to work with MongoDB data
 is a more strctured manner in your application
 */

/*
      OUTPUT OF POSTMAN

"msg": {
        "username": "Deepak",
        "email": "deepak64e5t873@gmail.com",
        "phone": 123456789,
        "password": "$2a$10$8V0pMKMed14NHbOrKHGohO15NoN.L5t5Aj/BR8dTjUEw0dUObiZ9W",
        "isAdmin": false,
        "_id": "65ddc75ec132fb067e2e3011",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRkYzc1ZWMx
    MzJmYjA2N2UyZTMwMTEiLCJlbWFpbCI6ImRlZXBhazY0ZTV0ODczQGdtYWlsLmNvbSIsImlzQWRta
    W4iOmZhbHNlLCJpYXQiOjE3MDkwMzMzMTAsImV4cCI6MTcxMTYyNTMxMH0.3Wzriblf4K1eqjU_
    vRIaCfjB0wxFIMznEEpLDkh3k5o",
    
    "userId": "65ddc75ec132fb067e2e3011"
} */

const User = new mongoose.model("User", userSchema);

module.exports = User;
