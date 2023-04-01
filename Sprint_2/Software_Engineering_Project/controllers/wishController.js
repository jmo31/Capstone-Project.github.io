const model = require('../models/event.js');

exports.wish= (req, res, next) => {
  
    model.find()
       
   .then(events=>{

       model.distinct('category')
       .then(categories=>{
          res.render('./event/wish.ejs', { events, categories})
           console.log(events)
   
       })
       .catch(err=>next(err));
   })
       .catch(err=>next(err));
   
   };

   exports.new = (req, res) => {
    res.render('./event/topEvent.ejs')
};


exports.create = (req, res, next) => {
    // res.send('created form')
   let event = new model(req.body);
  event.image = '/images/' + req.file.filename;
  event.save()
   
   .then((list)=>{
    res.redirect('/wish')
   })
   .catch(err=>{
    if(err.name ==='ValidationError'){
        err.status= 400;
    }
    next(err);
});
};


exports.show = (req, res, next) => {

    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invlaid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then( event=>{
        if( event){
            res.render('./event/show.ejs', { event });
        }else{
        let err = new Error('Cannot find a event with id '+ id);
        err.status=404;
        next(err);

        }
    })
    .catch(err=>next(err))
    
    //    res.send('send all events with id ' +req.params.id)
};


   exports.update = (req, res, next) => {
    // res.send('updated all events with id ' + req.params.id)
    let  event=req.body;
    let id =req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invlaid story id');
        err.status = 400;
        return next(err);
    }

    event.image= '/images/'+ req.file.filename;
    model.findByIdAndUpdate(id, event,{useFindAndModify: false, runValidators: true } )

    .then( event=>{
        if( event){
            res.redirect('/wish/');
        }else{
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name ==='ValidationError'){
            err.status= 400;
        }
        next(err);
    });

};