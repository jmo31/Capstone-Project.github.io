
const Event = require('../models/event')

exports.isGuest =(req, res, next)=>{
    if(!req.session.user){

        return next();
    }
    else{
      req.flash('error', 'You are logged in already')  ;
      return res.redirect('/users/profile');
    }

};

//check if user is authenticated
exports.isLoggedIn =(req, res, next)=>{

    if(req.session.user){

        return next();
    }
    else{
      req.flash('error', 'You need to login first')  ;
      return res.redirect('/users/login');
    }
};

//check if user is of the story
exports.isAuthor =(req, res, next)=>{
let id =  req.params.id;
Event.findById(id)
.then(event=>{
    if(event){
        if(event.hostName ==req.session.user){
            return next()
        }else{
           let err = new Error('Unauthorized to access the resource');
           err.status =404;
           return next(err);
        }
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }

})
.catch(err=>next(err));
};