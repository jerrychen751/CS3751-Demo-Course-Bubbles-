import React from 'react';
import { Course } from '../types';
import { X, Clock, BookOpen, Calendar, AlertCircle } from 'lucide-react';
import { COURSES } from '../constants';

interface CourseModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onAddToPlan?: () => void;
  isAlreadyPlanned?: boolean;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose, onAddToPlan, isAlreadyPlanned }) => {
  if (!isOpen) return null;

  const prerequisitesNames = course.prerequisites.map(id => {
    const c = COURSES.find(c => c.id === id);
    return c ? c.code : id;
  }).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md glass-panel bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden border border-slate-700 animate-[scaleIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 flex flex-col justify-end">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>
          <span className="text-blue-200 text-sm font-bold tracking-wider mb-1">{course.code}</span>
          <h2 className="text-2xl font-bold text-white">{course.name}</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          <div className="flex space-x-4 text-sm text-slate-300">
            <div className="flex items-center space-x-1.5">
              <Clock size={16} className="text-blue-400" />
              <span>{course.credits} Credits</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar size={16} className="text-purple-400" />
              <span>{course.semesters.join(', ')}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Description</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {course.description}
            </p>
          </div>

          {course.prerequisites.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-400" />
                Prerequisites
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map(pre => (
                  <span key={pre} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">
                    {COURSES.find(c => c.id === pre)?.code || pre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {onAddToPlan && !isAlreadyPlanned && (
            <button
              onClick={() => {
                onAddToPlan();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <BookOpen size={18} />
              <span>Add to Plan</span>
            </button>
          )}
          
          {isAlreadyPlanned && (
             <div className="w-full py-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300 font-semibold text-center">
               Already in Plan
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CourseModal;