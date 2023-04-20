
const Event = require('../models/event');
const model = require('../models/user');



exports.new = (req, res)=>{
    res.render('./user/new.ejs');
};
//post
exports.create=(req, res, next)=>{

    let user = new model(req.body);
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
    
    res.render('./user/login.ejs');
};


exports.createLogin= (req, res, next)=>{
    // authonticate user's login request
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong userCredentials');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'wrong userCredentials');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));

};



exports.profile = (req, res, next)=>{

    let id = req.session.user;
    Promise.all([model.findById(id), Event.find({hostName:id})])
     .then(results=>{
         const [user, events]=results;
         res.render('./user/profile.ejs', {user, events})
     })
     .catch(err=>next(err));
 };
 


exports.logout= (req, res, next)=>{
    req.session.destroy(err=>{
        if(err)
        return next(err);
        else
        res.redirect('/');
    });
};

