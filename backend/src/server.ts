import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { corsOptions } from "./config/cors";
import { connectDB } from "./config/db";
import apiRouter from "./router";

// habilitar variables de entorno
dotenv.config();
const app = express();

// habilitar CORS
app.use(cors(corsOptions));

connectDB();

// habilitar lectura de datos
app.use(express.json());
// habilitar logger de datos
app.use(morgan("dev"));

// routing
app.use("/api", apiRouter);

export default app;
