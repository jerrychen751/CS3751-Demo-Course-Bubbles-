
import React, { useState, useEffect } from 'react';
import { UserProfile, ViewState, PlannedCourse } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Planner from './components/Planner';

const STORAGE_KEY_PROFILE = 'cb_user_profile';
const STORAGE_KEY_PLAN = 'cb_user_plan';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('ONBOARDING');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plannedCourses, setPlannedCourses] = useState<PlannedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load Data from LocalStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
    const savedPlan = localStorage.getItem(STORAGE_KEY_PLAN);

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      if (parsedProfile.onboardingComplete) {
        setView('DASHBOARD');
      }
    }

    if (savedPlan) {
      setPlannedCourses(JSON.parse(savedPlan));
    }

    setIsLoading(false);
  }, []);

  // Save Data Effects
  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(plannedCourses));
  }, [plannedCourses]);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    
    // Auto-populate for the specific demo persona: Sophomore CS Major
    // We assume they finished Freshman year
    let initialPlan: PlannedCourse[] = [];
    
    if (newProfile.major === "Computer Science" && newProfile.year === "Sophomore") {
      initialPlan = [
        // Freshman Fall
        { courseId: "CS 1301", year: 1, semester: "Fall", uniqueId: "auto-1" },
        { courseId: "MATH 1554", year: 1, semester: "Fall", uniqueId: "auto-2" },
        { courseId: "ENGL 1101", year: 1, semester: "Fall", uniqueId: "auto-3" },
        
        // Freshman Spring
        { courseId: "CS 1331", year: 1, semester: "Spring", uniqueId: "auto-4" },
        { courseId: "PHYS 2211", year: 1, semester: "Spring", uniqueId: "auto-5" },
        { courseId: "ENGL 1102", year: 1, semester: "Spring", uniqueId: "auto-6" }
      ];
      setPlannedCourses(initialPlan);
    }

    setView('DASHBOARD');
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to start over? This will delete your profile and course plan permanently.")) {
      localStorage.removeItem(STORAGE_KEY_PROFILE);
      localStorage.removeItem(STORAGE_KEY_PLAN);
      setProfile(null);
      setPlannedCourses([]);
      setView('ONBOARDING');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="antialiased text-slate-200 selection:bg-blue-500/30">
      {view === 'ONBOARDING' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {view === 'DASHBOARD' && profile && (
        <Dashboard 
          profile={profile} 
          onNavigate={(v) => setView(v)} 
          onReset={handleReset}
        />
      )}

      {view === 'PLANNER' && profile && (
        <Planner 
          profile={profile}
          plannedCourses={plannedCourses}
          setPlannedCourses={setPlannedCourses}
          onBack={() => setView('DASHBOARD')}
        />
      )}
    </div>
  );
};

export default App;
