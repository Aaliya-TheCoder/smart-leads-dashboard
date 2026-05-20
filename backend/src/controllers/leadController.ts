import { Request, Response } from "express";

import Lead from "../models/Lead";


// CREATE LEAD
export const createLead = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, status, source } =
            req.body;

        const lead = await Lead.create({
            name,
            email,
            status,
            source,
        });

        res.status(201).json({
            success: true,
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};


// GET ALL LEADS
export const getLeads = async (
    req: Request,
    res: Response
) => {
    try {
        // QUERY PARAMS
        const {
            status,
            source,
            search,
            sort,
            page = "1",
        } = req.query;

        // FILTER OBJECT
        const query: any = {};

        // FILTER BY STATUS
        if (status) {
            query.status = status;
        }

        // FILTER BY SOURCE
        if (source) {
            query.source = source;
        }

        // SEARCH
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // PAGINATION
        const limit = 10;

        const pageNumber = Number(page);

        const skip = (pageNumber - 1) * limit;

        // SORTING
        let sortOption = {};

        if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        } else {
            sortOption = { createdAt: -1 };
        }

        // FETCH LEADS
        const leads = await Lead.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        // TOTAL COUNT
        const total = await Lead.countDocuments(
            query
        );

        res.status(200).json({
            success: true,

            currentPage: pageNumber,

            totalPages: Math.ceil(total / limit),

            totalLeads: total,

            leads,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};


// GET SINGLE LEAD
export const getLead = async (
    req: Request,
    res: Response
) => {
    try {
        const lead = await Lead.findById(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json({
            success: true,
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};


// UPDATE LEAD
export const updateLead =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const lead =
                await Lead.findByIdAndUpdate(
                    req.params.id,

                    req.body,

                    {
                        new: true,
                    }
                );

            res.status(200).json({
                success: true,
                lead,
            });

        } catch (error) {

            res.status(500).json({
                message:
                    "Server Error",
            });
        }
    };



// DELETE LEAD
export const deleteLead = async (
    req: Request,
    res: Response
) => {
    try {
        const lead = await Lead.findByIdAndDelete(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};