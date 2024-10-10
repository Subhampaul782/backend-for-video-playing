import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"





const generatingaccesandrefreshtoken = async (userId) => {
    try {

        const user = await User.findById(userId)
        const acesstoken = user.generateaccesstoken()
        const refreshtoken = user.generaterefreshtoken()

        user.refreshToken = refreshtoken
        await user.save({ validatebeforesave: false })

        return { acesstoken, refreshtoken }

    } catch (error) {
        throw new ApiError(500, "Somthing went wrong while generating acess and refresh token")
    }
}

const registerUser = asynchandler(async (req, res) => {
    res.status(200).json({
        message: "ok its coming from user controller"
    })
})

const loginUser = asynchandler(async (req, res) => {
    // basic algoritham  user login.
    // req body == data
    // find the user if the user is there in the database
    // if present compare the password field 
    // if not then throw a message user not found 
    // if user found then provide acces token and refresh token
    // return a sucess response .


    const { email, password, username, phoneNo } = req.body

    if (!email || !username) {
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "user does not exsits")

    }

    const ispassowrdvalid = await user.isPasswordCorrect(password)

    if (!ispassowrdvalid) {
        throw new ApiError(401, " The password is incorrect")
    }

    const { acesstoken, refreshtoken } = await generatingaccesandrefreshtoken(user._id)

    const loggedinuser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", acesstoken, options)
        .cookie("refreshtoken", refreshtoken)
        .json(
            new ApiResponse(200,
                {
                    user: loggedinuser,
                    acesstoken,
                    refreshtoken
                },
                "User Logged In successfully"
            )

        )


})


const logoutuser = asynchandler(async (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
        {
            new: true
        }


    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .clearCookie("accessToken,", options)
        .clearCookie("refreshToken,", options)
        .json(new ApiResponse(200, "User logged out sucessfully"))
})

export { registerUser, loginUser, logoutuser }