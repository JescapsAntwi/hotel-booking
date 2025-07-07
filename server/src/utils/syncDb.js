const { sequelize } = require("../models");

// Sync all models with the database
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Use alter for development, switch to false in production
    console.log("Database synced successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1);
  }
})();
