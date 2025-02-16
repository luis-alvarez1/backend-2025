import Users from "./users-entity.js";

export const GetAllUsers = (req, res) => {};

export const CreateUsers = (req, res) => {};

export const UpdateUser = (req, res) => {
    const { id } = req.params;
    const userData = req.body;
};
export const DeleteUser = (req, res) => {
    const { id } = req.params;
};
