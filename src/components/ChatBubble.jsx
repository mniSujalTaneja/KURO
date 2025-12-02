export default function ChatBubble({ role, text }) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`
          px-4 py-3 rounded-2xl max-w-[80%] md:max-w-[70%] text-sm md:text-base
          bg-white/10 backdrop-blur-md border border-white/10
          ${isUser
            ? 'text-blue-300 shadow-md shadow-blue-500/20'
            : 'text-cyan-300 shadow-md shadow-cyan-400/20'}
          transition-all
        `}
      >
        <div className="text-xs font-semibold mb-1 opacity-70 tracking-wide">
          {isUser ? 'You' : 'KURO'}
        </div>
        <div className={text === 'thinking...' ? 'animate-pulse italic' : ''}>
          {text}
        </div>
      </div>
    </div>
  );
}
    