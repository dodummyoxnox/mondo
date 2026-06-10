import { generateText } from "ai"

import { AI_SYSTEM_PROMPT } from "@/data/ai-system-prompt"
import { getAIModel } from "@/lib/ai-provider"

export const maxDuration = 30

type ClientMessage = {
  role: "user" | "assistant"
  content: string
}

type ChatRequest = {
  messages: ClientMessage[]
  context?: {
    pathname?: string
    currentLessonId?: number | null
  }
}

function buildPrompt(messages: ClientMessage[], context?: ChatRequest["context"]) {
  const history = messages
    .map((message) => `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`)
    .join("\n\n")

  return `
Konteks halaman:
- Pathname: ${context?.pathname ?? "-"}
- Pelajaran aktif: ${context?.currentLessonId ? `Pelajaran ${context.currentLessonId}` : "-"}

Riwayat chat:
${history}

Jawab pesan terakhir user dengan jelas.
`
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest

    if (!body.messages || !Array.isArray(body.messages)) {
      return Response.json({ error: "Format messages tidak valid." }, { status: 400 })
    }

    const result = await generateText({
      model: getAIModel(),
      system: AI_SYSTEM_PROMPT,
      prompt: buildPrompt(body.messages, body.context),
      temperature: 0.4
    })

    return Response.json({ content: result.text })
  } catch (error) {
    console.error("AI chat error:", error)
    return Response.json(
      {
        error:
          "AI Assistant gagal menjawab. Periksa API key di .env.local atau Environment Variables Vercel."
      },
      { status: 500 }
    )
  }
}
