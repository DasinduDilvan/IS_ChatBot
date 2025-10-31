import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 })
    }

    // Use AI SDK to generate educational response
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are an expert educational chatbot specializing in Information Systems (IS). 
      Your role is to help students learn about:
      - Information Technology fundamentals
      - Database management systems
      - Networks and cybersecurity
      - Software development concepts
      - Enterprise systems
      - Data analysis and business intelligence
      - IT management and governance
      
      Keep your responses:
      - Clear and educational
      - Concise but comprehensive
      - Beginner-friendly when needed
      - Focused on practical understanding
      - Include examples when helpful`,
      prompt: message,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to process your message" }, { status: 500 })
  }
}
