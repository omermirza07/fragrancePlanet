// middleware function to handle errors
const errorHandler = (err, req, res, next) => {
  // set the status code to 500 if it's currently 200 (internal server error by default)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode); // set the response status to the determined status code

  // send a json response with the error message and stack trace
  res.json({
    message: err.message, // the error message
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // show stack trace only in development
  });
};

module.exports = errorHandler; // export the error handler to use in other parts of the app
