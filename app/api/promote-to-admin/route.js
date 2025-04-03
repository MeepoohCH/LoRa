
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";

// Promote หรือ Revert role (PATCH method)
export async function PATCH(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        console.log("API Token: ", token);

        // ตรวจสอบสิทธิ์ ต้องเป็น admin เท่านั้น
        if (!token || token.role !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
        }

        const { email, role } = await req.json();
        if (!email || !role) {
            return new Response(JSON.stringify({ error: "Missing email or role" }), { status: 400 });
        }

        await connectMongoDB();
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // ตรวจสอบให้แน่ใจว่ามีเฉพาะ admin เท่านั้นที่สามารถ promote คนอื่นได้
        if (token.role !== "admin") {
           return new Response(JSON.stringify({ error: "Unauthorized: Only admins can change roles" }), { status: 403 });
        }


        // อัปเดต role เป็นค่าที่ส่งมา (admin หรือ user)
        user.role = role;
        await user.save();

        console.log(`[SECURITY] Admin ${token.email} changed ${email} role to ${role}`);

        return new Response(JSON.stringify({ message: `User role changed to ${role}` }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

// GET method ทดสอบ API
export async function GET(req) {
    return new Response(JSON.stringify({ message: "This is a GET request" }), { status: 200 });
}
