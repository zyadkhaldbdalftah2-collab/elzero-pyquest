import os
import json

# Base project path
BASE = r"C:\Users\ZEZO\.gemini\antigravity\scratch\elzero-pyquest"

TYPES_DEF = r"""
// All types are in @/types/index.ts
// Key interfaces: Lesson, LessonGames, FillInTheBlanksGame, BugHunterGame,
// MatchThePairsGame, PredictTheOutputGame, CodeUnscramblerGame, TrueOrFalseGame,
// SyntaxSpotterGame, TypeDetectiveGame, CodeFlashcardsGame, MiniProjectGame,
// EssayQuestion, MethodCard, Pitfall, FlashCard, UserProgress, XP_REWARDS

interface FillInTheBlanksGame { instruction:string; codeTemplate:string; blanks:string[]; distractors:string[]; }
interface BugHunterGame { instruction:string; code:string[]; buggyLineIndex:number; explanation:string; }
interface MatchThePairsGame { instruction:string; pairs:{left:string;right:string}[]; }
interface PredictTheOutputGame { instruction:string; code:string; options:string[]; correctIndex:number; explanation:string; }
interface CodeUnscramblerGame { instruction:string; correctOrder:string[]; }
interface TrueOrFalseGame { instruction:string; statements:{statement:string;isTrue:boolean;explanation:string}[]; }
interface SyntaxSpotterGame { instruction:string; snippets:{code:string;isValid:boolean;explanation:string}[]; }
interface TypeDetectiveGame { instruction:string; expressions:{expression:string;correctType:string;options:string[]}[]; }
interface FlashCard { term:string; definition:string; example?:string; }
interface CodeFlashcardsGame { instruction:string; cards:FlashCard[]; }
interface MiniProjectGame { title:string; description:string; starterCode:string; expectedOutput:string; hints:string[]; solution:string; }
interface EssayQuestion { question:string; modelAnswer:string; }
interface MethodCard { name:string; signature:string; descriptionAr:string; example:string; }
interface Pitfall { titleAr:string; wrongCode:string; correctCode:string; explanationAr:string; }
interface LessonGames { fillInTheBlanks; bugHunter; matchThePairs; predictTheOutput; codeUnscrambler; trueOrFalse; syntaxSpotter; typeDetective; codeFlashcards; miniProject; }
interface Lesson { id:number; titleAr:string; titleEn:string; module:string; summaryAr:string[]; methods:MethodCard[]; pitfalls:Pitfall[]; games:LessonGames; essayQuestions:EssayQuestion[]; }
"""

# ── Agent briefs ──

LESSON_DATA_BRIEF = f"""You are a TypeScript code generator. Write the COMPLETE file `src/data/lessons.ts` for a Next.js project at `{BASE}`.

This file must export a `Map<number, Lesson>` called `lessonData` containing fully populated data for lessons #001 through #005 of Osama Elzero's "Mastering Python" YouTube course.

The types are imported from `@/types`:
{TYPES_DEF}

The 5 lessons are:
1. id:1, titleAr:"ما هي بايثون ولماذا نتعلمها؟", titleEn:"What Is Python & Why Learn It?", module:"intro"
2. id:2, titleAr:"تثبيت بايثون وإعداد بيئة العمل", titleEn:"Installing Python & Setting Up", module:"intro"
3. id:3, titleAr:"أول برنامج لك – الطباعة", titleEn:"Your First Program – print()", module:"intro"
4. id:4, titleAr:"التعليقات وتنظيم الكود", titleEn:"Comments & Code Organization", module:"intro"
5. id:5, titleAr:"المتغيرات وقواعد التسمية", titleEn:"Variables & Naming Rules", module:"intro"

For EACH lesson, provide:
- summaryAr: 5-8 Arabic bullet points summarizing the lesson
- methods: 3-6 MethodCard entries (name, signature, Arabic description, code example)
- pitfalls: 2-4 Pitfall entries (Arabic title, wrong code, correct code, Arabic explanation)
- games: ALL 10 games fully populated with realistic Python content:
  - fillInTheBlanks: code with ___ blanks, correct blanks array, distractor words
  - bugHunter: 5-8 lines of code, one buggy line index, explanation
  - matchThePairs: 5 pairs of Python syntax to English definitions
  - predictTheOutput: code snippet, 4 options, correct index, explanation
  - codeUnscrambler: 4-6 lines in correct order
  - trueOrFalse: 4-5 statements with isTrue and explanation
  - syntaxSpotter: 4-5 code snippets, some valid some invalid
  - typeDetective: 4-5 expressions with correct type and options
  - codeFlashcards: 5-6 flashcards with term, definition, example
  - miniProject: title, description, starter code, expected output, hints, solution
- essayQuestions: 3-4 English essay questions with model answers

IMPORTANT:
- All summaryAr, methods.descriptionAr, pitfalls.titleAr, pitfalls.explanationAr must be in ARABIC
- All games and essayQuestions must be in ENGLISH
- Code examples must be valid Python
- Use `import type {{ Lesson }} from "@/types";` at the top
- Export: `export const lessonData = new Map<number, Lesson>(); lessonData.set(1, lesson001); ...`
- Also export: `export function getLesson(id: number): Lesson | undefined {{ return lessonData.get(id); }}`

Write the COMPLETE file content. It will be very long. That's expected. Do NOT truncate or abbreviate.
"""

SIDEBAR_BRIEF = f"""You are a TypeScript/React code generator. Write TWO files for a Next.js project at `{BASE}`:

1. `src/components/Sidebar.tsx` - A collapsible sidebar component
2. `src/components/SearchBar.tsx` - A search/filter component

SIDEBAR REQUIREMENTS:
- "use client" at top
- Import courseModules and allLessons from `@/data/courseStructure`
- Import SearchBar from `@/components/SearchBar`
- Import Lucide icons: ChevronDown, ChevronRight, BookOpen, Menu, X, Trophy, Flame, Star
- Import useGameState or loadProgress from storage
- Props: {{ isOpen: boolean; onToggle: () => void; currentLessonId?: number }}
- Show logo "Elzero PyQuest" with Python icon at top
- Show XP, Level, Streak stats bar using loadProgress from @/lib/storage
- List all 16 modules as collapsible sections
- Each module shows its Arabic name + English name
- Under each module, list lessons as links to /lesson/[id]
- Current lesson highlighted with python-blue
- Completed lessons show a checkmark
- Mobile responsive: overlay on small screens
- Dark theme: bg-slate-900, borders border-slate-800
- Use font-cairo for Arabic text, font-inter for English
- Include a search bar at top that filters lessons by title or module

SEARCHBAR REQUIREMENTS:
- "use client"
- Props: {{ value: string; onChange: (v: string) => void; placeholder?: string }}
- Lucide Search icon
- Styled input with bg-slate-800 border-slate-700
- Filter functionality built in

Use Next.js Link for navigation. TypeScript with no errors.
"""

LEFT_COL_BRIEF = f"""You are a TypeScript/React code generator. Write FOUR files for a Next.js project at `{BASE}`:

1. `src/components/VideoPlayer.tsx`
2. `src/components/LessonSummary.tsx`
3. `src/components/MethodsCheatSheet.tsx`
4. `src/components/CommonPitfalls.tsx`

All components use "use client", Tailwind CSS dark theme, and import types from `@/types`.

VIDEO PLAYER:
- Props: {{ lessonId: number }}
- Import getVideoUrl from `@/data/courseStructure`
- Responsive 16:9 iframe embed
- Styled with rounded-xl overflow-hidden border border-slate-800

LESSON SUMMARY (ملخص الدرس):
- Props: {{ summaryAr: string[] }}
- Section title in Arabic: "ملخص الدرس" with BookOpen icon from lucide-react
- dir="rtl" class="rtl-text font-cairo"
- Render bullet points as styled list items
- Dark cards bg-slate-900 border-slate-800

METHODS CHEAT SHEET (دليل الميثودز والكلمات المحجوزة):
- Props: {{ methods: MethodCard[] }} (import MethodCard from @/types)
- Section title in Arabic: "دليل الميثودز والكلمات المحجوزة"
- dir="rtl" for Arabic descriptions
- Each method as a card showing: name (code font), signature, Arabic description
- Copyable code snippet with a copy button (use navigator.clipboard)
- Import Copy, Check from lucide-react
- Code snippets in pre/code with dir="ltr" and font-fira

COMMON PITFALLS (أشهر الأخطاء الشائعة):
- Props: {{ pitfalls: Pitfall[] }} (import Pitfall from @/types)
- Section title: "أشهر الأخطاء الشائعة" with AlertTriangle icon
- Each pitfall as a warning card with:
  - Arabic title
  - Wrong Code (❌) block in red-tinted bg
  - Correct Code (✅) block in green-tinted bg
  - Arabic explanation
- dir="rtl" for Arabic, dir="ltr" for code blocks

All use Tailwind with bg-slate-900, border-slate-800 cards. TypeScript with zero errors.
"""

GAMES_A_BRIEF = f"""You are a TypeScript/React code generator. Write FIVE game component files for a Next.js project at `{BASE}/src/components/games/`:

All games are "use client" React components in English with Tailwind dark theme.
Import types from `@/types`. Each game has props like:
{{ data: GameDataType; onComplete: (gameName: string) => void; isCompleted: boolean }}

1. `FillInTheBlanks.tsx` (+10 XP):
- Show code with blanks (___) from data.codeTemplate
- Display clickable word chips (data.blanks + data.distractors shuffled)
- User clicks chips to fill blanks in order
- Check button validates, shows correct/incorrect feedback
- Calls onComplete("fillInTheBlanks") on success
- Green/red highlighting for feedback

2. `BugHunter.tsx` (+15 XP):
- Display numbered code lines from data.code array
- User clicks the line they think has the bug
- Selected line highlighted, check button to verify
- If correct: green highlight + explanation. If wrong: red + try again
- Calls onComplete("bugHunter") on success

3. `MatchThePairs.tsx` (+15 XP):
- Two columns: left (Python syntax) and right (English definitions)
- Right column is shuffled
- User selects one from left, one from right to match
- Matched pairs get highlighted and disabled
- When all matched correctly: calls onComplete("matchThePairs")
- Visual connecting lines or color-coded pairs

4. `PredictTheOutput.tsx` (+15 XP):
- Show code block from data.code
- Multiple choice radio buttons for data.options
- Submit button checks against data.correctIndex
- Show explanation on answer
- Calls onComplete("predictTheOutput") on correct

5. `CodeUnscrambler.tsx` (+20 XP):
- Display data.correctOrder lines in shuffled order
- User can drag/reorder lines (use state-based up/down buttons for simplicity)
- Check Order button validates sequence
- Calls onComplete("codeUnscrambler") when correct
- Show line numbers for reference

Each component should:
- Use font-fira for code, font-inter for text
- Use bg-slate-800/900 cards with border-slate-700
- Show a header with game title, XP reward badge, and completion status
- If isCompleted, show a "✅ Completed" badge and disable interactions
- Use lucide-react icons appropriately
- Be fully self-contained with internal state management via useState
- Have clean TypeScript types with zero errors
"""

GAMES_B_BRIEF = f"""You are a TypeScript/React code generator. Write FIVE game component files for a Next.js project at `{BASE}/src/components/games/`:

All games are "use client" React components in English with Tailwind dark theme.
Import types from `@/types`. Each game has props like:
{{ data: GameDataType; onComplete: (gameName: string) => void; isCompleted: boolean }}

6. `TrueOrFalse.tsx` (+10 XP):
- Show data.statements one at a time (or all at once)
- Each statement has True/False buttons
- After answering, show if correct + explanation
- Track score, call onComplete("trueOrFalse") when all answered correctly
- Green for correct, red for incorrect

7. `SyntaxSpotter.tsx` (+15 XP):
- Show data.snippets code blocks one at a time
- Buttons: "Valid ✓" and "Invalid ✗"
- After selection, reveal if correct + explanation
- Track correct answers, complete when all correct
- Calls onComplete("syntaxSpotter")

8. `TypeDetective.tsx` (+10 XP):
- Show data.expressions with their expression strings
- For each, show radio buttons with data.options (str, int, float, list, etc.)
- User selects type, check button validates
- Calls onComplete("typeDetective") when all correct

9. `CodeFlashcards.tsx` (+10 XP):
- Show data.cards as interactive flip-cards
- Front: term name. Back: definition + optional example
- Use CSS 3D flip animation (perspective, rotateY)
- Navigation arrows to go through cards
- Mark as "reviewed" when flipped
- Calls onComplete("codeFlashcards") when all cards reviewed

10. `MiniProjectChallenge.tsx` (+50 XP):
- Show data.title, data.description
- data.starterCode in an editable textarea (font-fira, bg-slate-800)
- data.hints as expandable hint cards (click to reveal one at a time)
- "Show Expected Output" toggle showing data.expectedOutput
- "Show Solution" toggle showing data.solution in a code block
- "Mark as Complete" button that calls onComplete("miniProject")
- Most XP (50), so make it visually prominent with python-yellow accents

Each component should:
- Use font-fira for code, font-inter for text
- Use bg-slate-800/900 cards with border-slate-700
- Show a header with game title, XP reward badge, and completion status
- If isCompleted, show a "✅ Completed" badge and disable interactions
- Use lucide-react icons (Check, X, ChevronLeft, ChevronRight, Eye, EyeOff, Lightbulb, Code, FlipHorizontal, etc.)
- Be fully self-contained with internal state via useState
- Have clean TypeScript types with zero errors
"""

UTILS_BRIEF = f"""You are a TypeScript/React code generator. Write THREE files for a Next.js project at `{BASE}`:

1. `src/components/GamificationBar.tsx`:
- "use client", import UserProgress, getLevelFromXP, getXPForNextLevel from @/types
- Props: {{ progress: UserProgress | null; xpAnimation: boolean }}
- Display: XP counter, Level badge, Streak flame, Progress bar to next level
- Use lucide-react: Trophy, Flame, Star, Zap
- Python-blue progress bar with python-yellow accents
- Show "Level X" with XP/nextLevelXP
- Streak with flame icon
- Compact horizontal bar design
- If xpAnimation is true, add xp-pulse class

2. `src/components/EssayPrep.tsx`:
- "use client"
- Import EssayQuestion from @/types
- Props: {{ questions: EssayQuestion[] }}
- Title: "Exam Prep: Essay Questions" in English
- For each question:
  - Question text in a card
  - Textarea for user's answer (bg-slate-800, font-inter)
  - "Show Model Answer" toggle button
  - When toggled, show model answer in a green-tinted card
- Use lucide-react: FileText, Eye, EyeOff

3. `src/components/ApiKeyModal.tsx`:
- "use client"
- Import getApiKey, setApiKey, removeApiKey from @/lib/storage
- Props: {{ isOpen: boolean; onClose: () => void }}
- Modal overlay with bg-black/50 backdrop
- Modal content bg-slate-900 rounded-xl
- Title: "Connect Gemini API"
- Description explaining the user enters their free Gemini API key
- Input field for API key (type password with show/hide toggle)
- Save & Close buttons
- Delete Key option if key exists
- Use lucide-react: Key, Eye, EyeOff, X, Trash2
- Key stored in localStorage only

All use Tailwind dark theme, TypeScript with zero errors.
"""

PAGES_BRIEF = f"""You are a TypeScript/React code generator. Write THREE files for a Next.js project at `{BASE}`:

1. `src/app/page.tsx` (Home Page):
- "use client"
- Import Sidebar from @/components/Sidebar
- Import Link from next/link
- Import allLessons, courseModules from @/data/courseStructure
- Import loadProgress from @/lib/storage
- Import lucide icons: BookOpen, Trophy, Flame, ArrowRight, Code2, Sparkles
- Full-page layout with:
  - Sidebar (collapsible)
  - Main content area showing:
    - Hero section: "Elzero PyQuest" title with Python logo colors
    - Subtitle: "Master Python with Osama Elzero – 152 Lessons"
    - Stats bar: Total lessons, Completed, XP, Level
    - Quick start: "Continue Learning" button to last lesson or lesson 1
    - Course modules grid: cards for each module showing name (En+Ar), lesson count, progress
    - Each module card links to its first lesson
  - Dark theme bg-slate-950

2. `src/app/lesson/[id]/page.tsx` (Lesson Page):
- "use client"
- Import all components:
  - Sidebar from @/components/Sidebar
  - VideoPlayer from @/components/VideoPlayer
  - LessonSummary from @/components/LessonSummary
  - MethodsCheatSheet from @/components/MethodsCheatSheet
  - CommonPitfalls from @/components/CommonPitfalls
  - GamificationBar from @/components/GamificationBar
  - EssayPrep from @/components/EssayPrep
  - ApiKeyModal from @/components/ApiKeyModal
  - All 10 game components from @/components/games/
- Import {{ useParams }} from "next/navigation"
- Import {{ getLesson }} from "@/data/lessons"
- Import {{ allLessons }} from "@/data/courseStructure"
- Import {{ useGameState }} from "@/hooks/useGameState"
- Import {{ getCachedLesson, getApiKey }} from "@/lib/storage"
- Import {{ XP_REWARDS }} from "@/types"
- Import type {{ Lesson }} from "@/types"

Layout:
- Sidebar on left (collapsible)
- Two-column layout in main area:
  - LEFT COLUMN (dir="rtl", font-cairo): Arabic Reference Hub
    - VideoPlayer
    - LessonSummary
    - MethodsCheatSheet
    - CommonPitfalls
  - RIGHT COLUMN (dir="ltr", font-inter): English Interactive Arena
    - GamificationBar at top
    - Tabbed/accordion sections for each of the 10 games
    - EssayPrep at bottom

Logic:
- Get lesson ID from useParams
- Try getLesson(id) first; if not found, try getCachedLesson for AI-generated
- If no data at all, show "Generate with AI" button that:
  - Opens ApiKeyModal if no key stored
  - Calls /api/generate-lesson with lessonId and API key
  - Shows loading state
  - On success, parses and caches the data
- Navigation: Previous/Next lesson buttons
- Each game section shows the game name, XP reward, and completion status
- Use useGameState hook for XP and completion tracking
- Responsive: stack columns on mobile

3. `src/app/api/generate-lesson/route.ts`:
- Next.js Route Handler (POST)
- Accepts JSON body: {{ lessonId: number; apiKey: string }}
- Import allLessons from @/data/courseStructure
- Look up lesson stub by ID
- Use @google/genai to call Gemini API:
  ```
  import {{ GoogleGenAI }} from "@google/genai";
  const ai = new GoogleGenAI({{ apiKey }});
  const response = await ai.models.generateContent({{
    model: "gemini-2.0-flash",
    contents: prompt,
  }});
  ```
- Prompt asks Gemini to generate the full Lesson object as JSON
- Include detailed schema in the prompt
- Parse the response, validate it has all required fields
- Return the Lesson data as JSON
- Handle errors gracefully with appropriate status codes

All use Tailwind dark theme. TypeScript with zero errors. The lesson page is the most critical page.
"""

# Phase 1: Create all files in parallel
phase("Creating lesson data")
data_result = await agent(
    prompt=LESSON_DATA_BRIEF,
    schema={"type": "string"},
    role="Lesson Data Generator",
)
log(f"Data agent done: {data_result[:100]}...")

phase("Creating components and pages in parallel")
results = await parallel(
    [
        ("sidebar", SIDEBAR_BRIEF),
        ("left-col", LEFT_COL_BRIEF),
        ("games-a", GAMES_A_BRIEF),
        ("games-b", GAMES_B_BRIEF),
        ("utils", UTILS_BRIEF),
        ("pages", PAGES_BRIEF),
    ],
    lambda item: agent(
        prompt=item[1],
        schema={"type": "string"},
        role=f"Code Writer: {item[0]}",
    ),
)

for name, result in zip(["sidebar", "left-col", "games-a", "games-b", "utils", "pages"], results):
    log(f"{name} agent done: {result[:80]}...")

log("All agents completed!")
