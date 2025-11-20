
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  prerequisites: string[]; // Array of course IDs
  semesters: string[];
  category: 'core' | 'elective' | 'minor' | 'math' | 'science' | 'engineering' | 'humanities';
  typicalYear: number;
}

export interface UserProfile {
  name: string;
  year: string;
  major: string;
  threads: string[];
  minor: string;
  interests: string[];
  onboardingComplete: boolean;
}

export interface PlannedCourse {
  courseId: string;
  year: number; // 1, 2, 3, 4
  semester: 'Fall' | 'Spring' | 'Summer';
  uniqueId: string; // To handle potential duplicates if allowed, though usually not.
}

export type ViewState = 'ONBOARDING' | 'DASHBOARD' | 'PLANNER';

export interface DragItem {
  courseId: string;
  type: 'sidebar' | 'canvas';
  originalYear?: number;
  originalSemester?: 'Fall' | 'Spring' | 'Summer';
}