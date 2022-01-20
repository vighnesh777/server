const express= require("express");

const bodyParser = require('body-parser');

var PORT=process.env.PORT || 3001;



const app= express();
// var MongoClient = require('mongodb').MongoClient;  
const mongoose=require("mongoose");

const { stringify } = require("querystring");
var url = "mongodb+srv://test123:test123@cluster0.jxbu5.mongodb.net/Users?retryWrites=true&w=majority";  
app.use(express.static('build'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let cors = require('cors')
app.use(cors())

app.use(express.json());
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    gender:{type: String, required: true},
    relation:{type: String, required: true},
    dob:{type: String, required: true}
  });
const user=mongoose.model("User",userSchema)
mongoose.connect(url,(err)=>{
    if(err){console.log("Error Connecting to Data base");}
    console.log("Connection OK");
})
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/",function(req,res){
    res.send("<h1>Server Up and Running</h1>");
})
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.post("/add",function(req,res){
    
            var Name=req.body.Name;
            var Gender=req.body.Gender;
            var Relation=req.body.Relation;
            var Dob=req.body.Dob;
            const current=new user({name:Name,gender:Gender,relation:Relation,dob:Dob});
            var connection=mongoose.connection;
            console.log("Done");
            connection.collection("users").insertOne(current,(err)=>{
                if(err){res.sendStatus(403)}
                console.log("Inserted");
                res.sendStatus(200);
            
        })
    
})
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/getData",function(req,res){
    
            
            // const current=new user({name:Name,gender:Gender,relation:Relation,dob:Dob});
           
            
           user.find({},function(err,items){
               res.json(items);
           })
            
            console.log("Fetched");
    
})
app.listen(PORT,function(){
    console.log("Server UP on "+PORT);
})



