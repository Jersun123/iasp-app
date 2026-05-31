import {
  ShieldAlert,
  Handshake,
  Compass,
  LineChart,
  Users,
  BookOpen,
  Calendar,
  Globe,
  User,
  LogOut,
  Sparkles,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userProfile: {
    name: string;
    role: string;
    avatar: string;
  };
}

export default function Sidebar({ activeTab, setActiveTab, userProfile }: SidebarProps) {
  const menuItems = [
    { id: 'overview' as ActiveTab, label: '概览与导航', icon: Compass },
    { id: 'matching' as ActiveTab, label: '供需对接', icon: Handshake },
    { id: 'policy' as ActiveTab, label: '政策导航', icon: Compass },
    { id: 'monitoring' as ActiveTab, label: '行业监测', icon: LineChart },
    { id: 'experts' as ActiveTab, label: '专家智库', icon: Users },
    { id: 'learning' as ActiveTab, label: '人才培养', icon: BookOpen },
    { id: 'events' as ActiveTab, label: '行业活动', icon: Calendar },
    { id: 'global' as ActiveTab, label: '出海服务', icon: Globe },
    { id: 'compliance' as ActiveTab, label: '企业合规服务', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 border-r border-[#1a1a24] bg-[#09090d] flex flex-col h-full shrink-0 select-none" id="main-sidebar">
      {/* Brand Logo & Slogan Header */}
      <div className="p-6 border-b border-[#14141d]" id="sidebar-header">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-violet-600/20 text-violet-400 p-1.5 rounded-lg flex items-center justify-center border border-violet-500/20">
            <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-300 via-indigo-200 to-white bg-clip-text text-transparent font-sans">
            智慧服务平台
          </h1>
        </div>
        <p className="text-[10px] text-slate-400 font-medium tracking-wider">
          互联网产业发展 • 智慧枢纽
        </p>
      </div>

      {/* Navigation Options Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" id="sidebar-navigation">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">
          核心服务导航
        </p>
        
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-md shadow-violet-600/20 border border-violet-400/20'
                  : 'text-slate-400 hover:bg-[#12121a] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              
              {isActive && (
                <div className="w-1.5 h-1.5 bg-violet-300 rounded-full animate-ping" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Session Profile Card at the Bottom */}
      <div className="p-4 border-t border-[#14141d]" id="sidebar-footer">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#12121a] border border-[#1e1e28] shadow-sm">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-10 h-10 rounded-full ring-2 ring-violet-500/30 object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-200 truncate">
              {userProfile.name}
            </p>
            <p className="text-[10px] text-slate-400 font-mono truncate">
              {userProfile.role}
            </p>
          </div>
          <button 
            className="p-1 px-1.5 hover:bg-[#1a1a26] rounded text-slate-500 hover:text-red-400 transition-colors"
            title="退出登录"
            onClick={() => alert("这是一个演示应用。退出功能已禁用。")}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
