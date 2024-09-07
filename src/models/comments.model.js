import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({


    id: {
        type: String,
        required: true
    },
    video: {

    },

    content: {

    },


    owner: {

    },
    createdAt: {

    },
    updatedAt: {

    },
},

    { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema);