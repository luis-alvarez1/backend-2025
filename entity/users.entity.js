import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "name",
    },
    age: {
        type: DataTypes.INTEGER,
    },
});

User.sync();
