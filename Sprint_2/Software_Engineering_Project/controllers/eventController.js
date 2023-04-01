
const model = require('../models/event.js');

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
   event.image = '/images/' + req.file.filename;
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

    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invlaid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event){
            res.render('./event/event.ejs', { event });
        }else{
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
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invlaid story id');
        err.status = 400;
        return next(err);
    }
   model.findById(id)
   .then(event=>{
    if (event) {
        res.render('./event/edit.ejs', { event});
    } else {
        let err = new Error('Cannot find a event with id '+ id);
        err.status=404;
        next(err);
    }

   })
   .catch(err=>next(err))


};

//put

exports.update = (req, res, next) => {
    // res.send('updated all events with id ' + req.params.id)
    let event =req.body;
    let id =req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invlaid story id');
        err.status = 400;
        return next(err);
    }

   event.image= '/images/'+ req.file.filename;
    model.findByIdAndUpdate(id, event,{useFindAndModify: false, runValidators: true } )

    .then(event=>{
        if(event){
            res.redirect('/events/');
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

//delete
exports.delete = (req, res, next) => {
    // res.send('delete all events with id ' + req.params.id)
    let id =req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invlaid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id,{useFindAndModify: false})
    .then(event=>{
        if(event){
            res.redirect('/events');
        }else{
        let err = new Error('Cannot find a events with id ' + id);
        err.status = 404;
         return next(err);
            
        }
    })

    .catch(err=>next(err))
};

