
import React, { useState, useRef, useEffect } from 'react';
import { Course, PlannedCourse, UserProfile, DragItem } from '../types';
import { COURSES } from '../constants';
import { Search, Trash2, AlertTriangle, CheckCircle2, ArrowLeft, Info, MoveHorizontal, Calendar, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import CourseModal from './CourseModal';
import PrerequisiteLines from './PrerequisiteLines';
import CalendarView from './CalendarView';
import { checkPrerequisites, getCreditTotal } from '../services/plannerService';

interface PlannerProps {
  profile: UserProfile;
  plannedCourses: PlannedCourse[];
  setPlannedCourses: React.Dispatch<React.SetStateAction<PlannedCourse[]>>;
  onBack: () => void;
}

type ViewMode = 'ROADMAP' | 'CALENDAR';

const Planner: React.FC<PlannerProps> = ({ profile, plannedCourses, setPlannedCourses, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('ROADMAP');
  
  // Calendar State
  const [calYear, setCalYear] = useState(1);
  const [calSemester, setCalSemester] = useState<'Fall' | 'Spring' | 'Summer'>('Fall');

  // Ref for the inner content div that dictates the full scrollable size
  const canvasRef = useRef<HTMLDivElement>(null);

  const years = [1, 2, 3, 4];
  const semesters: ('Fall' | 'Spring' | 'Summer')[] = ['Fall', 'Spring', 'Summer'];

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollInteraction = () => {
    if (showScrollHint) setShowScrollHint(false);
  };

  // Filter sidebar courses
  const availableCourses = COURSES.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, year: number, semester: string) => {
    e.preventDefault();
    setDragOverId(`${year}-${semester}`);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, year: number, semester: 'Fall' | 'Spring' | 'Summer') => {
    e.preventDefault();
    setDragOverId(null);
    
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;

    const item: DragItem = JSON.parse(data);
    
    if (item.type === 'sidebar') {
      // Add new course
      // Check if already added
      if (plannedCourses.some(p => p.courseId === item.courseId)) {
        alert("Course already in plan!");
        return;
      }
      const newCourse: PlannedCourse = {
        courseId: item.courseId,
        year,
        semester: semester,
        uniqueId: `${item.courseId}-${Date.now()}`
      };
      setPlannedCourses(prev => [...prev, newCourse]);
    } else {
      // Move existing course
      setPlannedCourses(prev => prev.map(p => {
        if (p.courseId === item.courseId) {
          return { ...p, year, semester: semester };
        }
        return p;
      }));
    }
  };

  const handleRemoveCourse = (uniqueId: string) => {
    setPlannedCourses(prev => prev.filter(p => p.uniqueId !== uniqueId));
  };

  const getBubbleColor = (category: Course['category']) => {
    switch (category) {
      case 'core': return 'from-blue-500 to-indigo-600';
      case 'math': return 'from-red-500 to-pink-600';
      case 'science': return 'from-green-500 to-emerald-600';
      case 'engineering': return 'from-orange-500 to-amber-600';
      case 'humanities': return 'from-yellow-500 to-orange-500';
      default: return 'from-purple-500 to-violet-600';
    }
  };

  // Navigation logic for Calendar
  const cycleSemester = (direction: 'prev' | 'next') => {
    const semOrder = ['Fall', 'Spring', 'Summer'];
    let currentSemIdx = semOrder.indexOf(calSemester);
    let newYear = calYear;
    let newSemIdx = currentSemIdx;

    if (direction === 'next') {
      newSemIdx++;
      if (newSemIdx > 2) {
        newSemIdx = 0;
        newYear++;
      }
    } else {
      newSemIdx--;
      if (newSemIdx < 0) {
        newSemIdx = 2;
        newYear--;
      }
    }
    
    // Clamp year
    if (newYear < 1) newYear = 1;
    if (newYear > 4) newYear = 4;

    setCalYear(newYear);
    setCalSemester(semOrder[newSemIdx] as any);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a] text-white font-sans">
      
      {/* Sidebar: Course Bank */}
      <div className="w-80 flex-shrink-0 bg-slate-900/80 border-r border-white/10 flex flex-col z-30 backdrop-blur-xl shadow-xl">
        <div className="p-6 border-b border-white/10">
          <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Dashboard
          </button>
          <h2 className="text-xl font-bold text-white mb-1">Course Bank</h2>
          <p className="text-xs text-slate-500">Drag bubbles to the planner</p>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar pb-20">
          {availableCourses.map(course => {
            const isPlanned = plannedCourses.some(p => p.courseId === course.id);
            return (
              <div
                key={course.id}
                draggable={!isPlanned}
                onDragStart={(e) => handleDragStart(e, { courseId: course.id, type: 'sidebar' })}
                onClick={() => setSelectedCourseId(course.id)}
                className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-grab active:cursor-grabbing
                  ${isPlanned 
                    ? 'bg-slate-800/30 border-slate-800 opacity-50 grayscale' 
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-blue-400 block mb-1">{course.code}</span>
                    <h3 className="text-sm font-medium text-slate-200 leading-tight">{course.name}</h3>
                  </div>
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-400">{course.credits} cr</span>
                </div>
                {/* Hover Info Icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Info size={14} className="text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="h-16 bg-slate-900/80 border-b border-white/10 flex items-center justify-between px-8 z-30 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {profile.name}'s Plan
            </h1>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs border border-blue-500/20">
              {profile.major}
            </span>
          </div>

          {/* View Toggle & Calendar Controls */}
          <div className="flex items-center space-x-6">
            
            {/* Calendar Nav - Only show in Calendar Mode */}
            {viewMode === 'CALENDAR' && (
              <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700 animate-[fadeIn_0.2s_ease-out]">
                <button onClick={() => cycleSemester('prev')} className="p-1.5 hover:bg-slate-700 rounded-md text-slate-300"><ChevronLeft size={16}/></button>
                <span className="w-32 text-center font-medium text-sm text-white">Year {calYear} - {calSemester}</span>
                <button onClick={() => cycleSemester('next')} className="p-1.5 hover:bg-slate-700 rounded-md text-slate-300"><ChevronRight size={16}/></button>
              </div>
            )}

            {/* Toggle Switch */}
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('ROADMAP')}
                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'ROADMAP' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                <LayoutDashboard size={14} className="mr-2" /> Roadmap
              </button>
              <button
                onClick={() => setViewMode('CALENDAR')}
                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'CALENDAR' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                <Calendar size={14} className="mr-2" /> Schedule
              </button>
            </div>

            <div className="text-right border-l border-white/10 pl-6">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Credits</p>
              <p className="text-xl font-bold text-white">{getCreditTotal(plannedCourses, COURSES)}</p>
            </div>
          </div>
        </div>

        {/* View Content */}
        {viewMode === 'CALENDAR' ? (
          <CalendarView plannedCourses={plannedCourses} year={calYear} semester={calSemester} />
        ) : (
          // ROADMAP VIEW
          <div 
            className="flex-1 overflow-auto bg-[#0f172a] relative custom-scrollbar" 
            onScroll={handleScrollInteraction}
          >
            {/* Scroll Hint */}
            {showScrollHint && (
              <div className="fixed bottom-8 left-[55%] -translate-x-1/2 z-50 animate-bounce pointer-events-none">
                <div className="bg-blue-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 border border-blue-400/50">
                  <MoveHorizontal size={20} />
                  <span className="font-medium text-sm">Scroll horizontally to see more years</span>
                </div>
              </div>
            )}

            {/* Canvas Content (Large Width) */}
            <div 
              ref={canvasRef}
              className="min-w-[1800px] min-h-full p-10 grid grid-cols-4 gap-10 relative"
            >
              {/* SVG Layer */}
              <PrerequisiteLines plannedCourses={plannedCourses} containerRef={canvasRef} />

              {years.map(year => (
                <div key={year} className="flex flex-col space-y-4 z-10">
                  <div className="text-center pb-2 border-b border-white/10 sticky top-0 bg-[#0f172a]/95 backdrop-blur-sm z-20 py-2">
                    <h3 className="text-xl font-bold text-slate-300">Year {year}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-4 flex-1">
                    {semesters.map(semester => {
                      // Calculate credits for this specific semester
                      const semesterCredits = getCreditTotal(
                        plannedCourses.filter(p => p.year === year && p.semester === semester),
                        COURSES
                      );

                      return (
                        <div
                          key={`${year}-${semester}`}
                          onDragOver={(e) => handleDragOver(e, year, semester)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, year, semester)}
                          className={`
                            flex-1 min-h-[250px] rounded-2xl border-2 border-dashed transition-all duration-300 p-4 pt-12 flex flex-wrap content-start gap-4 relative
                            ${dragOverId === `${year}-${semester}` 
                              ? 'border-blue-500 bg-blue-500/10 scale-[1.02] shadow-xl' 
                              : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                            }
                          `}
                        >
                          {/* Semester Header with Credits */}
                          <div className="absolute top-3 left-4 right-4 flex justify-between items-center pointer-events-none">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {semester}
                            </span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                              semesterCredits > 18 
                                ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                : semesterCredits > 0
                                  ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                                  : 'text-slate-700 border-transparent'
                            }`}>
                              {semesterCredits} Cr
                            </span>
                          </div>

                          {plannedCourses
                            .filter(p => p.year === year && p.semester === semester)
                            .map(plan => {
                              const course = COURSES.find(c => c.id === plan.courseId)!;
                              const { satisfied } = checkPrerequisites(course.id, year, semester, plannedCourses, COURSES);

                              return (
                                <div
                                  key={plan.uniqueId}
                                  id={`bubble-${plan.uniqueId}`}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, { courseId: course.id, type: 'canvas', originalYear: year, originalSemester: semester })}
                                  onClick={(e) => { e.stopPropagation(); setSelectedCourseId(course.id); }}
                                  className={`
                                    relative group w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center text-center shadow-lg cursor-grab active:cursor-grabbing
                                    bg-gradient-to-br ${getBubbleColor(course.category)}
                                    hover:scale-110 hover:z-50 transition-all duration-200 border-2
                                    ${satisfied ? 'border-transparent' : 'border-red-400 animate-pulse'}
                                  `}
                                >
                                  <span className="text-[9px] font-bold text-white/80 mb-0.5">{course.code}</span>
                                  <span className="text-[8px] leading-tight font-medium text-white line-clamp-2 px-1 max-w-full overflow-hidden">{course.name}</span>
                                  
                                  {/* Delete Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveCourse(plan.uniqueId);
                                    }}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600 scale-75 hover:scale-100"
                                  >
                                    <Trash2 size={14} />
                                  </button>

                                  {/* Warning Icon if prereqs missing */}
                                  {!satisfied && (
                                    <div className="absolute -bottom-1 bg-red-500 text-white rounded-full p-1 shadow-sm z-10">
                                      <AlertTriangle size={12} />
                                    </div>
                                  )}
                                   {/* Success Icon if prereqs met */}
                                  {satisfied && (
                                    <div className="absolute -bottom-1 bg-green-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                      <CheckCircle2 size={12} />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCourseId && (
        <CourseModal
          course={COURSES.find(c => c.id === selectedCourseId)!}
          isOpen={!!selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
          isAlreadyPlanned={plannedCourses.some(p => p.courseId === selectedCourseId)}
        />
      )}
    </div>
  );
};

export default Planner;
