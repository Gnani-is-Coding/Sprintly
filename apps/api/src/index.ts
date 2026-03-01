import express from "express";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import cookieParser from "cookie-parser";
import authorise from "./middlewares/authorise";
const app = express();

const BACKEND_PORT = process.env.BACKEND_PORT || 8080;

app.use(express.json()); // to parse JSON payloads
app.use(cookieParser()); // to parse req.cookies
// app.use() // #TODO: CORS setup.

//routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/", authorise, (req, res) => {
  res.send("Hello Gnani here !!");
});

app.listen(BACKEND_PORT, () => {
  console.log("Listenning to BACKEND_PORT", BACKEND_PORT);
});

export default app;

// #TODO: Re-structure the architecture of this project,
// Rotes -> controller (req, res) -> service ->( returns data) -> controller (sends Response).
