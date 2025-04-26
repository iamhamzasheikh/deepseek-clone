import connectDB from "./app/Config/db.js";
import Chat from "./app/Models/Chat.js";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


export async function POST(req) {

    try {

        const { userId } = getAuth(req)

        if (!userId)
            return NextResponse.json({ success: false, message: "user not authenticated" })

        // prepared chat data to be saved in database

        const chatData = {
            userId,
            message: [],
            name: "New Chat",
        };

        // connect to data base and create new chat 

        await connectDB();
        await Chat.create(chatData);

        return NextResponse.json({ success: true, message: 'chat saved' })

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }

}