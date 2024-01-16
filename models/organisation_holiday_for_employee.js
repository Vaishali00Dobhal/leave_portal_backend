const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const organisationHolidayForEmployee = sequelize.define('organisation_holiday_for_employee', {
    earned_leaves: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    casual_leaves: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    medical_leaves :{
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    employee_code:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_username:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE, // Use DATE for timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE, // Use DATE for timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
  });

  organisationHolidayForEmployee.userAlreadyExits = async function () {
    try {

        return await organisationHolidayForEmployee.findOne()
           
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "user already exits " });
    }
  };

  return organisationHolidayForEmployee;
};