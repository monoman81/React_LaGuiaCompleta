import { streamText } from "ai"
import { openRouter } from "../lib/ai"

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('meta-llama/llama-3.3-70b-instruct:free'),
            // model: openRouter('google/gemma-3n-e4b-it:free'),
            prompt,
            system: 'Eres un bartender que le sirvio una bebida James Bond',
            temperature: 1
        })
        return result.textStream
    }
}