import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subscriptionSchema = new Schema({


    id: {
        type: String,
        required: true
    },


    Subcriber: {

    },
    channel: {

    },
    createdAt: {

    },
    updatedAt: {

    },
},

    { timestamps: true })

export const Subscription = mongoose.model("Subscription", subscriptionSchema);