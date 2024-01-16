const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  const secretKey = process.env.JWT_SECRET; // Get the secret key from environment variables

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    // If the token is valid, you can access the decoded payload, e.g., decoded.userId
    req.userId = decoded.userId;

    next();
  });
}
  

module.exports = verifyToken;
