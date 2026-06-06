const app = require("./app");
const sequelize = require("./config/db");

require("./models");

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(async () => {

    console.log("Database connected");

    await sequelize.sync({ alter: true });

    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  })
  .catch(err => {
    console.log(err);
  });

  