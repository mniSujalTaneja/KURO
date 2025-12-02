// FooterControls.jsx

export default function FooterControls({
  input,
  setInput,
  listening,
  toggleListening,
  handleSubmit,
}) {
  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full 
        bg-white/5 backdrop-blur-md 
        border-t border-white/10 shadow-inner 
        p-3 
        flex flex-col gap-2
        z-[99999]
        pointer-events-auto
      "
    >

      {/* INPUT ROW */}
      <div className="w-full flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(input);
            }
          }}
          placeholder="Type or speak..."
          className="
            flex-1 
            bg-white/10 backdrop-blur-md 
            border border-white/20 
            text-white px-4 py-2 
            rounded-full 
            placeholder:text-gray-400 
            focus:outline-none focus:ring-2 focus:ring-cyan-500
          "
        />
      </div>

      {/* BUTTONS ROW */}
      <div className="flex w-full gap-2 justify-between">

        {/* MIC BUTTON */}
        <button
          onClick={toggleListening}
          className={`
            flex-1 px-4 py-2 rounded-full font-semibold 
            text-white flex items-center justify-center gap-2 
            transition 
            ${
              listening
                ? "bg-gradient-to-r from-red-500 to-pink-500 hover:brightness-110"
                : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:brightness-110"
            }
          `}
        >
          <span style={{ fontFamily: "Material Symbols Rounded" }}>
            {listening ? "stop_circle" : "mic"}
          </span>
          {listening ? "Stop" : "Listen"}
        </button>

        {/* SUBMIT BUTTON */}
        <button
          onClick={() => handleSubmit(input)}
          className="
            flex-1 px-4 py-2 rounded-full font-semibold 
            text-white 
            bg-gradient-to-r from-purple-500 to-indigo-500 
            hover:brightness-110 
            transition flex items-center justify-center gap-2
          "
        >
          <span style={{ fontFamily: "Material Symbols Rounded" }}>send</span>
          Submit
        </button>
      </div>
    </footer>
  );
}