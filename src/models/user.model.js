import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userschema = new Schema({


    id: {
        type: String,
        required: true
    },

    watchHistory: {
        type: String,
        required: true
    },
    username: {

    },
    email: {

    },
    fullName: {

    },
    avatar: {

    },
    coverImage: {

    },
    password: {

    },
    refreshtoken: {

    },
    createdAt: {

    },
    updatedAt: {

    },
},

    { timestamps: true })

export const User = mongoose.model("User", userschema);