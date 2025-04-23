import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { customMiddleware } from "./middlewares/customMiddleware.js";

const app = express();

app.use(bodyParser.json());
app.use(morgan());

app.get("/", [customMiddleware], (req, res) => {
    console.log(req.headers.myTime);
    return res.json({
        message: "Hola mundo",
    });
});

app.get("/ruta2", [], (req, res) => {
    console.log(req.headers.myTime);
    return res.json({
        message: "Hola mundo",
    });
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
