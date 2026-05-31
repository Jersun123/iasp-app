import { useState } from 'react';
import { ActiveTab } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ComplianceView from './components/ComplianceView';
import MatchView from './components/MatchView';
import PolicyView from './components/PolicyView';
import MonitoringView from './components/MonitoringView';
import ExpertsView from './components/ExpertsView';
import LearningView from './components/LearningView';
import EventsView from './components/EventsView';
import GoAbroadView from './components/GoAbroadView';
import AiAssistant from './components/AiAssistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  
  // Custom mock user profile
  const [userProfile] = useState({
    name: '林华',
    role: '项目首席运营商 & CDO',
    company: '大湾区低空智联科技有限公司',
    industry: '低空物联与卫星导航天线研发',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Dashboard
            setActiveTab={setActiveTab}
            onBookExpert={(expertName) => {
              setActiveTab('experts');
              setTimeout(() => {
                alert(`为了方便您，已自动为您跳转到了「专家智库」板块，且锁定了 ${expertName} 专家的在线预约通道。请在下方填写详细需求并提交视频连线！`);
              }, 400);
            }}
            onClaimTicket={(eventName) => {
              setActiveTab('events');
              setTimeout(() => {
                alert(`欢迎参会！已自动为您转入近期的「行业活动」专场大厅。请在《${eventName}》活动卡片中，点击一键领券锁定席位。`);
              }, 450);
            }}
          />
        );
      case 'compliance':
        return <ComplianceView />;
      case 'matching':
        return <MatchView />;
      case 'policy':
        return <PolicyView />;
      case 'monitoring':
        return <MonitoringView />;
      case 'experts':
        return <ExpertsView />;
      case 'learning':
        return <LearningView />;
      case 'events':
        return <EventsView />;
      case 'global':
        return <GoAbroadView />;
      default:
        return <Dashboard setActiveTab={setActiveTab} onBookExpert={() => {}} onClaimTicket={() => {}} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050508] text-[#E2E8F0] font-sans antialiased selection:bg-violet-600 selection:text-white" id="zhifu-app-root">
      {/* 1. Left Sidebar Navigation Column */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
      />

      {/* 2. Main Content Center Stage View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative" id="main-canvas-stage">
        {renderActiveView()}
      </main>

      {/* 3. Right Active AI Companion Panel */}
      <AiAssistant
        userProfile={userProfile}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
