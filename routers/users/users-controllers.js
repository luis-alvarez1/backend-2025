import Users from "./users-entity.js";
import bcrypt from "bcrypt";

export const GetAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();

        return res.status(200).json({
            data: users,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(503)
            .json({ data: "No se pudo obtener los usuarios" });
    }
};

export const CreateUsers = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password);

        await Users.create({ email, password: hashedPassword, name });

        return res.status(201).json({ data: "Usuario creado" });
    } catch (error) {
        return res.status(503).json({
            data: "No se pudo crear",
        });
    }
};

export const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password);

        await Users.update(
            { email, name, password: hashedPassword },
            {
                where: {
                    id: id,
                },
            }
        );
        return res.status(202).json({ data: "Usuario Actualizado" });
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            data: "No se pudo actualizar",
        });
    }
};
export const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await Users.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).json({ data: "Usuario Eliminado" });
    } catch (error) {
        console.log(error);
        res.status(503).json({ data: "No se pudo eliminar" });
    }
};
