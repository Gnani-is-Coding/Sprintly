import express from "express";
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello Gnani here !!");
});

app.listen(PORT, () => {
  console.log("Listenning surrently to port", PORT);
});

export default app;
