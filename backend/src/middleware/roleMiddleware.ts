import { Response, NextFunction } from "express";

import { AuthRequest } from "./authMiddleware";

export const authorizeRoles =
    (...roles: string[]) =>
        (
            req: AuthRequest,
            res: Response,
            next: NextFunction
        ) => {
            if (!req.user) {
                return res.status(401).json({
                    message: "User not authenticated",
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    message:
                        "You are not allowed to access this resource",
                });
            }

            next();
        };