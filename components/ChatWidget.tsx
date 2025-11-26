import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Greetings. I am A.L.I.C.E, Hiro's virtual assistant. How may I assist you with your inquiries today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const stream = await sendMessageToGemini(userMsg.text);
      let fullResponse = '';
      
      // Create a placeholder message for streaming
      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg
        ));
      }
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]
          bg-cyber-dark border border-cyber-primary text-cyber-primary
          hover:bg-cyber-primary hover:text-cyber-black transition-all duration-300
          ${isOpen ? 'rotate-90' : 'animate-pulse-fast'}
        `}
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] flex flex-col bg-cyber-black/95 backdrop-blur-xl border border-cyber-primary/50 shadow-2xl rounded-lg overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="p-4 bg-cyber-gray/50 border-b border-cyber-primary/30 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-cyber-primary/20 flex items-center justify-center border border-cyber-primary">
                <Bot className="w-5 h-5 text-cyber-primary" />
             </div>
             <div>
                <h3 className="text-sm font-display font-bold text-white tracking-wide">A.L.I.C.E UNIT</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-tech uppercase">Online // Ready</span>
                </div>
             </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyber-primary/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] p-3 text-sm font-sans leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-cyber-primary/20 border border-cyber-primary/30 text-white rounded-l-lg rounded-tr-lg' 
                      : 'bg-cyber-gray border border-cyber-gray text-slate-300 rounded-r-lg rounded-tl-lg'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-cyber-gray border border-cyber-gray text-cyber-primary p-3 rounded-r-lg rounded-tl-lg text-xs font-tech animate-pulse">
                        PROCESSING...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-cyber-black border-t border-cyber-gray/50">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects..."
                className="w-full bg-cyber-gray/30 text-white text-sm rounded-md border border-cyber-gray/50 focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary pl-3 pr-10 py-3 font-tech"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-cyber-primary hover:text-white disabled:opacity-50 transition-colors p-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
