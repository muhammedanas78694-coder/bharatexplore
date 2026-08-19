import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API 1: Health Check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API 2: AI Itinerary Generation (Gemini 3.7 Flash)
  app.post('/api/gemini/generate-itinerary', async (req, res) => {
    try {
      const {
        destination,
        days = 3,
        vibe = 'Culture, Heritage & Food',
        budget = 'Moderate',
        pace = 'Balanced',
        savedItems = [],
        customNotes = ''
      } = req.body;

      if (!destination) {
        return res.status(400).json({ error: 'Destination is required' });
      }

      const ai = getAiClient();

      const prompt = `You are BharatExplore's expert Indian Master Travel & Culinary Concierge.
Create a rich, realistic, hour-by-hour ${days}-day travel itinerary for "${destination}", India.
Travel Vibe: ${vibe}
Budget Tier: ${budget}
Pace: ${pace}
${savedItems.length > 0 ? `User's Bookmarked Items to prioritize: ${JSON.stringify(savedItems.map((i: any) => ({ title: i.title, type: i.type, subtitle: i.subtitle })))}` : ''}
${customNotes ? `Special Requests / Travelers: ${customNotes}` : ''}

CRITICAL RULES FOR AUTHENTIC INDIAN TRAVEL:
1. Provide realistic travel times and timings (e.g. morning Aarti timings, hot street food stalls opening hours, monuments closing times).
2. Recommend authentic regional street delicacies and iconic local restaurants by name.
3. Suggest practical local transit tips (e.g., e-rickshaw inside old city, metro, rental cabs).
4. Provide estimated expenses in Indian Rupees (INR ₹).

Return the plan structured strictly as valid JSON adhering to the specified schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an elite, highly knowledgeable Indian travel planner and culinary expert. Provide culturally authentic, geographically accurate, and practical day-by-day itineraries in JSON format.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Catchy evocative trip title' },
              destination: { type: Type.STRING, description: 'Primary city or region' },
              tagline: { type: Type.STRING, description: 'Short summary of the vibe' },
              daysCount: { type: Type.INTEGER },
              estimatedTotalBudget: { type: Type.STRING, description: 'e.g. ₹6,500 - ₹12,000 per person' },
              bestTimeToGo: { type: Type.STRING },
              packingTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              localTransitAdvice: { type: Type.STRING },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dayNumber: { type: Type.INTEGER },
                    theme: { type: Type.STRING, description: 'e.g. Ancient Ghats & Royal Nawabi Feasts' },
                    slots: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          timePeriod: { type: Type.STRING, description: 'Morning / Afternoon / Evening / Night' },
                          timeSlot: { type: Type.STRING, description: 'e.g. 06:30 AM - 09:00 AM' },
                          activityTitle: { type: Type.STRING },
                          activityType: { type: Type.STRING, description: 'place / food / hotel / transit / leisure' },
                          locationName: { type: Type.STRING },
                          description: { type: Type.STRING },
                          foodOrAttractionHighlight: { type: Type.STRING },
                          estimatedCostINR: { type: Type.STRING },
                          localTip: { type: Type.STRING }
                        },
                        required: ['timePeriod', 'timeSlot', 'activityTitle', 'activityType', 'locationName', 'description']
                      }
                    }
                  },
                  required: ['dayNumber', 'theme', 'slots']
                }
              }
            },
            required: ['title', 'destination', 'daysCount', 'days']
          }
        }
      });

      const text = response.text || '{}';
      const parsedData = JSON.parse(text);
      return res.json(parsedData);
    } catch (err: any) {
      console.error('Error generating AI itinerary:', err);
      return res.status(500).json({
        error: 'Failed to generate itinerary with AI',
        details: err?.message || String(err)
      });
    }
  });

  // API 3: Optimize Day's Route & Schedule
  app.post('/api/gemini/optimize-day', async (req, res) => {
    try {
      const { destination, dayNumber, currentSlots = [] } = req.body;

      const ai = getAiClient();

      const prompt = `You are an Indian geographical route optimizer.
Destination: ${destination}
Day Number: ${dayNumber}
Current Planned Activities:
${JSON.stringify(currentSlots, null, 2)}

Reorder these slots logically to minimize transit time in Indian city traffic, take advantage of cooler morning/evening temperatures, and respect temple/monument opening hours. Add practical travel tips between stops.

Return the optimized slots as JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              optimizationSummary: { type: Type.STRING, description: 'Brief 1-sentence explanation of changes made for efficiency' },
              optimizedSlots: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    timePeriod: { type: Type.STRING },
                    timeSlot: { type: Type.STRING },
                    activityTitle: { type: Type.STRING },
                    activityType: { type: Type.STRING },
                    locationName: { type: Type.STRING },
                    description: { type: Type.STRING },
                    estimatedCostINR: { type: Type.STRING },
                    localTip: { type: Type.STRING }
                  },
                  required: ['timePeriod', 'timeSlot', 'activityTitle', 'activityType', 'locationName', 'description']
                }
              }
            },
            required: ['optimizationSummary', 'optimizedSlots']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error optimizing day schedule:', err);
      return res.status(500).json({
        error: 'Failed to optimize schedule',
        details: err?.message || String(err)
      });
    }
  });

  // API 4: Local Travel Concierge AI Chat Q&A
  app.post('/api/gemini/ask-concierge', async (req, res) => {
    try {
      const { destination, question, itineraryContext } = req.body;

      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const ai = getAiClient();

      const prompt = `You are BharatExplore's expert local travel concierge for ${destination || 'India'}.
User question: "${question}"
${itineraryContext ? `Current trip context: ${JSON.stringify(itineraryContext)}` : ''}

Provide a concise, friendly, and practical answer with authentic insider tips (e.g. bargaining etiquette, exact food stalls to look for, transport advice, local cultural sensitivities, safety tips). Keep it under 150 words.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt
      });

      return res.json({ answer: response.text || 'No answer generated.' });
    } catch (err: any) {
      console.error('Error in concierge API:', err);
      return res.status(500).json({
        error: 'Failed to query concierge',
        details: err?.message || String(err)
      });
    }
  });

  // Vite Middleware Setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BharatExplore Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
