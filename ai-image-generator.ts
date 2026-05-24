'use server';
/**
 * @fileOverview Un flux Genkit pour générer des images promotionnelles pour les tournois et articles.
 * 
 * - generateTournamentImage - Génère une image basée sur un titre et une description.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('Le sujet de l\'image à générer.'),
  context: z.string().optional().describe('Contexte supplémentaire (ex: type de sport, ambiance).'),
});

export async function generateTournamentImage(input: { prompt: string; context?: string }) {
  const fullPrompt = `Génère une image de haute qualité, style professionnel et dynamique pour un événement de sport/e-sport. Sujet : ${input.prompt}. ${input.context || ''} Pas de texte, focus sur l'ambiance et l'action.`;
  
  const { media } = await ai.generate({
    model: 'googleai/imagen-4.0-fast-generate-001',
    prompt: fullPrompt,
  });

  return media?.url;
}
