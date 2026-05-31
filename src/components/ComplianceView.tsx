import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertTriangle, CheckCircle, Search, HelpCircle, FileText, ChevronRight, Play, CheckSquare } from 'lucide-react';

export default function ComplianceView() {
  const [activeSegment, setActiveSegment] = useState<'scan' | 'checklist'>('scan');
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({
    a1: true,
    a2: false,
    a3: true,
    a4: false,
    a5: true,
  });

  const runDiagnosis = () => {
    setRunning(true);
    setLog([]);
    const logs = [
      '正在建立与企业端APP授权服务器的连接...',
      '正在检测个人数据收集模块中的隐私授权弹窗合规性...',
      '检测到当前APP并未在用户点击同意前写入 Cookie 节点。 (通过)',
      '正在核查服务端物理机托管商的 ISO 27001 证书有效性...',
      '正在比对欧盟 GDPR 及跨境传输安全评估协议合规指南...',
      '由于未检测到最新修改版的大陆个人信息出境安全风险评估，判定在【出海服务】合规方面存在中级风险。',
      '安全审计流核验完成。智服合规安全系统最终评分：94/100。'
    ];

    logs.forEach((item, index) => {
      setTimeout(() => {
        setLog((prev) => [...prev, item]);
        if (index === logs.length - 1) {
          setRunning(false);
        }
      }, (index + 1) * 600);
    });
  };

  const handleCheckboxChange = (key: string) => {
    setCheckedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="compliance-view-panel">
      {/* Header section with gradient */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-[#14141d]/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            企业合规服务
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            大湾区数字经济合规引擎，实时检测并保护您的敏感数据、隐私条款及商业漏洞。
          </p>
        </div>


      </div>

      {/* Mode Switches */}
      <div className="flex border-b border-[#1e1e2d] gap-6" id="compliance-toggle">
        <button
          onClick={() => setActiveSegment('scan')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSegment === 'scan' ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          全自动线上诊断
        </button>
        <button
          onClick={() => setActiveSegment('checklist')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSegment === 'checklist' ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          合规要项排查清单
        </button>
      </div>

      {activeSegment === 'scan' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="compliance-scan-content">
          {/* Main scanning triggers */}
          <div className="lg:col-span-8 p-6 shadow-sm space-y-6 lovable-glow-card relative">
            <h3 className="text-base font-bold text-white font-sans">
              数据隐私及跨境合规扫描仪
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              这里支持模拟一键调用本平台的线上检测引擎，在数秒后诊断您企业运营系统、公开协议条款及数据库的安全系数。
            </p>

            <div className="flex gap-4">
              <button
                onClick={runDiagnosis}
                disabled={running}
                className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 transition-all shadow-md shadow-violet-600/10"
              >
                <Play className="w-4 h-4 text-emerald-300 animate-pulse" />
                {running ? '正在分析企业数据库节点...' : '一键启动智能化系统扫描'}
              </button>
              <button
                onClick={() => alert('已预选开启对：APP数据存储库、官网隐私服务协议 的自动监测。')}
                className="text-xs font-medium text-slate-300 hover:bg-[#1c1c28] border border-[#242435] px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                配置扫描范围
              </button>
            </div>

            {/* Simulated Live Logging screen */}
            {(log.length > 0 || running) && (
              <div className="bg-[#0b0c16] text-slate-200 font-mono text-[11px] p-4 rounded-xl space-y-2 overflow-hidden border border-violet-500/20 shadow-inner">
                <p className="text-slate-500 border-b border-[#1e1e2d] pb-2 mb-2 flex items-center justify-between">
                  <span>LOGGING ENGINE ACTIVE - SHIELD PROTOCOL V1.2.9</span>
                  <span className="animate-pulse text-violet-400 block h-2 w-2 rounded-full bg-violet-400" />
                </p>
                {log.map((item, index) => (
                  <p key={index} className="transition-all leading-normal">
                    <span className="text-violet-400 mr-2">&gt;</span>
                    {item}
                  </p>
                ))}
                {running && (
                  <div className="flex items-center gap-1.5 text-slate-500 animate-pulse mt-2">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
                    <span>智服合规核心正在处理中...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right quick fact / guidance with Technology Image configured */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between" id="compliance-scan-right">
            <div className="p-6 shadow-sm space-y-4 lovable-glow-card flex-1">
              <h4 className="text-sm font-extrabold text-white font-sans flex items-center gap-2">
                当前热点法规关注速报
              </h4>
              <div className="space-y-4">
                <div className="flex gap-3 p-3 bg-red-500/10 text-red-200 rounded-xl border border-red-500/20">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <div className="text-xs">
                    <p className="font-bold">欧盟数据保护(GDPR)新修订</p>
                    <p className="text-slate-400 mt-1">针对向非欧盟地区多端中转，必须在 2026 年底前重构第三方主体委托书。</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 bg-violet-500/10 text-violet-200 rounded-xl border border-violet-500/20">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-violet-400" />
                  <div className="text-xs">
                    <p className="font-bold">大湾区数据双创资质一站互通</p>
                    <p className="text-slate-400 mt-1">已在横琴与部分自贸片区对等试点高新资质自动认账互免，最长免除 3 年检测。</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      ) : (
        <div className="p-6 shadow-sm space-y-6 lovable-glow-card" id="compliance-checklist-content">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#1e1e2d] gap-4">
            <div>
              <h3 className="text-base font-bold text-white font-sans">合规核查要项对照清单</h3>
              <p className="text-xs text-slate-400 mt-1">自主勾选以下各项，完成度将直接影响您的 AI 评估分值。</p>
            </div>
            {/* Tech tag */}
            <span className="text-[10px] text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded px-2.5 py-1 font-mono shrink-0 font-semibold self-start md:self-auto">
              标准编号: CAC-2026-REG
            </span>
          </div>

          <div className="space-y-4" id="checklist-item-list">
            {[
              { key: 'a1', label: '对用户敏感个人信息采取了“最小必要且告知明示”的数据收集细则规范。', desc: '避免过度读取通讯录、位置等无关联数据。' },
              { key: 'a2', label: '制定并向员工签署了清晰的信息安全守则及数据物理安全存储协议。', desc: '防范内部及离职员工敏感数据无意识外溢。' },
              { key: 'a3', label: '完成了 APP 及官方网页的隐私条款制定并在显著页面展示。', desc: '中国信通院和属地网信办合规重点抽样检查项目。' },
              { key: 'a4', label: '为对外开展跨境商务的数据交互准备了合法主体协议框架。', desc: '防范因未申请个人数据出境自检而造成的涉外合规隐患。' },
              { key: 'a5', label: '定期对服务器物理硬盘和云硬盘进行了标准加密隔离。', desc: '避免由于突发漏洞爆破导致的泄露风险。' },
            ].map((item) => (
              <label
                key={item.key}
                id={`checklist-lbl-${item.key}`}
                className="flex items-start gap-3 p-3.5 hover:bg-[#12121a]/30 border border-[#1e1e2d] rounded-xl cursor-pointer transition-all block"
              >
                <input
                  type="checkbox"
                  checked={checkedAnswers[item.key]}
                  onChange={() => handleCheckboxChange(item.key)}
                  className="mt-1 accent-violet-600 cursor-pointer w-4 h-4"
                />
                <div>
                  <span className="text-xs font-bold text-slate-200">{item.label}</span>
                  <span className="block text-[10px] text-slate-500 mt-1 font-sans">{item.desc}</span>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={() => {
              const allCheckedCount = Object.values(checkedAnswers).filter(Boolean).length;
              alert(`您目前完成了：${allCheckedCount} / 5 项自查。智能合规专家已将该结果自动同步您的概览大盘系统。`);
            }}
            className="text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md shadow-violet-600/10"
          >
            同步自查统计结果
          </button>
        </div>
      )}
    </div>
  );
}
