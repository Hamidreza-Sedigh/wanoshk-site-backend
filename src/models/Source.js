const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema({
    sourceName : String,
    sourceNameEn : String,
    siteAddress : String,
    //rssURL : { type: String, required: true, unique: true }, 
    rssURL: String,
    tagClassName : String,
    secondTag : String,
    isLocalImg : Boolean,
    isCategorized : Boolean,
    category : String,
    categoryEn: String,
    subCategory : String,
    subCategoryEn : String,
    lastTimeFetch: Date,
    status: String,
    enable: Boolean
})

module.exports = mongoose.model('Source', SourceSchema)