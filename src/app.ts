import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes"; 
import { errorHandler } from "./app/middlewares/globalErrorHandler";

const app: Application = express(); // ১. আগে অ্যাপটি ডিক্লেয়ার করুন

// ২. মিডলওয়্যার (Middlewares)
app.use(express.json());
app.use(cors());

// ৩. অ্যাপ্লিকেশন রুটস (Application Routes)
app.use("/api/v1", router);

// ৪. ডিফল্ট রুট
app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle Rental System Server is running!");
});

// ৫. গ্লোবাল এরর হ্যান্ডলার (এটি সব সময় সব রুটের নিচে হতে হবে)
app.use(errorHandler);

export default app;