import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    profileInfo: {
        username: {
            type: String,
            unique: true,
            maxlength: [20, "Username cannot exceed 20 characters"],
            minlength: [3, "Username must be at least 3 characters"],
            immutable: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            firstName: {
                type: String,
                required: true,
                trim: true
            },
            lastName: {
                type: String,
                required: true,
                trim: true
            }
        },
        bio:{
            type: String,
            default: "",
            maxlength: [200, "Bio cannot exceed 200 characters"]
        },
        profileImage: {
            type: String,
            default: ""
        }
    },
    socialLinks: {
        youtube: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
        github: { type: String, default: "" }
    },
    accountInfo:{
        isVerified: {
            type: Boolean,
            default: false
        },
        total_Blogs:{
            type: Number,
            default: 0
        },
        total_Followers:{
            type: Number,
            default: 0
        },
        total_Following:{
            type: Number,
            default: 0
        },
    },
    timestamps: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
})

const User = mongoose.model('User', userSchema);
export default User;