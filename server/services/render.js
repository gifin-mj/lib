var passport = require('passport');
const bookmodel = require('../model/bookmodel');
var controllers=require('../controllers/controllers')

exports.index=function(req, res, next) {
  let user=req.session.user
  if(req.session.userloggedIn){
    let user=req.session.user
    let userid=null
    user.id?userid=user.id:userid=user._id
    bookmodel.find({userid:userid})
    .then((result)=>{
      console.log(result);
      res.render('index',{user,books:result})
    })
  }
  else{
    bookmodel.find()
    .then((result)=>{
      res.render('index',{books:result})
    })
  }
  
  
}

exports.login=function(req, res, next) {
    res.render('login');
}


exports.signup=(req,res,next)=>{
  res.render('signup')
}

exports.addbook=(req,res,next)=>{
  let user=req.session.user
  res.render('addbook',{user})
}

exports.findbook=(req,res,next)=>{
        id=req.params.id
        let user=req.session.user
        bookmodel.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{
                console.log(data);
                res.render('addbook',{user,book:data})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving book with id " + id+err})
        })
    }