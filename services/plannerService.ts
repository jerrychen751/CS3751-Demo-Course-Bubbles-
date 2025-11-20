
import { PlannedCourse } from '../types';

export const getCreditTotal = (plannedCourses: PlannedCourse[], allCourses: any[]): number => {
  return plannedCourses.reduce((total, plan) => {
    const course = allCourses.find(c => c.id === plan.courseId);
    return total + (course ? course.credits : 0);
  }, 0);
};

export const checkPrerequisites = (
  courseId: string,
  year: number,
  semester: 'Fall' | 'Spring' | 'Summer',
  plannedCourses: PlannedCourse[],
  allCourses: any[]
): { satisfied: boolean; missing: string[] } => {
  const targetCourse = allCourses.find(c => c.id === courseId);
  if (!targetCourse || targetCourse.prerequisites.length === 0) {
    return { satisfied: true, missing: [] };
  }

  const missing: string[] = [];
  
  targetCourse.prerequisites.forEach((preReqId: string) => {
    const preReqTaken = plannedCourses.find(p => {
      // Must be taken BEFORE the current year/semester
      if (p.courseId !== preReqId) return false;
      
      if (p.year < year) return true;
      
      // Handle prerequisites in the same year
      if (p.year === year) {
        if (p.semester === 'Fall' && semester !== 'Fall') return true;
        if (p.semester === 'Spring' && semester === 'Summer') return true;
      }
      
      return false;
    });

    if (!preReqTaken) {
      const preReqName = allCourses.find(c => c.id === preReqId)?.code || preReqId;
      missing.push(preReqName);
    }
  });

  return {
    satisfied: missing.length === 0,
    missing
  };
};