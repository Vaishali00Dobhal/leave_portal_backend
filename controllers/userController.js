const { login , manager ,employee} = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await login.findAll();
            return res.status(200).json({data : users,status :200});
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    craeteUsers: async (req, res) => {
        try {
            let loginDetail = req.body;
            const verifyUsers = await login.userAlreadyExits(loginDetail);
            if (verifyUsers != null) {
                return res.status(500).json({ message: 'user already exits' });
            }
        
            const createUser = await login.createUser(loginDetail);
           
            return res.status(200).json({ data: createUser, message: "user created succesfully" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    loginUsers: async (req, res) => {
        try {
            let loginDetail = req.body;
            const verifyUsers = await login.verify(loginDetail);
            if (verifyUsers == null) {
                return res.status(500).json({ message: 'user not correct' });
            }

            const payload = {
                userId: verifyUsers.id,
            };

            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            const user_details = req.body.login_type == 1 ? await manager.userInfo(verifyUsers.username): await  employee.userInfo(verifyUsers.username);
            // const response_obj = {user_details, verifyUsers.};
            let response_obj = {
              ...user_details,
              login_type : verifyUsers.login_type
            }
            return res.status(200).json({status: 200,  message: "login sucessfully" , token: token, data : response_obj });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

};

module.exports = userController;