import jwt from "jsonwebtoken";

import User from "../models/user";

import { Request,
Response,
NextFunction } from "express";

interface AuthRequest
extends Request {

  user?: any;
}

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {

    token =
      req.headers.authorization.split(
        " "
      )[1];

    try {

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as {
          id: string;
        };

      req.user =
        await User.findById(
          decoded.id
        ).select("-password");

      next();

    } catch (error) {

      return res.status(401).json({
        message:
          "Token Failed",
      });
    }

  }

  if (!token) {

    return res.status(401).json({
      message:
        "No Token",
    });
  }
};

export default protect;