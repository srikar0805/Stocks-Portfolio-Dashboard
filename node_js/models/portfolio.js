const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const template = new Schema(
    {
        portfolio:{
            type:String
        },
    }
)

const portfolio = mongoose.model('portfolio',template);
module.exports = portfolio;