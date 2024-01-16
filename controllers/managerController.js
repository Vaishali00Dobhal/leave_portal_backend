const { manager , login ,applyied_holiday} = require('../models');

const managerController = {
    getAllManagerList: async (req, res) => {
        try {
            const users = await manager.findAll();
            return res.status(200).json({status :200 ,data : users });
        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong !' });
        }
    },


    getAllManagerMappedEmployee: async (req, res) => {
        try {
            const users = await manager.allManager();
            return res.status(200).json({status :200 ,data : users });
        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong !' });
        }
    },

    createManager: async (req, res) => {
        try {
            let loginDetail = req.body;
            const verifyUsers = await manager.userAlreadyExits(loginDetail);
            if (verifyUsers != null) {
                return res.status(500).json({ message: 'user already exits' });
            }

            const createUser = await manager.createUser(loginDetail);
            const loginUser = await login.createUser(loginDetail);
            let  resUser ={...createUser,...loginUser} ;
            return res.status(200).json({ data: resUser, message: "user created succesfully" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    // loginUsers: async (req, res) => {
    //     try {
    //         let loginDetail = req.body;
    //         const verifyUsers = await login.verify(loginDetail);
    //         if (verifyUsers == null) {
    //             return res.status(500).json({ message: 'user not correct' });
    //         }

    //         const payload = {
    //             userId: verifyUsers.id,
    //         };

    //         const secretKey = process.env.JWT_SECRET;
    //         const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    //         return res.status(200).json({ token: token, message: "login sucessfully" });
    //     } catch (error) {
    //         return res.status(500).json({ error });
    //     }
    // }

    getAllLeaveAppliedByEmployee: async (req, res) => {
        try {
            const id = req.params;
            const users = await applyied_holiday.managerAllLeaveAppliedByEmployee(id);
            return res.status(200).json({status :200 ,data : users });
        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong !' });
        }
    },

};

module.exports = managerController;