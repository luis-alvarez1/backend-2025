import { UserEntity } from "./users-entity.js";

const userEntity = new UserEntity();

export const GetAllUsers = (req, res) => {
    const users = userEntity.getAll();

    return res.json({
        data: users,
    });
};

export const CreateUsers = (req, res) => {
    const user = req.body;

    const newUser = userEntity.create(user);

    return res.json({
        data: newUser,
    });
};

export const UpdateUser = (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = userEntity.update(+id, userData);

    res.json({
        data: updatedUser,
    });
};
export const DeleteUser = (req, res) => {
    const { id } = req.params;

    userEntity.delete(+id);

    res.json({
        data: {
            message: "Eliminado usuario con id: " + id,
        },
    });
};
