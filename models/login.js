const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Login = sequelize.define('login', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    login_type :{
        type: DataTypes.NUMBER,
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

  Login.verify = async function (loginDetails) {
    try{
    const {username , password , login_type} = loginDetails;
      return await Login.findOne({
        where : {
            username : username,
            password : password,
            login_type :login_type
        }
      })
    }catch (err){
        console.log(err)
    }
  };


  Login.userAlreadyExits = async function (loginDetails) {
    try{
    const {username} = loginDetails;
      return await Login.findOne({
        where : {
            username : username,
        }
      })
    }catch (err){
        console.log(err)
    }
  };




  Login.createUser = async function (loginDetails) {
    try{
       const users = await Login.create(loginDetails);
       return users
    }catch (err){
        console.log(err)
    }
  };



  return Login;
};