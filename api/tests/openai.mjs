import OpenAI from "openai";
import {} from 'dotenv/config'

const openai = new OpenAI()

//const apiKey = process.env.OPENAI_ACCESS_KEY
//console.log(apiKey)

async function main() {
  openai.apiKey = "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"
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();