import UserModel from "../models/user.model.js";
import bscryptjs from "bcryptjs"
import sendEmail from "../config/sendEmail.js"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export async function registerUserController(req, res) {
    try {
        const { name, password, email} = req.body;
        if (!name || !password || !email) {
            return res.status(400).json({
                message: "Provide email, password, name",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({email})
        if (user) {
            return res.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }
        const salt = await bscryptjs.genSalt(10)
        const hashPassword = await bscryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save()
        
        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail =  await sendEmail({
            sendTo: email,
            subject: "Verify email from Winshop",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })

        })
        return res.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })
    } catch (error) {       
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

