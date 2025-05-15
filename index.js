import express from "express";
import bodyParser from "body-parser";
import http from "http";
import morgan from "morgan";
import { Server as SocketIOServer } from "socket.io";
import { customMiddleware } from "./middlewares/customMiddleware.js";
import usersRouter from "./routes/users.routes.js";
import productsRouter from "./routes/products.routes.js";
import { configDb } from "./config/db.js";
import dotenv from "dotenv";
import { apiRateLimit } from "./middlewares/apiRateLimit.js";

dotenv.configDotenv();

import { setupSocket } from "./config/socketio.js";
import cors from "cors";
const app = express();
const server = http.createServer(app);
const socketio = new SocketIOServer(server, { cors: { origin: "*" } }); // cors only for testing in the example!

app.use(bodyParser.json());
app.use(morgan());
app.use(apiRateLimit);
app.use(cors());

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/", [customMiddleware], (req, res) => {
    console.log(req.headers.myTime);
    return res.json({
        message: "Hola mundo",
    });
});

configDb();
setupSocket(socketio);

server.listen(8000, () => {
    console.log("Listening on port 8000");
});
