// App.js
import React from 'react'
import useVoiceAssistant from './hooks/useVoiceAssistant.js'

// Components
import Header from './components/Header.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import FooterControls from './components/FooterControls.jsx'
import VoiceIndicator from './components/VoiceIndicator.jsx'

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans relative overflow-hidden">
      <Header />

      <ChatWindow chat={chat} bottomRef={bottomRef} />

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
