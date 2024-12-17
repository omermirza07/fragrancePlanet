const jwt = require('jsonwebtoken'); // import jsonwebtoken to handle jwt tokens
const dotenv = require('dotenv'); // import dotenv to load environment variables

dotenv.config(); // load environment variables from the .env file

// middleware function to check if a user is authenticated
const authMiddleware = (req, res, next) => {
  // get the token from the authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  console.log("JWT_SECRET:", process.env.JWT_SECRET); // log the jwt secret for debugging
  console.log("Token:", token); // log the token for debugging

  // if there is no token, send a 401 unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    // verify the token using the jwt secret and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach the decoded user info to the request object
    next(); // move to the next middleware or route handler
  } catch (err) {
    console.error("Token verification error:", err); // log the error if token verification fails
    return res.status(401).json({ message: 'Token is not valid.' }); // send a 401 error if the token is invalid
  }
};

module.exports = authMiddleware; // export the middleware so it can be used in other files
