import Users from "../users/users-entity.js";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import Valkey from "iovalkey";
import Products from "./product-entity.js";

configDotenv();
const cache = new Valkey(6379, "valkey", {});
export const GetAllProducts = async (req, res) => {
    try {
        let products = await cache.get("products");
        products = JSON.parse(products);
        if (products) {
            return res.status(200).json({
                data: products,
            });
        }

        products = await Products.findAll();
        await cache.set("products", JSON.stringify(products), "EX", 10);

        return res.status(200).json({
            data: products,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(503)
            .json({ data: "No se pudo obtener los productos" });
    }
};

export const CreateProduct = async (req, res) => {
    try {
        const { price, stock, name } = req.body;

        const user = await Products.findOne({ where: { name: name } });
        if (user) {
            return res.status(400).json({ data: "Producto ya existe" });
        }

        await Products.create({ price, stock, name });

        return res.status(201).json({ data: "Producto creado" });
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            data: "No se pudo crear",
        });
    }
};

export const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, stock, name } = req.body;

        await Products.update(
            { price, name, stock },
            {
                where: {
                    id: id,
                },
            }
        );
        return res.status(202).json({ data: "Producto Actualizado" });
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            data: "No se pudo actualizar",
        });
    }
};
export const DeleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Products.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).json({ data: "Producto Eliminado" });
    } catch (error) {
        console.log(error);
        res.status(503).json({ data: "No se pudo eliminar" });
    }
};
