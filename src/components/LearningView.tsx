import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award, CheckCircle, Search, HelpCircle, ChevronRight, PlayCircle, Star } from 'lucide-react';

export default function LearningView() {
  const [activeTab, setActiveTab] = useState<'courses' | 'quiz'>('courses');
  const [courses, setCourses] = useState([
    {
      id: 'c-1',
      title: 'Agentic AI 与 CDO (首席数据官) 商业转型实战课程',
      provider: '智服数字经济开发实验室',
      progress: 68,
      totalHours: 12,
      completedHours: 8,
      category: '数字资产/商业架构',
      lessons: ['多 Agent 业务流程流转系统搭建', '企业首席数据官 (CDO) 职责合规定义', '大宗敏感数据隔离与存储标准规范'],
    },
    {
      id: 'c-2',
      title: '中小型科技公司研发费用加计扣除申报与会计合规指引',
      provider: '横琴自贸片区科技辅导局',
      progress: 0,
      totalHours: 4,
      completedHours: 0,
      category: '税收财务优惠',
      lessons: ['高新技术开支预算如何录入及对数', '知识产权与软著作权的关联评估规范', '财务账簿分立保管与核准抽查指引'],
    }
  ]);

  // Quiz status
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAns, setSelectedAns] = useState<string>('');
  const [certCode, setCertCode] = useState('');

  const handleStudyMore = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId && c.progress < 100) {
          const nextCompleted = c.completedHours + 2;
          const nextProgress = Math.min(100, Math.floor((nextCompleted / c.totalHours) * 100));
          return {
            ...c,
            completedHours: nextCompleted,
            progress: nextProgress
          };
        }
        return c;
      })
    );
    alert('恭喜您，完成自主阅读了一个课时！学习进度已同步至智服智算大盘数据中。');
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAns) {
      alert('请选择一个合规答案。');
      return;
    }

    if (selectedAns === 'B') {
      setQuizScore(100);
      setCertCode(`CDO-CERT-${Math.floor(Math.random() * 900000 + 100000)}`);
      alert('答对了！恭喜您获得智服互联网平台颁发的「CDO合规架构与Agent决策分析师」资格评级。');
    } else {
      setQuizScore(40);
      alert('回答错误。可重读数据最小必要限制及GDPR合规通识课。');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#040407] p-8 space-y-8 select-none" id="learning-view-panel">
      {/* Upper header with custom theme picture */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-2 border-b border-[#14141d]/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            人才培养与认证中心
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            自主培养企业 CDO 转型架构师、前沿 Agent 构件师、数据合规自检专员。支持通过小试题一键获取专属平台证书评级。
          </p>
        </div>


      </div>

      {/* Select tab segment */}
      <div className="flex border-b border-[#1e1e2d] gap-6" id="learning-toggle">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'courses' ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          企业进阶课程目录
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'quiz' ? 'border-b-2 border-violet-500 text-white font-semibold' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          合规结业自测试题与证书
        </button>
      </div>

      {activeTab === 'courses' ? (
        <div className="space-y-6" id="courses-directory-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="courses-catalog-grid">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                id={`course-box-${course.id}`}
                className="rounded-3xl p-6 flex flex-col justify-between lovable-glow-card relative"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 z-10">
                    <span className="text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-0.5 rounded font-bold font-mono">
                      {course.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      时长: {course.totalHours} 小时 | 学分制
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white font-sans leading-snug pt-2">
                    {course.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1">
                    研发赞助于：{course.provider}
                  </p>

                  {/* Syllabus outline */}
                  <div className="my-5 space-y-2 z-10">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">课程重点提纲:</span>
                    <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
                      {course.lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Progress bar and details */}
                <div className="mt-5 pt-4 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-300 font-mono">
                      学习进度: {course.progress}%
                    </span>
                    <span className="text-slate-500">已学 {course.completedHours}h</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-[#12121a] rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>

                  <button
                    onClick={() => handleStudyMore(course.id)}
                    disabled={course.progress >= 100}
                    className={`w-full text-xs py-2.5 rounded-xl font-bold cursor-pointer text-center block transition-all ${
                      course.progress >= 100
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-505 text-white shadow-md shadow-violet-600/10 border border-violet-550/20 border-violet-500/20'
                    }`}
                  >
                    {course.progress >= 100 ? '✅ 本班课结业' : '立即自研一个课时 (+2h)'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="learning-quiz-cert-section">
          {/* Quiz form Column */}
          <div className="lg:col-span-8 bg-[#0d0d12] border border-[#1e1e2d] rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-violet-500 animate-pulse" />
              CDO 数据主权自测试题
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              根据《中华人民共和国个人信息保护法》及欧盟 GDPR 跨境约束性指引，当您企业的APP客户端需要在用户明确点击「同意」或「授权」按钮之前，开始通过代码接口或内嵌广告组件向物理硬盘写入跟踪 Cookie 时：
            </p>

            <form onSubmit={handleSubmitQuiz} className="space-y-3.5 text-xs font-sans text-slate-300">
              {[
                { key: 'A', text: '属于合理商业宣传，可以在用户完全不知情的情况下默默注入抓取数据。' },
                { key: 'B', text: '属于典型的违规行为。必须遵循“先告知明示、再收集激活”的最少必要原则，未点击授权前不得进行实际 Cookie 存储。' },
                { key: 'C', text: '只要该 APP 的云数据库物理节点不在境内，就可以免除遵守该网安法规。' },
              ].map((ans) => (
                <label
                  key={ans.key}
                  className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer hover:bg-[#12121a] transition-all block ${
                    selectedAns === ans.key ? 'border-violet-500 bg-violet-600/5' : 'border-[#1e1e2d]'
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz-answer"
                    value={ans.key}
                    checked={selectedAns === ans.key}
                    onChange={() => setSelectedAns(ans.key)}
                    className="mt-1 accent-violet-600 cursor-pointer w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-white mr-1.5 font-sans">选项 {ans.key}:</span>
                    <span className="text-slate-350 leading-relaxed font-sans">{ans.text}</span>
                  </div>
                </label>
              ))}

              <button
                type="submit"
                className="text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md shadow-violet-600/10"
              >
                交卷诊断
              </button>
            </form>
          </div>

          {/* Certificate output Column */}
          <div className="lg:col-span-4" id="certificate-delivery">
            {quizScore === 100 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-amber-550/10 bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 text-center space-y-6 flex flex-col items-center justify-between"
              >
                <div>
                  <Award className="w-12 h-12 text-amber-405 text-amber-400 animate-pulse mb-3 mx-auto" />
                  <h4 className="text-sm font-extrabold text-[#7c839b] uppercase tracking-widest font-sans">
                    执委会高新互通资格证书
                  </h4>

                  <div className="bg-[#12121e] border border-dashed border-amber-500/20 p-4 rounded-2xl shadow-inner mt-4">
                    <p className="text-[10px] text-slate-500 font-sans">持证机构/个人：</p>
                    <p className="font-extrabold text-white text-sm font-sans mt-0.5">大湾区互联网代表团队</p>
                    
                    <p className="text-[10px] text-slate-500 font-sans mt-3">已评定能力绿证等级：</p>
                    <p className="font-extrabold text-amber-400 text-xs font-mono">CDO合规架构分析师 A+ 级别</p>

                    <p className="text-[9px] text-slate-500 font-mono mt-4">证书统一备案序列：</p>
                    <p className="text-[9px] text-slate-400 font-mono font-bold">{certCode}</p>
                  </div>
                </div>

                <button
                  onClick={() => alert('电子证书（高清PDF级别格式）已下载并缓存至您的设备浏览器文件目录中。')}
                  className="w-full text-xs font-bold text-white bg-[#12121e] hover:bg-[#1a1a2e] py-2.5 rounded-xl transition-colors border border-amber-500/20"
                >
                  导出该平台电子证书
                </button>
              </motion.div>
            ) : (
              <div className="bg-[#0c0c14] border border-dashed border-[#1e1e2d] rounded-2xl p-6 text-center flex flex-col items-center justify-center h-full py-16 select-none">
                <Award className="w-10 h-10 text-slate-600 mb-2" />
                <h4 className="text-xs font-bold text-slate-400">证书颁发大厅</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[180px]">
                  通过旁边的「CDO数据主权自测试题」并获得 100 满分，即可直接点亮专属的平台互认资质英才大奖！
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
