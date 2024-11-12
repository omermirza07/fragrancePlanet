const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging line
  console.log("Token:", token); // Debugging line

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err); // Log the error for more insights
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = authMiddleware;
