module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regDate: {
        type: DataTypes.STRING,
      },
      authDate: {
        type: DataTypes.STRING,
        defaultValue: " - ",
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
    
    return Users;
  };