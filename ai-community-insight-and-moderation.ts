'use server';
/**
 * @fileOverview An AI-powered tool for community managers to summarize discussions,
 * identify trending topics, and flag inappropriate content.
 *
 * - communityInsightAndModeration - A function that processes community discussions.
 * - CommunityModerationInput - The input type for the communityInsightAndModeration function.
 * - CommunityModerationOutput - The return type for the communityInsightAndModeration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CommunityModerationInputSchema = z.object({
  discussions: z.array(z.object({
    id: z.string().describe('Unique identifier for the discussion post.'),
    author: z.string().describe('Name or username of the author.'),
    content: z.string().describe('The content of the discussion post.'),
    timestamp: z.string().describe('Timestamp when the post was made (e.g., "2023-10-27T10:00:00Z").'),
  })).describe('An array of community discussion posts or comments to analyze.'),
});
export type CommunityModerationInput = z.infer<typeof CommunityModerationInputSchema>;

const CommunityModerationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the active discussions, capturing main points and overall sentiment.'),
  trendingTopics: z.array(z.string()).describe('A list of 3-5 trending topics or keywords identified from the discussions.'),
  flaggedContent: z.array(z.object({
    id: z.string().describe('The ID of the discussion post flagged for inappropriate content.'),
    reason: z.string().describe('The reason for flagging the content (e.g., "hate speech", "spam", "harassment", "off-topic").'),
  })).describe('A list of discussion posts flagged for inappropriate content, including their ID and the reason.'),
});
export type CommunityModerationOutput = z.infer<typeof CommunityModerationOutputSchema>;

const communityModerationPrompt = ai.definePrompt({
  name: 'communityModerationPrompt',
  input: { schema: CommunityModerationInputSchema },
  output: { schema: CommunityModerationOutputSchema },
  prompt: `You are an AI assistant designed to help community managers maintain a healthy and engaging online environment. Your primary tasks are to analyze community discussions, identify key insights, and moderate content based on general community guidelines (avoiding hate speech, harassment, spam, and irrelevant content).

Analyze the following community discussions:

{{#each discussions}}
---
Discussion ID: {{{this.id}}}
Author: {{{this.author}}}
Timestamp: {{{this.timestamp}}}
Content:
{{{this.content}}}
---
{{/each}}

Based on the provided discussions, please provide the following in a JSON object:
1.  A concise 'summary' of the overall sentiment, key themes, and main points discussed.
2.  An array named 'trendingTopics' containing 3 to 5 significant or frequently discussed topics/keywords.
3.  An array named 'flaggedContent' of objects. Each object should contain the 'id' of any discussion post that appears inappropriate or violates common community standards (e.g., contains hate speech, harassment, spam, or is completely off-topic), and a 'reason' for flagging it. If no content is inappropriate, this array should be empty.

Ensure your response is a valid JSON object matching the output schema provided.
`,
});

const communityModerationFlow = ai.defineFlow(
  {
    name: 'communityModerationFlow',
    inputSchema: CommunityModerationInputSchema,
    outputSchema: CommunityModerationOutputSchema,
  },
  async (input) => {
    const { output } = await communityModerationPrompt(input);
    if (!output) {
      throw new Error('No output from community moderation prompt.');
    }
    return output;
  }
);

export async function communityInsightAndModeration(input: CommunityModerationInput): Promise<CommunityModerationOutput> {
  return communityModerationFlow(input);
}
