const validate = (schema) => async (req, res, next) => {
  //a different way
  try {
    const parseBody = await schema.parseAsync(req.body);

    //! parseAsync is a zod inbuilt method
    //! above line parses and checks if the data we received in request body is
    //! aligned with the signupSchema we declared in auth-validator.js file

    req.body = parseBody;
    next();
  } catch (err) {
    //res.status(400).json({ message: err.errors[0].message });
    err = {
      status: 402,
      message: err.errors[0].message,
    };
    next(err);
  }
};

module.exports = validate;
