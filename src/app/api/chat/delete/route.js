import connectDB from "./app/Config/db.js";
import Chat from "./app/Models/Chat.js";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const {chatId} = getAuth(req);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'user not authenticated'
            });
        }

        // connect to mongodb database and delete chat

        await connectDB();
        await Chat.deleteOne({_id: chatId, userId})

        return NextResponse.json({
            success: true,
            message: 'chat deleted'
        })


    } catch (error) {

        return NextResponse.json({
            success: false,
            message: error.message
        });

    }
}