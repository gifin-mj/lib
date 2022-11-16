
const { Int32 } = require('mongodb')
var mongoose=require('mongoose')

var bookschema=new mongoose.Schema({
    userid:{
       
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const book=mongoose.model('book',bookschema)

module.exports=book