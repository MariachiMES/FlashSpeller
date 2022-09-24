const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Word extends Model {}

Word.init(
  {
    word_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Word",
  }
);

module.exports = Word;
