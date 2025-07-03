const jwt = require('jsonwebtoken');
const ContactMessage = require('../models/ContactMessage');

module.exports = {
    async createContact(req, res){
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
                read: false, // اختیاری، چون در مدل default: false داریم
            });

            await newMessage.save();

            return res.status(200).json({ message: "پیام با موفقیت ذخیره شد." });

            //old version:
            // const contactResponse = await Contact.create({
            //     email,
            //     category,
            //     passage,
            //     read: 0
            // });
            
        } catch (error) {
            console.error("خطا در ذخیره پیام تماس:", error);
            return res.status(500).json({ message: "خطا در سرور. لطفاً بعداً امتحان کنید." });
        }
    }
}