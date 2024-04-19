import express from "express";
import routerPost from "./routes/posts.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routerPost);

export default app;
