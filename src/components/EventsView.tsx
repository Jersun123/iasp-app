import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Ticket, MapPin, Clock, Search, Gift, Award, CheckCircle } from 'lucide-react';
import { EventItem } from '../types';

export default function EventsView() {
  const [events] = useState<EventItem[]>([
    {
      id: 'ev-1',
      type: 'event',
      title: '粤港澳中小企业出海实操及大湾区企业行 - 中法/横琴专场沙龙',
      organizer: '大湾区互联网中小企业发展委员会',
      date: '2026-06-18',
      time: '14:00 - 17:30',
      location: '中国·横琴粤澳深度合作区创意产业总部大楼 3A 厅',
      price: '免费参会 / 平台专员补贴认证',
      tags: ['横琴政策落地', '合规出海首航', '多天线供应链'],
      participants: 234
    },
    {
      id: 'ev-2',
      type: 'event',
      title: '低空经济网联与自主可控航电配套对碰融资大宗双向洽谈会',
      organizer: '广东省空天经济产业基金联席会',
      date: '2026-07-02',
      time: '09:00 - 16:30',
      location: '深圳宝安低空融合实验展厅 5 号厅',
      price: '特邀制参与 (通过本平台撮合免门票度)',
      tags: ['供应链对接', '大宗天线研讨', '创投资本配套'],
      participants: 142
    }
  ]);

  const [claimedTickets, setClaimedTickets] = useState<Record<string, string>>({});

  const handleClaimTicket = (eventId: string, titleName: string) => {
    if (claimedTickets[eventId]) {
      alert(`您已经获得了《${titleName}》的入场电子券。`);
      return;
    }

    const claimCode = `ZHIFU-EV-${Math.floor(Math.random() * 900000 + 100000)}`;
    setClaimedTickets((prev) => ({
      ...prev,
      [eventId]: claimCode
    }));

    alert(`领票成功！电子票兑换码为：${claimCode}。届时请持平台生成的本码及合规得分单（92分及以上享有贵宾前排通道），在大厅直接扫描换证入场。`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="events-view-panel">
      {/* Upper header with custom theme picture */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-2 border-b border-[#14141d]/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            行业高峰活动
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            平台直通大湾区多城市、横琴等黄金前哨活动。参会即可接触核心采购官及海外双边出资机构代表。
          </p>
        </div>


      </div>

      {/* Grid listing */}
      <div className="space-y-6" id="events-feed-stack">
        {events.map((ev) => {
          const isClaimed = !!claimedTickets[ev.id];
          return (
            <motion.div
              key={ev.id}
              id={`event-box-${ev.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-6 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center relative overflow-hidden lovable-glow-card"
            >
              {/* Left detail listing info */}
              <div className="space-y-3.5 flex-1 pr-4 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-violet-600 text-white font-bold px-2.5 py-0.5 rounded font-sans shadow-xs">
                    {ev.date}
                  </span>
                  <span className="text-[10px] text-slate-550 text-slate-450 text-slate-450 text-slate-400 font-sans">
                    主办方：{ev.organizer}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white font-sans leading-snug">
                  {ev.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-400 font-sans">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>地址：{ev.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>时段：{ev.time}</span>
                  </p>
                </div>

                <div className="flex gap-1.5 pt-2 flex-wrap">
                  {ev.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-[#12121a] border border-[#1e1e2d] text-slate-400 px-2 py-0.5 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right claim ticket zone */}
              <div className="w-full lg:w-48 bg-[#12121e] border border-violet-500/10 rounded-2xl p-4 text-center space-y-3.5 shrink-0 self-stretch lg:self-auto flex flex-col justify-between z-10">
                <div>
                  <span className="text-[9px] text-slate-500 block font-sans">门票规则/福利:</span>
                  <span className="text-xs font-bold text-slate-350 block mt-1">{ev.price}</span>
                </div>

                {isClaimed ? (
                  <div className="space-y-2">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1.5 rounded-xl block font-bold font-mono">
                      票据：{claimedTickets[ev.id]}
                    </span>
                    <span className="text-[9px] text-emerald-400 font-medium block">
                      已为您留特邀贵宾席位!
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleClaimTicket(ev.id, ev.title)}
                    className="w-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md shadow-violet-600/10"
                  >
                    <Ticket className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                    <span>一键抢券锁定座位</span>
                  </button>
                )}

                <span className="text-[9px] text-slate-500 block font-sans">目前已有 {ev.participants} 家大湾区企业报名签约</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
