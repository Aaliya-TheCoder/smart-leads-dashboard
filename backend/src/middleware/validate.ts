import {
    Request,
    Response,
    NextFunction,
} from "express";

const validate =
    (schema: any) =>
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            const { error } = schema.validate(
                req.body,
                {
                    abortEarly: false,
                }
            );

            if (error) {
                return res.status(400).json({
                    success: false,

                    errors: error.details.map(
                        (err: any) => err.message
                    ),
                });
            }

            next();
        };

export default validate;