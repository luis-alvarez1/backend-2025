import { Router } from "express";
import { UserEntity } from "../entity/users.entity.js";

const router = Router();

const usersEntity = new UserEntity();

router.get("/", (req, res) => {
    const users = usersEntity.findAll();

    return res.json({
        data: users,
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = usersEntity.findOne(+id);

    return res.json({
        data: user,
    });
});

router.post("/", (req, res) => {
    const userCreate = req.body;

    const createdUser = usersEntity.create(userCreate);

    return res.json({
        data: createdUser,
    });
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const userUpdate = req.body;

    const updatedUser = usersEntity.update(+id, userUpdate);

    return res.json({
        data: updatedUser,
    });
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    return res.json({
        data: usersEntity.delete(+id),
    });
});

export default router;
