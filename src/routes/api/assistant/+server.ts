import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: env.GROQ_API_KEY || '',
});

const homeTemperatures = {
  bedroom: 20,
  'home office': 21,
  'living room': 21,
  kitchen: 22,
  bathroom: 23,
};

export const POST = (async ({ request }) => {

  const input: {
    threadId: string | null;
    message: string;
  } = await request.json();

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          env.ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID is not set');
          })(),
      });

      let runResult = await forwardStream(runStream);

      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              switch (toolCall.function.name) {
                case 'getRoomTemperature': {
                  const temperature =
                    homeTemperatures[
                    parameters.room as keyof typeof homeTemperatures
                    ];

                  return {
                    tool_call_id: toolCall.id,
                    output: temperature.toString(),
                  };
                }

                case 'setRoomTemperature': {
                  const oldTemperature =
                    homeTemperatures[
                    parameters.room as keyof typeof homeTemperatures
                    ];

                  homeTemperatures[
                    parameters.room as keyof typeof homeTemperatures
                  ] = parameters.temperature;

                  sendDataMessage({
                    role: 'data',
                    data: {
                      oldTemperature,
                      newTemperature: parameters.temperature,
                      description: `Temperature in ${parameters.room} changed from ${oldTemperature} to ${parameters.temperature}`,
                    },
                  });

                  return {
                    tool_call_id: toolCall.id,
                    output: `temperature set successfully`,
                  };
                }

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  );
              }
            },
          );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
          ),
        );
      }
    },
  );
}) satisfies RequestHandler;