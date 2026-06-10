import { openai } from "@ai-sdk/openai"
import { xai } from "@ai-sdk/xai"

export function getAIModel() {
  const provider = process.env.AI_PROVIDER ?? "xai"

  if (provider === "openai") {
    return openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini")
  }

  return xai(process.env.XAI_MODEL ?? "grok-3-mini")
}
