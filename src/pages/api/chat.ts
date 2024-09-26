import { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText, generateText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const { messages } = await req.body;

    console.log('print messages: ')
    console.log(messages)

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages,
    });

    console.log('print result: ')
    console.log(result)

    return result.toTextStreamResponse();
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}