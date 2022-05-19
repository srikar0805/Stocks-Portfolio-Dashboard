const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const template=new Schema(
    {
        trans_Date:{
            type:Date
        
        },
        
        ticker:{
            type:String
        
        },

        action: {
            type:String
            
        },

        quantity:{
            type:Number
        },

        price:{
            type:Number
        },

        total:{
            type:Number
        },
    
    
    },   { timestamps:true }
);

const transactions=mongoose.model('transactions',template);

module.exports=transactions;