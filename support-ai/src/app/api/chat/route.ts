import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, ownerId } = await req.json()
        if (!message || !ownerId) {
            return NextResponse.json(
                { message: "message and owner id is required" },
                { status: 400 }
            )
        }

        await connectDb();
        const setting = await Settings.findOne({ ownerId })
        if (!setting) {
            return NextResponse.json(
                { message: "Chat bot is not configured yet" },
                { status: 400 }
            )
        }
        const KNOWLEDGE = `
        business name- ${setting.businessName || "not provided"}
        support email- ${setting.supportEmail || "not provided"}
        knowledge-  ${setting.knowledge || "not provided"}
        `

        const prompt = `
You are an AI customer support assistant for the following business.

${KNOWLEDGE}

Your Role:
- Answer customer questions based only on the business information provided.
- Be polite, friendly, and professional.
- Keep responses short and clear.
- Focus only on business-related queries.

Sales Behavior:
- If a user asks about products or services, give helpful information.
- If the user shows interest in buying, ask for:
  - Name
  - Phone number
  - Requirement

Support Handling:
- If the user asks for human support, respond with:
  "You can contact our support at: ${setting.supportEmail || "Support email not available"}"

Restrictions:
- Do not make up information that is not provided.
- If information is not available, say:
  "Please contact our support team for more details."
- Do not answer unrelated topics (politics, personal advice, etc.).

Tone:
Friendly, professional, and business-oriented.

Greeting Rule:
If the user says hello or hi, respond with:
"Welcome to ${setting.businessName || "our business"}! How can I assist you today?"
`;

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
                   ${prompt}

Customer message: ${message}

Reply as the business support assistant.
`

        });
        return NextResponse.json(response.text)

    } catch (error) {
        return NextResponse.json(
            { message: `chat error ${error}` },
            { status: 500 }
        )

    }

}