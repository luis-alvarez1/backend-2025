import { Router } from "express";
import { User } from "../entity/users.entity.js";
import { validate } from "../middlewares/validate.js";
import { body, param } from "express-validator";
import { customMiddleware } from "../middlewares/customMiddleware.js";
import { checkUserInDB } from "../middlewares/checkUser.js";
import jwt from "jsonwebtoken";
import { authorize } from "../middlewares/auth.js";

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
        authorize,
    ],
    async (req, res) => {
        const { id } = req.params;
        console.log(req.user);
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
        body("age")
            .not()
            .isString()
            .isNumeric()
            .isNumeric()
            .isInt({ min: 12, max: 110 }),
        body("email").isString().isEmail().exists(),
        body("password").isString().exists(),
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
        body("email").isString().isEmail().optional(),
        body("password").isString().optional(),
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

router.post(
    "/login",
    [
        body("email").isString().isEmail().exists(),
        body("password").isString().exists(),
        validate,
    ],
    async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid Email",
            });
        }

        if (password !== user.password) {
            return res.status(401).json({
                error: "Invalid Email",
            });
        }

        const payload = {
            id: user.id,
            email: user.email,
        };
        const token = jwt.sign(
            payload,
            "ff3bfba6403b1f9b320fca03efc201b8e85f03d465bb7013a9fcfeb2698a0c4dc007f1046024a18a830de7bffae764bcd5add50a9928fe44ce9697900074a268",
            {
                expiresIn: "2h",
            }
        );

        res.status(200).json({
            token: token,
        });
    }
);

export default router;
