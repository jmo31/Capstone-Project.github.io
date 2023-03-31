
const model = require('../models/user');
const User = require('../models/user');



exports.new = (req, res)=>{
    res.render('./user/new');
};
//post
exports.create=(req, res, next)=>{

    let user = new User(req.body);
    user.save()
    .then(()=>res.redirect('/users/login'))

    .catch(err=>{

        if(err.name==='ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code===11000){
            req.flash('error', 'Email address has been used')
            return res.redirect('/users/new');
        }
        next(err);
    });
    
};



exports.newLogin =(req, res)=>{
    
    res.render('./user/login');
};


exports.createLogin= (req, res, next)=>{
    // authonticate user's login request

    let email = req.body.email;
    let password = req.body.password;
   
    //get the users that matches the  eamil

    User.findOne({email:email})

    .then(user=>{
        if(user){
       user.comparePassword(password)
       .then(result=>{
       if(result){
        req.session.user = user._id; //store users id
        req.flash('success', 'You have successfully logged in');
        res.redirect('/users/profile')
       }else{
        //console.log('wrong password')
        req.flash('error', 'Wrong logged in');
        res.redirect('/users/login')
       }
       })
        }else{
            //console.log('wrong email address')
            req.flash('error', 'wrong email address');
            res.redirect('/users/login');
        }

    })
   .catch(err=>next(err));

};



exports.profile = (req, res, next)=>{

    let id =req.session.user;
    User.findById(id)
    .then(user=>res.render('./user/profile', {user}))
    .catch(err=>next(err))

};


exports.logout= (req, res, next)=>{
    req.session.destroy(err=>{
        if(err)
        return next(err);
        else
        res.redirect('/users/login');
    });
};

