const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw.this.password);
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 34],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.email = await newUserData.email.toLowerCase();
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.email = await updatedUserData.email.toLowerCase();
        return updatedUserData;
      },
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
module.exports = User;
