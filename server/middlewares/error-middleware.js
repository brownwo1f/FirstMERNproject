/*Here all the errors we are throwing from different files will be collected
and then passed to frontend.

its like organizing error handling same as managing states in react using redux
*/

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server Error";
  const extraDetails = err.extraDetails || "The server encountered an error!";

  //! defining some variables with default values to use if info from err
  //! is not given to the middleware

  return res.status(status).json({ message, extraDetails });
};
module.exports = errorMiddleware;
