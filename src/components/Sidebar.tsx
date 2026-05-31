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
    { id: 'overview' as ActiveTab, label: '概览与导航', icon: Compass, badge: 'dot' },
    { id: 'matching' as ActiveTab, label: '供需对接', icon: Handshake },
    { id: 'policy' as ActiveTab, label: '政策导航', icon: Compass, badge: '3' },
    { id: 'monitoring' as ActiveTab, label: '行业监测', icon: LineChart },
    { id: 'experts' as ActiveTab, label: '专家智库', icon: Users },
    { id: 'learning' as ActiveTab, label: '人才培养', icon: BookOpen },
    { id: 'events' as ActiveTab, label: '行业活动', icon: Calendar },
    { id: 'global' as ActiveTab, label: '出海服务', icon: Globe },
    { id: 'compliance' as ActiveTab, label: '企业合规服务', icon: ShieldAlert },
  ];

  return (
    <aside className="w-[188px] border-r border-[#ffffff0b] bg-bg-panel flex flex-col h-full shrink-0 select-none" id="main-sidebar">
      {/* Brand Logo Header */}
      <div className="p-4 border-b border-[#ffffff07] flex-shrink-0" id="sidebar-header">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-[9px] bg-violet-600/90 text-white flex items-center justify-center text-base font-sans shrink-0">
            🤖
          </div>
          <div className="min-w-0">
            <h1 className="text-[13.5px] font-bold tracking-tight text-white font-sans truncate leading-snug">
              智慧服务平台
            </h1>
            <p className="text-[10.5px] text-slate-500 font-sans truncate">
              互联网产业·智慧组
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Options Menu */}
      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto" style={{ scrollbarWidth: 'none' }} id="sidebar-navigation">
        <p className="text-[10px] font-bold text-slate-500/70 uppercase tracking-widest px-3.5 pt-2 pb-1.5 font-sans">
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
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-normal transition-all relative cursor-pointer select-none ${
                isActive
                  ? 'bg-violet-600/14 text-[#a78bfa] font-medium before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-violet-500 before:rounded-r'
                  : 'text-slate-400 hover:bg-[#24243a]/50 hover:text-slate-200'
              }`}
            >
              <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#a78bfa]' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
              
              {item.badge === 'dot' && isActive && (
                <span className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full ml-auto shrink-0" />
              )}
              {item.badge === '3' && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/15 shrink-0">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Session Profile Card at the Bottom */}
      <div className="p-3 border-t border-[#ffffff07] flex-shrink-0" id="sidebar-footer">
        <div className="flex items-center gap-2.5 cursor-pointer hover:bg-bg-hover/20 p-1.5 rounded-xl transition-all">
          <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            林
          </div>
          <div className="flex-1 min-w-0 pr-1 text-left">
            <p className="text-[12px] font-medium text-slate-200 truncate leading-snug">
              林华
            </p>
            <p className="text-[10.5px] text-slate-500 truncate leading-none">
              项目首席运营 &amp; CDO
            </p>
          </div>
          <span className="text-slate-500 text-xs shrink-0 select-none">⋯</span>
        </div>
      </div>
    </aside>
  );
}
