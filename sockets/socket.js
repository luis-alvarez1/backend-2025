import { Server } from "socket.io";
import Products from "../routers/products/product-entity.js";

export class SocketHandler {
    iosocket;
    /**
     *
     * 1 evento que emite el frontend para actualizar el stock y lo escucha el backend
     * 1 evento que emite el backend para devolver el stock actualizado y que escucha el frontend
     * El backend escucha update-stock
     * El backend emite el stock-updated
     */

    constructor(serverHttp) {
        this.iosocket = new Server(serverHttp);
        this.initEvents();
    }

    initEvents() {
        this.iosocket.on("connection", (socket) => {
            console.log("Cliente conectado");
            socket.on("update-stock", async (payload) => {
                const { productId } = payload;
                const resp = await this.updateProductStock(productId);
                if (!resp) {
                    socket.emit("error", "No existe el producto");
                }
            });

            socket.on("disconnect", () => {
                console.log("Cliente disconnected");
            });
        });
    }

    async updateProductStock(productId) {
        const exists = await Products.findOne({ where: { id: productId } });

        if (!exists) {
            return null;
        }
        if (exists.stock === 0) {
            return true;
        }
        const updateProduct = { ...exists, stock: exists.stock - 1 };
        // const updateProduct = exists;
        // updateProduct.stock = updateProduct.stock - 1;
        await Products.update(updateProduct, {
            where: {
                id: productId,
            },
        });
        const newProduct = await Products.findOne({ where: { id: productId } });

        this.iosocket.emit("stock-updated", newProduct);
    }
}
