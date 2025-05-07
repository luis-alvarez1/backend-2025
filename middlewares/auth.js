import jwt from "jsonwebtoken";

export const authorize = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(
            token,
            "ff3bfba6403b1f9b320fca03efc201b8e85f03d465bb7013a9fcfeb2698a0c4dc007f1046024a18a830de7bffae764bcd5add50a9928fe44ce9697900074a268"
        );
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        if (!decoded) {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        next();
    } catch (error) {
        return res.status(403).json({
            error: "Invalid Token",
        });
    }
};
