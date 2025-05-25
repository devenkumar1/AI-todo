import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GenerateSummary(todos) {
  const tasks = todos
    .map((t, i) => `${i + 1}. ${t.text || t.title || t.description || ""}`)
    .join("\n");
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Summarise all these pending tasks in my todo:\n${tasks}`,
    config: {
      systemInstruction:
        "you area a helpful assistant that summarize the pending todo task. and give a instruction that how you should approach towards completing all the steps one by one.don't give any generalise answer and anything expect how he should complete the task in summary. don't ask for any more information. or anything be direct , concise and clear.don't use any extra word like okay,plaease, thankyou etc.give direct response",
    },
  });

  // console.log("Gemin response",response.text);

  const summary = response.text;
  // Clean the response
  const cleaned = summary
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\d+\./g, (match) => `\n${match}`)
    .replace(/\n{2,}/g, "\n")
    .trim();
  return cleaned;
}

export default GenerateSummary;
