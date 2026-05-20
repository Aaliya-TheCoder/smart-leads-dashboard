import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";
import generateToken from "../utils/generateToken";


// REGISTER
export const registerUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password, role } = req.body;

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            success: true,
            token: generateToken(user._id.toString()),
            user,
        });
    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};


// LOGIN
export const loginUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        res.status(200).json({
            success: true,
            token: generateToken(user._id.toString()),
            user,
        });
    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};