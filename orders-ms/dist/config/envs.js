"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const joi = require("joi");
const envSchema = joi
    .object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    PRODUCTS_SERVICE_URL: joi.string().required(),
})
    .unknown(true);
const { error, value } = envSchema.validate(process.env);
if (error)
    throw new Error(`Config validation error: ${error.message}`);
const envsVars = value;
console.log(envsVars);
exports.envs = {
    PORT: envsVars.PORT,
    DB_HOST: envsVars.DB_HOST,
    DB_PORT: envsVars.DB_PORT,
    DB_USER: envsVars.DB_USER,
    DB_PASSWORD: envsVars.DB_PASSWORD,
    DB_NAME: envsVars.DB_NAME,
    PRODUCTS_SERVICE_URL: envsVars.PRODUCTS_SERVICE_URL,
};
//# sourceMappingURL=envs.js.map