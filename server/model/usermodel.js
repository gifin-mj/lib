var mongoose=require('mongoose')

var userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const user=mongoose.model('user',userschema)

module.exports=user