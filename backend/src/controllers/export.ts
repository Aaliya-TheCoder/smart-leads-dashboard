import { Request, Response } from "express";

import { Parser } from "json2csv";

import Lead from "../models/Lead";

export const exportLeads = async (
    req: Request,
    res: Response
) => {
    const leads = await Lead.find();

    const fields = [
        "name",
        "email",
        "status",
        "source",
    ];

    const parser = new Parser({ fields });

    const csv = parser.parse(leads);

    res.header(
        "Content-Type",
        "text/csv"
    );

    res.attachment("leads.csv");

    return res.send(csv);
};