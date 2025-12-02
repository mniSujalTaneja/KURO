// App.js
import React from 'react'
import useVoiceAssistant from './hooks/useVoiceAssistant'

// Components
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import FooterControls from './components/FooterControls'
import VoiceIndicator from './components/VoiceIndicator'

const App = () => {
  const {
    chat,
    input,
    setInput,
    listening,
    toggleListening,
    handleSubmit,
    bottomRef,
    browserSupportsSpeechRecognition
  } = useVoiceAssistant()

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">

      <Header />

      {/* Chat area wrapper — FIXED OVERLAP ISSUE */}
      <div className="flex-1 overflow-y-auto pt-24 pb-36 pointer-events-none">
        <ChatWindow chat={chat} bottomRef={bottomRef} />
      </div>

      <FooterControls
        input={input}
        setInput={setInput}
        listening={listening}
        toggleListening={toggleListening}
        handleSubmit={handleSubmit}
      />

      <VoiceIndicator listening={listening} />
    </div>
  )
}

export default App