import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tweetSchema = new Schema({


    id: {
        type: String,
        required: true
    },
    owner: {

    },
    createdAt: {

    },
    content: {

    },

    updatedAt: {

    },
},

    { timestamps: true })

export const tweet = mongoose.model("tweet", tweetSchema);