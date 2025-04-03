import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,  
        },
        email: {
            type: String,
            required: true,
            unique: true,  // ป้องกันอีเมลซ้ำ
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"], // กำหนดค่า role ที่อนุญาต
            default: "user",  
        }
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
