
import Joi from "joi";

// crypto.randomUUID()
// 36 characters

export const createOrUpdateDutySchema = Joi.object({
    name: Joi.string().required(),
});

export const getDutySchema = Joi.object({
    id: Joi.string()
        .guid({ version: "uuidv4" })
        .required()
        .messages({
            "string.guid": "id debe ser un UUID v4 válido",
            "string.empty": "id no puede estar vacío",
            "any.required": "id es obligatorio",
        }),
});