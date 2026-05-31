import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Handshake, Search, Award, RefreshCcw, PlusCircle, Calendar, Phone, DollarSign } from 'lucide-react';
import { MatchingPost } from '../types';

export default function MatchView() {
  const [posts, setPosts] = useState<MatchingPost[]>([
    {
      id: 'p-1',
      type: 'demand',
      title: '急购低空卫星互联网专用微型遥测天线 2000 套',
      company: '大湾区低空智控科技集团',
      industry: '卫星通信/低空经济',
      budget: '350M ~ 500M 元',
      details: '需要支持在 24-28GHz 段能极速锁频，且重量体积低于 15g 的定制微型天线包件。',
      contact: '陈经理: 138-xxxx-xx92',
      date: '2026-05-28',
      tags: ['高增益', '国产替代', '微型锁频']
    },
    {
      id: 'p-2',
      type: 'supply',
      title: '提供中小企业一站式海外节点租用与数据沙盒测试环境',
      company: '数字港深海外云链联合实验室',
      industry: '跨境云服务',
      budget: '单月订阅 ¥12,000 起',
      details: '专为大湾区出海中小企业定制，内嵌 GDPR 安全自查及沙箱自动化报告，节点覆盖美加、日韩。',
      contact: '周总: 135-xxxx-xx11',
      date: '2026-05-29',
      tags: ['高合规', '多云互联', '即租即试']
    },
    {
      id: 'p-3',
      type: 'demand',
      title: '寻求人工智能与多模态在本地政企落地的天使轮融资',
      company: '智信 Agent 团队',
      industry: 'AI技术与软件开发',
      budget: '需要 A 轮融资 500 万元',
      details: '核心团队毕业于知名大学，专注搭建大宗政务合规智能解析与流式回答平台。目前已有 12 个重点大湾区政企签约客户。',
      contact: '廖博士: chat_doc@mail.com',
      date: '2026-05-30',
      tags: ['种子项目', '技术壁垒高', '已落地']
    }
  ]);

  const [filterType, setFilterType] = useState<'all' | 'supply' | 'demand'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'supply' | 'demand'>('demand');
  const [newCompany, setNewCompany] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newTags, setNewTags] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany || !newDetails) {
      alert('请将标题、发起公司及需求详情等核心项填入完整。');
      return;
    }

    const created: MatchingPost = {
      id: `p-${Date.now()}`,
      type: newType,
      title: newTitle,
      company: newCompany,
      industry: newIndustry || '泛互联网',
      budget: newBudget || '面议/协商',
      details: newDetails,
      contact: newContact || '在系统私信联系',
      date: new Date().toISOString().split('T')[0],
      tags: newTags ? newTags.split(',').map((t) => t.trim()) : ['新发起']
    };

    setPosts((prev) => [created, ...prev]);
    setShowAddForm(false);
    // Reset Form fields
    setNewTitle('');
    setNewCompany('');
    setNewIndustry('');
    setNewBudget('');
    setNewDetails('');
    setNewContact('');
    setNewTags('');

    alert('发布供需成功！智服的大盘撮合系统正在利用多维度算法实时计算您与潜在合作伙伴的匹配度... 供应链匹配度计算中！');
  };

  const filteredPosts = posts.filter(
    (p) => filterType === 'all' || p.type === filterType
  );

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="match-view-panel">
      {/* View Header with technology image configured */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-2 border-b border-[#14141d]/10" id="match-header">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            供需对接与撮合中心
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            全行业智能链条重整，打通中小企业资金、软件天线及外包人才的高匹配撮合通路。
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-1.5 transition-all shadow-md shadow-violet-600/10"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>新发布供需合作</span>
          </button>
        </div>
      </div>

      {/* Form Overlay Modal or expansion block */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0c0c14] border border-[#1e1e2d] rounded-2xl p-6 shadow-xl relative"
          id="add-post-form-layout"
        >
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-1.5 font-sans">
            <Handshake className="w-5 h-5 text-violet-400" />
            发布您的供需登记表
          </h3>
          <form onSubmit={handleCreatePost} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 block">合作方向 / 类型</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as 'supply' | 'demand')}
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              >
                <option value="demand">寻找对接/采购需求 (Demand)</option>
                <option value="supply">供应优势/能力展示 (Supply)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 block">主题标题</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="例如：寻求特定频段高增益5G网关"
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 block">企业/团队名称</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="智服高新技术企业团队"
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 block">所属行业标签</label>
              <input
                type="text"
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                placeholder="智能物联网 / 前沿算法"
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 block">资金预算 or 期望价格</label>
              <input
                type="text"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="如 ¥300,000 预算"
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 block">联系手段及方式</label>
              <input
                type="text"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="李经理: 189-xxxx-xxxx"
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-400 block">能力标签 (半角逗号分隔)</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="大容量, 超低延时, 自研技术"
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-400 block">合作细节要求</label>
              <textarea
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                rows={3}
                placeholder="请详细叙述您的技术瓶颈、高阶天线包件规格或具体的股权分红期望..."
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs font-semibold text-slate-400 hover:bg-[#1C1C26] hover:text-white border border-[#1e1e2d] px-4 py-2 rounded-xl transition-all"
              >
                取消
              </button>
              <button
                type="submit"
                className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 rounded-xl transition-all shadow-md shadow-violet-600/15"
              >
                登记并启动自动对接
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Tabs Filter Switches */}
      <div className="flex border-b border-[#1e1e2d] gap-6" id="matching-tab-selector">
        <button
          onClick={() => setFilterType('all')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            filterType === 'all' ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          全部资源 ({posts.length})
        </button>
        <button
          onClick={() => setFilterType('demand')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            filterType === 'demand' ? 'border-b-2 border-violet-500 text-violet-400 font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          求购/协作需求 ({posts.filter((p) => p.type === 'demand').length})
        </button>
        <button
          onClick={() => setFilterType('supply')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            filterType === 'supply' ? 'border-b-2 border-emerald-500 text-emerald-400 font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          供应/能力输出 ({posts.filter((p) => p.type === 'supply').length})
        </button>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="matching-posts-grid">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            id={`post-card-${post.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-5 flex flex-col justify-between transition-all relative overflow-hidden bg-[#0d0d12] border ${
              post.type === 'supply' 
                ? 'border-emerald-500/10 hover:border-emerald-500/30' 
                : 'border-violet-500/10 hover:border-violet-500/30'
            }`}
          >
            {/* Visual background hue indicating direction */}
            <div className={`absolute right-0 top-0 w-20 h-20 opacity-10 rounded-bl-full ${
              post.type === 'supply' ? 'bg-emerald-500' : 'bg-violet-500'
            }`} />

            <div>
              {/* Type Label Indicator */}
              <div className="flex justify-between items-center mb-3">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                  post.type === 'supply' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-violet-500/10 text-violet-450 text-violet-300 border border-violet-500/20'
                }`}>
                  {post.type === 'supply' ? '供应 / 能力' : '需求 / 寻找'}
                </span>
                
                <span className="text-[9px] text-slate-500 font-mono flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" />
                  {post.date}
                </span>
              </div>

              {/* Title & Organization info */}
              <h3 className="text-sm font-extrabold text-white font-sans leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1.5 font-sans">{post.company} • <span className="text-violet-400 font-semibold">{post.industry}</span></p>

              {/* Cost Indicator block */}
              <div className="my-4 p-2.5 bg-[#12121a] border border-[#1e1e2d] rounded-xl flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-sans">财务体量/报酬:</span>
                <span className="font-bold text-white font-mono inline-flex items-center">
                  <DollarSign className="w-3.5 h-3.5 text-violet-450 text-violet-400" />
                  {post.budget}
                </span>
              </div>

              {/* Detail content text block */}
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans pt-1">
                {post.details}
              </p>
            </div>

            {/* Bottom Contact actions */}
            <div className="mt-5 pt-3.5 border-t border-[#1e1e2d] space-y-3">
              <div className="flex gap-1.5 flex-wrap">
                {post.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] bg-[#12121a] border border-[#1e1e2d] hover:border-[#242435] text-slate-400 px-1.5 py-0.5 rounded font-medium transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2" id="post-actions">
                <button
                  onClick={() => alert(`正在与 ${post.company} 建立安全对接专线，稍后会将您在 智服AI 录入的材料同步至对方联系人：${post.contact}`)}
                  className={`flex-1 text-xs py-2 rounded-xl font-bold cursor-pointer transition-colors text-center block ${
                    post.type === 'supply' 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/10'
                  }`}
                >
                  一键发起对接
                </button>
                <a
                  href={`tel:${post.contact}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`联系人及方式：${post.contact}`);
                  }}
                  className="p-2 border border-[#1e1e2d] hover:bg-[#12121a] rounded-xl text-slate-400 hover:text-white flex items-center justify-center shrink-0 transition-colors"
                  title="获取直接电话"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
