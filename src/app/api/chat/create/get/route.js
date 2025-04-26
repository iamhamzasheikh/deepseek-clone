import connectDB from "./app/Config/db.js";
import Chat from "./app/Models/Chat.js";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


export async function GET(req) {

    try {
        const { userId } = getAuth(req)

        if (!userId)
            return NextResponse.json({ success: false, message: "user not authenticated" });

        // connect to db and fetch all chats from the users

        await connectDB();

        const data = await Chat.find({ userId });

        return NextResponse.json({ success: true, data })

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }

}