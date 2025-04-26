// import { Webhook } from "svix";
// import connectDB from "../../../app/Config/db.js";
// import User from '../../../app/Models/User.js'
// import { headers } from "next/headers";
// import { connect } from "http2";
// import { NextRequest } from "next/server";

// export async function POST(req) {
//     const wh = new Webhook(process.env.SIGNING_SECRET)
//     const headerPayload = await headers();
//     const svixHeaders = {
//         'svix-id': headerPayload.get('svix-id'),
//         "svix-timestamp": headerPayload.get("svix-timestamp"),
//         'svix-signature': headerPayload.get('svix-signature'),
//     };


//     // get payload and verified it

//     const payload = await req.json();
//     const body = JSON.stringify(payload);
//     const { data, type } = wh.verify(body, svixHeaders)

//     // prepared user data to save in database

//     const userData = {
//         _id: data.id,
//         email: data.email_addresses[0].email_addresses,
//         name: `${data.first_name} ${data.last_name}`,
//         image: data.image_url,
//     };

//     await connectDB();

//     switch (type) {
//         case 'user.created':
//             await User.create(userData)
//             break;

//         case 'user.updated':
//             await User.findByIdAndUpdate(data.id, userData)
//             break;

//         case 'user.deleted':
//             await User.findByIdAndDelete(data.id)
//             break;

//         default: break;
//     }

//     return NextRequest.json({ message: "Event received" })
// }


import { Webhook } from "svix";
import connectDB from "../../../app/Config/db.js";
import User from '../../../app/Models/User.js'
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const wh = new Webhook(process.env.SIGNING_SECRET);
        const headerPayload = headers();
        const svixHeaders = {
            'svix-id': headerPayload.get('svix-id'),
            "svix-timestamp": headerPayload.get("svix-timestamp"),
            'svix-signature': headerPayload.get('svix-signature'),
        };

        // get payload and verify it
        const payload = await req.json();
        const body = JSON.stringify(payload);
        const { data, type } = wh.verify(body, svixHeaders);

        // prepare user data to save in database
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            password: data.password,
            image: data.image_url,
        };

        await connectDB();

        switch (type) {
            case 'user.created':
                await User.create(userData);
                break;

            case 'user.updated':
                await User.findByIdAndUpdate(data.id, userData);
                break;

            case 'user.deleted':
                await User.findByIdAndDelete(data.id);
                break;

            default: break;
        }

        return Response.json({ message: "Event received" });
    } catch (error) {
        console.error("Webhook error:", error);
        return Response.json({ error: error.message }, { status: 400 });
    }
}