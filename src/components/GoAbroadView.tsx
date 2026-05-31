import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Plane, Award, Compass, Calculator, Search, CheckSquare, Sparkles, Filter, CheckCircle, ChevronRight, DollarSign, HeartHandshake } from 'lucide-react';

export default function GoAbroadView() {
  const [targetRegion, setTargetRegion] = useState('sea'); // sea, eu, us
  const [complianceChecked, setComplianceChecked] = useState(false);
  const [exportSector, setExportSector] = useState('hardware');

  // Multi-country analysis guidelines
  const regionSpecs: Record<string, { title: string; desc: string; taxRate: string; conditions: string[]; licenses: string[] }> = {
    sea: {
      title: '东南亚自贸群落 (新加坡、印尼、越南)',
      desc: '互联网高新、微型载具出海主攻区。新加坡具有双边免征所得税及优渥的科技创投配套政策。',
      taxRate: '新加坡低至 17%, 中小企业前 3 年特免最高 75% 优惠额度',
      licenses: ['新加坡 IMDA 通信许可认定', '印尼 SDPPI 电信物理波段入网证'],
      conditions: [
        '在新加坡设立具有实际租赁合约的运营分部 (SPV)。',
        '知识产权及软著由母公司提供完备的不涉密授权备忘录。',
        '建立独立符合大湾区涉外数据过境标准的保密隔离节点。'
      ]
    },
    eu: {
      title: '欧洲统一市场 (德、法、意、荷等)',
      desc: '购买力核心产区，对数据保护合规及 APP 隐私采集条款 (GDPR) 具备极度苛刻的安全审查标准。',
      taxRate: '取决于设国，荷兰/爱尔兰对知识产权专利离岸收益给予最惠税率 (12.5% ~ 15%)',
      licenses: ['EU CE 强制认证天线资质', 'DPO 数据保护官备案机制证书'],
      conditions: [
        '必须强制在欧洲大陆设立持有 ISO27001 的私有云托管数据库。',
        'APP 收集隐私前，建立极具限制的“主动选勾”许可控制。',
        '与第三方分析、物流机构必须有严格的数据处理协议 (DPA) 条款签署。'
      ]
    },
    us: {
      title: '北美统一自贸商区 (美、加、墨)',
      desc: '科技龙头出海核心。准入壁垒包括严苛的联邦通信委员会 (FCC) 入网、国家海关反倾销审计及用户隐私约束。',
      taxRate: '美国联邦最高 21% + 属地州税 (特拉华州、内华达州享有离岸避税特例)',
      licenses: ['US FCC 射频物理频段认证证明', 'COPPA 针对低龄用户数字协议保障'],
      conditions: [
        '申请并取得中国口岸的出海大宗物资许可核算及知识产权自主出口报备书。',
        '用户隐私协议需要内嵌“禁止追踪并出售我的足迹信息 (Do Not Sell My Info / CCPA)”一键控制。'
      ]
    }
  };

  const handleComputeOutbound = (e: React.FormEvent) => {
    e.preventDefault();
    setComplianceChecked(true);
    alert('「智服海外出海测算模型」运行完毕。系统已结合您的企业合规得分（92分），为您设计了契合对应海关和 DPO 安全评估一站式资质准备报告。');
  };

  const cur = regionSpecs[targetRegion];

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="go-abroad-panel">
      {/* Header segment with custom theme picture */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-2 border-b border-[#14141d]/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            出海服务与跨境双向互通
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            大湾区企业行海外首选港湾。辅导企业完成 GDPR、CCPA 数据主权过境安全评估，测算离岸税率与双边补贴资质。
          </p>
        </div>


      </div>

      {/* Target selector row */}
      <div className="flex border-b border-[#1e1e2d] gap-6" id="outbound-region-selector">
        {[
          { id: 'sea', label: '东南亚自贸区 (SEA)' },
          { id: 'eu', label: '欧洲联盟大板块 (EU/GDPR)' },
          { id: 'us', label: '北美贸易板块 (US/FCC)' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setTargetRegion(item.id);
              setComplianceChecked(false);
            }}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              targetRegion === item.id ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Grid details structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="outbound-content-grid">
        {/* Left region specifications Details block */}
        <div className="lg:col-span-8 p-6 shadow-sm space-y-6 relative lovable-glow-card">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <span className="text-[10px] bg-violet-600 text-white font-bold px-2.5 py-0.5 rounded font-mono shadow-xs">
                目标市场细分
              </span>
              <h3 className="text-base font-extrabold text-white mt-3 font-sans">
                {cur.title}
              </h3>
            </div>
            <div className="bg-[#12121a] border border-[#1e1e2d] rounded-2xl p-3 max-w-max text-right">
              <span className="text-[9px] text-slate-500 block font-sans">企业离岸/贸易税率预估:</span>
              <span className="text-xs font-bold text-emerald-400 block mt-1 max-w-[200px] leading-snug">
                {cur.taxRate}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {cur.desc}
          </p>

          {/* Licenses checklist lists */}
          <div className="space-y-3">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">核心所需准入许可/认证书：</span>
            <div className="flex gap-2.5 flex-wrap">
              {cur.licenses.map((lic, index) => (
                <span
                  key={index}
                  className="text-xs bg-indigo-550/10 bg-indigo-950/20 border border-indigo-500/20 text-indigo-350 text-indigo-300 font-semibold px-3 py-1.5 rounded-xl block shadow-xs"
                >
                  {lic}
                </span>
              ))}
            </div>
          </div>

          {/* Core regulatory requirement check lists */}
          <div className="space-y-3 pt-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">必须满足的实体/数据合规门槛：</span>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              {cur.conditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-55 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right calculator module sidebar */}
        <div className="lg:col-span-4 bg-[#0c0c14] border border-[#1e1e2d] rounded-2xl p-6 shadow-sm flex flex-col justify-between" id="outbound-calculator-section">
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5 font-sans">
              <Calculator className="w-4.5 h-4.5 text-violet-500 animate-pulse" />
              出海资质测算计算器
            </h4>
            
            <form onSubmit={handleComputeOutbound} className="space-y-4 text-xs font-sans text-slate-300">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 block">出海主要产品/软件细分</label>
                <select
                  value={exportSector}
                  onChange={(e) => setExportSector(e.target.value)}
                  className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
                >
                  <option value="hardware">微型网联天线/5G物联网硬件</option>
                  <option value="software">多Agentic决策终端APP软件</option>
                  <option value="logistics">冷链跨境电商/中试物流量</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-bold py-2.5 rounded-xl cursor-pointer transition-all shadow-md shadow-violet-600/10"
              >
                智能一键对标测算
              </button>
            </form>

            {complianceChecked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-violet-600/10 rounded-xl border border-violet-500/20 text-[11px] text-slate-350 leading-relaxed font-sans"
              >
                <p className="font-bold flex items-center gap-1 mb-1 text-white">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-350 animate-spin" />
                  对标评估结论：通过率极高
                </p>
                根据您的合规得分（92 分），如果出口 {exportSector === 'hardware' ? '物联网实体天线' : '软件 AgentAPP'}，推荐首站挂照于「中国·横琴」，享有出口绿色极速退税政策，最快 T+1 天审核到账。已为您在备忘录中记录。
              </motion.div>
            )}
          </div>

          <div className="pt-4 border-t border-[#1e1e2d] text-[10px] text-slate-500 font-sans mt-4 flex items-center gap-1.5 select-none">
            <HeartHandshake className="w-4 h-4 text-violet-400/50" />
            <span>智服出海双边机制全程提供法律与口岸撮合保护。</span>
          </div>
        </div>
      </div>
    </div>
  );
}
