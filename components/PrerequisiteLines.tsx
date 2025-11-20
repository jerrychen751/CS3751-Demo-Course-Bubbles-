
import React, { useEffect, useState, useCallback } from 'react';
import { PlannedCourse, Course } from '../types';
import { COURSES } from '../constants';

interface Props {
  plannedCourses: PlannedCourse[];
  containerRef: React.RefObject<HTMLDivElement>;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isValid: boolean;
  id: string;
}

const PrerequisiteLines: React.FC<Props> = ({ plannedCourses, containerRef }) => {
  const [lines, setLines] = useState<Line[]>([]);

  const calculateLines = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines: Line[] = [];

    plannedCourses.forEach(target => {
      const course = COURSES.find(c => c.id === target.courseId);
      if (!course || !course.prerequisites.length) return;

      const targetEl = document.getElementById(`bubble-${target.uniqueId}`);
      if (!targetEl) return;
      const targetRect = targetEl.getBoundingClientRect();
      
      // Center of target bubble relative to container
      const x2 = targetRect.left - containerRect.left + targetRect.width / 2;
      const y2 = targetRect.top - containerRect.top + targetRect.height / 2;

      course.prerequisites.forEach(preId => {
        // Find prerequisite in plan
        const prePlan = plannedCourses.find(p => p.courseId === preId);
        if (prePlan) {
          const preEl = document.getElementById(`bubble-${prePlan.uniqueId}`);
          if (preEl) {
            const preRect = preEl.getBoundingClientRect();
            const x1 = preRect.left - containerRect.left + preRect.width / 2;
            const y1 = preRect.top - containerRect.top + preRect.height / 2;

            // Check validity (Pre should be earlier year or same year earlier semester)
            let isValid = false;
            if (prePlan.year < target.year) isValid = true;
            else if (prePlan.year === target.year) {
              if (prePlan.semester === 'Fall' && target.semester !== 'Fall') isValid = true;
              if (prePlan.semester === 'Spring' && target.semester === 'Summer') isValid = true;
            }

            newLines.push({ x1, y1, x2, y2, isValid, id: `${prePlan.uniqueId}-${target.uniqueId}` });
          }
        }
      });
    });

    setLines(newLines);
  }, [plannedCourses, containerRef]);

  useEffect(() => {
    calculateLines();
    
    // Re-calculate on window resize
    window.addEventListener('resize', calculateLines);
    // Re-calculate after a short delay to allow DOM updates (drag drop settlement)
    const timeout = setTimeout(calculateLines, 100);
    
    return () => {
      window.removeEventListener('resize', calculateLines);
      clearTimeout(timeout);
    };
  }, [calculateLines, plannedCourses]); // Dependencies ensure update on plan change

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <marker id="arrow-valid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#4ade80" opacity="0.6" />
        </marker>
        <marker id="arrow-invalid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#f87171" opacity="0.6" />
        </marker>
      </defs>
      {lines.map(line => {
        // Calculate Bézier Control Points for a smooth S-curve
        const dx = Math.abs(line.x2 - line.x1);
        const cp1x = line.x1 + dx * 0.5;
        const cp1y = line.y1;
        const cp2x = line.x2 - dx * 0.5;
        const cp2y = line.y2;
        
        const path = `M ${line.x1} ${line.y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${line.x2} ${line.y2}`;

        return (
          <g key={line.id}>
            <path
              d={path}
              fill="none"
              stroke={line.isValid ? "#4ade80" : "#f87171"}
              strokeWidth="2"
              strokeOpacity="0.4"
              strokeDasharray={line.isValid ? "none" : "5,5"}
              markerEnd={line.isValid ? "url(#arrow-valid)" : "url(#arrow-invalid)"}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default PrerequisiteLines;