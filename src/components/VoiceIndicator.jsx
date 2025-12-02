export default function VoiceIndicator({ listening }) {
  if (!listening) return null;

  return (
    <div className="fixed bottom-32 right-4 w-14 h-14 rounded-full bg-cyan-500 animate-pulse shadow-lg shadow-cyan-500/40 z-10 flex items-center justify-center text-white text-3xl">
      <span style={{ fontFamily: 'Material Symbols Rounded' }}>mic</span>
    </div>
  );
} 