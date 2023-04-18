
const model = require('../models/event.js');
const User =require('../models/user.js')

exports.index = (req, res, next) => {
  
 model.find()
    
.then(events=>{
    model.distinct('category')
    .then(categories=>{
       res.render('./event/index.ejs', { events, categories})

    })
    .catch(err=>next(err));
})
    .catch(err=>next(err));

};

exports.new = (req, res) => {
    res.render('./event/newEvent.ejs')
};


exports.create = (req, res, next) => {
    // res.send('created form')
   let event = new model(req.body);
   if(req.file){
    event.image = '/images/' + req.file.filename;
   }
   event.hostName = req.session.user;
   event.save()
   .then((event)=>{
    res.redirect('/events')
   })
   .catch(err=>{
    if(err.name ==='ValidationError'){
        err.status= 400;
    }
    next(err);
});
};

exports.show = (req, res, next) => {

    let user = req.body;
    let id = req.params.id;

    let user_id = req.session.user;
    Promise.all([User.findById(user_id), model.findById(id).populate('hostName', 'firstName lastName')])
    .then(result=>{
        const [user, event]= result;
        if(event && user){
          return  res.render('./event/event.ejs', {user, event });
        } else if(event){
            return  res.render('./event/event.ejs', {event });  
        }
        else{
        let err = new Error('Cannot find a event with id '+ id);
        err.status=404;
        next(err);
        }

        
    })
    .catch(err=>next(err))
    
    //    res.send('send all events with id ' +req.params.id)
};

//updated
exports.edit = (req, res, next) => {
    // res.send('send the edit form')
    let id = req.params.id;

   model.findById(id)
   .then(event=>{
  
       return  res.render('./event/edit.ejs', { event});

   })
   .catch(err=>next(err))


};

//put

exports.update = (req, res, next) => {
    // res.send('updated all events with id ' + req.params.id)
    let event =req.body;
    let id =req.params.id;

    if(req.file){
        event.image= '/images/'+ req.file.filename;
    }
    model.findByIdAndUpdate(id, event,{useFindAndModify: false, runValidators: true } )

    .then(event=>{
        
            res.redirect('/events/');
    })
    .catch(err=>{
        if(err.name ==='ValidationError'){
            err.status= 400;
        }
        next(err);
    });

};

//delete
exports.delete = (req, res, next) => {
    // res.send('delete all events with id ' + req.params.id)
    let id =req.params.id;
   
    model.findByIdAndDelete(id,{useFindAndModify: false})
    .then(event=>{
       
            res.redirect('/events');
    
    })

    .catch(err=>next(err))
};

