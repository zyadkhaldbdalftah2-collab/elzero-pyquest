// ─── Core Lesson Types ───────────────────────────────────────────────

export interface MethodCard {
  name: string;
  signature: string;
  descriptionAr: string;
  example: string;
}

export interface Pitfall {
  titleAr: string;
  wrongCode: string;
  correctCode: string;
  explanationAr: string;
}

// ─── Game Types ──────────────────────────────────────────────────────

export interface FillInTheBlanksGame {
  instruction: string;
  codeTemplate: string; // use ___ for blanks
  blanks: string[];
  distractors: string[];
}

export interface BugHunterGame {
  instruction: string;
  code: string[];
  buggyLineIndex: number;
  explanation: string;
}

export interface MatchThePairsGame {
  instruction: string;
  pairs: { left: string; right: string }[];
}

export interface PredictTheOutputGame {
  instruction: string;
  code: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeUnscramblerGame {
  instruction: string;
  correctOrder: string[];
}

export interface TrueOrFalseGame {
  instruction: string;
  statements: { statement: string; isTrue: boolean; explanation: string }[];
}

export interface SyntaxSpotterGame {
  instruction: string;
  snippets: { code: string; isValid: boolean; explanation: string }[];
}

export interface TypeDetectiveGame {
  instruction: string;
  expressions: { expression: string; correctType: string; options: string[] }[];
}

export interface FlashCard {
  term: string;
  definition: string;
  example?: string;
}

export interface CodeFlashcardsGame {
  instruction: string;
  cards: FlashCard[];
}

export interface MiniProjectGame {
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  solution: string;
}

export interface EssayQuestion {
  question: string;
  modelAnswer: string;
}

export interface LessonGames {
  fillInTheBlanks: FillInTheBlanksGame;
  bugHunter: BugHunterGame;
  matchThePairs: MatchThePairsGame;
  predictTheOutput: PredictTheOutputGame;
  codeUnscrambler: CodeUnscramblerGame;
  trueOrFalse: TrueOrFalseGame;
  syntaxSpotter: SyntaxSpotterGame;
  typeDetective: TypeDetectiveGame;
  codeFlashcards: CodeFlashcardsGame;
  miniProject: MiniProjectGame;
}

export interface Lesson {
  id: number;
  titleAr: string;
  titleEn: string;
  module: string;
  summaryAr: string[];
  methods: MethodCard[];
  pitfalls: Pitfall[];
  games: LessonGames;
  essayQuestions: EssayQuestion[];
}

// ─── Course Structure ────────────────────────────────────────────────

export interface CourseModule {
  id: string;
  nameEn: string;
  nameAr: string;
  lessonRange: [number, number];
}

// ─── Gamification & Local Progress ───────────────────────────────────

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: number[];
  completedGames: Record<string, string[]>; // lessonId -> game names
}

export const XP_REWARDS: Record<string, number> = {
  fillInTheBlanks: 10,
  bugHunter: 15,
  matchThePairs: 15,
  predictTheOutput: 15,
  codeUnscrambler: 20,
  trueOrFalse: 10,
  syntaxSpotter: 15,
  typeDetective: 10,
  codeFlashcards: 10,
  miniProject: 50,
};

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXPForNextLevel(level: number): number {
  return level * 100;
}

// ─── Supabase Cloud Profile & Leaderboard ─────────────────────────────

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  xp: number;
  level: number;
  streak: number;
  last_active_date?: string | null;
  completed_lessons: number[];
  completed_games?: Record<string, string[]> | null;
  created_at?: string;
  updated_at?: string;
}

export type RankTitle =
  | "Python Novice"
  | "Script Builder"
  | "Code Architect"
  | "Python Master";

export interface RankInfo {
  title: RankTitle;
  rankLevel: number;
  badgeColor: string;
  description: string;
}

export function getRankTitle(xp: number): RankInfo {
  if (xp >= 1000) {
    return {
      title: "Python Master",
      rankLevel: 4,
      badgeColor: "text-python-yellow border-python-yellow/50 bg-python-yellow/10",
      description: "Mastered core paradigms, advanced algorithms, and pythonic development.",
    };
  }
  if (xp >= 500) {
    return {
      title: "Code Architect",
      rankLevel: 3,
      badgeColor: "text-purple-400 border-purple-500/50 bg-purple-500/10",
      description: "Designs robust Python programs and solves intermediate problems.",
    };
  }
  if (xp >= 200) {
    return {
      title: "Script Builder",
      rankLevel: 2,
      badgeColor: "text-blue-400 border-blue-500/50 bg-blue-500/10",
      description: "Comfortable with syntax, data structures, and script composition.",
    };
  }
  return {
    title: "Python Novice",
    rankLevel: 1,
    badgeColor: "text-emerald-400 border-emerald-500/50 bg-emerald-500/10",
    description: "Starting the Python journey with foundational syntax and first programs.",
  };
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  issuer: string;
  isUnlocked: boolean;
  requiredXP: number;
  requiredLessons: number;
  issuedDate?: string;
}

export function getUserCertificates(xp: number, completedCount: number): Certificate[] {
  return [
    {
      id: "cert_basics",
      title: "Python Fundamentals Certificate",
      description: "Mastered Python syntax, print(), comments, variables and basic operators.",
      issuer: "PyVerse Academy • Osama Elzero Track",
      isUnlocked: xp >= 50 || completedCount >= 3,
      requiredXP: 50,
      requiredLessons: 3,
      issuedDate: "Verified",
    },
    {
      id: "cert_data",
      title: "Data Structures Specialist",
      description: "Demonstrated competence in Python lists, tuples, dictionaries, and sets.",
      issuer: "PyVerse Academy",
      isUnlocked: xp >= 250 || completedCount >= 10,
      requiredXP: 250,
      requiredLessons: 10,
    },
    {
      id: "cert_algorithms",
      title: "Algorithmic Control Flow Solver",
      description: "Proficiency in conditions, loops, recursion, and function architecture.",
      issuer: "PyVerse Academy",
      isUnlocked: xp >= 600 || completedCount >= 25,
      requiredXP: 600,
      requiredLessons: 25,
    },
    {
      id: "cert_master",
      title: "PyVerse Academy Certified Python Master",
      description: "The pinnacle Python credential: OOP, file handling, and full curriculum completion of Osama Elzero's Mastering Python course.",
      issuer: "PyVerse Academy • Osama Elzero Track",
      isUnlocked: xp >= 1200 || completedCount >= 50,
      requiredXP: 1200,
      requiredLessons: 50,
    },
  ];
}
