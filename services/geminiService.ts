
import { GoogleGenAI, Type } from "@google/genai";
import { Step, Task } from "../types";

export async function analyzeError(task: Task, steps: Step[], totalTime: number) {
  // Initialize the GenAI client with named parameter.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const stepsText = steps.map((s, i) => `Step ${i+1} (Reflected for ${s.duration}ms): ${s.content}`).join('\n');
  
  const prompt = `
    Analyze this professional/academic thought process for ${task.subject} (${task.level}).
    
    TOPIC: ${task.topic}
    QUESTION: ${task.content.en.question}
    EXPECTED PATH: ${task.content.en.solution}
    
    STUDENT INPUT STEPS:
    ${stepsText}
    
    TOTAL SESSION TIME: ${totalTime}ms
    
    CRITICAL ANALYSIS:
    1. Check for conceptual misunderstandings vs. simple calculation errors.
    2. Analyze timing:
       - < 2s on complex steps suggest a 'guessing' or 'carelessness' behavior.
       - > 15s on simple steps suggest 'bottlenecks' in basic theory retrieval.
    3. For Specialist/Professor levels, look for 'Logic Flow' and 'Heuristic gaps'.
    
    RESPONSE FORMAT (JSON):
    {
      "errorType": "Carelessness | Wrong Strategy | Logical | Computational",
      "logicBreakPoint": "Detailed description of where the error occurred.",
      "trapTask": "Specific sub-topic to focus on.",
      "advice": "Encouraging, high-level advice for a professional/student."
    }
  `;

  try {
    // Using gemini-3-pro-preview as this task involves complex reasoning in STEM and academic contexts.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            errorType: { type: Type.STRING },
            logicBreakPoint: { type: Type.STRING },
            trapTask: { type: Type.STRING },
            advice: { type: Type.STRING }
          },
          required: ["errorType", "logicBreakPoint", "trapTask", "advice"]
        }
      }
    });

    // Accessing the text property directly from the GenerateContentResponse object.
    const outputText = response.text;
    return JSON.parse(outputText || "{}");
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      errorType: "Unknown",
      logicBreakPoint: "High complexity detected. Could not determine exact point.",
      trapTask: task.topic,
      advice: "Consult specialized materials or review fundamental principles of this topic."
    };
  }
}
