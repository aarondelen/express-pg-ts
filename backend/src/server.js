import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// const pool = new Pool({  // PostgreSQL connection settings
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
// });

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Hello, this is the backend with Prisma 🚀",
  });
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, age, salary, job, status } = req.body;

    const newUser = await prisma.user.create({
      data: { name, email, age, salary, job, status },
    });
    
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;  // Default to 3000 if PORT is not set (For TYPESCRIPT)

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
