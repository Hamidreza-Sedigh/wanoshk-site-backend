const jwt = require('jsonwebtoken');
const Contact = require('../models/Contact');

module.exports = {
    async createContact(req, res){
        try {
            console.log("ContactController:", req.body);
            const {email, category, passage} = req.body;

            
            const contactResponse = await Contact.create({
                email,
                category,
                passage,
                read: 0
            });
            
        } catch (error) {
            throw Error('Error while registering new user: ${error}')
        }
    }
}