const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// 📌 گرفتن کامنت‌های یک خبر
router.get("/:newsId", async (req, res) => {
  try {
    const { newsId } = req.params;

    const comments = await Comment.find({ newsId, status: "approved" })
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "خطا در گرفتن کامنت‌ها", error: err.message });
  }
});

// 📌 ثبت یک کامنت جدید
router.post("/", async (req, res) => {
  try {
    const { newsId, userId, author, content } = req.body;

    if (!newsId || !content) {
      return res.status(400).json({ message: "newsId و content الزامی هستند" });
    }

    const newComment = new Comment({
      newsId,
      userId: userId || null,
      author: author || "مهمان",
      content,
      status: "approved",
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "خطا در ثبت کامنت", error: err.message });
  }
});

module.exports = router;
