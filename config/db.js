import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("ecommerce", "user", "pass", {
    port: "3306",
    host: "localhost",
    dialect: "mariadb",
});

export const configDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB Connected");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
