
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { MAJORS, ACADEMIC_YEARS, INTERESTS, THREADS, MINORS } from '../constants';
import { ArrowRight, GraduationCap, Sparkles, Layers, Book } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    year: ACADEMIC_YEARS[0],
    major: '',
    threads: [],
    minor: '',
    interests: [],
    onboardingComplete: false
  });

  const handleInterestToggle = (interest: string) => {
    setProfile(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists 
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const handleThreadToggle = (thread: string) => {
    setProfile(prev => {
      const exists = prev.threads.includes(thread);
      if (exists) {
        return { ...prev, threads: prev.threads.filter(t => t !== thread) };
      }
      if (prev.threads.length >= 2) {
        return prev; // Max 2 threads
      }
      return { ...prev, threads: [...prev.threads, thread] };
    });
  };

  const isStep1Valid = profile.name.length > 0 && profile.major.length > 0;
  // Step 2 validity: If CS, need 2 threads (optional but good for demo). Let's keep it flexible.
  const isStep2Valid = true; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-[#1a1f35] to-slate-900">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-2xl w-full glass-panel rounded-2xl p-8 relative z-10 shadow-2xl border border-white/10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg shadow-purple-500/30">
             <GraduationCap size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-2">
            Course Bubbles
          </h1>
          <p className="text-slate-400">Visualize your academic journey.</p>
          <div className="flex justify-center gap-2 mt-4">
             {[1, 2, 3].map(i => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-blue-500' : 'w-4 bg-slate-700'}`} />
             ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Student Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Academic Year</label>
                <select
                  value={profile.year}
                  onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Major</label>
                <select
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="" disabled>Select Major</option>
                  {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isStep1Valid 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Next Step</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Step 2: Discipline Specifics */}
        {step === 2 && (
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center mb-2">
              <h2 className="text-xl font-semibold text-white">Customize Your Path</h2>
            </div>

            {/* Threads Section - Only for CS */}
            {profile.major === 'Computer Science' && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Layers size={16} className="text-purple-400" />
                  Select Threads (Pick 2)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {THREADS.map(thread => (
                    <button
                      key={thread}
                      onClick={() => handleThreadToggle(thread)}
                      className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                        profile.threads.includes(thread)
                          ? 'bg-purple-500/20 border border-purple-500 text-purple-200'
                          : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {thread}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Minors Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Book size={16} className="text-blue-400" />
                Select Minor (Optional)
              </label>
              <select
                value={profile.minor}
                onChange={(e) => setProfile({ ...profile, minor: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">None</option>
                {MINORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-[2] py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] transition-all"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles className="text-yellow-400" size={20} />
                What interests you?
              </h2>
              <p className="text-slate-400 text-sm">Select topics to get personalized course suggestions.</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                    profile.interests.includes(interest)
                      ? 'bg-blue-500/20 border-blue-500 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => onComplete({ ...profile, onboardingComplete: true })}
                className="flex-[2] py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all duration-300"
              >
                Start Planning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
