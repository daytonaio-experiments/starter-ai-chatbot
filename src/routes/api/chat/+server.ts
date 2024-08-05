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

  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}) satisfies RequestHandler;
