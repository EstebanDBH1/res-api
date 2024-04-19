import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/post.controllers.js";

const routerPost = Router();

routerPost.get("/posts", getPosts);
routerPost.get("/posts/:id", getPost);
routerPost.post("/post", createPost);
routerPost.put("/post/:id", updatePost);
routerPost.delete("/post/:id", deletePost);

export default routerPost;