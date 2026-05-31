import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Activity, Monitor, Globe, BarChart2, Shield, Radio, CheckCircle } from 'lucide-react';

export default function MonitoringView() {
  const [activeCluster, setActiveCluster] = useState<string>('low-altitude');

  const clusters = [
    { id: 'low-altitude', name: '低空经济与网联卫星卫星集群', activity: '92/100', status: '高度活跃', count: '142 家核心企业' },
    { id: 'agent-ai', name: '多模态 Agentic AI 企业链', activity: '85/100', status: '成长迅速', count: '89 家核心企业' },
    { id: 'cross-border', name: '跨境数据沙箱与自贸片集群', activity: '78/100', status: '平稳运营', count: '67 家核心企业' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="monitoring-view-panel">
      {/* Upper header with custom theme picture */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-2 border-b border-[#14141d]/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            平台产业监测数据大屏
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            实时抓取全省互联网公司关键指标、天线频段占用度、高新研发申报趋势，展现数字集群活跃脉搏。
          </p>
        </div>


      </div>

      {/* Cluster switchers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="cluster-selector-grid">
        {clusters.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCluster(c.id)}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              activeCluster === c.id
                ? 'bg-[#12121f] text-white border-violet-500/40 shadow-lg shadow-violet-600/10'
                : 'bg-[#0d0d12] text-slate-400 border-white/5 hover:border-white/10 hover:bg-[#12121a]'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                activeCluster === c.id ? 'text-violet-400' : 'text-slate-500'
              }`}>
                {c.status}
              </span>
              <Activity className={`w-4 h-4 ${activeCluster === c.id ? 'text-violet-400 animate-pulse' : 'text-slate-600'}`} />
            </div>
            <h4 className={`text-xs font-black block leading-snug ${activeCluster === c.id ? 'text-white' : 'text-slate-350'}`}>{c.name}</h4>
            <div className="mt-4 flex justify-between items-baseline">
              <span className={`text-xl font-mono tracking-tighter ${activeCluster === c.id ? 'text-violet-400 font-extrabold' : 'text-slate-300'}`}>
                {c.activity}
              </span>
              <span className="text-[10px] text-slate-500">
                {c.count}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Visual representation card */}
      <div className="bg-[#0d0d12] border border-white/5 rounded-2xl p-6 shadow-sm" id="industrial-visual-card">
        <h3 className="text-base font-bold text-white mb-6 flex items-center justify-between font-sans">
          <span className="flex items-center gap-1.5">
            <Radio className="w-5 h-5 text-violet-500 animate-pulse" />
            集群研发活跃指数历史曲线 (近 6 个月)
          </span>
          <span className="text-xs text-slate-500 font-mono">数据刷新于: 30秒前</span>
        </h3>

        {/* Beautiful layout custom SVG Chart */}
        <div className="relative h-64 w-full" id="svg-chart-container">
          <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
            {/* Grid Line lines matched with Lovable dark style */}
            <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="220" x2="600" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

            {/* Simulated graph lines gradient fill */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Fill Area path */}
            <path
              d="M 20 180 Q 120 120, 220 160 T 420 80 T 580 50 L 580 220 L 20 220 Z"
              fill="url(#chartGradient)"
            />

            {/* Line Graph path */}
            <path
              d="M 20 180 Q 120 120, 220 160 T 420 80 T 580 50"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Interactive/static circles at values points */}
            <circle cx="20" cy="180" r="5" fill="#12121a" stroke="#8B5CF6" strokeWidth="2.5" />
            <circle cx="120" cy="138" r="5" fill="#12121a" stroke="#8B5CF6" strokeWidth="2.5" />
            <circle cx="220" cy="160" r="5" fill="#12121a" stroke="#8B5CF6" strokeWidth="2.5" />
            <circle cx="320" cy="115" r="5" fill="#12121a" stroke="#8B5CF6" strokeWidth="2.5" />
            <circle cx="420" cy="80" r="5" fill="#12121a" stroke="#8B5CF6" strokeWidth="2.5" />
            <circle cx="580" cy="50" r="6" fill="#8B5CF6" stroke="#ffffff" strokeWidth="2.5" className="animate-ping" />
            <circle cx="580" cy="50" r="5" fill="#0d0d12" stroke="#8B5CF6" strokeWidth="2.5" />

            {/* Months labels */}
            <text x="20" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">12月</text>
            <text x="120" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">1月</text>
            <text x="220" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">2月</text>
            <text x="320" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">3月</text>
            <text x="420" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">4月</text>
            <text x="580" y="235" fill="#a78bfa" fontSize="10" fontFamily="monospace" textAnchor="end" fontWeight="bold">5月 (现今)</text>
          </svg>
        </div>

        {/* Values metrics footnotes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5 font-sans" id="indicators-list">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 block font-sans">研发设备并网率:</span>
            <span className="text-lg font-bold text-white block font-mono">82.3% <span className="text-emerald-400 text-xs font-semibold">↑ 4.2%</span></span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 block font-sans">合规协议全资质完成度:</span>
            <span className="text-lg font-bold text-white block font-mono">94.1% <span className="text-emerald-400 text-xs font-semibold">↑ 3.1%</span></span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 block font-sans">投融资匹配意愿指数:</span>
            <span className="text-lg font-bold text-white block font-mono">91/100</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 block font-sans">低空频域许可通过速度:</span>
            <span className="text-lg font-bold text-white block font-mono">T+2 H <span className="text-slate-500 text-xs font-normal">(全国前列)</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
