import ChatBubble from './ChatBubble';

export default function ChatWindow({ chat, bottomRef }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 pt-24 pb-6 space-y-4">
      {chat.length === 0 ? (
        <div className="text-center text-cyan-400 text-lg italic">
          Hi! I’m <span className="font-bold text-white">KURO</span>. 
          Ask me anything or say “submit” after speaking!
        </div>
      ) : (
        chat.map((entry, index) => (
          <div key={index} className="flex flex-col gap-2">
            <ChatBubble role="user" text={entry.question} />
            <ChatBubble role="bot" text={entry.answer} />
          </div>
        ))
      )}

      {/* Auto scroll to bottom */}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}