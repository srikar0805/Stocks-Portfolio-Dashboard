const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const jwt = require("jsonwebtoken");
const template=new Schema(
    {
        username:{
            type:String
        
        },
        
        email:{
            type:String
        
        },

        password: {
            type:String
            
        },

        mobile:{
            type:Number

        },

        tokens:[{
            token:{
                type:String
                
            }
        }]
    
    },   { timestamps:true }
);

template.methods.generateAuthtoken = async function()
{
    try{
        const tok = jwt.sign({_id:this._id.toString()},"mynameissanjusabuandiamacseundergraduatestudent")
        // console.log(token);
        this.tokens = this.tokens.concat({token:tok});
        // console.log(this.tokens);
        await this.save();
        return tok;
    }
    catch(error)
    {
        console.log("The error part "+ error);
    }
}
const details=mongoose.model('details',template);

module.exports=details;