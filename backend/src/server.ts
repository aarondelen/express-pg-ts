import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; 

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});
