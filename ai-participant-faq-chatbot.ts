
'use server';
/**
 * @fileOverview Un chatbot IA qui répond aux questions courantes sur les règles des tournois, les horaires, les processus d'inscription et les détails de paiement pour les participants.
 *
 * - aiParticipantFaqChatbot - Une fonction qui gère les requêtes FAQ des participants.
 * - AiParticipantFaqChatbotInput - Le type d'entrée pour la fonction aiParticipantFaqChatbot.
 * - AiParticipantFaqChatbotOutput - Le type de sortie pour la fonction aiParticipantFaqChatbot.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiParticipantFaqChatbotInputSchema = z.object({
  question: z.string().describe("La question du participant sur les détails du tournoi.")
});
export type AiParticipantFaqChatbotInput = z.infer<typeof AiParticipantFaqChatbotInputSchema>;

const AiParticipantFaqChatbotOutputSchema = z.object({
  answer: z.string().describe("La réponse du chatbot à la question du participant.")
});
export type AiParticipantFaqChatbotOutput = z.infer<typeof AiParticipantFaqChatbotOutputSchema>;

export async function aiParticipantFaqChatbot(
  input: AiParticipantFaqChatbotInput
): Promise<AiParticipantFaqChatbotOutput> {
  return aiParticipantFaqChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiParticipantFaqChatbotPrompt',
  input: {schema: AiParticipantFaqChatbotInputSchema},
  output: {schema: AiParticipantFaqChatbotOutputSchema},
  prompt: `Tu es un assistant IA serviable et compétent pour la plateforme de tournois ONE CUP.
Ton rôle est de répondre aux questions des participants avec précision et concision concernant les règles des tournois, les horaires, les processus d'inscription et les détails de paiement.
Fournis des réponses directes et claires. Réponds toujours en FRANÇAIS.

Question du participant : {{{question}}}

Veuillez fournir une réponse claire et concise.`
});

const aiParticipantFaqChatbotFlow = ai.defineFlow(
  {
    name: 'aiParticipantFaqChatbotFlow',
    inputSchema: AiParticipantFaqChatbotInputSchema,
    outputSchema: AiParticipantFaqChatbotOutputSchema
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
