const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Manager = sequelize.define('manager', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    mobile_no: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    username: {
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

  //   Manager.verify = async function (loginDetails) {
  //     try{
  //     const {username , password , login_type} = loginDetails;
  //       return await Login.findOne({
  //         where : {
  //             username : username,
  //             password : password,
  //             login_type :login_type
  //         }
  //       })
  //     }catch (err){
  //         console.log(err)
  //     }
  //   };

  Manager.allManager = async function () {
    try {
      return await Manager.findAll({
        include: [
          {
            model: sequelize.model('employee'),
            as: 'employees',
          },
        ],
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };


  Manager.userAlreadyExits = async function (loginDetails) {
    try {
      const { username } = loginDetails;
      return await Manager.findOne({
        where: {
          username: username,
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "user already exits " });
    }
  };


  Manager.createUser = async function (loginDetails) {
    try {
      const users = await Manager.create(loginDetails);
      return users
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "Failed to create user" });
    }
  };

  Manager.userInfo = async function (user_name) {
    try {
      const users = await Manager.findOne({
        where: {
          username: user_name
        },
        raw:true
      });
      return users
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "Failed to find user" });
    }
  };


  Manager.associate = (models) => {
    Manager.hasMany(models.employee, { foreignKey: 'managers_id', as: 'employees' });
  };

  return Manager;
};