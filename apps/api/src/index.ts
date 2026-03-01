import express from "express";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json()); // to parse JSON payloads
// app.use() // #TODO: CORS setup.

//routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello Gnani here !!");
});

app.listen(PORT, () => {
  console.log("Listenning to port", PORT);
});

export default app;
