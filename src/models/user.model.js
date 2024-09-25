import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const userschema = new Schema({


    id: {
        type: String,
        required: true
    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    username: {

        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,// cloudnary url
        required: true
    },
    coverImage: {
        type: String, // cloudnary url
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },

    refreshToken: {
        type: String
    },


},

    { timestamps: true })


userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();


    this.password = bcrypt.hash(this.password, 10)
    next()

})

userschema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userschema.methods.generateaccesstoken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,


    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userschema.methods.generaterefreshtoken = function () {

    return jwt.sign({
        _id: this._id,



    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}



export const User = mongoose.model("User", userschema);