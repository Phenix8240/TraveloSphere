import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",  // Fixed typo here as well
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Darjeeling for 3 days for a couple with a cheap budget, give me hotel options list with Hotel name, Hotel address, hotel image URL, geo coordinates, rating, descriptions, and suggest itinerary with placename, place details, Place image url, Geo Coordinates ticket pricing, rating, time travel to each location for 3 days with each day plan with the best time to visit in JSON format."
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "..."
        }
      ],
    },
  ],
});
