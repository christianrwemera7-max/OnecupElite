'use server';
/**
 * @fileOverview An AI assistant flow for generating engaging tournament descriptions, rules, and sponsor profiles.
 *
 * - generateTournamentAndSponsorContent - A function that handles the content generation process.
 * - TournamentContentGeneratorInput - The input type for the generateTournamentAndSponsorContent function.
 * - TournamentContentGeneratorOutput - The return type for the generateTournamentAndSponsorContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SponsorInputSchema = z.object({
  name: z.string().describe('The name of the sponsor.'),
  category: z.string().describe('The sponsorship category (e.g., Gold, Silver, Tech Partner).'),
  companyDescription: z.string().optional().describe('An optional brief description of the sponsor company.'),
});

const TournamentContentGeneratorInputSchema = z.object({
  tournamentName: z.string().describe('The name of the tournament.'),
  sportOrGame: z.string().describe('The sport or game featured in the tournament.'),
  date: z.string().describe('The dates the tournament will take place (e.g., "July 15-17, 2024").'),
  location: z.string().describe('The location where the tournament will be held.'),
  maxTeams: z.number().describe('The maximum number of teams allowed to participate.').optional(),
  prizePool: z.string().describe('The total prize pool for the tournament (e.g., "$5000 USD").'),
  additionalDetails: z.string().optional().describe('Any other specific instructions, unique aspects, or key selling points for the tournament.'),
  sponsors: z.array(SponsorInputSchema).optional().describe('A list of sponsors with their details.'),
});
export type TournamentContentGeneratorInput = z.infer<typeof TournamentContentGeneratorInputSchema>;

const SponsorProfileOutputSchema = z.object({
  name: z.string().describe('The name of the sponsor.'),
  profile: z.string().describe('An engaging and concise profile for the sponsor, highlighting their contribution and brand.'),
});

const TournamentContentGeneratorOutputSchema = z.object({
  tournamentDescription: z.string().describe('An engaging and captivating description for the tournament, designed to attract participants and spectators.'),
  tournamentRulesSummary: z.string().describe('A concise and clear summary of the key rules for the tournament.'),
  sponsorProfiles: z.array(SponsorProfileOutputSchema).describe('A list of generated engaging profiles for each sponsor.'),
});
export type TournamentContentGeneratorOutput = z.infer<typeof TournamentContentGeneratorOutputSchema>;

export async function generateTournamentAndSponsorContent(
  input: TournamentContentGeneratorInput
): Promise<TournamentContentGeneratorOutput> {
  return aiTournamentAndSponsorContentGeneratorFlow(input);
}

const generateContentPrompt = ai.definePrompt({
  name: 'generateContentPrompt',
  input: { schema: TournamentContentGeneratorInputSchema },
  output: { schema: TournamentContentGeneratorOutputSchema },
  prompt: `You are an expert content creator for sports and gaming tournaments.
Your task is to generate engaging and professional content for a tournament, including a compelling description, a concise set of key rules, and a brief profile for each sponsor.

Tournament Details:
Name: {{{tournamentName}}}
Sport/Game: {{{sportOrGame}}}
Date: {{{date}}}
Location: {{{location}}}
{{#if maxTeams}}Maximum Teams: {{{maxTeams}}}
{{/if}}Prize Pool: {{{prizePool}}}
{{#if additionalDetails}}Additional Details: {{{additionalDetails}}}
{{/if}}

Sponsor Information:
{{#if sponsors}}
{{#each sponsors}}
- Name: {{{name}}}
  Category: {{{category}}}
  {{#if companyDescription}}Description: {{{companyDescription}}}{{/if}}
{{/each}}
{{else}}
No sponsors provided.
{{/if}}

Based on the above information, generate the following:
1.  **Tournament Description**: A captivating description (around 150-200 words) that highlights the excitement, stakes, and unique aspects of the tournament. Aim to attract participants and build anticipation.
2.  **Tournament Rules Summary**: A concise summary of 3-5 crucial rules that participants need to know. Focus on clarity and ease of understanding.
3.  **Sponsor Profiles**: For each provided sponsor, create a short, engaging profile (2-3 sentences) that acknowledges their support, briefly mentions their brand, and highlights their contribution to the event. If no sponsors are provided, return an empty array for sponsorProfiles.

Ensure the output is formatted as a JSON object adhering to the specified output schema.`,
});

const aiTournamentAndSponsorContentGeneratorFlow = ai.defineFlow(
  {
    name: 'aiTournamentAndSponsorContentGeneratorFlow',
    inputSchema: TournamentContentGeneratorInputSchema,
    outputSchema: TournamentContentGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await generateContentPrompt(input);
    if (!output) {
      throw new Error('Failed to generate tournament and sponsor content.');
    }
    return output;
  }
);
