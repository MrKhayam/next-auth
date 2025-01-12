"use server";
import connectDB from "../config"
import bcryptjs from "bcryptjs"
import User from "../models/userModel";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";



const AddNewUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const loginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});



export const signUpAction = async (formData) => {
    try {
        await connectDB();
        const {name, email, password} = formData;

        const {error} = AddNewUser.validate({
            name, email, password
        });

        if(error) {
            return {
                success: false,
                message: error.details[0].message,
            }
        }
        
        const checkUser = await User.findOne({email});
        if(checkUser) {
            return {
                success: false,
                message: "Email already exists!",
            }
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);

        const createdUser = await User.create({
            name,
            email,
            password: hashedPass,
        });

        if(createdUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(createdUser)),
                message: "Account Successfully Created."
            }
        } else {
            return {
                success: false,
                message: "Something went wrong! Please try again.",
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something Went Wrong! Please try again.",
        }
    }
}

export const signInAction = async (formData) => {
    try {
        await connectDB();
        const {email, password} = formData;
        const {error} = loginUser.validate({
            email, password
        });

        if(error) {
            console.log(error);
            return {
                success: false,
                message: error.details[0].message,
            }
        }

        const checkUser = await User.findOne({email});
        if(!checkUser) {
            return{
                success: false,
                message: "Invalid Email!",
            }
        }

        const checkPass = await bcryptjs.compare(password, checkUser.password);

        if(!checkPass) {
            return {
                success: false,
                message: "Incorrect Password! Try again.",
            }
        } else {
                const token = jwt.sign({id: checkUser._id, name: checkUser.name, email: checkUser.email}, "khayam", {
                    expiresIn: "1d"
                });

                const getCookies = cookies();
                getCookies.set('token', token);
                return{ 
                    success: true,
                    message: "Logged In",
                }
        }


    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong! Please try again.",
        }
    }
}

export const fetchAction = async () => {
    try {
        await connectDB();
        const getCookies = cookies();
        const token = (await getCookies).get('token')?.value || "";
        if(token === "") {
            return {
              success: false,
              message: "Invalid Token!",
            };
        }

        const decoded = jwt.verify(token,"khayam");

        const userInfo = await User.findOne({_id: decoded.id})

        if(userInfo){
            return{
                success: true,
                data: JSON.parse(JSON.stringify(userInfo))
            }
        }
        else{
            return {
                success: false,
                message: "Something went wrong! Please try again."
            }
        }
    } catch (error) {
        console.log(error);
        return {
          success: false,
          message: "Something went wrong! Please try again.",
        };
    }
}