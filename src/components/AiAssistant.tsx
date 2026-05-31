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
      text: '您好！我是您的 智能助手。有什么我可以帮助您的？无论是关于大湾区高新政策、APP个人数据合规自查，还是本平台的资助条件，我都在线为您排忧解惑。',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: '如何提升企业合规得分？', category: 'compliance' },
    { text: '平台目前能配置供需链路吗？', category: 'matching' },
    { text: '有什么针对卫星互联网的补贴？', category: 'policy' },
    { text: '想预约 Dr. Lin 的专家咨询', category: 'experts' },
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
    <aside className="w-[308px] border-l border-[#ffffff0b] bg-bg-panel flex flex-col h-full shrink-0 overflow-hidden" id="ai-assistant-panel">
      {/* Header matching mockup style */}
      <div className="p-4 border-b border-[#ffffff07] flex items-center justify-between shrink-0" id="ai-assistant-header">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center text-base shrink-0">
            🤖
          </div>
          <div className="min-w-0 text-left">
            <h2 className="text-[13px] font-bold text-white flex items-center gap-1.5 font-sans leading-none">
              企业智能助手
            </h2>
            <p className="text-[10.5px] text-slate-500 mt-1 leading-none truncate">
              Lovable v4-flash 高速应答引擎
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full px-2 py-0.5 text-[10px] font-bold text-[#34d399] select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span>Active</span>
        </div>
      </div>

      {/* Messages Stack */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-bg-base/80" id="ai-messages-container">
        {messages.length === 1 && (
          <div className="text-center py-6 px-2.5" id="ai-assistant-welcome">
            <div className="w-[44px] h-[44px] bg-violet-500/10 border border-violet-500/20 rounded-xl mx-auto mb-2.5 flex items-center justify-center text-[22px]">
              🤖
            </div>
            <p className="text-[13px] font-bold text-slate-200">智能助理已连接，随时提问</p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-[210px] mx-auto leading-relaxed">
              您可以输入任意关于项目申报、行业合规、高新技术申报等专业疑问。
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[90%] ${isUser ? 'self-end ml-auto' : 'self-start'}`}
              id={`chat-msg-${msg.id}`}
            >
              {/* Message Content Bubble */}
              <div className={`px-3 py-2.5 rounded-xl text-[12px] leading-[1.7] ${
                isUser
                  ? 'bg-violet-600 text-white rounded-tr-none shadow-sm text-left'
                  : 'bg-bg-card2 border border-white/[0.04] text-slate-200 rounded-tl-none shadow-xs text-left'
              }`}>
                <p className="whitespace-pre-wrap font-sans">{msg.text}</p>
              </div>
              <span className={`text-[9px] text-slate-500 mt-1 px-1 font-mono ${isUser ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}

        {loading && (
          <div className="flex flex-col max-w-[90%] self-start" id="ai-typing">
            <div className="px-3 py-2.5 rounded-xl bg-[#12121a] border border-[#1e1e2d] rounded-tl-none shadow-xs text-[11px] flex items-center gap-1.5 text-slate-400">
              <Loader2 className="w-3 animate-spin text-violet-550" />
              <span>智服合规核心正在处理中...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Access Prompts */}
      <div className="p-3 border-t border-[#ffffff07] bg-bg-panel shrink-0 text-left" id="ai-quick-prompts">
        <p className="text-[10px] text-slate-500 mb-2.5 px-0.5">
          快捷咨询问题
        </p>
        <div className="flex flex-col gap-1.5">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              id={`quick-prompt-${idx}`}
              onClick={() => handleSendMessage(p.text)}
              className="text-[11.5px] bg-[#19192a] hover:bg-bg-hover text-slate-300 px-3 py-2 border border-[#ffffff07] rounded-lg transition-all cursor-pointer text-left flex items-center gap-2 pr-2"
            >
              <span className="text-slate-500 select-none text-[12px]">
                {idx === 0 ? '🏆' : idx === 1 ? '🔗' : idx === 2 ? '🛰️' : '👤'}
              </span>
              <span className="truncate">{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form matching mockup style */}
      <div className="p-3 border-t border-[#ffffff07] bg-bg-panel shrink-0" id="ai-chat-form">
        <div className="flex items-center gap-2 bg-[#1a1a2c] border border-white/10 rounded-lg p-1.5">
          <input
            type="text"
            id="ai-chat-input-field"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage(inputText);
              }
            }}
            placeholder="输入企业数据、合规、政策申报疑问..."
            className="flex-1 text-[11.5px] font-sans bg-transparent text-white px-2 outline-none"
            disabled={loading}
          />
          <button
            type="button"
            id="ai-submit-message"
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || loading}
            className={`px-3 py-1.5 rounded-md text-[11.5px] font-semibold font-sans transition-colors shrink-0 ${
              inputText.trim() && !loading
                ? 'bg-violet-600 text-white cursor-pointer hover:bg-violet-500'
                : 'bg-violet-800 text-white/50 cursor-not-allowed'
            }`}
          >
            发送
          </button>
        </div>
      </div>
    </aside>
  );
}
