const {organisation_holiday_for_employee }= require('../models');
const organisationController = {
    organisationHoliday: async (req,res) => {
        try {
            const users = await organisation_holiday_for_employee.userAlreadyExits();
            return res.status(200).json({status :200 ,data : users });
        } catch (error) {
         console.log(error)
            return res.status(500).json({ error: 'Something went wrong !' });
        }
    },

};

module.exports = organisationController;