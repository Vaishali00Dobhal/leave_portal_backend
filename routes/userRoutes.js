const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('./middlewares/jwtMiddleware'); 


// router.use((req, res, next) => {
//     if (req.path === '/login') {
//       return next(); 
//     }
//     verifyToken(req, res, next);
// });

router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUsers);
router.post('/create', userController.craeteUsers);

module.exports = router;