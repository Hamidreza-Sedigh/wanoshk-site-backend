const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    sourceName : String,
    siteAddress : String,
    title : String,
    description : String,
    link : String,
    passage : String,
    date : Date,
    fetchDate : Date,
    category : String,
    categoryEn: String,
    subCategory : String,
    subCategoryEn : String,
    views: Number
})

NewsSchema.index({ title: 'text', description: 'text', passage: 'text' });

module.exports = mongoose.model('News', NewsSchema)