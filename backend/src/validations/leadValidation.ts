import Joi from "joi";

export const leadSchema = Joi.object({
    name: Joi.string().min(3).required(),

    email: Joi.string().email().required(),

    status: Joi.string()
        .valid(
            "New",
            "Contacted",
            "Qualified",
            "Lost"
        )
        .required(),

    source: Joi.string()
        .valid(
            "Website",
            "Instagram",
            "Referral"
        )
        .required(),
});