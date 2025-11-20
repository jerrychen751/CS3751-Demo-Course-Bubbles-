
import { Course } from './types';

// Raw data structure provided
const RAW_COURSES: Record<string, any> = {
  // ========== COMPUTER SCIENCE COURSES ==========
  "CS 1301": {
    id: "CS 1301",
    name: "Introduction to Computing and Programming",
    credits: 3,
    prereqs: [],
    description: "An introduction to computing principles and programming. Topics include data types, control structures, functions, arrays, file processing, and the mechanics of running, testing, and debugging.",
    semestersOffered: ["Fall", "Spring", "Summer"]
  },

  "CS 1331": {
    id: "CS 1331",
    name: "Introduction to Object Oriented Programming",
    credits: 3,
    prereqs: ["CS 1301"],
    description: "Introduction to object-oriented programming. Topics include classes, objects, inheritance, polymorphism, interfaces, exception handling, and basic data structures.",
    semestersOffered: ["Fall", "Spring", "Summer"]
  },

  "CS 1332": {
    id: "CS 1332",
    name: "Data Structures and Algorithms",
    credits: 3,
    prereqs: ["CS 1331"],
    description: "Fundamental data structures and algorithms. Topics include arrays, linked lists, stacks, queues, trees, hash tables, graphs, and their associated algorithms. Analysis of algorithm complexity. PREREQUISITE for most upper-level CS courses including People and Media thread courses.",
    semestersOffered: ["Fall", "Spring", "Summer"]
  },

  "CS 2050": {
    id: "CS 2050",
    name: "Introduction to Discrete Mathematics",
    credits: 3,
    prereqs: ["CS 1301"],
    description: "Introduction to discrete mathematics for computer science. Topics include logic, sets, functions, relations, combinatorics, graph theory, and proof techniques.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 2110": {
    id: "CS 2110",
    name: "Computer Organization and Programming",
    credits: 4,
    prereqs: ["CS 1331"],
    description: "Introduction to computer organization and systems programming. Topics include machine representation of data, assembly language, memory organization, and system-level programming. PREREQUISITE for Systems & Architecture thread courses.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 2340": {
    id: "CS 2340",
    name: "Objects and Design",
    credits: 3,
    prereqs: ["CS 1332"],
    description: "Advanced object-oriented design principles. Topics include design patterns, software architecture, UML modeling, and refactoring techniques. Required core course and prerequisite for People/Media thread courses.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3451": {
    id: "CS 3451",
    name: "Computer Graphics",
    credits: 3,
    prereqs: ["CS 1332"],
    description: "Introduction to computer graphics. Topics include 2D and 3D graphics, rendering, transformations, and graphics programming. Required prerequisite for many People and Media thread courses including CS 4460.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3600": {
    id: "CS 3600",
    name: "Introduction to Artificial Intelligence",
    credits: 3,
    prereqs: ["CS 1332", "CS 2050"],
    description: "Introduction to artificial intelligence. Topics include search algorithms, knowledge representation, reasoning, machine learning, and natural language processing.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3790": {
    id: "CS 3790",
    name: "Introduction to Cognitive Science",
    credits: 3,
    prereqs: ["CS 1331"],
    description: "Introduction to cognitive science. Topics include perception, memory, reasoning, language, and the computational modeling of cognitive processes.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4460": {
    id: "CS 4460",
    name: "Introduction to Information Visualization",
    credits: 3,
    prereqs: ["CS 3451"],
    description: "Introduction to information visualization principles and techniques. Topics include visual perception, data representation, interaction design, and visualization tools. Part of the People thread - explores how humans interact with and understand data. Requires CS 3451 (Computer Graphics) as prerequisite.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3751": {
    id: "CS 3751",
    name: "Introduction to User Interface Design",
    credits: 3,
    prereqs: ["CS 1331"],
    description: "Introduction to user interface design and implementation. Topics include UI frameworks, interaction design, usability testing, and human-computer interaction principles. Required for People thread - bridges human-computer interaction and media design.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4470": {
    id: "CS 4470",
    name: "Introduction to User Interface Software",
    credits: 3,
    prereqs: ["CS 2340", "CS 3751"],
    description: "Introduction to user interface design and implementation. Topics include UI frameworks, interaction design, usability testing, and human-computer interaction principles. Alternative course for People/Media threads.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4641": {
    id: "CS 4641",
    name: "Machine Learning",
    credits: 3,
    prereqs: ["CS 1332", "MATH 1554"],
    description: "Introduction to machine learning algorithms and applications. Topics include supervised learning, unsupervised learning, neural networks, and deep learning.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 2261": {
    id: "CS 2261",
    name: "Media Device Architectures",
    credits: 3,
    prereqs: ["CS 1331"],
    description: "Introduction to media device architectures and programming. Topics include graphics hardware, media processing, and device programming. Part of the Media thread - explores computing for media applications.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4830": {
    id: "CS 4830",
    name: "Introduction to Game Design",
    credits: 3,
    prereqs: ["CS 1332"],
    description: "Introduction to video game design and development. Topics include game mechanics, level design, game engines, and interactive storytelling. Part of the Media thread - explores interactive media and entertainment technology.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3210": {
    id: "CS 3210",
    name: "Design of Operating Systems",
    credits: 3,
    prereqs: ["CS 2110"],
    description: "Design and implementation of operating systems. Topics include process management, memory management, file systems, and concurrency.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4290": {
    id: "CS 4290",
    name: "Computer Architecture",
    credits: 3,
    prereqs: ["CS 2110"],
    description: "Computer architecture and design. Topics include instruction set architecture, pipelining, memory hierarchies, and parallel processing.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3510": {
    id: "CS 3510",
    name: "Design and Analysis of Algorithms",
    credits: 3,
    prereqs: ["CS 1332", "CS 2050"],
    description: "Advanced algorithm design and analysis. Topics include divide-and-conquer, dynamic programming, greedy algorithms, graph algorithms, and NP-completeness.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3251": {
    id: "CS 3251",
    name: "Computer Networks I",
    credits: 3,
    prereqs: ["CS 2110"],
    description: "Introduction to computer networks. Topics include network architecture, protocols, routing, congestion control, and network security.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4605": {
    id: "CS 4605",
    name: "Mobile and Ubiquitous Computing",
    credits: 3,
    prereqs: ["CS 1332", "CS 2340"],
    description: "Explores computing beyond the desktop, including mobile devices and pervasive computing environments. Topics include mobile application development, context-aware computing, and ubiquitous computing systems. Part of the People thread - focuses on how people interact with computing in everyday environments.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 3630": {
    id: "CS 3630",
    name: "Introduction to Perception and Robotics",
    credits: 3,
    prereqs: ["CS 1332"],
    description: "Introduction to perception systems and robotics. Topics include computer vision, sensor systems, and human-robot interaction. Part of the People thread - explores how computing systems perceive and interact with the physical world and people.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4496": {
    id: "CS 4496",
    name: "Computer Animation",
    credits: 3,
    prereqs: ["CS 1332", "CS 3451"],
    description: "Principles and techniques of computer-generated animation. Topics include keyframe animation, motion capture, character rigging, and animation systems. Part of the Media thread - explores animation for games, films, and interactive media.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4823": {
    id: "CS 4823",
    name: "Advanced Computer Graphics",
    credits: 3,
    prereqs: ["CS 1332", "CS 3451"],
    description: "Advanced topics in computer graphics. Topics include rendering techniques, shader programming, and advanced graphics algorithms. Part of the Media thread - builds on CS 3451 with deeper exploration of graphics systems.",
    semestersOffered: ["Fall", "Spring"]
  },

  "CS 4670": {
    id: "CS 4670",
    name: "Computational Photography",
    credits: 3,
    prereqs: ["CS 1332", "CS 3451"],
    description: "Computational techniques for digital photography and image processing. Topics include image enhancement, computational imaging, and advanced photography algorithms. Part of the Media thread - explores the intersection of computing and visual media.",
    semestersOffered: ["Fall", "Spring"]
  },

  // ========== MATHEMATICS COURSES ==========
  "MATH 1554": {
    id: "MATH 1554",
    name: "Linear Algebra",
    credits: 4,
    prereqs: [],
    description: "Introduction to linear algebra. Topics include systems of linear equations, matrices, vector spaces, eigenvalues, and eigenvectors. REQUIRED for CS majors. This course fills up quickly during registration.",
    semestersOffered: ["Fall", "Spring", "Summer"]
  },

  "MATH 2016": {
    id: "MATH 2016",
    name: "Differential Equations",
    credits: 3,
    prereqs: ["MATH 1554"],
    description: "Introduction to ordinary differential equations. Topics include first-order equations, linear equations, systems of equations, and applications.",
    semestersOffered: ["Fall", "Spring"]
  },

  "MATH 3012": {
    id: "MATH 3012",
    name: "Applied Combinatorics",
    credits: 3,
    prereqs: ["MATH 1554"],
    description: "Combinatorial analysis and applications. Topics include permutations, combinations, generating functions, recurrence relations, and graph theory.",
    semestersOffered: ["Fall", "Spring"]
  },

  "MATH 3215": {
    id: "MATH 3215",
    name: "Introduction to Probability and Statistics",
    credits: 3,
    prereqs: ["MATH 1554"],
    description: "Introduction to probability theory and statistical methods. Topics include probability distributions, random variables, hypothesis testing, and regression analysis.",
    semestersOffered: ["Fall", "Spring"]
  },

  // ========== PHYSICS COURSES ==========
  "PHYS 2211": {
    id: "PHYS 2211",
    name: "Introductory Physics I",
    credits: 4,
    prereqs: [],
    description: "Introduction to mechanics, waves, and thermodynamics. Topics include kinematics, dynamics, energy, momentum, rotational motion, and oscillations.",
    semestersOffered: ["Fall", "Spring", "Summer"]
  },

  "PHYS 2212": {
    id: "PHYS 2212",
    name: "Introductory Physics II",
    credits: 4,
    prereqs: ["PHYS 2211"],
    description: "Introduction to electricity, magnetism, and optics. Topics include electric fields, magnetic fields, electromagnetic waves, and geometric optics.",
    semestersOffered: ["Fall", "Spring"]
  },

  "PHYS 2021": {
    id: "PHYS 2021",
    name: "Modern Physics",
    credits: 3,
    prereqs: ["PHYS 2212"],
    description: "Introduction to modern physics. Topics include special relativity, quantum mechanics, atomic physics, and nuclear physics.",
    semestersOffered: ["Fall", "Spring"]
  },

  // ========== ELECTRICAL & COMPUTER ENGINEERING COURSES ==========
  "ECE 2031": {
    id: "ECE 2031",
    name: "Digital Design Laboratory",
    credits: 2,
    prereqs: [],
    description: "Laboratory course in digital design. Topics include combinational and sequential logic, FPGA programming, and digital system design.",
    semestersOffered: ["Fall", "Spring"]
  },

  "ECE 2020": {
    id: "ECE 2020",
    name: "Digital System Design",
    credits: 3,
    prereqs: ["ECE 2031"],
    description: "Design of digital systems using hardware description languages. Topics include combinational and sequential circuit design, state machines, and system integration.",
    semestersOffered: ["Fall", "Spring"]
  },

  "ECE 3025": {
    id: "ECE 3025",
    name: "Electromagnetic Fields and Applications",
    credits: 3,
    prereqs: ["PHYS 2212", "MATH 2016"],
    description: "Introduction to electromagnetic fields. Topics include electrostatics, magnetostatics, electromagnetic waves, and transmission lines.",
    semestersOffered: ["Fall", "Spring"]
  },

  // ========== MECHANICAL ENGINEERING COURSES ==========
  "ME 1770": {
    id: "ME 1770",
    name: "Introduction to Engineering Graphics",
    credits: 2,
    prereqs: [],
    description: "Introduction to engineering graphics and computer-aided design. Topics include orthographic projection, dimensioning, and CAD software.",
    semestersOffered: ["Fall", "Spring"]
  },

  "ME 2016": {
    id: "ME 2016",
    name: "Computing Techniques",
    credits: 3,
    prereqs: [],
    description: "Introduction to computing for mechanical engineers. Topics include MATLAB programming, numerical methods, and data analysis.",
    semestersOffered: ["Fall", "Spring"]
  },

  // ========== AEROSPACE ENGINEERING COURSES ==========
  "AE 1601": {
    id: "AE 1601",
    name: "Introduction to Aerospace Engineering",
    credits: 2,
    prereqs: [],
    description: "Introduction to aerospace engineering principles. Topics include aerodynamics, propulsion, structures, and flight mechanics.",
    semestersOffered: ["Fall", "Spring"]
  },

  "AE 2010": {
    id: "AE 2010",
    name: "Thermodynamics and Fluids Fundamentals",
    credits: 3,
    prereqs: ["PHYS 2211", "MATH 2016"],
    description: "Fundamentals of thermodynamics and fluid mechanics. Topics include energy conservation, entropy, fluid statics, and fluid dynamics.",
    semestersOffered: ["Fall", "Spring"]
  },

  // ========== HUMANITIES ==========
  "ENGL 1101": {
    id: "ENGL 1101",
    name: "English Composition I",
    credits: 3,
    prereqs: [],
    description: "Rhetorical principles of grammar, usage, and style; practice in expository writing.",
    semestersOffered: ["Fall", "Spring", "Summer"]
  },

  "ENGL 1102": {
    id: "ENGL 1102",
    name: "English Composition II",
    credits: 3,
    prereqs: ["ENGL 1101"],
    description: "Research-based writing; study of literature/culture.",
    semestersOffered: ["Fall", "Spring", "Summer"]
  }
};

export const DEGREES = {
  majors: [
    { id: "cs", name: "Computer Science" },
    { id: "phys", name: "Physics" },
    { id: "math", name: "Mathematics" },
    { id: "ece", name: "Electrical and Computer Engineering" },
    { id: "me", name: "Mechanical Engineering" },
    { id: "ae", name: "Aerospace Engineering" }
  ],
  minors: [
    { id: "phys_minor", name: "Physics Minor" },
    { id: "math_minor", name: "Mathematics Minor" },
    { id: "cs_minor", name: "Computer Science Minor" },
    { id: "ece_minor", name: "Electrical and Computer Engineering Minor" }
  ],
  threads: {
    "Intelligence": ["CS 3600", "CS 4641"],
    "People": ["CS 3751", "CS 4460", "CS 4470", "CS 4605", "CS 3630", "CS 3790"],
    "Media": ["CS 2261", "CS 3451", "CS 4830", "CS 4496", "CS 4823", "CS 4670"],
    "Systems & Architecture": ["CS 3210", "CS 4290"],
    "Theory": ["CS 3510", "CS 2050"],
    "Networks": ["CS 3251", "CS 2110"]
  }
};

export const MAJORS = DEGREES.majors.map(m => m.name);
export const THREADS = Object.keys(DEGREES.threads);
export const MINORS = DEGREES.minors.map(m => m.name);

export const ACADEMIC_YEARS = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior"
];

export const INTERESTS = [
  "Software Engineering",
  "Artificial Intelligence",
  "Web Development",
  "Robotics",
  "Data Science",
  "Cybersecurity",
  "Game Design",
  "Systems",
  "Theory",
  "Visual Effects",
  "Aerospace",
  "Physics",
  "Hardware"
];

// Helper to infer category from course code
const getCategory = (id: string): Course['category'] => {
  const prefix = id.split(' ')[0];
  switch (prefix) {
    case 'MATH': return 'math';
    case 'PHYS': return 'science';
    case 'ENGL': return 'humanities';
    case 'ECE':
    case 'ME':
    case 'AE':
      return 'engineering';
    case 'CS':
      // Simple heuristic for CS courses
      return 'core';
    default: return 'elective';
  }
};

// Helper to infer typical year from course number (1xxx -> 1, etc)
const getTypicalYear = (id: string): number => {
  const numPart = id.split(' ')[1];
  if (!numPart) return 1;
  const year = parseInt(numPart[0]);
  return isNaN(year) ? 1 : Math.min(Math.max(year, 1), 4);
};

// Convert raw map to Course array expected by the app
export const COURSES: Course[] = Object.values(RAW_COURSES).map((c: any) => ({
  id: c.id,
  code: c.id,
  name: c.name,
  description: c.description,
  credits: c.credits,
  prerequisites: c.prereqs || [],
  semesters: c.semestersOffered,
  category: getCategory(c.id),
  typicalYear: getTypicalYear(c.id)
}));
