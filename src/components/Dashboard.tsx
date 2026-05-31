import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  ShieldCheck,
  ArrowRight,
  Handshake,
  Clock,
  Video,
  ExternalLink,
  Search,
  Bell,
  Settings,
  ArrowUpRight,
  Award,
  TrendingUp,
  Ticket,
  MapPin,
  CheckCircle,
  HelpCircle,
  Globe
} from 'lucide-react';
import { ActiveTab } from '../types';

interface DashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onBookExpert: (expertName: string) => void;
  onClaimTicket: (eventName: string) => void;
}

export default function Dashboard({ setActiveTab, onBookExpert, onClaimTicket }: DashboardProps) {
  const [scanning, setScanning] = useState(false);
  const [score, setScore] = useState(92);
  const [showNotification, setShowNotification] = useState(false);
  const [matchingSpeed, setMatchingSpeed] = useState(false);
  const [matchRate, setMatchRate] = useState(85);

  // Quick Action Trigger function for Compliance Scan
  const triggerComplianceScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScore(98);
      alert('「企业合规自检系统」在线扫描完成！您的最终合规评分提升至：98分。');
    }, 2000);
  };

  // Quick Action Trigger function for Element Matchmaking
  const triggerMatchmaking = () => {
    setMatchingSpeed(true);
    setTimeout(() => {
      setMatchingSpeed(false);
      setMatchRate(95);
      alert('「大盘智能多维要素配对系统精密重组」配算完毕！大宗供应链契合度已由 85% 跃升为 95%。系统已向 12 家特邀采购专席及横琴自贸片区支持渠道同步下发匹配备忘录。');
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="main-dashboard-view">
      {/* Upper Navigation Icons & Platform Title Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="dashboard-header">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            概览与导航
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            智能聚合核心公共服务，助推互联网企业高效发展与合规经营。
          </p>
        </div>

        {/* Action icons matched with lovable.dev sleek dark style */}
        <div className="flex items-center gap-3" id="header-action-panel">
          <div className="relative" id="dashboard-search-container">
            <input
              type="text"
              placeholder="搜索资助政策/合规项..."
              className="text-xs pl-8 pr-3 py-1.5 w-48 bg-[#0d0d12] border border-[#1e1e2d] text-slate-200 rounded-full focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all font-sans"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <button
            onClick={() => setShowNotification(!showNotification)}
            className="p-2 bg-[#0d0d12] hover:bg-[#12121a] border border-[#1e1e2d] text-slate-350 rounded-full relative cursor-pointer transition-colors"
            id="nav-bell"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="w-2 h-2 bg-violet-500 rounded-full absolute top-1 right-1 border border-[#0d0d12]" />
          </button>

          <button
            className="p-2 bg-[#0d0d12] hover:bg-[#12121a] border border-[#1e1e2d] text-slate-300 rounded-full cursor-pointer transition-colors"
            id="nav-settings"
            onClick={() => alert("系统配置已默认就绪（Lovable SaaS 配色面板已生效）。")}
          >
            <Settings className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </header>

      {/* Grid Canvas matching bento structures configured with futuristic style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dashboard-bento-grid">
        
        {/* Left Side Group (8 Columns for compliance, experts, training) */}
        <div className="lg:col-span-8 space-y-6 flex flex-col justify-between" id="bento-left-group">
          
          {/* Card 1: Supply & Demand Matching element */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl flex-1 flex flex-col justify-between relative shadow-sm lovable-glow-card p-6"
            id="bento-matching-card-large"
          >

            <div className="flex items-start justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Handshake className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                    供需对接与大宗要素配套中心
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono font-normal">Active Match</span>
                  </h3>
                  <p className="text-xs text-slate-400">大湾区数据供应链、微型频段天线、政策要素与投融资双向智能对接</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('matching')}
                className="text-xs bg-[#12121a] hover:bg-[#1a1a26] text-slate-300 font-medium px-2.5 py-1.5 rounded-lg border border-[#242435] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>供需大厅</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            </div>

            {/* Inner details dual-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-center z-10">
              {/* Left Column: Adaptive match Gauge */}
              <div className="flex flex-col items-center justify-center py-2 md:border-r border-[#1a1a24]/60 md:pr-6" id="matching-large-gauge">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#12121a"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="url(#indigoGlow)"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * matchRate) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="indigoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-white font-mono tracking-tighter bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">{matchRate}%</span>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider mt-0.5">产业契合度</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-400 font-sans">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> 需求对接
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" /> 物资并网
                  </span>
                </div>
              </div>

              {/* Right Column: Mini posts showcase */}
              <div className="space-y-3 px-2 flex flex-col justify-center" id="live-matching-recommendations">
                <span className="text-[10px] text-indigo-400 tracking-wider font-bold block uppercase mb-1 font-sans">
                  🎯 匹配推荐：最近的高匹配供求项
                </span>

                <div 
                  className="p-2.5 bg-[#09090e] hover:bg-[#12121e] border border-[#181824] rounded-xl transition-all cursor-pointer flex justify-between items-center group"
                  onClick={() => setActiveTab('matching')}
                >
                  <div className="overflow-hidden pr-2 flex items-center">
                    <span className="text-[9px] bg-red-500/10 text-red-555 text-red-400 border border-red-500/15 px-1.5 py-0.5 rounded mr-1.5 font-bold shrink-0">需求</span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">急购低空遥测天线 2000 套</span>
                  </div>
                  <span className="text-[10px] text-indigo-300 font-mono shrink-0">96% 匹配</span>
                </div>

                <div 
                  className="p-2.5 bg-[#09090e] hover:bg-[#12121e] border border-[#181824] rounded-xl transition-all cursor-pointer flex justify-between items-center group"
                  onClick={() => setActiveTab('matching')}
                >
                  <div className="overflow-hidden pr-2 flex items-center">
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 px-1.5 py-0.5 rounded mr-1.5 font-bold shrink-0">资金</span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">大湾区航电配套种子直投基金</span>
                  </div>
                  <span className="text-[10px] text-indigo-300 font-mono shrink-0">92% 匹配</span>
                </div>

                <div 
                  className="p-2.5 bg-[#09090e] hover:bg-[#12121e] border border-[#181824] rounded-xl transition-all cursor-pointer flex justify-between items-center group"
                  onClick={() => setActiveTab('matching')}
                >
                  <div className="overflow-hidden pr-2 flex items-center">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 px-1.5 py-0.5 rounded mr-1.5 font-bold shrink-0">服务</span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">一站式 GDPR 数据自测试用沙箱</span>
                  </div>
                  <span className="text-[10px] text-indigo-300 font-mono shrink-0">88% 匹配</span>
                </div>
              </div>
            </div>

            {/* Bottom Match Trigger button */}
            <button
              onClick={triggerMatchmaking}
              disabled={matchingSpeed}
              className="w-full text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl border border-indigo-500/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/15 z-10"
            >
              {matchingSpeed ? (
                <>
                  <Clock className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>多维要素撮合算法正在深度配算及重组供应链大盘链路中...</span>
                </>
              ) : (
                <>
                  <Handshake className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>一键智能算力要素与供求配套配对</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Bottom row in left column (Expert card & Course progress) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="dashboard-bottom-row-left">
            
            {/* Expert Card: Dr. Lin */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 flex flex-col justify-between lovable-glow-card relative"
              id="expert-dr-lin-card"
            >


              <div>
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                      alt="Dr. Lin Avatar"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-white block font-sans">Dr. Lin</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-slate-400 font-medium">当前在线</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#1a1a2e] border border-violet-500/20 text-violet-300 rounded-md px-2 py-0.5 font-mono">
                    智库首席推荐
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-3 font-sans leading-relaxed">
                  大湾区高新政策与 Agentic AI 决策架构专家，已协助多端完成 CDO 资质实战转型。
                </p>
              </div>

              <div className="mt-5 space-y-2 z-10">
                <button
                  onClick={() => onBookExpert('Dr. Lin')}
                  className="w-full text-xs text-white bg-violet-600/90 hover:bg-violet-600 border border-violet-500/25 py-2 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all shadow-xs"
                >
                  <Video className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>一键视频预约咨询</span>
                </button>
                <button
                  onClick={() => setActiveTab('experts')}
                  className="w-full text-center text-[10px] text-slate-400 hover:text-slate-200 transition-colors font-sans block"
                >
                  查看更多智库政策专家列表
                </button>
              </div>
            </motion.div>

            {/* Course Card: CDO Course */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-5 flex flex-col justify-between lovable-glow-card relative"
              id="course-progress-block"
            >


              <div>
                <span className="text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20 font-semibold px-2 py-0.5 rounded-full block w-max font-sans">
                  学习与认证
                </span>
                <h4 className="text-sm font-extrabold text-white mt-2.5 font-sans leading-snug">
                  Agentic AI 与 CDO 架构实战课程
                </h4>
                <p className="text-xs text-slate-400 mt-1">主办机构: 智服互联网产业研究院</p>

                {/* Simulated course progress match */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-mono">68% <span className="text-slate-400 font-normal">已完成</span></span>
                    <span className="text-slate-400 font-medium font-sans">剩 3 课时</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#12121a] rounded-full overflow-hidden border border-white/[0.03]">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('learning')}
                className="mt-5 w-full text-xs bg-[#12121e] hover:bg-[#1a1a2e] text-white border border-violet-500/20 font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer z-10"
              >
                <span>继续学习</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Side Group (4 Columns) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between" id="bento-right-group">

          {/* Card 2: Enterprise Compliance Service (Secondary Prominence Sidebar) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lovable-glow-card p-5 shadow-sm flex-1 flex flex-col justify-between relative"
            id="compliance-bento-card-sidebar"
          >


            <div>
              <div className="flex items-center justify-between z-10 w-full mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-400">
                    <ShieldCheck className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm font-extrabold text-white font-sans">企业合规服务</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-normal">Active Secure</span>
              </div>

              {/* Minimalist Gauge/Progress section */}
              <div className="my-4 bg-[#12121a] rounded-xl p-4 border border-[#1e1e2d] z-10 relative flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#09090e"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="url(#purpleGlowSidebar)"
                      strokeWidth="10"
                      strokeDasharray="263.8"
                      strokeDashoffset={263.8 - (263.8 * score) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="purpleGlowSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-sm font-black text-white font-mono">{score}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-sans">企业合规评分</span>
                  <span className="text-xs font-bold text-white block mt-0.5">
                    {score === 98 ? '高等级安全运行中' : '92分 (推荐优化)'}
                  </span>
                  <span className="text-[9px] text-slate-500 block font-sans mt-0.5">含大宗数据与GDPR法规评判</span>
                </div>
              </div>

              {/* Status checklist metrics inside sidebar */}
              <div className="space-y-2 mb-4 text-xs font-sans" id="sidebar-compliance-checklist">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#08080c] hover:bg-[#12121a] border border-white/[0.02]">
                  <span className="text-slate-400">数据主权自测</span>
                  <span className="text-emerald-400 font-bold font-mono">OK</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#08080c] hover:bg-[#12121a] border border-white/[0.02]">
                  <span className="text-slate-400">合规风险隐患</span>
                  <span className="text-emerald-400 font-bold font-mono">0 项待办</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-2 z-10 w-full">
              <button
                onClick={triggerComplianceScan}
                disabled={scanning}
                className="w-full text-xs text-white bg-violet-650/80 hover:bg-violet-600 border border-violet-500/20 py-2 rounded-xl font-semibold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                id="sidebar-scan-btn"
              >
                {scanning ? (
                  <>
                    <Clock className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>执行安全审计...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span>一键极速安全自检</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('compliance')}
                className="w-full text-xs text-slate-300 bg-[#12121a] hover:bg-[#1a1a2e] border border-[#242435] py-2 rounded-xl font-medium transition-colors cursor-pointer text-center block"
              >
                启动深度专家咨询
              </button>
            </div>
          </motion.div>

          {/* Card 3: Policy alerts with listing count */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lovable-glow-card p-5 shadow-sm flex flex-col justify-between relative"
            id="policy-dynamics-bento-card"
          >


            <div>
              <div className="flex items-center gap-2 mb-3 z-10">
                <Compass className="w-4 h-4 text-violet-400" />
                <h4 className="text-xs font-extrabold text-white font-sans">政策动态与智能测算</h4>
              </div>

              {/* Deadline Badge */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-300 font-sans">申报倒计时 : 3天</span>
                </div>
                <span className="text-[9px] bg-amber-500/20 text-amber-200 rounded px-1.5 font-mono">2个可申报专项</span>
              </div>

              {/* Bullet style matches policy listing */}
              <ul className="space-y-2.5 text-xs text-slate-400 font-sans z-10">
                <li className="flex items-start gap-1.5 hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('policy')}>
                  <span className="text-violet-500">•</span>
                  <span className="truncate">关于促进大湾区数字经济与实体双创...</span>
                </li>
                <li className="flex items-start gap-1.5 hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('policy')}>
                  <span className="text-violet-500">•</span>
                  <span className="truncate">中小企业智能化转型加计扣除专项行动计划</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('policy')}
              className="mt-4 text-xs text-center text-slate-400 hover:text-white transition-colors font-sans w-full inline-flex items-center justify-center gap-1 z-10"
            >
              <span>查看全部申报通告</span>
              <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
            </button>
          </motion.div>

          {/* Card 4: Satellite/cluster card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0b0c16] text-white border border-violet-500/30 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:bg-[#0f1024] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all cursor-pointer relative overflow-hidden"
            id="low-altitude-bento-card"
            onClick={() => setActiveTab('monitoring')}
          >


            <div className="z-10">
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                高度活跃 (92/100)
              </span>
              <h4 className="text-xs font-extrabold text-white mt-2 font-sans tracking-tight">
                低空经济与卫星互联网产业集群
              </h4>
            </div>
            <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0 ml-2 animate-bounce z-10" />
          </motion.div>

          {/* Card 5: Date Calendar Register & Global Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="bento-right-footer-double">
            {/* Calendar Item Column */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="p-4 shadow-sm flex flex-col justify-between lovable-glow-card relative"
              id="event-june-18"
            >


              <div className="flex items-start justify-between z-10">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium font-sans block">6月</span>
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tighter bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">18</span>
                </div>
                <span className="text-[9px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-1.5 py-0.5 rounded font-sans">
                  报名中
                </span>
              </div>
              
              <div className="my-2 text-[10px] text-slate-400 font-sans line-clamp-2 z-10 leading-relaxed">
                中小企业出海实操与大湾区智慧合规大讲堂
              </div>

              <button
                onClick={() => onClaimTicket('横琴大湾区出海沙龙')}
                className="w-full text-[10px] bg-[#12121a] hover:bg-[#1a1a2e] border border-[#242435] py-2 rounded-lg flex items-center justify-center gap-1 font-semibold text-slate-200 transition-colors z-10"
              >
                <Ticket className="w-3 h-3 text-slate-400" />
                <span>获取门票</span>
              </button>
            </motion.div>

            {/* Outbound Quick Card */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setActiveTab('global')}
              className="p-4 shadow-sm hover:border-violet-500/40 transition-all flex flex-col justify-between text-left cursor-pointer relative overflow-hidden group lovable-glow-card"
              id="dash-global-outbound-trigger"
            >


              <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-xl w-max group-hover:bg-violet-500/20 transition-colors z-10">
                <Globe className="w-4 h-4 text-violet-400" />
              </div>

              <div className="mt-4 z-10">
                <span className="text-xs font-extrabold text-white font-sans block leading-snug">出海服务</span>
                <span className="text-[9px] text-slate-400 mt-1 block">合规路线图和双边政策计算</span>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-slate-400 absolute right-4 top-4 group-hover:translate-x-1 group-hover:text-violet-400 transition-all z-10" />
            </motion.button>
          </div>

        </div>
      </div>
    </div>
  );
}
