import express, { response } from "express";
import path, { resolve } from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";



import hashPassword from "./public/js/passwordHash.mjs";
import compare_password from "./public/js/comparePassword.mjs";

import userModel from "./Schemas/user_Schemas.mjs";

const app=express()
const PORT=process.env.PORT || 3000;
const __dirname=path.resolve();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(session({
    secret:"Tic Tac Toe",
    saveUninitialized:true,
    resave:true,
    cookie:{
        maxAge:36000*60
    }
}))

app.use(flash())


app.use(express.static(path.join(__dirname,'public')))
.set('views',path.join(__dirname,'views'))
.set('view engine','ejs')


app.use(cookieParser("Hello Test"))




// Database Connetion
const DB_URL="mongodb://localhost:27017/Tic_Tac_Toe";

mongoose.connect(DB_URL)
.then(()=>{console.log("DB Connected")})
.catch((err)=>console.log("DB Connection Error"));



app.get('/',(request,response)=>{
    return response.redirect('/register')
})

app.get('/register',(request,response)=>{
    response.render("register",{note:request.flash()})
})

app.get('/login',(request,response)=>{
    response.render('login')
    // return response.render("login",{msg:''})
})


app.post('/register',async(request,response)=>{
    const {body}=request;
    body.password=hashPassword(body.password);
    if(body){
        try{
            const newUser=new userModel(body);
            await newUser.save();
            request.flash('info','done')
            response.redirect('/register')
            // response.render('register',{msg:"User Created",type:"success",desp:"Account has been Creates"})
        }
        catch(err){
            return response.render('register',{msg:"Error",type:"error",desp:"User Already Exists"})
            // return response.redirect('/')
        }
    }
})


app.post('/login',async(request,response)=>{
    const {body}=request;
    const db_user=await userModel.find({username:body.username});
    
    if(db_user.length > 0){
        if(compare_password(body.password,db_user[0].password)){
            return response.render('login');
        }
        else{
            return response.render('login')

        }
    }
    else{
        response.render('login')
    }
})


app.get('/home',(request,response)=>{
    response.render('home')
})


app.listen(PORT,(err)=>{
    if(err) console.log("Server Error");
    console.log("Server Running");
})