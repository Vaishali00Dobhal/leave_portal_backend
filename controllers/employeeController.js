// const {   login, employee } = require('../models');
const {login ,employee,applyied_holiday} = require('../models')

// const { Employee, Manager } = require('./models');
const employeeController = {
    getAllEmployee: async (req, res) => {
        try {
            const users = await employee.allEmployee();
            return res.status(200).json({ status: 200, data: users });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    createEmployee: async (req, res) => {
        try {
            let data = req.body;
            const verifyUsers = await employee.userAlreadyExits(data);
            if (verifyUsers != null) {
                return res.status(500).json({ message: 'user already exits' });
            }

            const last_Id = await employee.findAllUser();
            let id = last_Id[0].id;
            let employe_object = { employee_id: `EMP_${id + 1}`, ...data }


            const createUser = await employee.createUser(employe_object);
            const loginUser = await login.createUser(employe_object);
            let resUser = { ...createUser, ...loginUser };
            return res.status(200).json({ data: resUser, message: "user created succesfully" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    applyHoliday: async (req, res) => {
        try {
            let data = req.body;
            const holiday = await applyied_holiday.applyHolidayInsert(data);
            return res.status(200).json({
                  status: 200,
                  data: holiday,
                  message: "Leave Apply  Succesfully" 
            });

        } catch (error) {
            throw new Error(error); 
        }
    },

    getAllLeavesDetails: async (req, res) => {
        try {
            let id = req.params.id;
            const data = await applyied_holiday.getAllLeavesDetails(id);
            return res.status(200).json({
                  data: data,
                  message: "All Leaves details Fetch Successfully !" 
            });

        } catch (error) {
            throw new Error(error); 
        }
    }
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

};

module.exports = employeeController;