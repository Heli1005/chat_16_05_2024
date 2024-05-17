import mongoose from "mongoose";

const UserModel=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        profile:{
            type:String,
            required:false,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
    },
    {
        timeStamp:true
    }
)

export const User = mongoose.model("User", UserModel)
