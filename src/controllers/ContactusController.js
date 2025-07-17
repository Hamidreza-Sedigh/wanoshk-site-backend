const jwt = require('jsonwebtoken');
const ContactMessage = require('../models/ContactMessage');
const ReportModel = require('../models/Report');
const { Types } = require('mongoose'); // اضافه شده برای ObjectId

module.exports = {
  async createContact(req, res) {
    try {
      console.log("ContactController:", req.body);
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "لطفاً همه فیلدها را پر کنید." });
      }

      const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

      const newMessage = new ContactMessage({
        name,
        email,
        subject,
        message,
        ip,
        read: false
      });

      await newMessage.save();

      return res.status(200).json({ message: "پیام با موفقیت ذخیره شد." });

    } catch (error) {
      console.error("خطا در ذخیره پیام تماس:", error);
      return res.status(500).json({ message: "خطا در سرور. لطفاً بعداً امتحان کنید." });
    }
  },

  async reportProblem(req, res) {
    console.log("reportProblem Started...");
    try {
      const { newsId, url, description } = req.body;

      if (!newsId || !url) {
        return res.status(400).json({ message: 'newsId و url الزامی هستند.' });
      }

      const newReport = await ReportModel.create({
        newsId: new Types.ObjectId(newsId),
        url,
        description: description || '',
      });

      return res.status(201).json({
        message: 'گزارش با موفقیت ثبت شد.',
        data: newReport,
      });

    } catch (err) {
      console.error('خطا در ثبت گزارش:', err);
      return res.status(500).json({ message: 'خطایی در ثبت گزارش رخ داد.' });
    }
  }
};
