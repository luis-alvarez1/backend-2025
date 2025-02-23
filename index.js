import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import usersRouter from "./routers/users/users-router.js";
import { Database } from "./database/db.js";
import { rateLimitMiddleware } from "./middlewares/rateLimit.js";

const app = express();

const database = new Database();
database.setup();

app.use(cors());
app.use(morgan());
app.use(bodyParser());
app.use(rateLimitMiddleware);

app.use("/users", usersRouter);

app.listen(8000, () => {
    console.log("App running on port 8000");
});
