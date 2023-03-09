var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'localhost:3306',
   user:'root',
   password:'capstone',
   database:'nodejs'
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
 module.exports = connection;