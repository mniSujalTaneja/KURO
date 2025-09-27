import { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import fetchJoke from '../utils/fetchJoke';
import fetchWikiSummary from '../utils/fetchWikiSummary';
import extract from '../utils/extract';
import evaluate from '../utils/evaluate';
import funnyMathResponse from '../funnyResponses/funnyMathResponse';
import funnyTimeResponse from '../funnyResponses/funnyTimeResponse';
import fetchWeather from '../utils/fetchWeather';

export default function useVoiceAssistant() {
  const { resetTranscript, transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [memory, setMemory] = useState({});
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  useEffect(() => {
    const text = transcript.toLowerCase().trim();
    const submitPattern = /submit$/;

    if (submitPattern.test(text)) {
      const cleanedText = text.replace(submitPattern, '').trim();
      if (cleanedText && cleanedText !== lastSubmitted) {
        setInput(cleanedText);
        handleSubmit(cleanedText);
        setLastSubmitted(cleanedText);
      }
    } else {
      setInput(transcript);
    }
  }, [transcript, lastSubmitted]);

  const toggleListening = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const handleSubmit = async (x) => {
    setInput('');
    setChat(prev => [...prev, { question: x, answer: 'thinking...' }]);

    const text = x.toLowerCase().trim();
    let answer = '';

    if (text === 'clear chat') {
      setChat([]);
      resetTranscript();
      return;
    }

    if (text.includes('reset')) {
      resetTranscript();
      return;
    }

    const expression = extract(text);
    if (expression) {
      const result = evaluate(expression);
      answer = typeof result === 'number' ? funnyMathResponse(result) : result;
    } else if (text.includes('time')) {
      const now = new Date();
      const textTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      answer = funnyTimeResponse(textTime);
    } else if (text.includes('date')) {
      const now = new Date();
      answer = now.toLocaleDateString();
    } else if (text.includes('weather')) {
      let city = text;

      // List of phrases to remove before city extraction
      const phrasesToRemove = [
        "what's the weather in",
        "whats the weather in",
        "what is the weather in",
        "tell me the weather in",
        "weather in",
        "weather at",
      ];

      phrasesToRemove.forEach(phrase => {
        if (city.startsWith(phrase)) {
          city = city.replace(phrase, '').trim();
        }
      });

      if (city) {
        answer = await fetchWeather(city);
      } else {
        answer = "Please specify the city by saying something like 'weather in Mumbai'.";
      }


    } else if (
      text.includes('joke') ||
      text.includes('funny') ||
      text.includes('tell me a joke')
    ) {
      answer = await fetchJoke();
    } else if (
      text.includes('who are you') ||
      text.includes('who are u') ||
      text.includes('who r you') ||
      text.includes('who r u') ||
      text.includes("what's your name") ||
      text.includes('what is your name')
    ) {
      const textIntro = [
        `I’m KURO, your friendly neighborhood assistant. No cape, just code!`,
        `You can call me KURO, but I also respond to ‘Hey Genius’.`,
        `I’m KURO, your digital buddy and occasional comedian.`,
        `Names are overrated. You can just call me ‘Awesome Assistant’.`
      ];
      answer = textIntro[Math.floor(Math.random() * textIntro.length)];
    } else if (
      text.startsWith('tell me about') ||
      text.startsWith('who is') ||
      text.startsWith('what is')
    ) {
      let topic = text.replace(/tell me about|who is|what is/g, '').trim();
      answer = topic.length === 0
        ? "Please tell me what you want to know about."
        : await fetchWikiSummary(topic);
    } else if (text.startsWith('my name is')) {
      const name = text.replace('my name is', '').trim();
      if (name) {
        setMemory(prev => ({ ...prev, name }));
        const funReplies = [
          `Got it, ${name}! I’ll write it in digital stone.`,
          `${name}? Fancy. I’ll try not to forget this time.`,
          `Saving your name: ${name}. If I had a pen, I’d write it on my virtual hand.`,
          `Cool, ${name}. Noted and stored in my not-so-infinite memory!`
        ];
        answer = funReplies[Math.floor(Math.random() * funReplies.length)];
      } else {
        answer = "Sorry, I didn't catch your name. Try saying: 'My name is Batman'. Just kidding. Or am I?";
      }
    } else if (text.includes("what's my name") || text.includes('what is my name')) {
      if (memory.name) {
        const textName = [
          `Your name is ${memory.name}. Unless you're using a fake one. 🤨`,
          `Oh come on, ${memory.name}, don’t tell me you forgot your own name!`,
          `Obviously you're ${memory.name}. At least that’s what you told me!`,
          `${memory.name}, as always. Iconic.`
        ];
        answer = textName[Math.floor(Math.random() * textName.length)];
      } else {
        answer = "I don’t know your name yet! Tell me by saying: 'My name is ...' and I’ll remember it forever... or until you reset me.";
      }
    } else if (text.startsWith('my favorite color is')) {
      const color = text.replace('my favorite color is', '').trim();
      if (color) {
        setMemory(prev => ({ ...prev, color }));
        answer = `I'll remember that your favorite color is ${color}.`;
      } else {
        answer = "What's your favorite color?";
      }
    } else if (text.includes("what's my favorite color")) {
      if (memory.color) {
        answer = `Your favorite color is ${memory.color}.`;
      } else {
        answer = "I don't know your favorite color yet. Say: 'My favorite color is ...'";
      }
    } else {
      answer = "Sorry, I didn't understand that.";
    }

    setTimeout(() => {
      setChat(prev => {
        const newChat = [...prev];
        const lastIndex = newChat.length - 1;
        if (newChat[lastIndex]?.answer === 'thinking...') {
          newChat[lastIndex].answer = answer;
        }
        return newChat;
      });
    }, 900);
  };

  return {
    chat,
    input,
    setInput,
    listening,
    toggleListening,
    handleSubmit,
    bottomRef,
    browserSupportsSpeechRecognition
  };
}
