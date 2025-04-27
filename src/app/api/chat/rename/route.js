import connectDB from "./app/Config/db.js";
import Chat from "./app/Models/Chat.js";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'user not authenticated'
            });
        }

        const { chatId, name } = await req.json();

        // connect to database and update the chat name 
        await connectDB();

        await Chat.findOneAndUpdate({ _id: chatId, userId }, { name });
        return NextResponse.json({
            success: true,
            message: 'Chat Renamed'
        });

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: error.message
        });

    }
}