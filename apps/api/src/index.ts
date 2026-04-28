import express from "express";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import cookieParser from "cookie-parser";
import authorise from "./middlewares/authorise";
import cors, { type CorsOptions } from "cors";
import { limiter } from "./middlewares/rateLimiter/globalLimiter";
import helmet from "helmet";

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 8080;
const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    const whitlistedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

    // allow same-origin / curl (no Origin header)
    if (!origin || whitlistedOrigins.includes(origin)) {
      cb(null, true); // True -> the origin is allowed, null -> Error is null.
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Without this browsers strip Cookies on Cross-origin requests.
};
app.set("trust proxy", 1); //

app.use(cors(corsOptions));
app.use(
  helmet({
    contentSecurityPolicy: false, // CSP only matters when serving HTML
  }),
); // Adds various HTTP response headers, to fight against, XSS, click-jacking, MIME sniffing
// it tells the browser to enforce stricter rules on responses your API sends.

app.use(express.json()); // to parse JSON payloads
app.use(cookieParser()); // to parse req.cookies
app.use(limiter);

//routes
app.use("/v1/auth", authRouter);
app.use("/v1/users", authorise, userRouter);

app.get("/", (req, res) => {
  res.send("Hello Gnani here !!");
});

app.listen(BACKEND_PORT, () => {
  console.log("Listenning to BACKEND_PORT", BACKEND_PORT);
});

export default app;

// #TODO: Re-structure the architecture of this project,
// Rotes -> controller (req, res) -> service ->( returns data) -> controller (sends Response).
