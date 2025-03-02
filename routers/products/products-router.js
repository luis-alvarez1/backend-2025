import { Router } from "express";

import { body, param } from "express-validator";
import validate from "../../middlewares/validate.js";
import { authMiddleware } from "../../middlewares/auth.js";
import {
    CreateProduct,
    DeleteProduct,
    GetAllProducts,
    UpdateProduct,
} from "./products-controllers.js";

const productsRouter = Router();

productsRouter.get("/", GetAllProducts);

productsRouter.post(
    "/",
    [
        body("name").exists().isString().isAlphanumeric(),
        body("price").exists().isNumeric(),
        body("stock").exists().isNumeric(),
        validate,
    ],
    CreateProduct
);

//  [Patch] localhost:8000/users/2
productsRouter.patch(
    "/:id",
    [
        authMiddleware,
        param("id").exists().isNumeric(),
        body("id").not().exists(),
        body("name").optional().isString().isAlphanumeric(),
        body("price").optional().isNumeric(),
        body("stock").optional().isNumeric(),
        validate,
    ],
    UpdateProduct
);
//  [DELETE] localhost:8000/users/2
productsRouter.delete(
    "/:id",
    [authMiddleware, param("id").exists().isNumeric(), validate],
    DeleteProduct
);

export default productsRouter;
