import mongoose from "mongoose";

const bookschema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        authe77777r:{
            type:String,
            required:true,
        },
        publishYear:{
            type:Number,
            required:true,
        }
    },
    {
        timestamps:true
    }
);

export const Book = mongoose.model("Book", bookschema);