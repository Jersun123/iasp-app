import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Filter, Star, MessageCircle, Video, Calendar, Clock, ChevronRight, UserCheck } from 'lucide-react';
import { Expert } from '../types';

export default function ExpertsView() {
  const [experts] = useState<Expert[]>([
    {
      id: 'e-1',
      name: 'Dr. Lin (林博士)',
      title: '智服前沿 AI 决策研究院主任 / CDO 实战顾问',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      tags: ['Agentic AI开发', '企业资深CDO', '横琴智慧枢纽规划'],
      online: true,
      score: 4.9,
      consultationCount: 243,
      introduction: '毕业于重点学府，深耕大数据安全合规、多模态决策、以及政务大宗材料线上代报系统研发不低于 12 年。已成功咨询 120 余家大湾区中小型出海企业。'
    },
    {
      id: 'e-2',
      name: '周伟超 (合规专家)',
      title: '大湾区跨境数据隐私保护课题研究组资深审计长',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      tags: ['GDPR合规', '信通院资质', '国家跨境数据审计'],
      online: false,
      score: 4.8,
      consultationCount: 154,
      introduction: '原大型跨国互联网独角兽信息安全副总裁。精通跨境APP隐私收集法案比对、属地化安全隔离体系构建、加计扣除专项行动资格审计。'
    },
    {
      id: 'e-3',
      name: '何国栋 (商贸导师)',
      title: '横琴数字口岸与泛海外集群产业联盟副秘书长',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      tags: ['供应链对接', '横琴执委政策', '欧美渠道落子'],
      online: true,
      score: 4.7,
      consultationCount: 98,
      introduction: '熟悉珠江西岸、澳门与横琴自贸片区产业补贴政策细节。专攻中小型软件天线研发、航电载具供应链配套寻找以及大宗资金融资洽谈。'
    }
  ]);

  const [bookingExpert, setBookingExpert] = useState<Expert | null>(null);
  const [bookDate, setBookDate] = useState('2026-06-03');
  const [bookTime, setBookTime] = useState('14:00');
  const [bookTopic, setBookTopic] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingExpert) return;

    const newBooking = {
      id: `book-${Date.now()}`,
      expertName: bookingExpert.name,
      avatar: bookingExpert.avatar,
      date: bookDate,
      time: bookTime,
      topic: bookTopic || '企业年度红利及合规审计咨询建议书。',
      meetLink: `https://meet.jit.si/ZhifuPlatform-${Math.floor(Math.random() * 900000 + 100000)}`
    };

    setBookings((prev) => [newBooking, ...prev]);
    setBookingExpert(null);
    setBookTopic('');
    alert(`预约成功！${newBooking.expertName} 已经通过您的政策计算数据及企业合规得分（92分）锁定您的议题。在约定时间：${bookDate} ${bookTime}，点击视频聊天一键连线接口即可直接进入。`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="experts-view-panel">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-[#14141d]/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            专家顾问智库
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            打通政企辅导最后一公里。特邀涵盖大语言模型、大宗天线物联、GDPR、国家税法领域的一流学术及实业督导，一键建立视频双向预约。
          </p>
        </div>


      </div>

      {/* Booking form Overlay Modal */}
      {bookingExpert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0c0c14] border border-[#1e1e2d] rounded-2xl p-6 shadow-xl max-w-lg mx-auto"
          id="expert-booking-box"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <img
                src={bookingExpert.avatar}
                alt={bookingExpert.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-sm font-extrabold text-white block font-sans">
                  预约视频咨询：{bookingExpert.name}
                </h3>
                <p className="text-[11px] text-slate-400">{bookingExpert.title}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleCreateBooking} className="space-y-4 text-xs font-sans text-slate-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 block">选择咨询日期</label>
                <input
                  type="date"
                  value={bookDate}
                  onChange={(e) => setBookDate(e.target.value)}
                  className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 block">选择预约时段</label>
                <select
                  value={bookTime}
                  onChange={(e) => setBookTime(e.target.value)}
                  className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
                >
                  <option value="09:30">09:30 - 10:30</option>
                  <option value="11:00">11:00 - 12:00</option>
                  <option value="14:00">14:00 - 15:00</option>
                  <option value="16:30">16:30 - 17:30</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 block">输入咨询目的与企业困境简述</label>
              <textarea
                value={bookTopic}
                onChange={(e) => setBookTopic(e.target.value)}
                placeholder="例如：评估高新技术企业认定，或跨境APP用户条款有无涉密法案..."
                rows={3}
                className="w-full bg-[#12121a] border border-[#1e1e2d] text-white p-2.5 rounded-xl outline-none focus:border-violet-500"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setBookingExpert(null)}
                className="font-semibold text-slate-400 hover:bg-[#1a1a26] hover:text-white border border-[#1e1e2d] px-4 py-2 rounded-xl transition-all"
              >
                取消
              </button>
              <button
                type="submit"
                className="font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 rounded-xl transition-all shadow-md shadow-violet-600/10"
              >
                确认预约并不占用补贴课时
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Bookings List Display (If anything booked) */}
      {bookings.length > 0 && (
        <div className="bg-[#0c0c14] border border-violet-550/20 border-violet-500/20 rounded-2xl p-5 shadow-xs space-y-4" id="success-expert-bookings">
          <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest block font-sans">
            我的活跃预约视频专线 (Jitsi 独立链)
          </h3>
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-3.5 bg-[#12121e] rounded-xl border border-violet-500/15 gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={b.avatar}
                    alt={b.expertName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-xs font-sans">
                    <p className="font-bold text-slate-200">{b.expertName} • <span className="text-slate-400 font-normal">咨询专场</span></p>
                    <p className="text-slate-500 mt-0.5">预约细节：{b.topic}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-xs font-mono text-slate-400 bg-[#0d0d14] border border-[#1e1e2d] px-2 py-1 rounded-md flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-violet-400" />
                    {b.date} {b.time}
                  </span>
                  
                  <a
                    href={b.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 transition-all shadow-sm"
                  >
                    <Video className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                    <span>一键连线</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experts listing grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6" id="experts-card-listing">
        {experts.map((exp) => (
          <motion.div
            key={exp.id}
            id={`expert-${exp.id}`}
            className="rounded-3xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start lovable-glow-card relative"
          >
            {/* Left side details */}
            <div className="flex gap-4 items-start flex-1 z-10">
              <img
                src={exp.avatar}
                alt={exp.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-violet-500/20 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-extrabold text-white font-sans tracking-tight">
                    {exp.name}
                  </h3>
                  <div className="flex items-center gap-1 font-mono text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400 animate-pulse" />
                    <span>{exp.score} 分</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    exp.online 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse' 
                      : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  }`}>
                    {exp.online ? '可接视频' : '挂牌挂号中'}
                  </span>
                </div>

                <p className="font-bold text-violet-300 text-xs text-violet-400">
                  {exp.title}
                </p>
                
                <p className="text-slate-400 leading-relaxed max-w-2xl font-sans pt-1">
                  {exp.introduction}
                </p>

                <div className="flex gap-1.5 pt-2 flex-wrap">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-[#12121a] border border-[#1e1e2d] text-slate-400 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side bookings call triggers */}
            <div className="flex flex-row md:flex-col gap-3 shrink-0 self-stretch md:self-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-[#1e1e2d] z-10">
              <div className="text-right text-[10px] text-slate-500 p-2 border border-white/5 rounded-xl bg-[#12121a]/55 block hidden md:block select-none">
                <span>辅导统计量:</span>
                <span className="block font-bold text-slate-350 font-mono mt-0.5">{exp.consultationCount} 期会议</span>
              </div>
              <button
                onClick={() => setBookingExpert(exp)}
                className="w-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-all shadow-md shadow-violet-600/10"
              >
                <Video className="w-4 h-4 text-emerald-300 animate-pulse" />
                <span>预约一对一辅导</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
