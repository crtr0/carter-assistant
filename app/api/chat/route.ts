import { NextResponse } from "next/server"
import { LangflowClient } from "@datastax/langflow-client";

// Array of canned responses
const cannedResponses = [
  "Hello there! How can I help you today?",
  "That's an interesting question. Let me think about that.",
  "I understand your concern. Here's what I suggest...",
  "Thanks for sharing that with me!",
  "I'm just a simple chat bot with pre-programmed responses.",
  "Could you tell me more about that?",
  "I'm here to assist you with any questions you might have.",
  "That's a great point! I hadn't thought of it that way.",
  "I appreciate your patience.",
  "Let me know if there's anything else I can help with!",
]

const langflowId = process.env.LANGFLOW_ID
const flowId = process.env.LANGFLOW_FLOW_ID
const apiKey = process.env.LANGFLOW_API_KEY
// using DataStax Langflow, you do not need to provide the baseUrl
const client = new LangflowClient({ langflowId, apiKey });


export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { message } = body

    const clientResponse = await client.flow(flowId || "foo").run(message)
    const response = clientResponse.outputs[0].outputs[0].outputs.message.message
    console.log(response)
    //console.log(JSON.stringify(foo.outputs[0].outputs[0].outputs.message))
    //console.log(foo.chatOutputText())

    // Return the response
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ error: "Failed to process your message" }, { status: 500 })
  }
}

