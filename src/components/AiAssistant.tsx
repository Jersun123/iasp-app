import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, Loader2, ArrowRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantProps {
  userProfile: {
    name: string;
    role: string;
    company: string;
    industry: string;
  };
  onNavigateToTab?: (tab: any) => void;
}

export default function AiAssistant({ userProfile, onNavigateToTab }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: '您好！我是您的 智服AI 政策与合规助手。有什么我可以帮助您的？无论是关于大湾区高新政策、APP个人数据合规自查，还是本平台的资助条件，我都在线为您排忧解惑。',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: '如何提升企业合规得分？', category: 'compliance' },
    { text: '有什么针对卫星物联的补贴？', category: 'policy' },
    { text: '平台目前能匹配供需链吗？', category: 'matching' },
    { text: '想预约 Dr. Lin 的专家咨询。', category: 'experts' },
  ];

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Post to our server-side API proxy
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text
          })),
          userProfile: userProfile
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || '抱歉，当前无法获取智能大脑应答。',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Failed to query Gemini assistant:', error);
      const errorMsg: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        sender: 'assistant',
        text: '连接智能助手时发生故障。请确保已在 Settings > Secrets 进行了正确的 GEMINI_API_KEY 配置，并已重新加载服务器。为了您的体验，您可以尝试重试。',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[360px] border-l border-[#1a1a24] bg-[#09090d] flex flex-col h-full shrink-0" id="ai-assistant-panel">
      {/* Header matching lovable.dev style */}
      <div className="p-4 border-b border-[#14141d] flex items-center gap-3" id="ai-assistant-header">
        <div className="bg-violet-600/20 border border-violet-500/30 text-violet-400 p-2.5 rounded-xl shadow-md flex items-center justify-center">
          <Bot className="w-5 h-5 text-violet-400 animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
            企业智能助手
            <span className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-tight bg-violet-500/10 text-violet-400 border border-violet-500/20 animate-pulse">
              Active
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Lovable v4-flash 高速应答引擎
          </p>
        </div>
      </div>

      {/* Messages Stack */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050508]/80" id="ai-messages-container">
        {messages.length === 1 && (
          <div className="text-center py-8 px-4" id="ai-assistant-welcome">
            <div className="inline-flex p-4 rounded-full bg-violet-600/5 border border-violet-500/10 text-violet-400 mb-3 animate-bounce">
              <MessageSquare className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-slate-300">智能助理已连接，随时提问</p>
            <p className="text-xs text-slate-500 mt-1.5 max-w-[220px] mx-auto">
              您可以输入任意关于项目行业合规评定、高新技术申报等专业疑问。
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              id={`chat-msg-${msg.id}`}
            >
              {/* Avatar Indicator */}
              <div className={`p-1.5 rounded-lg shrink-0 flex items-center justify-center h-8 w-8 ${
                isUser ? 'bg-violet-600 text-white shadow-md' : 'bg-[#12121a] text-slate-300 border border-[#1e1e2d]'
               }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div className="max-w-[80%] flex flex-col">
                <div className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  isUser
                    ? 'bg-violet-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-[#12121a] text-slate-200 border border-[#1e1e2d] rounded-tl-none shadow-xs'
                }`}>
                  <p className="whitespace-pre-wrap font-sans">{msg.text}</p>
                </div>
                <span className={`text-[9px] text-slate-500 mt-1 font-mono ${isUser ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5" id="ai-typing">
            <div className="p-1.5 rounded-lg shrink-0 flex items-center justify-center bg-[#12121a] text-slate-300 border border-[#1e1e2d] h-8 w-8">
              <Bot className="w-4 h-4 text-violet-400 animate-spin" />
            </div>
            <div className="max-w-[80%]">
              <div className="px-3.5 py-2.5 rounded-2xl bg-[#12121a] border border-[#1e1e2d] rounded-tl-none shadow-xs text-xs flex items-center gap-1.5 text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-500" />
                <span>智能模型正在高速运算中...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Access Prompts */}
      <div className="p-3 border-t border-[#14141d] bg-[#09090d]" id="ai-quick-prompts">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
          快捷咨询提问
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              id={`quick-prompt-${idx}`}
              onClick={() => handleSendMessage(p.text)}
              className="text-[10px] bg-[#12121a] hover:bg-[#1C1C26] border border-[#1e1e2d] hover:border-violet-500/20 text-slate-300 font-semibold px-2.5 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1 shrink-0"
            >
              <Sparkles className="w-2.5 h-2.5 text-violet-400 animate-pulse" />
              {p.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form matching lovable.dev style */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-3 border-t border-[#14141d] bg-[#09090d] flex flex-col gap-2"
        id="ai-chat-form"
      >
        <div className="relative">
          <input
            type="text"
            id="ai-chat-input-field"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入企业数据、合规、政策申报疑问..."
            className="w-full text-xs font-sans bg-[#12121a] border border-[#1e1e2d] hover:border-[#242435] focus:border-violet-500 focus:bg-[#12121a] text-white rounded-lg pl-3 pr-10 py-2.5 outline-none transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            id="ai-submit-message"
            disabled={!inputText.trim() || loading}
            className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors ${
              inputText.trim() && !loading
                ? 'text-violet-400 hover:bg-[#a78bfa]/10'
                : 'text-slate-600 pointer-events-none'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <button
          type="button"
          id="ai-big-chat-button"
          onClick={() => handleSendMessage("根据当前的企业数据，全方位评估我的政策匹配度与合规得分！")}
          className="w-full text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 p-2.5 rounded-lg flex items-center justify-center gap-1.5 font-bold shadow-md shadow-violet-600/10 cursor-pointer transition-all focus:ring-2 focus:ring-violet-550"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>开始智能合规评估</span>
          <ArrowRight className="w-3.5 h-3.5 text-yellow-200" />
        </button>
      </form>
    </div>
  );
}
