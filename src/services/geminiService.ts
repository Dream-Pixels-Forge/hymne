import { GoogleGenAI } from '@google/genai';

export async function generateLyrics(
  eventType: string,
  subject: string,
  style: string,
  language: string,
  apiKeyOverride?: string,
  modelOverride?: string
) {
  const apiKey = apiKeyOverride || process.env['GEMINI_API_KEY'];
  if (!apiKey) {
    throw new Error('Clé API Gemini manquante. Veuillez la configurer dans les paramètres.');
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = modelOverride || 'gemini-3.1-pro-preview';

  const systemPrompt = `Tu es un parolier expert spécialisé dans les grands événements de vie (Mariages, Anniversaires, Naissances). 
TA MISSION : Écrire des paroles touchantes, poétiques et hautement personnalisées.
RÈGLES :
1. PAS DE CLICHÉS : Évite les rimes trop simples. Utilise des métaphores élégantes.
2. FORMAT BALISES SUNO : Utilise EXCLUSIVEMENT le format [Balise-DétailTechnique]. Exemple: [Intro-Piano crescendo], [Chorus-Anthemic with backing vocals].
3. TON : Adapte le ton à l'événement (${eventType}). Pour un mariage, sois solennel et romantique. Pour un anniversaire, sois joyeux et plein d'énergie.
4. ZERO SUNO : N'écris jamais le mot "Suno".
5. STRUCTURE : Fournis une structure complète (Intro, Verse, Chorus, Bridge, Outro).`;

  const userQuery = `Événement : ${eventType}. Sujet/Détails : "${subject}". Style : "${style}". Langue : ${language}. 
Réponds au format : STYLE: [style] --- LYRICS: [paroles]`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const text = response.text || '';
    const parts = text.split('---');
    const lyricsText = parts[1] ? parts[1].replace('LYRICS:', '').trim() : text;

    return lyricsText;
  } catch (error) {
    console.error('Error generating lyrics:', error);
    throw error;
  }
}
