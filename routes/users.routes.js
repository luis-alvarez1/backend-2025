import { Router } from "express";
import { User } from "../entity/users.entity.js";

const router = Router();

router.get("/", async (req, res) => {
    const users = await User.findAll();

    return res.json({
        data: users,
    });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
        where: {
            id: +id,
        },
    });

    return res.json({
        data: user,
    });
});

router.post("/", async (req, res) => {
    const userCreate = req.body;

    const createdUser = await User.create(userCreate);

    return res.json({
        data: createdUser,
    });
});

router.patch("/:id", async (req, res) => {
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
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    return res.json({
        data: await User.destroy({
            where: {
                id: +id,
            },
        }),
    });
});

export default router;
