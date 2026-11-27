import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { allLessons } from "@/data/courseStructure";
import { Lesson } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lessonId } = body;

    if (!lessonId || typeof lessonId !== "number") {
      return NextResponse.json(
        { error: "Invalid or missing lessonId" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server AI generation is currently unavailable (GEMINI_API_KEY not configured)." },
        { status: 500 }
      );
    }

    const lessonStub = allLessons.find((l) => l.id === lessonId);
    if (!lessonStub) {
      return NextResponse.json(
        { error: `Lesson #${lessonId} not found in course curriculum.` },
        { status: 404 }
      );
    }

    const prompt = `You are a Python curriculum and educational game expert creating content for Osama Elzero's YouTube "Mastering Python" course.
Generate complete interactive educational content for:
Lesson #${lessonStub.id}: "${lessonStub.titleEn}" (Arabic Title: "${lessonStub.titleAr}", Module: "${lessonStub.module}").

Return ONLY a raw valid JSON object (no markdown code fence, no additional commentary) matching this TypeScript Lesson interface:
{
  "id": ${lessonStub.id},
  "titleAr": "${lessonStub.titleAr}",
  "titleEn": "${lessonStub.titleEn}",
  "module": "${lessonStub.module}",
  "summaryAr": [
    "5 to 8 detailed, high quality Arabic summary bullet points explaining the core concepts taught in this lesson."
  ],
  "methods": [
    {
      "name": "method_or_keyword_name",
      "signature": "syntax(param1, param2)",
      "descriptionAr": "شرح وظيفته باللغة العربية",
      "example": "valid python code example"
    }
  ],
  "pitfalls": [
    {
      "titleAr": "عنوان الخطأ الشائع بالعربية",
      "wrongCode": "incorrect python code snippet",
      "correctCode": "corrected python code snippet",
      "explanationAr": "شرح سبب الخطأ وكيفية تجنبه بالعربية"
    }
  ],
  "games": {
    "fillInTheBlanks": {
      "instruction": "Fill in the missing Python keywords or functions",
      "codeTemplate": "code with ___ for blanks",
      "blanks": ["correct_word_1", "correct_word_2"],
      "distractors": ["wrong_word_1", "wrong_word_2"]
    },
    "bugHunter": {
      "instruction": "Find and click the buggy line in this Python code snippet",
      "code": ["line1", "line2", "line3", "line4", "line5"],
      "buggyLineIndex": 2,
      "explanation": "Why this line is a bug in English"
    },
    "matchThePairs": {
      "instruction": "Connect each Python syntax on the left with its English definition",
      "pairs": [
        {"left": "syntax1", "right": "definition1"},
        {"left": "syntax2", "right": "definition2"},
        {"left": "syntax3", "right": "definition3"},
        {"left": "syntax4", "right": "definition4"}
      ]
    },
    "predictTheOutput": {
      "instruction": "What will be printed to the console?",
      "code": "python code snippet",
      "options": ["output1", "output2", "output3", "output4"],
      "correctIndex": 0,
      "explanation": "Explanation of the code execution"
    },
    "codeUnscrambler": {
      "instruction": "Reorder the lines to form a working Python script",
      "correctOrder": ["line1", "line2", "line3", "line4"]
    },
    "trueOrFalse": {
      "instruction": "Evaluate the following technical statements",
      "statements": [
        {"statement": "statement 1", "isTrue": true, "explanation": "explanation 1"},
        {"statement": "statement 2", "isTrue": false, "explanation": "explanation 2"},
        {"statement": "statement 3", "isTrue": true, "explanation": "explanation 3"}
      ]
    },
    "syntaxSpotter": {
      "instruction": "Determine whether each snippet has valid Python syntax",
      "snippets": [
        {"code": "snippet 1", "isValid": true, "explanation": "explanation 1"},
        {"code": "snippet 2", "isValid": false, "explanation": "explanation 2"}
      ]
    },
    "typeDetective": {
      "instruction": "Identify the resulting Python data type for each expression",
      "expressions": [
        {"expression": "expr1", "correctType": "str", "options": ["int", "float", "str", "list"]},
        {"expression": "expr2", "correctType": "int", "options": ["int", "float", "str", "bool"]}
      ]
    },
    "codeFlashcards": {
      "instruction": "Review key technical English terms and flip the cards",
      "cards": [
        {"term": "Term 1", "definition": "Definition in English", "example": "example code"},
        {"term": "Term 2", "definition": "Definition in English", "example": "example code"},
        {"term": "Term 3", "definition": "Definition in English", "example": "example code"}
      ]
    },
    "miniProject": {
      "title": "Project Title",
      "description": "Clear step-by-step description of what code to write",
      "starterCode": "# Starter comments and templates\\n",
      "expectedOutput": "Expected terminal output",
      "hints": ["Hint 1", "Hint 2"],
      "solution": "Working reference Python code solution"
    }
  },
  "essayQuestions": [
    {
      "question": "In-depth theoretical question testing technical English comprehension",
      "modelAnswer": "Comprehensive model answer in clear technical English"
    },
    {
      "question": "Another architectural or design question",
      "modelAnswer": "Comprehensive model answer"
    }
  ]
}

STRICT REQUIREMENTS:
- All summaryAr, methods.descriptionAr, pitfalls.titleAr, pitfalls.explanationAr MUST be in Arabic.
- All games, instructions, options, and essay questions MUST be in technical English.
- Return ONLY parseable JSON without backticks, markdown fences, or markdown formatting.`;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "";
    // Clean response: remove markdown backticks if any
    let cleaned = responseText.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const lessonData: Lesson = JSON.parse(cleaned);

    return NextResponse.json({ success: true, lesson: lessonData });
  } catch (error: any) {
    console.error("Gemini generation error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate lesson content via Gemini.",
      },
      { status: 500 }
    );
  }
}
