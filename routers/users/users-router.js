import { Router } from "express";
import { middlewareCustom } from "../../middlewares/middlewareCustom.js";
import {
    CreateUsers,
    DeleteUser,
    GetAllUsers,
    UpdateUser,
} from "./users-controllers.js";

const usersRouter = Router();

usersRouter.get("/", [middlewareCustom], GetAllUsers);

usersRouter.post("/", CreateUsers);

//  [Patch] localhost:8000/users/2
usersRouter.patch("/:id", UpdateUser);
//  [DELETE] localhost:8000/users/2
usersRouter.delete("/:id", DeleteUser);

export default usersRouter;
