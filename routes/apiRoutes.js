const express = require('express');
const router = express.Router();
// const userController = require('../controllers/userController');
const verifyToken = require('./middlewares/jwtMiddleware'); 
const managerController = require('../controllers/managerController');
const employeeController = require('../controllers/employeeController');
const organisationController = require('../controllers/organisationController');

// router.use((req, res, next) => {
//     if (req.path === '/login') {
//       return next(); 
//     }
//     verifyToken(req, res, next);
// });

// router.post('/login', userController.loginUsers);
router.get('/get/all/employee', employeeController.getAllEmployee);
router.post('/create/employee', employeeController.createEmployee);
router.post('/apply/holiday', employeeController.applyHoliday);
router.get('/get/all/leave/details/:id',employeeController.getAllLeavesDetails);


///manger routes
router.get('/get/all/manager', managerController.getAllManagerList);
router.post('/create/manager', managerController.createManager);
router.get('/get/all/manager/mapped/employee', managerController.getAllManagerMappedEmployee);
router.get('/manager/get/all/leave/:id', managerController.getAllLeaveAppliedByEmployee);


//organisation Holiday
// define by organisation
router.get('/get/orgination/holiday', organisationController.organisationHoliday);



module.exports = router;
