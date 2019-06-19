const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UrlSchema = new Schema({
    Created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    url: {
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true
    }
})
module.exports = Url = mongoose.model('url',UrlSchema);