'use strict'
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const ApplyiedHoliday = sequelize.define('applyied_holiday', {
        employee_id: {
            type: DataTypes.STRING,
            // allowNull: true,
            // unique: true
        },
        employee_code: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        start_date :{
            type: DataTypes.DATE, // Use DATE for timestamp
            // allowNull: true,
        },
        end_date :{
            type: DataTypes.DATE, // Use DATE for timestamp
            // allowNull: true,
        },
        approved :{
            type: DataTypes.BOOLEAN, // Use DATE for timestamp
            // allowNull: true,
        },
        reason:{
            type: DataTypes.STRING,
        },
        leave_type:{
            type: DataTypes.STRING,
        },
        assign_manger_id :{
            type: DataTypes.NUMBER,
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



    // Employee.userAlreadyExits = async function (loginDetails) {
    //     try {
    //         const { username } = loginDetails;
    //         return await Employee.findOne({
    //             where: {
    //                 username: username,
    //             }
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         return res.status(500).json({ error: "user already exits " });
    //     }
    // };

    // Employee.findAllUser = async function () {
    //     try{
    //       return await Employee.findAll({
    //         order: [ [ 'createdAt', 'DESC' ]],
    //         limit: 1,
    //       })
    //     }catch (err){
    //         console.log(err)
    //     }
    //   };
      

    // Employee.allEmployee = async function () {
    //     try {
    //       return await Employee.findAll({
    //         include: [
    //           {
    //             model: sequelize.model('manager'),
    //             as: 'managers', // Make sure this matches the alias defined in your Employee model
    //           },
    //         ],
    //       });
    //     } catch (err) {
    //       console.log(err);
    //       return res.status(500).json({ error: "Something went wrong" });
    //     }
    //   };
    ApplyiedHoliday.applyHolidayInsert = async function (data) {
        try {
            return await ApplyiedHoliday.create(data);
        } catch (err) {
            console.log(err);
            throw new Error(err); 
        }
    };

    ApplyiedHoliday.getAllLeavesDetails = async function (id) {
        try {
            return await ApplyiedHoliday.findAll({
                where:{
                    employee_id : id
                }
            });
        } catch (err) {
            console.log(err);
            throw new Error(err); 
        }
    };

    ApplyiedHoliday.managerAllLeaveAppliedByEmployee = async function (id) {
        try {
            return await ApplyiedHoliday.findAll({
                where:{
                    assign_manger_id : id
                },
                include: [
                    {
                      model: sequelize.model('employee'),
                      as: 'employee',
                    },
                  ],
            });
        } catch (err) {
            console.log(err);
            throw new Error(err); 
        }
    };


    ApplyiedHoliday.associate = (models) => {
        ApplyiedHoliday.hasOne(models.employee, {
          foreignKey: 'id',
          sourceKey: 'employee_id',
          as: 'employee',
        });
      };


    return ApplyiedHoliday;
};