import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function AiChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Halo! Ada yang bisa aku bantu mengenai tempat wisata di website ini?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post('/api/chat-ai', { message: userMsg });
            setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Maaf, koneksi AI terganggu. Silakan coba lagi.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                    <MessageSquare size={20} />
                    <span>Tanya AI Wisata</span>
                </button>
            )}

            {isOpen && (
                <div className="flex h-[450px] w-80 flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden sm:w-96">
                    {/* Header Widget */}
                    <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
                        <div className="flex items-center gap-2 font-bold">
                            <Bot size={22} />
                            <span>Asisten Wisata AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:opacity-75 transition-opacity">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Area Pesan Chat */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                        {messages.map((msg, idx) => (
                            <div 
                                key={idx} 
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                                    msg.sender === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                        : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="rounded-2xl rounded-bl-none bg-white p-3 border border-slate-200 text-xs text-slate-500 animate-pulse">
                                    AI sedang mengetik...
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Form Input Pesan */}
                    <div className="border-t border-slate-200 p-3 bg-white flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            placeholder="Tanya info wisata..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button 
                            onClick={handleSend}
                            className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}