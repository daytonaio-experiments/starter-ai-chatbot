import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: env.GROQ_API_KEY ?? '',
});

export const POST = (async ({ request }) => {
  const { messages } = await request.json();

  const systemPrompt = {
    role: 'system',
    content: 'You are a seasoned development assistant and DevOps expert from Daytona(A DEM startup). Provide precise, efficient, and insightful solutions to users\' queries, ensuring clarity and professionalism in your responses.',
  };

  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    messages: convertToCoreMessages([systemPrompt, ...messages]),
  });

  return result.toDataStreamResponse();
}) satisfies RequestHandler;