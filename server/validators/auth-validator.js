const { z } = require("zod");

// create an object schema similar to user model

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim() //trim method removes spaces
    .min(3, { message: "Name must be atleat 3 characters" })
    .max(255, { message: "Name must be less than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email" }) //trim method removes spaces
    .min(3, { message: "Email must be atleat 3 characters" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleat 10 characters" })
    .max(10, { message: "Phone must be 10 characters long" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be atleat 7 characters" })
    .max(1024, { message: "Password must be less than 1024 characters" }),
});

module.exports = signupSchema;
