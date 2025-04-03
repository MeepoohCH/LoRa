import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const PATCH = async (req) => {
    try {
        await connectMongoDB();

        const { email, newPassword, newEmail } = await req.json();

        if (!email || (!newPassword && !newEmail)) {
            return new Response(JSON.stringify({ error: "Email, new password, or new email must be provided" }), { status: 400 });
        }

        // ค้นหาผู้ใช้จากอีเมลปัจจุบัน
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // ตรวจสอบว่าอีเมลใหม่ซ้ำหรือไม่
        if (newEmail && newEmail !== email) {
            const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return new Response(JSON.stringify({ error: "Email already in use" }), { status: 400 });
            }
            user.email = newEmail;
        }

        // อัปเดตรหัสผ่านถ้ามีการเปลี่ยนแปลง
        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        await user.save();

        return new Response(JSON.stringify({ message: "User updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Update User Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};
