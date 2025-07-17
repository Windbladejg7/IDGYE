import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    host: process.env.HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

