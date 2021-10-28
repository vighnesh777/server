const express= require("express");
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const https = require('https');
var PORT=process.env.PORT || 3001;
const options = {
  
  path: '/signin',
  method: 'post'
};

const app= express();
var MongoClient = require('mongodb').MongoClient;  
const { stringify } = require("querystring");
var url = "mongodb+srv://test123:test123@cluster0.jxbu5.mongodb.net/Users?retryWrites=true&w=majority";  
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",function(req,res){
    res.send("<h1>Server Up and Running</h1>");
})
app.post("/signin",function(req,res){
    
 MongoClient.connect(url,function (err, client){  

     if (err) throw err;  
     var db = client.db('Users');
     var email1= req.body.Email;
     var username= req.body.Username;
     var password1=bcrypt.hashSync(req.body.password1, 10);
     var myobj = { name: username, email: email1, password: password1 };  
     console.log(email1,username,password1);
     db.collection("User_details").insertOne(myobj, function(error, res) {  
     if (error) throw error;  
      

     client.close();  
     });  
     });
 res.sendFile(__dirname+"/Signin_success.html")  ;
    
})


app.listen(PORT,function(){
    console.log("Server UP on "+PORT);
})



