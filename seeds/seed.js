const sequelize = require("../config/connection");
const { User, Word } = require("../models");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const newUsers = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log(newUsers);
  process.exit(0);
};

seedDatabase();
