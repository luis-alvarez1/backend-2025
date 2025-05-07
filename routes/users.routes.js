import { Router } from "express";
import { User } from "../entity/users.entity.js";
import { validate } from "../middlewares/validate.js";
import { body, param } from "express-validator";
import { customMiddleware } from "../middlewares/customMiddleware.js";
import { checkUserInDB } from "../middlewares/checkUser.js";

const router = Router();

router.get("/", async (req, res) => {
    const users = await User.findAll();

    return res.json({
        data: users,
    });
});

router.get(
    "/:id",
    [
        // express-validator
        param("id").isInt().exists(),
        validate,

        // custom middlewares
        checkUserInDB,
    ],
    async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: +id,
            },
        });

        return res.json({
            data: user,
        });
    }
);

// body, param, query, header

router.post(
    "/",
    [
        body("id").isEmpty(),
        body("name").isString().exists(),
        body("age").isNumeric().isInt({ min: 12, max: 110 }),
        validate,
    ],
    async (req, res) => {
        const userCreate = req.body;

        const createdUser = await User.create(userCreate);

        return res.json({
            data: createdUser,
        });
    }
);

// PATCH => users/luis
router.patch(
    "/:id",
    [
        // express-validator
        param("id").isInt().exists(),
        body("id").isEmpty(),
        body("name").isString().optional(),
        body("age")
            .not()
            .isString()
            .isNumeric()
            .isInt({ min: 12, max: 110 })
            .optional(),
        validate,

        // custom middlewares
        checkUserInDB,
    ],
    async (req, res) => {
        const { id } = req.params;
        const userUpdate = req.body;

        const updatedUser = await User.update(userUpdate, {
            where: {
                id: +id,
            },
        });

        return res.json({
            data: updatedUser,
        });
    }
);
router.delete(
    "/:id",
    [
        // express-validator
        param("id").isInt().exists(),
        validate,

        // custom middlewares
        checkUserInDB,
    ],
    async (req, res) => {
        const { id } = req.params;

        return res.json({
            data: await User.destroy({
                where: {
                    id: +id,
                },
            }),
        });
    }
);

export default router;
