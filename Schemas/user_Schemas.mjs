import mongoose from "mongoose";


const user=new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        unique : true, 
        required : true
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    role:{
        type:mongoose.Schema.Types.String,
        default: 'user'
    }
})

const userModel=mongoose.model("User",user);

export default userModel;