const User = require("./user");
const Word = require("./wordbank");

User.hasMany(Word, {
  foreignKey: "user_id",
});

Word.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Word };
