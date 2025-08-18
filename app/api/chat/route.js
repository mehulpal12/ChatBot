import Groq from "groq-sdk";

const groqai = new Groq({
  apiKey: process.env.GROQ_API_KEY ,
});

export async function POST(request) {
 try {
    const { question } = await request.json();


    const completion = await groqai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: question[0].content }],
    });
    // console.log(completion.choices[0].message.content);
    return Response.json({
        response: completion.choices[0].message.content,
      });
 } catch (error) {
   console.error("Error:", error);
   return Response.json({ error: "Failed to process request" }, { status: 500 });
 }
}
