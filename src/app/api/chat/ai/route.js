export const maxDuration = 60;


import connectDB from "@/app/Config/db";
import Chat from "@/app/Models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { connect } from "http2";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});


export async function POST(req) {
    try {

        const { userId } = getAuth(req);

        // extract child id and prompt from request body

        const { chatId, prompt } = await req.json();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'user not authenticated'
            })
        }

        // Find the chat document in the database based on userId and chatId 
        await connectDB();
        const data = await Chat.findOne({ userId, _id: chatId });

        // create a user message object

        const userPrompt = {
            role: 'user',
            content: prompt,
            timestamp: Date.now()
        };

        data.message.push(userPrompt);

        // call deepseek api to get chat completion

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true,
        });

        const message = completion.choices[0].message;
        message.timestamp = Date.now();

        data.messages.push(message);

        return NextResponse.json({
            success: true,
            data: message,
        })

    }
    catch (error) {

        return NextResponse.json({
            success: false,
            error: error.message,
        })

    }
}

