import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Hello, this is the backend with Prisma 🚀",
  });
});

app.get("/users", async (req, res) => {
  try {
    const search = req.query.search?.toString() || "";

    const users = await prisma.user.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
      orderBy: {
        id: "asc",
      },
    });
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
      data: {
        name,
        email,
        age: age ? Number(age) : null,
        salary: salary ? Number(salary) : null,
        job: job || null,
        status,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, age, salary, job, status } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, age, salary, job, status },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("PUT /users/:id error", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
