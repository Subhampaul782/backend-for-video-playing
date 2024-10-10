import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


export const verifyJWT = asynchandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authiorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized acess")

        }

        const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


        const user = await User.findById(decodedtoken?._id).select("-password -refershToken")

        if (!user) {

            throw new ApiError(401, "Invalid Acess Token")

        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Somthing went wrong")

    }




}) 