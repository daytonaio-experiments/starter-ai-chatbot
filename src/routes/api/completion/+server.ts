import { createOpenAI } from '@ai-sdk/openai';
import { StreamData, streamText } from 'ai';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: env.GROQ_API_KEY ?? '',
});

export const POST = (async ({ request }) => {
  
  const { prompt } = await request.json();
  const data = new StreamData();
  data.append({ test: 'value' });
  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    prompt,
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}) satisfies RequestHandler;
