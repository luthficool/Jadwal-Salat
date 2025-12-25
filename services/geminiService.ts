
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPrayerRecommendation = async (mood: string = "bersyukur") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Berikan rekomendasi doa pendek islami berdasarkan perasaan user: "${mood}".
      Format JSON dengan properti: title, arabic, translation. Gunakan bahasa Indonesia yang menyejukkan.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            arabic: { type: Type.STRING },
            translation: { type: Type.STRING },
          },
          required: ["title", "arabic", "translation"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI recommendation failed", error);
    return null;
  }
};
