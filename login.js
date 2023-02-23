const mysql = require("mysql");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const encoder = bodyParser.urlencoded();

const connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "capstone",
database:"nodejs"
});

connection.connect(function(error){

    if (error) throw error
    else console.log("Connected successfully to the ")
})

app.get("/", function(req,res){

    res.sendFile(__dirname+"/views/login.html")

})

app.post("/", encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from userlogin where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/views/index.html");
            alert("Hello! I am an alert box!!");
        }else{
            res.redirect("/views/register.html");
        }
        res.end();

    });
})

app.get("/views/index.html", function(req,res){

    res.sendFile(__dirname+"/views/index.html");
})



app.listen(4000);