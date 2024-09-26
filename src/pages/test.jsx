'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  return (
  <section className="text-gray-600 bg-[#f7f7f7] body-font min-h-screen">
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
            </div>
        ))}

        <form onSubmit={handleSubmit}>
            <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            />
        </form>
        </div>
    </section>
  );
}