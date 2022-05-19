const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const Schema=mongoose.Schema;
// create an schema
let userSchema = new Schema({
    
            name: String,
            password: String,
            
        });

let Users=mongoose.model('users',userSchema);
 
module.exports = Users;