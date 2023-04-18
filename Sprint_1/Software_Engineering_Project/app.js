const express =require('express');
const morgan =require('morgan');
const fs =require('fs');
const ejs = require('ejs');
const methodOverride =require('method-override');
const mongoose =require('mongoose');
const eventRouter =require('./router/eventRouter');
const mainRouter =require('./router/mainRouter');

// const {fileUpload} = require('./middleware/fileUpload');

// const {fileUpload}=require('./middleware/fileUpload')

const app = express();
let port =4000;
let host ='localhost';
let url ='mongodb+srv://eshetu:Mygrace%40%4007!@cluster0.qli7n5o.mongodb.net/nbda-softwareProject?retryWrites=true&w=majority'
app.set('view enjine', 'ejs');



mongoose.connect(url)
.then(()=>{
    app.listen(port, host, ()=> {
    console.log('The server is running at port', port);
});

})
.catch(err=>console.log(err.message))

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));



// app.post('/', fileUpload, (req, res, next) => {
//     let image =  "./images/" + req.file.filename;
//     res.render('./event/newEvent.ejs', {image});
// });


app.use('/events',eventRouter)

app.use('/',mainRouter)

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate'+ req.url);
    err.status =404;
    next(err);
})


app.use((err, req, res, next)=>{
    console.log(err.stack);
     if(!err.status){
         err.status =500;
         err.message =("Internal server error");
     }
         res.status(err.status);
         res.render('error.ejs',{error:err});
 });




