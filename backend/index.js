const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://PrinceSinghDogra:1234@authdb.dj94yhv.mongodb.net/princesinghdogra100').then(()=>{
console.log("The database is connected");
}).catch((error)=>{
console.log("The database is not connected",error)    
})
const studentdetail = new mongoose.Schema({
   firstName:{
    type:String,
    required:true,
   },
   lastName:{
    type:String,
    required:true,
   },
   uid:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
   },
   fatherName:{
    type:String,
    required:true,
   },
   motherName:{
    type:String,
    required:true,
   },
   fphoneNo:{
    type:String,
    required:true,
   },
   mphoneNo:{
    type:String,
    required:true,
   },
   phoneNo:{
    type:String,
    required:true,
   },
   hostel:{
    type:String,
    required:true,
   },
   roomNo:{
    type:String,
    required:true,
   },
   wardenName: {
    type:String,
    required:true,
   },
   password:{
    type:String,
    required:true,
   },
   confirmPassword:{
    type:String,
    required:true,
   },
   gender:{
    type:String,
    required:true,
   } ,  
})
const admindetail = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    employeeId: {
        type:String,
        required:true,
    },
    hostel: {
        type:String,
        required:true,
    },
    phoneNo: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    confirmPassword: {
        type:String,
        required:true,
    }, 
})
const gatekeeperdetail = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    employeeId: {
        type:String,
        required:true,
    },
    hostel: {
        type:String,
        required:true,
    },
    phoneNo: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    confirmPassword: {
        type:String,
        required:true,
    },
})
const studentdata = mongoose.model("studentdetail",studentdetail);
const gatekeeperdata = mongoose.model("gatekeeperdetail",gatekeeperdetail);
const wardendata = mongoose.model("admindetail", admindetail);
app.post('/studentregister',(req,res)=>{
 const response = req.body;
 console.log("The response data we got is",response);
 const student = new studentdata(response);
 student.save().then(()=>{
    console.log("The data is saved")
 }).catch((e)=>{
    console.log("The data is not saved",e);
 })
})
app.post('/wardenregister',(req,res)=>{
 const response = req.body;
 console.log("Tne data from warden registeration form ", response);
 const warden = new wardendata(response);
 warden.save().then(()=>{
    console.log("The data is saved.");
 }).catch((e)=>{
    console.log("The data is not saved",e);
 })

})
app.post('/guardregister',(req,res)=>{
    const response= req.body;
    console.log("The data from guard registeration form ", response);
    const guard = new gatekeeperdata(response);
    guard.save().then(()=>{
        console.log("The data is saved");
    }).catch((e)=>{
        console.log("The data is not saved.",e);
    })
})
app.post('/studentlogin', async (req,res)=>{
    const response = req.body;
    const {uid,password} = response;
    const user = await studentdata.findOne({uid:uid,
                                            password:password,});
    if(user){
        console.log("valid");
        res.send("Valid");
    }
    else{
        res.send("Not Valid")
    }

    console.log("The response is" , response);
})
app.post('/wardenlogin',async (req,res)=>{
    const response = req.body;
    const {employeeId,password} = response;
    const user = await wardendata.findOne({employeeId:employeeId,
                                            password:password, })
     console.log("The data is ",response);
    if(user){
       console.log("valid"); 
       res.send("Valid");
    }else{
       console.log("Not valid");
       res.send("Not Valid");
    }
  
})
app.post('/guardlogin',async (req,res)=>{
    const response = req.body;
    const {employeeId,password} = response;
    console.log("The data is " , response);
    const user = await gatekeeperdata.findOne({employeeId:employeeId,
                                               password,password,
    })
    if(user){
        console.log("The data is valid");
        res.send("Valid");
    }
    else{
        console.log("Not valid");
        res.send("Not Valid");
    }
})
app.listen(3001,()=>{
    console.log("The is server is running port number 3001");
})