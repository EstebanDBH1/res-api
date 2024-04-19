import { pool } from "../db.js";

export const getPosts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "algo salio mal.",
    });
  }
};
export const getPost = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "post not found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "algo salio mal.",
    });
  }
};
export const createPost = async (req, res) => {
  try {
    const { nick, content } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO posts(nick, content) VALUES(?, ?)",
      [nick, content]
    );

    res.send({
      id: rows.insertId,
      nick,
      content,
    });
  } catch (error) {
    return res.status(500).json({
      message: "algo salio mal.",
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "post not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "algo salio mal.",
    });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { nick, content } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE posts SET nick = IFNULL(?, nick), content = IFNULL(?, content) WHERE id = ?",
      [nick, content, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Post not found",
      });

    const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
    res.json("received");
  } catch (error) {
    return res.status(500).json({
      message: "algo salio mal.",
    });
  }
};