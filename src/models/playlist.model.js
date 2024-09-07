import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const playlistSchema = new Schema({


    id: {
        type: String,
        required: true
    },
    name: {

    },
    createdAt: {

    },
    videos: {

    },

    owner: {

    },
    description: {

    },
    updatedAt: {

    },
},

    { timestamps: true })

export const Playlist = mongoose.model("Playlist", playlistSchema);