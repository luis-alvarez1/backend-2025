import { Router } from "express";
import { middlewareCustom } from "../../middlewares/middlewareCustom.js";
import {
    CreateUsers,
    DeleteUser,
    GetAllUsers,
    UpdateUser,
} from "./users-controllers.js";
import { body, param } from "express-validator";
import validate from "../../middlewares/validate.js";

const usersRouter = Router();

usersRouter.get("/", GetAllUsers);

usersRouter.post(
    "/",
    [body("name").exists().isString(), validate],
    CreateUsers
);

//  [Patch] localhost:8000/users/2
usersRouter.patch(
    "/:id",
    [
        param("id").exists().isNumeric(),
        body("id").not().exists(),
        body("name").exists().isString(),
        validate,
    ],
    UpdateUser
);
//  [DELETE] localhost:8000/users/2
usersRouter.delete(
    "/:id",
    [param("id").exists().isNumeric(), validate],
    DeleteUser
);

export default usersRouter;
