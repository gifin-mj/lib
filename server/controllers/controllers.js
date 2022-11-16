const user = require('../model/usermodel');
var usermodel=require('../model/usermodel');
const bookmodel=require('../model/bookmodel');


exports.signup=(req,res,next)=>{

    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return
    }
    else{
        if(req.body.password === req.body.cpassword){
            const user=usermodel({
            name:req.body.name,
            password:req.body.password
            })
            user
                .save()
                .then(()=>{
                    res.redirect('/')
                })
                .catch((err)=>{
                    res.status(500).send({
                        message : err.message || "Some error occurred while creating a create operation"
                    });
                })
            
        }
        else{
            res.render('signup',{status:true})
        }
    }
}

exports.login= async(req,res,next)=>{
    let username=req.body.username
    let password=req.body.password
    const user = await usermodel.findOne({ name: username,password:password });
    if (!user) {
      res.render('login',{status:true})
    }
    else{
        console.log(user);
        req.session.user = user;
        req.session.userloggedIn = true;
        res.redirect('/')
    }
}

exports.addbook=(req,res,next)=>{
   
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"})
        return
    }
    else
    {

    const book=new bookmodel({
        userid:req.body.userid,
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        publisher:req.body.publisher,
        price:req.body.price
    })
    book
        .save(book)
        .then((result)=>{
            let lastid=JSON.stringify(result._id)
            console.log(lastid);
          let image=req.files.image
          lastid=lastid.split('"').join('')
             image.mv('./public/images/'+lastid+'.jpg',(err,done)=>{
        if(err)
         console.log(err);
        else
        res.redirect('/')
    })
        })
        .catch((err)=>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        })
    }
}

exports.delete=(req,res,next)=>{
    let id=req.params.id
    bookmodel.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.redirect('/')
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
}

exports.updatebook=(req,res,next)=>{
    if(!req.body){
        res.status(400).send({message:"Data tou cannot be empty"})
        return
    }
    else{
       let id=req.params.id
       console.log(id);
        bookmodel.findByIdAndUpdate(id,req.body,{ useFindAndModify: false})
            .then((data)=>{
                if(!data){
                    res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                }else{
                    
                    if (req.files.image) {
      
                    let image=req.files.image
                        image.mv('./public/images/'+id+'.jpg',(err,done)=>{
                            if(err)
                              console.log(err);
                            else
                              res.redirect('/')
                          })
                 
                }}
            })
            .catch((err)=>{
                res.redirect('/')
            })

    }
}
