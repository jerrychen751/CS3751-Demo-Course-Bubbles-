
import React from 'react';
import { UserProfile } from '../types';
import { Layout, Map, BookOpen, Award, Zap, User, Film, Cpu, Wifi, Brain, Code, LogOut } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  onNavigate: (view: 'PLANNER') => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onNavigate, onReset }) => {
  
  const Bubble = ({ title, icon: Icon, color, onClick, size = "md" }: any) => (
    <button
      onClick={onClick}
      className={`
        relative rounded-full flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group
        ${size === 'lg' ? 'w-64 h-64' : 'w-40 h-40'}
        bg-gradient-to-br ${color}
        border border-white/10 shadow-xl
      `}
    >
      <Icon size={size === 'lg' ? 48 : 32} className="text-white mb-3 drop-shadow-md group-hover:-translate-y-1 transition-transform" />
      <span className={`font-bold text-white drop-shadow-md ${size === 'lg' ? 'text-xl' : 'text-sm'}`}>
        {title}
      </span>
      <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
    </button>
  );

  // Helper to get thread icon/color
  const getThreadVisuals = (threadName: string) => {
    switch(threadName) {
      case 'People': return { icon: User, color: 'from-pink-500 to-rose-600' };
      case 'Media': return { icon: Film, color: 'from-violet-500 to-purple-600' };
      case 'Intelligence': return { icon: Brain, color: 'from-indigo-500 to-blue-600' };
      case 'Systems & Architecture': return { icon: Cpu, color: 'from-slate-500 to-slate-700' };
      case 'Networks': return { icon: Wifi, color: 'from-cyan-500 to-blue-600' };
      case 'Theory': return { icon: Code, color: 'from-emerald-500 to-teal-600' };
      default: return { icon: Layout, color: 'from-gray-500 to-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Reset Button */}
      <button 
        onClick={onReset}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/10 transition-all z-50 cursor-pointer shadow-lg hover:shadow-red-500/10"
      >
        <LogOut size={16} />
        <span className="text-sm font-medium">Start Over</span>
      </button>

      {/* Header */}
      <div className="z-10 text-center mb-16 animate-[fadeInDown_0.8s_ease-out]">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{profile.name}</span>
        </h1>
        <p className="text-slate-400 text-lg">
          {profile.year} • {profile.major}
        </p>
        {profile.minor && (
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">
               Minoring in {profile.minor.replace(' Minor', '')}
            </span>
        )}
      </div>

      {/* Bubble Navigation Grid */}
      <div className="flex-1 flex items-center justify-center w-full max-w-6xl z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center place-items-center">
          
          {/* Left Column: Major & Minor */}
          <div className="flex flex-col gap-8 animate-[fadeInLeft_0.8s_ease-out] items-center">
             <Bubble 
              title="Major Reqs" 
              icon={BookOpen} 
              color="from-emerald-500 to-teal-600" 
              onClick={() => onNavigate('PLANNER')} 
            />
             {profile.minor ? (
                <Bubble 
                  title={profile.minor}
                  icon={Award} 
                  color="from-amber-500 to-orange-600" 
                  onClick={() => onNavigate('PLANNER')} 
                />
             ) : (
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-sm font-medium">
                  No Minor
                </div>
             )}
          </div>

          {/* Center: Planner Bubble */}
          <div className="animate-[zoomIn_0.6s_ease-out]">
            <Bubble 
              title="Freeform Planner" 
              icon={Map} 
              color="from-blue-600 via-indigo-600 to-purple-600" 
              size="lg"
              onClick={() => onNavigate('PLANNER')} 
            />
          </div>

          {/* Right Column: Threads */}
          <div className="flex flex-col gap-8 animate-[fadeInRight_0.8s_ease-out] items-center">
             {profile.threads.length > 0 ? (
               profile.threads.map((thread, idx) => {
                 const visuals = getThreadVisuals(thread);
                 return (
                   <Bubble 
                    key={thread}
                    title={`${thread} Thread`}
                    icon={visuals.icon}
                    color={visuals.color}
                    onClick={() => onNavigate('PLANNER')} 
                  />
                 );
               })
             ) : (
                <Bubble 
                  title="Select Threads" 
                  icon={Layout} 
                  color="from-gray-600 to-slate-700" 
                  onClick={() => {}} 
                />
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
