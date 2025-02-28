import { NextResponse } from "next/server"
import { LangflowClient } from "@datastax/langflow-client";

//const langflowId = process.env.LANGFLOW_ID
const baseUrl = process.env.LANGFLOW_BASE_URL
const flowId = process.env.LANGFLOW_FLOW_ID!
//const apiKey = process.env.LANGFLOW_API_KEY
// using DataStax Langflow, you do not need to provide the baseUrl
const client = new LangflowClient({ baseUrl });


export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { message } = body

    const clientResponse = await client.flow(flowId).run(message)
    //console.log(JSON.stringify(clientResponse))
    //console.log(clientResponse.chatOutputText())
    //const response = clientResponse.outputs[0].outputs[0].outputs.message.message
    const response = clientResponse.chatOutputText()

    // Return the response
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ error: "Failed to process your message" }, { status: 500 })
  }
}

