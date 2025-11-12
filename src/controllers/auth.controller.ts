import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import config from '../config/variables.js';
import User from '../schema/user.schema.js';
import { usernameGen } from '../utils/genUsername.js';
import { signupSchema, signinSchema } from '../utils/auth.validator.js';
import { generateToken } from '../utils/token.js';
import { success } from 'zod';

const authController = {
    signup: async(req: Request, res: Response) => {
                    
                // Input validation
                    const isValid = signupSchema.safeParse(req.body);
                    if(!isValid.success) {
                        return res.status(400).json({
                            success: false,
                            errors: isValid.error.flatten().fieldErrors
                        }); 
                    }
                    const { firstname, lastname, email, password } = req.body;
                    
                    // Check if user already exists
                    const isUserExists = await User.exists({ "profileInfo.email": email });
                    if(isUserExists) {
                        return res.status(409).json({
                            success: false,
                            error: "User already exists"
                        });
                    }

                    // Generate unique username
                    const username = await usernameGen(email);
                    console.log("Generated username: ", username);
                    try {

                        const hashedPassword = await bcrypt.hash(password, config.saltRounds);
                        console.log("Hashed password: ", hashedPassword);
                        const createUser = new User({
                            profileInfo:{
                                name: {
                                    firstName: firstname,
                                    lastName: lastname
                                },
                                email,
                                password: hashedPassword,
                                username
                            }
                        })
                       const savedUser = await createUser.save();
                       const access_token = await generateToken(savedUser._id.toString());
                       res.cookie('access_token', access_token);
                       return res.status(201).json({
                            success: true,
                            msg: 'Successfully signed up!',
                            user: savedUser,
                            access_token
                       });
                    } catch (error) {
                        console.error('Error during signup:', error);
                        return res.status(500).json({ success: false, error: "Internal server error" });
                    }
            },

    signin: async(req: Request, res: Response) => {
        try {
               const isValid = signinSchema.safeParse(req.body);
                if(!isValid.success){
                    return res.status(400).json({
                        success: false,
                        error: isValid.error.flatten().fieldErrors
                    })
                }

                const { email, password } = isValid.data;
                const isUserExists = await User.findOne({"profileInfo.email": email});
                if(!isUserExists){
                    return res.status(401).json({
                        success: false,
                        error: "Invalid credentials"
                    })
                }
                const hashedPassword = isUserExists.profileInfo?.password;
                const verifyPassword = await bcrypt.compare(password, hashedPassword!);
                if(!verifyPassword){
                    return res.status(401).json({
                        success: false,
                        error: "Invalid credentials"
                })
                }

                const access_token = await generateToken(isUserExists?._id.toString()!);
                res.cookie('access_token', access_token);
                return res.status(200).json({
                    success: true,
                    msg: "Successfully signed in!",
                    access_token,
                })    
        } catch (error) {
                console.log("error while signing in", error);
                return res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
}

export default authController;