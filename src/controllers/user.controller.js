import { asynchandler } from "../utils/asynchandler.js";


const registerUser = asynchandler(async (req, res) => {
    res.staus(200).json({
        message: "ok its coming from user controller"
    })
})

export { registerUser }