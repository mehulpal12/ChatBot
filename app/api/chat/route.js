import { NextResponse } from "next/server"; 
import Groq from "groq-sdk";
import connectDB from "@/lib/db";
import { Chat } from "@/model/chat.model";

const groqai = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    await connectDB();
    const { question } = await request.json();

    if (!question || !Array.isArray(question) || question.length === 0) {
      return NextResponse.json({ error: "Valid message array is required" }, { status: 400 });
    }

    const userText = question[question.length - 1].content; 

    const completion = await groqai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: userText }],
    });

    const aiResponse = completion.choices[0].message.content;

    const dbChat = await Chat.create({
      userMessage: userText, 
      aiResponse: aiResponse
    });

    


    return NextResponse.json({
      response: aiResponse,
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();
    
    const history = await Chat.find().sort({ createdAt: 1 });
    
    return Response.json(history);
  } catch (error) {
    return Response.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}