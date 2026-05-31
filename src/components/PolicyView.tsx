import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, Calculator, Search, CheckSquare, Sparkles, Filter, CheckCircle, ChevronRight, DollarSign, HelpCircle } from 'lucide-react';
import { Policy } from '../types';

export default function PolicyView() {
  const [activeSegment, setActiveSegment] = useState<'directory' | 'calculator'>('directory');
  const [policies] = useState<Policy[]>([
    {
      id: 'pol-1',
      title: '大湾区智能低空经济与网联卫星物联全产业链成长补贴行动条令',
      department: '广东省发展改革和数据管理局',
      publishDate: '2026-05-12',
      dueDate: '2026-06-15',
      level: '省级',
      category: '资金扶持',
      summary: '针对注册于横琴、宝安、南山等关键集群内，自主研发空空互联、空地物联收发天线、低能耗物联设备的企业，提供最高 200 万元无偿成长研发补贴。',
      subsidyEstimate: '50万 ~ 200万元',
      conditions: [
        '主营方向包含低空测控、网联载具、遥天线及自主可控航电研发。',
        '企业在粤港澳大湾区具有实际本地缴税与中试存储车间。',
        '近两年度研发支出占总流水比例不低于 6%。'
      ]
    },
    {
      id: 'pol-2',
      title: '关于前沿人工智能与 Agent 解决方案研发投入加计扣除专项税务通知',
      department: '国家税务总局大湾区自贸片区稽查局',
      publishDate: '2026-04-20',
      dueDate: '2026-12-31',
      level: '国家级',
      category: '税收优惠',
      summary: '落实对从事 Agentic AI、大模型流式诊断、AI代理集成等多模态科技自主创新的高新公司，符合标准的合规所得研发费用，给予 100% ~ 200% 的加计扣除支持。',
      subsidyEstimate: '按研发总投入折算最高扣减 20% 所得税',
      conditions: [
        '企业自主设计并取得了该模型应用软件著作权或实质核验资质。',
        '未列入严重的数安不良信誉或隐私泄露风险监控日志。',
        '核心科技及CDO转型开发团队不低于全体规模的 10%。'
      ]
    },
    {
      id: 'pol-3',
      title: '横琴中试及数字新产业首批领军与CDO、Agentic架构英才引荐绿卡细则',
      department: '横琴粤澳深度合作区执行委员会人才局',
      publishDate: '2026-05-01',
      dueDate: '2026-08-30',
      level: '市级',
      category: '人才引进',
      summary: '面向全球重点招揽从事多Agent决策链、CDO商业战略运营的大拿。持本绿卡可在横琴当地享受最高 15% 所得税减免、免审免予物理落户并直接奖励领头人现金。',
      subsidyEstimate: '高管名额免试最高 15 万安家费/人',
      conditions: [
        '核心成员需具有相关国际组织、博士学位、或者获得本平台高级系统证书。',
        '在合作区参保或已签署有效在职承租合作协议不低于 1 年。'
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Calculator inputs
  const [calcIndustry, setCalcIndustry] = useState('tech');
  const [calcRevenue, setCalcRevenue] = useState(1500); // in ten thousand (i.e., 15 million CNY)
  const [calcStaff, setCalcStaff] = useState(45);
  const [calcRation, setCalcRation] = useState(12); // R&D expenses ratio %
  const [resultChecked, setResultChecked] = useState(false);
  const [simulatedGrant, setSimulatedGrant] = useState('0');
  const [matchedCount, setMatchedCount] = useState(0);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResultChecked(true);

    let baseGrant = 0;
    let count = 0;

    if (calcIndustry === 'tech' || calcIndustry === 'telecom') {
      baseGrant += 30; // 30万
      count += 1;
      if (calcRation >= 8) {
        baseGrant += 40;
        count += 1;
      }
      if (calcRevenue > 1000) {
        baseGrant += 50;
      }
    } else {
      baseGrant = 10;
      count = 1;
    }

    setSimulatedGrant(`${baseGrant}万 ~ ${baseGrant + 50}万元`);
    setMatchedCount(count === 0 ? 1 : count);
  };

  const filteredPolicies = policies.filter((p) => {
    const matchesSearch = p.title.includes(searchQuery) || p.summary.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="policy-view-panel">
      {/* Upper header segment */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-2 border-b border-[#14141d]/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            智能政策导航与测算
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            打通粤港澳政策、资金、加计扣除一站式认定壁垒。首创 AI 政策计算器，估算政策扶持力度及补贴总金。
          </p>
        </div>


      </div>

      {/* Mode Switches */}
      <div className="flex border-b border-[#1e1e2d] gap-6" id="policy-toggle">
        <button
          onClick={() => setActiveSegment('directory')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSegment === 'directory' ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          政策公告目录
        </button>
        <button
          onClick={() => setActiveSegment('calculator')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSegment === 'calculator' ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          企业红包扶持在线测算
        </button>
      </div>

      {activeSegment === 'directory' ? (
        <div className="space-y-6" id="policy-directory-section">
          {/* Filters controls row */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center" id="policy-filters">
            <div className="relative w-full md:w-80" id="policy-search-box">
              <input
                type="text"
                placeholder="键入关键词：如‘低空’、‘加计扣除’"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2.5 bg-[#12121a] border border-[#1e1e2d] text-white rounded-xl outline-none focus:border-violet-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex gap-2 flex-wrap items-center" id="tag-filters">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5 text-violet-400 animate-pulse" />分类过滤:
              </span>
              {['all', '资金扶持', '税收优惠', '人才引进'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] px-3 py-1.5 rounded-full border transition-all cursor-pointer font-bold ${
                    selectedCategory === cat
                      ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/15'
                      : 'bg-[#12121a] text-slate-400 border-[#1e1e2d] hover:bg-[#1a1a26]'
                  }`}
                >
                  {cat === 'all' ? '全部' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* List display */}
          <div className="space-y-6" id="policy-list-stack">
            {filteredPolicies.map((pol) => (
              <motion.div
                key={pol.id}
                id={`pol-${pol.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-6 shadow-sm relative lovable-glow-card"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-violet-600 text-white font-bold px-2 py-0.5 rounded font-sans border border-violet-500/20 shadow-xs">
                        {pol.level}
                      </span>
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-semibold font-sans">
                        {pol.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-sans">
                        发布机关：{pol.department}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white font-sans tracking-tight pt-1">
                      {pol.title}
                    </h3>
                  </div>

                  {/* Estimation Card side */}
                  <div className="bg-[#12121a] border border-[#1e1e2d] rounded-xl p-3 text-right max-w-max shrink-0 md:-mt-2">
                    <span className="text-[9px] text-slate-500 block font-sans">预计资助区间/优惠:</span>
                    <span className="text-xs font-extrabold text-emerald-400 font-sans block mt-1 flex items-center justify-end gap-1">
                      <DollarSign className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                      {pol.subsidyEstimate}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-450 text-slate-400 leading-relaxed font-sans my-4 border-b border-dashed border-[#1e1e2d] pb-4">
                  {pol.summary}
                </p>

                {/* Scope eligibility checklist criteria */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">企业核心参报资格:</span>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
                    {pol.conditions.map((cond, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#1e1e2d] text-[10px] text-slate-500">
                  <span>申报截止：{pol.dueDate} (仅剩少天)</span>
                  <button
                    onClick={() => alert(`已为您的项目锁定申报绿色入口。目前智服AI将结合您的数据库自动起草初版申报书并生成。`)}
                    className="text-xs font-bold text-violet-400 hover:text-violet-350 bg-[#12121e]/50 border border-violet-500/10 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <span>智能一键代报</span>
                    <ChevronRight className="w-3.5 h-3.5 text-violet-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="policy-calculator-section">
          {/* Calculator Inputs Column */}
          <div className="lg:col-span-7 bg-[#0d0d12] border border-[#1e1e2d] rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <Calculator className="w-5 h-5 text-violet-500 animate-pulse" />
              企业条件登记表
            </h3>

            <form onSubmit={handleCalculate} className="space-y-4 text-xs font-sans text-slate-300">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 block">主导产业及研发细分</label>
                <select
                  value={calcIndustry}
                  onChange={(e) => setCalcIndustry(e.target.value)}
                  className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
                >
                  <option value="tech">高新技术 / 低空卫星物联 / 前沿AI</option>
                  <option value="ecommerce">基础电子商务 / 大宗文创</option>
                  <option value="manufacturing">实体智造外包 / 物流网点</option>
                  <option value="telecom">通信天线研发及双创</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 block">年度营收总体规模 (万元)</label>
                <input
                  type="number"
                  value={calcRevenue}
                  onChange={(e) => setCalcRevenue(Number(e.target.value))}
                  placeholder="请输入万元数"
                  className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 block">核心研发/运营团队职工人数 (人)</label>
                <input
                  type="number"
                  value={calcStaff}
                  onChange={(e) => setCalcStaff(Number(e.target.value))}
                  placeholder="45"
                  className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 block">近两年研发开支预算占比 %</label>
                <input
                  type="number"
                  max="100"
                  value={calcRation}
                  onChange={(e) => setCalcRation(Number(e.target.value))}
                  placeholder="根据平台数据测算企业比例"
                  className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
                />
              </div>

              <button
                type="submit"
                className="w-full text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-bold py-3 rounded-xl cursor-pointer transition-all shadow-md shadow-violet-600/10"
              >
                立即开始智能红利测算
              </button>
            </form>
          </div>

          {/* Calculator Output side */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="calculator-results">
            {resultChecked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0d0d12] border border-[#1e1e2d] rounded-2xl p-6 shadow-sm space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-violet-400">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
                    <span className="text-sm font-bold">测算完成！评估意见书</span>
                  </div>

                  <div className="my-6 p-4 bg-violet-600/10 rounded-2xl border border-violet-500/20 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase font-sans">预计最高可申报总津贴：</span>
                    <span className="text-2xl font-black text-amber-300 font-sans block mt-1.5">
                      {simulatedGrant}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300 font-sans">
                    <p className="font-bold text-slate-200 border-b border-[#1e1e2d] pb-2 flex justify-between">
                      <span>已命中可申报条款:</span>
                      <span className="text-violet-400 font-mono font-bold">命中 {matchedCount} 项</span>
                    </p>
                    <p className="leading-relaxed text-[11px] text-slate-400">
                      根据您提供的财务数据与研发支出占比（{calcRation}%），匹配了包括「粤港澳大湾区微型遥天线及低空重点项目」与「创新产业加计扣除专项行动计划」在内的多档重点政府资助。建议配合本平台的「一键代报」系统补充项目说明。
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => alert('申报初稿已经自动生成在文档缓存区，请咨询 Dr. Lin 专家核查！')}
                  className="w-full text-xs bg-[#12121a] hover:bg-[#1a1a2e] border border-[#242435] font-bold py-2.5 rounded-xl cursor-pointer text-center text-slate-300 mt-4 block transition-colors"
                >
                  生成最终版申报书草案
                </button>
              </motion.div>
            ) : (
              <div className="bg-[#0c0c14] border border-dashed border-[#1e1e2d] rounded-2xl p-6 flex flex-col items-center justify-center text-center flex-1 h-full py-20">
                <HelpCircle className="w-10 h-10 text-slate-650 text-slate-500 mb-3 animate-pulse" />
                <h4 className="text-xs font-bold text-slate-400">等待信息录入测算</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
                  在左边输入企业的财务、研发规模等基本情况后，系统将自动比对政策条件库。
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
