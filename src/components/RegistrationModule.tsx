import React, { useState, useRef } from 'react';
import { 
  Building2, 
  UserCheck, 
  UploadCloud, 
  KeyRound, 
  Check, 
  ArrowRight, 
  Loader2, 
  FileText, 
  ShieldAlert, 
  Fingerprint, 
  ClipboardCheck, 
  Users
} from 'lucide-react';

interface RegistrationModuleProps {
  onNotify?: (msg: string) => void;
}

export default function RegistrationModule({ onNotify }: RegistrationModuleProps) {
  const [subSegment, setSubSegment] = useState<'org' | 'expert'>('org');

  // Org registration state
  const [orgType, setOrgType] = useState('低空智网与卫星通信');
  const [creditCode, setCreditCode] = useState('');
  const [orgName, setOrgName] = useState('');
  const [legalRep, setLegalRep] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // OCR states
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrFileProgress, setOcrFileProgress] = useState<string[]>([]);
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [ocrFilename, setOcrFilename] = useState('');
  
  // Submit animation
  const [submittingOrg, setSubmittingOrg] = useState(false);
  const [orgSteps, setOrgSteps] = useState<string[]>([]);
  const [orgSuccess, setOrgSuccess] = useState(false);

  // Expert registration state
  const [inviteCode, setInviteCode] = useState('');
  const [inviteVerified, setInviteVerified] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  
  // Expert profile states
  const [expertName, setExpertName] = useState('');
  const [expertId, setExpertId] = useState('');
  const [expertTitle, setExpertTitle] = useState('');
  const [expertTags, setExpertTags] = useState<string[]>([]);
  const [expertEmail, setExpertEmail] = useState('');
  const [expertBio, setExpertBio] = useState('');
  const [submittingExpert, setSubmittingExpert] = useState(false);
  const [expertSuccess, setExpertSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available tag templates for experts
  const availableTags = [
    '《数据安全法》合规',
    '低空航权空域评估',
    '跨境数字贸易防线',
    'GDPR合规与反垄断',
    '供应链金融风控',
    '生成式AI治理机制'
  ];

  // OCR simulation for Business License
  const handleLicenseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOcrScanning(true);
    setOcrFilename(file.name);
    setOcrFileProgress([]);
    setLicenseUploaded(false);

    const stages = [
      '⚡ 启动可信数据链分析端口...',
      '🔍 捕获并核实营业执照关键锚点印章...',
      '📋 正在利用大数据 OCR 反洗钱/信誉风险甄选...',
      '✅ 成功提取统一社会信用代码: 91440101MA59XF888B',
      '✅ 成功匹配企业名称: 大湾区低空智联科技有限公司',
      '✅ 成功提取法人代表: 林华'
    ];

    stages.forEach((msg, index) => {
      setTimeout(() => {
        setOcrFileProgress((prev) => [...prev, msg]);
        if (index === stages.length - 1) {
          setOcrScanning(false);
          setLicenseUploaded(true);
          // Auto fill fields
          setCreditCode('91440101MA59XF888B');
          setOrgName('大湾区低空智联科技有限公司');
          setLegalRep('林华');
          if (onNotify) {
            onNotify('✨ OCR营业执照自动填表完成！统一社会信用代码已核验并录入。');
          }
        }
      }, (index + 1) * 700);
    });
  };

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditCode || !orgName || !legalRep || !agreeTerms) {
      alert('请确保已填写企业信用代码、单位名称、法定代表人且同意合规准则。');
      return;
    }

    setSubmittingOrg(true);
    setOrgSteps([]);

    const steps = [
      '📡 正在将注册包挂接并提交至大盘密传系统审计通道...',
      '🕵️ 校验社会法人代码与属地工商局注册网联动真实性...',
      '🛡️ 自动加载合规沙盒出港证书对等安全信宿测试...',
      '📊 记录该单位评级数据与项目库模型关联...',
      '🎉 单位注册成功！合规评分已重构加入智慧大盘。'
    ];

    steps.forEach((msg, index) => {
      setTimeout(() => {
        setOrgSteps((prev) => [...prev, msg]);
        if (index === steps.length - 1) {
          setSubmittingOrg(false);
          setOrgSuccess(true);
          if (onNotify) {
            onNotify('🎉 恭喜！林华所属单位「大湾区低空智联科技有限公司」注册审核成功，已锁定项目库。');
          }
        }
      }, (index + 1) * 800);
    });
  };

  // Expert invitation code verification
  const verifyInvitationCode = () => {
    if (!inviteCode.trim()) {
      alert('请输入邀请码。');
      return;
    }

    setVerifyingCode(true);
    setTimeout(() => {
      setVerifyingCode(false);
      const code = inviteCode.trim().toUpperCase();
      if (code === 'EXP-8888' || code === 'EXP-2026' || code === 'CDO-2026') {
        setInviteVerified(true);
        if (onNotify) {
          onNotify(`🔑 验证通过！尊贵专属特邀码 [${code}] 已匹配，专家智库提交功能解锁。`);
        }
      } else {
        alert('邀请码校验失败。为保证智库合规质量，请向智服合规委员会或大湾区互联网智慧工作组申请专属特邀码（测试可用：EXP-8888）。');
      }
    }, 1000);
  };

  const handleTagToggle = (tag: string) => {
    setExpertTags((prev) => 
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertName || !expertTitle) {
      alert('请输入专家姓名及学术称谓/职称。');
      return;
    }

    setSubmittingExpert(true);
    setTimeout(() => {
      setSubmittingExpert(false);
      setExpertSuccess(true);
      if (onNotify) {
        onNotify(`🧠 特邀专家「${expertName}」正式录入。平台首席智力连接就绪！`);
      }
    }, 1800);
  };

  const resetAll = () => {
    // reset org
    setCreditCode('');
    setOrgName('');
    setLegalRep('');
    setContactNum('');
    setAgreeTerms(false);
    setLicenseUploaded(false);
    setOcrFilename('');
    setOrgSuccess(false);
    setOrgSteps([]);
    
    // reset expert
    setInviteCode('');
    setInviteVerified(false);
    setExpertName('');
    setExpertId('');
    setExpertTitle('');
    setExpertTags([]);
    setExpertEmail('');
    setExpertBio('');
    setExpertSuccess(false);
  };

  return (
    <div className="p-6 shadow-sm lovable-glow-card relative border border-white/[0.07] bg-bg-card rounded-xl" id="registration-onboarding-panel">
      
      {/* Small badge top right */}
      <span className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-violet-400 bg-violet-600/10 px-2 py-0.5 rounded border border-violet-500/15 uppercase font-semibold">
        Secure Auth Port 3000
      </span>

      {/* Main title */}
      <div className="mb-6 text-left" id="reg-header-titles">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 font-sans">
          <Fingerprint className="w-4 h-4 text-violet-400" />
          单位注册 / 专家邀请注册
        </h3>
        <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
          双轨合规准入机制。实体单位凭借信用代码、营业执照进行注册审查；学术专家须进行单向邀请码认证保护智库纯洁度。
        </p>
      </div>

      {/* Sub Navigation */}
      <div className="flex bg-[#12121a]/60 p-1 rounded-lg border border-white/[0.04] mb-6" id="reg-sub-toggle">
        <button
          type="button"
          onClick={() => { setSubSegment('org'); resetAll(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
            subSegment === 'org' 
              ? 'bg-[#19192a] text-white border border-white/[0.07] shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          单位注册 (营业执照 + 社会信用代码)
        </button>
        <button
          type="button"
          onClick={() => { setSubSegment('expert'); resetAll(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
            subSegment === 'expert'
              ? 'bg-[#19192a] text-white border border-white/[0.07] shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          专家特邀入驻 (专属邀请码校验)
        </button>
      </div>

      {/* ────────────────── SUB-SEGMENT: ORG ────────────────── */}
      {subSegment === 'org' && (
        <div id="org-registration-form-wrap">
          {!orgSuccess ? (
            <form onSubmit={handleOrgSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* File OCR Column */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div className="text-left">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                      上传工商营业执照（智能 OCR 填表）
                    </label>
                    <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
                      支持拖拽上传 PDF、JPEG。自动抓取识别企业信用代码，省去填表繁琐。
                    </p>
                  </div>

                  {/* Drop zone */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex-1 border border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[140px] transition-all hover:border-violet-500/50 hover:bg-[#24243a]/20 ${
                      ocrScanning 
                        ? 'border-violet-500 bg-[#12121a] animate-pulse pointer-events-none' 
                        : licenseUploaded 
                          ? 'border-emerald-500/50 bg-[#10b981]/5' 
                          : 'border-white/[0.08] bg-[#14141f]'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleLicenseFileChange}
                      accept="image/*,.pdf" 
                      className="hidden" 
                    />

                    {ocrScanning ? (
                      <div className="space-y-2">
                        <Loader2 className="w-8 h-8 text-violet-400 animate-spin mx-auto animate-duration-1000" />
                        <span className="text-[11px] text-violet-300 block font-mono">
                          OCR 智能数据提取中...
                        </span>
                      </div>
                    ) : licenseUploaded ? (
                      <div className="space-y-2 text-center">
                        <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/25">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-emerald-400 block truncate max-w-[200px]">
                          {ocrFilename || 'license.png'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          识别度 99.8% 双级比定完成
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <UploadCloud className="w-7 h-7 text-slate-400 mx-auto" />
                        <span className="text-xs text-slate-300 block">
                          点击或拖动拖拽文件至此
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          最高限制 15MB 影像
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Simulated scanning details */}
                  {ocrFileProgress.length > 0 && (
                    <div className="bg-[#0b0c16]/80 text-[10px] text-left p-3 rounded-lg border border-violet-500/10 font-mono space-y-1 overflow-hidden h-[90px] overflow-y-auto">
                      {ocrFileProgress.map((prog, index) => (
                        <p key={index} className="text-violet-400 select-none">
                          {prog}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Inputs Column */}
                <div className="space-y-3.5 text-left">
                  {/* Credit code */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                      统一社会信用代码 (18位)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={18}
                        value={creditCode}
                        onChange={(e) => setCreditCode(e.target.value)}
                        placeholder="请输入或以上传营业执照读取"
                        className="w-full bg-[#1a1a2c] text-white placeholder-slate-500 border border-white/10 rounded-lg py-2 px-3 text-xs outline-none focus:border-violet-500/50"
                      />
                      {licenseUploaded && (
                        <span className="absolute right-3 top-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Org name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                      单位注册全称
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="须与工商局登记名称完全一致"
                      className="w-full bg-[#1a1a2c] text-white placeholder-slate-500 border border-white/10 rounded-lg py-2 px-3 text-xs outline-none focus:border-violet-500/50"
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                      拟申报及对等主业板块
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full bg-[#1a1a2c] text-white border border-white/10 rounded-lg py-2 px-2 text-xs outline-none focus:border-violet-500/50"
                    >
                      <option value="低空智网与卫星通信">低空遥感 / 导航天线 / 卫星互联网</option>
                      <option value="AI+高级智能制造">AI大机理 / 工业机器人数字化</option>
                      <option value="跨境贸易与跨境数据安全">跨境出口贸易 / GDPR双边互通</option>
                      <option value="供应链金融科技">供应链金融与数字资方撮合</option>
                      <option value="通用互联网公共服务">应用系统 / 医疗大数据 / 其他</option>
                    </select>
                  </div>

                  {/* Legal rep & contact info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                        法定代表人
                      </label>
                      <input
                        type="text"
                        value={legalRep}
                        onChange={(e) => setLegalRep(e.target.value)}
                        placeholder="法人姓名"
                        className="w-full bg-[#1a1a2c] text-white placeholder-slate-500 border border-white/10 rounded-lg py-2 px-3 text-xs outline-none "
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                        联系人手机号
                      </label>
                      <input
                        type="text"
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                        placeholder="接收审核动态"
                        className="w-full bg-[#1a1a2c] text-white placeholder-slate-500 border border-white/10 rounded-lg py-2 px-3 text-xs outline-none "
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Terms checklist */}
              <div className="pt-2 text-left">
                <label className="flex items-start gap-2.5 p-3.5 bg-[#12121a]/80 border border-white/[0.04] rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 accent-violet-600 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-[10.5px] leading-relaxed text-slate-400">
                    <span className="font-bold text-slate-300 block mb-0.5">同意并签署《企业数据合规信誉共同体暨政策要素公约》</span>
                    平台保证本处采集信息完全在双向私隐通道隔离（遵守 CAC 规范与 AES256 密算）。如有提供虚假社会信用代码或编造法定代表行为，平台将锁死当前物理节点申报权限。
                  </div>
                </label>
              </div>

              {/* Logging Stepper */}
              {orgSteps.length > 0 && (
                <div className="bg-[#0b0c16] text-[10.5px] text-left p-4 rounded-xl border border-violet-500/20 font-mono space-y-2 overflow-hidden shadow-inner">
                  <p className="text-slate-500 border-b border-[#1e1e2d] pb-1 flex items-center justify-between font-sans">
                    <span>⚙️ 平台工商联动核对中心 (ACTIVE)</span>
                  </p>
                  {orgSteps.map((step, index) => (
                    <p key={index} className="transition-all text-slate-300 leading-normal">
                      <span className="text-violet-400 mr-2">&gt;&gt;</span>
                      {step}
                    </p>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  重置清空
                </button>
                <button
                  type="submit"
                  disabled={submittingOrg || !agreeTerms}
                  className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-5 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 transition-all shadow-md shadow-violet-600/10 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submittingOrg ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>国家智算接口深度比对中...</span>
                    </>
                  ) : (
                    <>
                      <span>提交工商数据链核查</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success splash for Org */
            <div className="bg-[#10b981]/5 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4" id="org-reg-success-splash">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full mx-auto flex items-center justify-center text-[22px] text-emerald-400">
                ✓
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-extrabold text-white">「大湾区低空智联科技有限公司」注册成功</h4>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  企业身份凭据统一核验通过。已成功并网平台政策核心要素库，由于信用卓越，您获得了对等信用评分 <strong className="text-emerald-400 text-sm">96/100</strong> 项加分资质，出海服务和供需撮合沙盒通道已全量无阻接入。
                </p>
              </div>
              <button
                type="button"
                onClick={resetAll}
                className="mx-auto text-xs font-bold text-slate-300 bg-bg-card hover:bg-bg-hover border border-white/10 px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                再进行一次注册 / 切换账号
              </button>
            </div>
          )}
        </div>
      )}

      {/* ────────────────── SUB-SEGMENT: EXPERT ────────────────── */}
      {subSegment === 'expert' && (
        <div id="expert-invited-onboarding-wrap">
          {!inviteVerified ? (
            /* Verification Screen */
            <div className="space-y-5 text-left py-4" id="expert-verification-screen">
              <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 flex gap-3 text-[11px] text-amber-200">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div className="space-y-1 leading-relaxed">
                  <p className="font-bold">智库单向邀请审查守则</p>
                  <p className="text-slate-400">
                    为防止学术伪造及服务虚高，专家入库由工作组成员及平台院士实行双边“邀请制”。如果您尚未持有邀请码，请向主管部门申领注册邀约。
                  </p>
                </div>
              </div>

              <div className="max-w-md space-y-3">
                <label className="block text-[11px] font-bold text-slate-300">
                  输入专属专家注册邀请码
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="EXP-XXXXXX (推荐测试码: EXP-8888)"
                      className="w-full bg-[#1a1a2c] text-white placeholder-slate-500 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-xs outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={verifyInvitationCode}
                    disabled={verifyingCode || !inviteCode.trim()}
                    className="text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg cursor-pointer transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    {verifyingCode ? (
                      <>
                        <Loader2 className="w-3 animate-spin" />
                        <span>校对中...</span>
                      </>
                    ) : (
                      <span>确定验证</span>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  💡 输入测试推荐邀请码 EXP-8888 或 EXP-2026 即可解锁完整专家智理录入表单。
                </p>
              </div>
            </div>
          ) : !expertSuccess ? (
            /* Registration profiling Form */
            <form onSubmit={handleExpertSubmit} className="space-y-4 text-left">
              <div className="bg-violet-600/10 border border-violet-550/20 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-[11px] text-violet-300 font-bold">
                    邀请码验证通过！获取学术特遣授权
                  </span>
                </div>
                <span className="text-[10px] bg-violet-500/10 text-violet-400 font-mono font-medium border border-violet-500/20 px-2 py-0.5 rounded">
                  {inviteCode.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inputs Left */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                      专家学者姓名
                    </label>
                    <input
                      type="text"
                      required
                      value={expertName}
                      onChange={(e) => setExpertName(e.target.value)}
                      placeholder="请输入学名或业内通用呼号"
                      className="w-full bg-[#1a1a2c] text-white border border-white/10 rounded-lg py-2 px-3 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                      社会公开头衔 / 学术及业界职称
                    </label>
                    <input
                      type="text"
                      required
                      value={expertTitle}
                      onChange={(e) => setExpertTitle(e.target.value)}
                      placeholder="e.g. 智服研究院核心理事 / CDO 事务高级法律事务官"
                      className="w-full bg-[#1a1a2c] text-white border border-white/10 rounded-lg py-2 px-3 text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                        身份代码 (身份证/外籍护照)
                      </label>
                      <input
                        type="password"
                        value={expertId}
                        onChange={(e) => setExpertId(e.target.value)}
                        placeholder="双边信宿防窥保密"
                        className="w-full bg-[#1a1a2c] text-white border border-white/10 rounded-lg py-2 px-3 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                        学术安全绑定邮箱
                      </label>
                      <input
                        type="email"
                        value={expertEmail}
                        onChange={(e) => setExpertEmail(e.target.value)}
                        placeholder="绑定后获取资助要件对接"
                        className="w-full bg-[#1a1a2c] text-white border border-white/10 rounded-lg py-2 px-3 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Tags and resume Right */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans flex items-center justify-between">
                      核心研究及顾问方向(可多选)
                      <span className="text-[9px] text-slate-500 font-normal">多选精配</span>
                    </label>
                    
                    <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto p-1 bg-[#12121a]/60 rounded-lg border border-white/[0.04]">
                      {availableTags.map((tag) => {
                        const isSelected = expertTags.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => handleTagToggle(tag)}
                            className={`text-[10px] px-2 py-1 rounded cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                                : 'bg-[#19192a] text-slate-400 hover:text-slate-300 border border-white/[0.04]'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 font-sans">
                      过往合规智理论证案例及学术简介
                    </label>
                    <textarea
                      value={expertBio}
                      onChange={(e) => setExpertBio(e.target.value)}
                      rows={3}
                      placeholder="请简述您在跨境数据防线、民航低空、AI监管等领域的权威资历。（选填）"
                      className="w-full bg-[#1a1a2c] text-white border border-white/10 rounded-lg py-2 px-3 text-xs outline-none resize-none font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setInviteVerified(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  返回验证
                </button>
                <button
                  type="submit"
                  disabled={submittingExpert}
                  className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-5 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 transition-all shadow-md shadow-violet-600/10 disabled:opacity-40"
                >
                  {submittingExpert ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>正在接入合规安全网...</span>
                    </>
                  ) : (
                    <>
                      <span>提交并入库专家智囊大盘</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Expert Success splash */
            <div className="bg-[#a78bfa]/5 border border-violet-500/20 rounded-xl p-8 text-center space-y-4 animate-fade-in" id="expert-onboarding-success">
              <div className="w-12 h-12 bg-violet-500/10 border border-violet-500/20 rounded-full mx-auto flex items-center justify-center text-[22px] text-violet-400">
                ✓
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-extrabold text-white">权威学者智囊专家入库成功</h4>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  特约学术履历已锁定入档。已绑定平台专家会审与智能决策流。系统已经自洽打通「专家智库」和「人才培养」的会商连线沙盒，随时提供视频、在线政策及企业项目合规出港安全审核服务。
                </p>
              </div>
              <button
                type="button"
                onClick={resetAll}
                className="mx-auto text-xs font-bold text-slate-300 bg-bg-card hover:bg-bg-hover border border-white/10 px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                再进行一次验证 / 重新注册
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
