import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likesschema = new Schema({


    id: {
        type: String,
        required: true
    },
    comment: {

    },
    createdAt: {

    },
    video: {

    },

    likedBy: {

    },
    tweet: {

    },
    updatedAt: {

    },
},

    { timestamps: true })

export const Likes = mongoose.model("Likes", likesschema);