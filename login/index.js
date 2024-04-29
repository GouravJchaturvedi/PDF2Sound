const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const login = require('./models/login.model')

const app = express();
//MiddleWare for converting data into json format
app.use(express.json())

app.use(express.urlencoded({extended : false}))


//connecting to DataBase
const connect = mongoose.connect("mongodb+srv://tripathimohit424:M2sBugtr0ucSZN9z@cluster0.xmvwf9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

//Check the connection is done or not
connect.then(()=>{
    console.log("Succesfully connected to the Database!!")
})
.catch(()=>{
    console.log("Failed to connect to the Database")
})


//Starting the Server
app.listen(8000 , () =>{
    console.log("App Started on Port Number : " , 8000)
})

//Register User
app.post("/signup" , async(req , res) =>{
    const data = {
        name : req.body.username,
        password : req.body.password,
        email : req.body.email,
        mobile : req.body.mobile
    }

    //Check if the userwith the username already exists or not
    const existingUser = await login.findOne({name : data.name})
    const existEmail = await login.findOne({email : data.email})
    const existMobile = await login.findOne({mobile : data.mobile})

    if(existingUser){
        res.send("User already exists.Choose a different username")
        return ;
    }

    if(existEmail){
        res.send("Email Already exists")
        return ;
    }

    if(existMobile){
        res.send("Mobile Number Already exxist")
        return ;
    }
    //Hash the password
    const hashPass = await bcrypt.hash(data.password , 10)
    data.password = hashPass

    const userdata = await login.insertMany(data);
    console.log(userdata)
})


// Login User
app.post("/login" , async (req , res) =>{
    try{
        const check = await login.findOne({name : req.body.username})
        if(!check){
            res.send("Invalid Username")
        }
        const checkPass = await bcrypt.compare(req.body.password , check.password)
        if(checkPass){
            res.redirect("http://127.0.0.1:5000")
        }else{
            res.send("Wrong Password")
        }
    }catch{
        res.send("Invalid Details")
    }
})

//Setting the EJS
app.set('view engine' , 'ejs')
app.use(express.static("public"));

app.get("/" , (req , res) =>{
    res.render("login")
})

app.get("/signup" , (req , res) =>{
    res.render("signup")
})




