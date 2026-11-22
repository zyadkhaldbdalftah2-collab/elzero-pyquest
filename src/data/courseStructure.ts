import { CourseModule } from "@/types";

export const courseModules: CourseModule[] = [
  { id: "intro", nameEn: "Introduction", nameAr: "مقدمة", lessonRange: [1, 9] },
  { id: "datatypes", nameEn: "Data Types & Variables", nameAr: "أنواع البيانات والمتغيرات", lessonRange: [10, 15] },
  { id: "strings", nameEn: "Strings", nameAr: "النصوص", lessonRange: [16, 30] },
  { id: "numbers", nameEn: "Numbers & Arithmetic", nameAr: "الأرقام والعمليات الحسابية", lessonRange: [31, 38] },
  { id: "lists", nameEn: "Lists", nameAr: "القوائم", lessonRange: [39, 55] },
  { id: "tuples", nameEn: "Tuples", nameAr: "الصفوف", lessonRange: [56, 62] },
  { id: "sets", nameEn: "Sets", nameAr: "المجموعات", lessonRange: [63, 71] },
  { id: "dicts", nameEn: "Dictionaries", nameAr: "القواميس", lessonRange: [72, 82] },
  { id: "bool", nameEn: "Boolean & Operators", nameAr: "القيم المنطقية والعمليات", lessonRange: [83, 87] },
  { id: "control", nameEn: "Control Flow", nameAr: "التحكم في التدفق", lessonRange: [88, 98] },
  { id: "loops", nameEn: "Loops", nameAr: "الحلقات التكرارية", lessonRange: [99, 110] },
  { id: "functions", nameEn: "Functions", nameAr: "الدوال", lessonRange: [111, 125] },
  { id: "files", nameEn: "Files Handling", nameAr: "التعامل مع الملفات", lessonRange: [126, 133] },
  { id: "builtins", nameEn: "Built-in Functions", nameAr: "الدوال المدمجة", lessonRange: [134, 140] },
  { id: "modules", nameEn: "Modules & Packages", nameAr: "الموديولات والحزم", lessonRange: [141, 145] },
  { id: "oop", nameEn: "OOP", nameAr: "البرمجة الكائنية", lessonRange: [146, 152] },
];

interface LessonStub {
  id: number;
  titleEn: string;
  titleAr: string;
  module: string;
}

export const allLessons: LessonStub[] = [
  // Introduction (1-9)
  { id: 1, titleEn: "What Is Python & Why Learn It?", titleAr: "ما هي بايثون ولماذا نتعلمها؟", module: "intro" },
  { id: 2, titleEn: "Installing Python & Setting Up", titleAr: "تثبيت بايثون وإعداد بيئة العمل", module: "intro" },
  { id: 3, titleEn: "Your First Program – print()", titleAr: "أول برنامج لك – الطباعة", module: "intro" },
  { id: 4, titleEn: "Comments & Code Organization", titleAr: "التعليقات وتنظيم الكود", module: "intro" },
  { id: 5, titleEn: "Variables & Naming Rules", titleAr: "المتغيرات وقواعد التسمية", module: "intro" },
  { id: 6, titleEn: "Escape Sequences", titleAr: "رموز الهروب", module: "intro" },
  { id: 7, titleEn: "Concatenation & Repetition", titleAr: "الدمج والتكرار", module: "intro" },
  { id: 8, titleEn: "User Input – input()", titleAr: "الإدخال من المستخدم", module: "intro" },
  { id: 9, titleEn: "Type Conversion", titleAr: "تحويل الأنواع", module: "intro" },

  // Data Types & Variables (10-15)
  { id: 10, titleEn: "Data Types Overview", titleAr: "نظرة عامة على أنواع البيانات", module: "datatypes" },
  { id: 11, titleEn: "type() & isinstance()", titleAr: "فحص نوع البيانات", module: "datatypes" },
  { id: 12, titleEn: "Integer & Float", titleAr: "الأعداد الصحيحة والعشرية", module: "datatypes" },
  { id: 13, titleEn: "Complex Numbers", titleAr: "الأعداد المركبة", module: "datatypes" },
  { id: 14, titleEn: "Boolean Type", titleAr: "النوع المنطقي", module: "datatypes" },
  { id: 15, titleEn: "None Type", titleAr: "النوع الفارغ", module: "datatypes" },

  // Strings (16-30)
  { id: 16, titleEn: "String Indexing", titleAr: "فهرسة النصوص", module: "strings" },
  { id: 17, titleEn: "String Slicing", titleAr: "تقطيع النصوص", module: "strings" },
  { id: 18, titleEn: "String Methods Part 1", titleAr: "دوال النصوص - الجزء الأول", module: "strings" },
  { id: 19, titleEn: "String Methods Part 2", titleAr: "دوال النصوص - الجزء الثاني", module: "strings" },
  { id: 20, titleEn: "String Methods Part 3", titleAr: "دوال النصوص - الجزء الثالث", module: "strings" },
  { id: 21, titleEn: "String Formatting – format()", titleAr: "تنسيق النصوص – format", module: "strings" },
  { id: 22, titleEn: "F-Strings", titleAr: "النصوص المنسقة F-String", module: "strings" },
  { id: 23, titleEn: "String Formatting Mini Project", titleAr: "مشروع صغير على تنسيق النصوص", module: "strings" },
  { id: 24, titleEn: "Strings – Practice", titleAr: "تطبيقات على النصوص", module: "strings" },
  { id: 25, titleEn: "String Comparison", titleAr: "مقارنة النصوص", module: "strings" },
  { id: 26, titleEn: "String Testing Methods", titleAr: "دوال اختبار النصوص", module: "strings" },
  { id: 27, titleEn: "String Join & Split", titleAr: "دمج وتقسيم النصوص", module: "strings" },
  { id: 28, titleEn: "String Search Methods", titleAr: "البحث في النصوص", module: "strings" },
  { id: 29, titleEn: "String Replace & Translate", titleAr: "استبدال وترجمة النصوص", module: "strings" },
  { id: 30, titleEn: "Strings Summary", titleAr: "ملخص النصوص", module: "strings" },

  // Numbers & Arithmetic (31-38)
  { id: 31, titleEn: "Arithmetic Operators", titleAr: "العمليات الحسابية", module: "numbers" },
  { id: 32, titleEn: "Augmented Assignment", titleAr: "عمليات الإسناد المركبة", module: "numbers" },
  { id: 33, titleEn: "Number Functions", titleAr: "دوال الأرقام", module: "numbers" },
  { id: 34, titleEn: "Math Module", titleAr: "مكتبة الرياضيات", module: "numbers" },
  { id: 35, titleEn: "Random Module", titleAr: "مكتبة العشوائية", module: "numbers" },
  { id: 36, titleEn: "Round & Precision", titleAr: "التقريب والدقة", module: "numbers" },
  { id: 37, titleEn: "Number Systems", titleAr: "أنظمة الأعداد", module: "numbers" },
  { id: 38, titleEn: "Numbers Summary", titleAr: "ملخص الأرقام", module: "numbers" },

  // Lists (39-55)
  { id: 39, titleEn: "List Basics", titleAr: "أساسيات القوائم", module: "lists" },
  { id: 40, titleEn: "List Indexing & Slicing", titleAr: "فهرسة وتقطيع القوائم", module: "lists" },
  { id: 41, titleEn: "List Methods – append & extend", titleAr: "دوال القوائم – الإضافة", module: "lists" },
  { id: 42, titleEn: "List Methods – insert", titleAr: "دوال القوائم – الإدراج", module: "lists" },
  { id: 43, titleEn: "List Methods – remove & pop", titleAr: "دوال القوائم – الحذف", module: "lists" },
  { id: 44, titleEn: "List Methods – sort & reverse", titleAr: "دوال القوائم – الترتيب", module: "lists" },
  { id: 45, titleEn: "List Methods – copy & clear", titleAr: "دوال القوائم – النسخ والمسح", module: "lists" },
  { id: 46, titleEn: "List Methods – count & index", titleAr: "دوال القوائم – العد والبحث", module: "lists" },
  { id: 47, titleEn: "Nested Lists", titleAr: "القوائم المتداخلة", module: "lists" },
  { id: 48, titleEn: "List Comprehension Part 1", titleAr: "اختصار القوائم - الجزء الأول", module: "lists" },
  { id: 49, titleEn: "List Comprehension Part 2", titleAr: "اختصار القوائم - الجزء الثاني", module: "lists" },
  { id: 50, titleEn: "List Comprehension Part 3", titleAr: "اختصار القوائم - الجزء الثالث", module: "lists" },
  { id: 51, titleEn: "List Unpacking", titleAr: "تفريغ القوائم", module: "lists" },
  { id: 52, titleEn: "List Comparison", titleAr: "مقارنة القوائم", module: "lists" },
  { id: 53, titleEn: "List Operations & in", titleAr: "عمليات القوائم والعضوية", module: "lists" },
  { id: 54, titleEn: "Lists Practice", titleAr: "تطبيقات على القوائم", module: "lists" },
  { id: 55, titleEn: "Lists Summary", titleAr: "ملخص القوائم", module: "lists" },

  // Tuples (56-62)
  { id: 56, titleEn: "Tuple Basics", titleAr: "أساسيات الصفوف", module: "tuples" },
  { id: 57, titleEn: "Tuple Indexing & Slicing", titleAr: "فهرسة وتقطيع الصفوف", module: "tuples" },
  { id: 58, titleEn: "Tuple Methods", titleAr: "دوال الصفوف", module: "tuples" },
  { id: 59, titleEn: "Tuple Unpacking", titleAr: "تفريغ الصفوف", module: "tuples" },
  { id: 60, titleEn: "Tuple vs List", titleAr: "الفرق بين الصفوف والقوائم", module: "tuples" },
  { id: 61, titleEn: "Tuples Practice", titleAr: "تطبيقات على الصفوف", module: "tuples" },
  { id: 62, titleEn: "Tuples Summary", titleAr: "ملخص الصفوف", module: "tuples" },

  // Sets (63-71)
  { id: 63, titleEn: "Set Basics", titleAr: "أساسيات المجموعات", module: "sets" },
  { id: 64, titleEn: "Set Methods – add & update", titleAr: "دوال المجموعات – الإضافة", module: "sets" },
  { id: 65, titleEn: "Set Methods – remove & discard", titleAr: "دوال المجموعات – الحذف", module: "sets" },
  { id: 66, titleEn: "Set Union & Intersection", titleAr: "الاتحاد والتقاطع", module: "sets" },
  { id: 67, titleEn: "Set Difference & Symmetric", titleAr: "الفرق والفرق المتماثل", module: "sets" },
  { id: 68, titleEn: "Set Subset & Superset", titleAr: "المجموعة الفرعية والشاملة", module: "sets" },
  { id: 69, titleEn: "Frozen Set", titleAr: "المجموعات الثابتة", module: "sets" },
  { id: 70, titleEn: "Sets Practice", titleAr: "تطبيقات على المجموعات", module: "sets" },
  { id: 71, titleEn: "Sets Summary", titleAr: "ملخص المجموعات", module: "sets" },

  // Dictionaries (72-82)
  { id: 72, titleEn: "Dictionary Basics", titleAr: "أساسيات القواميس", module: "dicts" },
  { id: 73, titleEn: "Accessing Dict Values", titleAr: "الوصول لقيم القاموس", module: "dicts" },
  { id: 74, titleEn: "Dict Methods – keys & values", titleAr: "دوال القاموس – المفاتيح والقيم", module: "dicts" },
  { id: 75, titleEn: "Dict Methods – get & setdefault", titleAr: "دوال القاموس – get و setdefault", module: "dicts" },
  { id: 76, titleEn: "Dict Methods – update & pop", titleAr: "دوال القاموس – التحديث والحذف", module: "dicts" },
  { id: 77, titleEn: "Dict Comprehension", titleAr: "اختصار القواميس", module: "dicts" },
  { id: 78, titleEn: "Nested Dictionaries", titleAr: "القواميس المتداخلة", module: "dicts" },
  { id: 79, titleEn: "Dict Unpacking", titleAr: "تفريغ القواميس", module: "dicts" },
  { id: 80, titleEn: "Dict Looping", titleAr: "التكرار على القواميس", module: "dicts" },
  { id: 81, titleEn: "Dicts Practice", titleAr: "تطبيقات على القواميس", module: "dicts" },
  { id: 82, titleEn: "Dicts Summary", titleAr: "ملخص القواميس", module: "dicts" },

  // Boolean & Operators (83-87)
  { id: 83, titleEn: "Boolean Values", titleAr: "القيم المنطقية", module: "bool" },
  { id: 84, titleEn: "Comparison Operators", titleAr: "عوامل المقارنة", module: "bool" },
  { id: 85, titleEn: "Logical Operators", titleAr: "العوامل المنطقية", module: "bool" },
  { id: 86, titleEn: "Identity & Membership", titleAr: "عوامل الهوية والعضوية", module: "bool" },
  { id: 87, titleEn: "Operators Summary", titleAr: "ملخص العوامل", module: "bool" },

  // Control Flow (88-98)
  { id: 88, titleEn: "If Statement", titleAr: "جملة if الشرطية", module: "control" },
  { id: 89, titleEn: "If...Else", titleAr: "جملة if...else", module: "control" },
  { id: 90, titleEn: "If...Elif...Else", titleAr: "جملة if...elif...else", module: "control" },
  { id: 91, titleEn: "Nested If", titleAr: "الشروط المتداخلة", module: "control" },
  { id: 92, titleEn: "Ternary Operator", titleAr: "العامل الثلاثي", module: "control" },
  { id: 93, titleEn: "Match Statement", titleAr: "جملة match", module: "control" },
  { id: 94, titleEn: "Control Flow Practice 1", titleAr: "تطبيقات على التحكم ١", module: "control" },
  { id: 95, titleEn: "Control Flow Practice 2", titleAr: "تطبيقات على التحكم ٢", module: "control" },
  { id: 96, titleEn: "Control Flow Practice 3", titleAr: "تطبيقات على التحكم ٣", module: "control" },
  { id: 97, titleEn: "Control Flow Practice 4", titleAr: "تطبيقات على التحكم ٤", module: "control" },
  { id: 98, titleEn: "Control Flow Summary", titleAr: "ملخص التحكم في التدفق", module: "control" },

  // Loops (99-110)
  { id: 99, titleEn: "While Loop", titleAr: "حلقة while", module: "loops" },
  { id: 100, titleEn: "While with Else", titleAr: "while مع else", module: "loops" },
  { id: 101, titleEn: "For Loop", titleAr: "حلقة for", module: "loops" },
  { id: 102, titleEn: "range() Function", titleAr: "دالة range", module: "loops" },
  { id: 103, titleEn: "Break & Continue", titleAr: "break و continue", module: "loops" },
  { id: 104, titleEn: "Pass Statement", titleAr: "جملة pass", module: "loops" },
  { id: 105, titleEn: "Nested Loops", titleAr: "الحلقات المتداخلة", module: "loops" },
  { id: 106, titleEn: "enumerate()", titleAr: "دالة enumerate", module: "loops" },
  { id: 107, titleEn: "zip() Function", titleAr: "دالة zip", module: "loops" },
  { id: 108, titleEn: "Loops Practice 1", titleAr: "تطبيقات على الحلقات ١", module: "loops" },
  { id: 109, titleEn: "Loops Practice 2", titleAr: "تطبيقات على الحلقات ٢", module: "loops" },
  { id: 110, titleEn: "Loops Summary", titleAr: "ملخص الحلقات", module: "loops" },

  // Functions (111-125)
  { id: 111, titleEn: "Function Basics", titleAr: "أساسيات الدوال", module: "functions" },
  { id: 112, titleEn: "Function Parameters", titleAr: "معاملات الدوال", module: "functions" },
  { id: 113, titleEn: "Default Parameters", titleAr: "المعاملات الافتراضية", module: "functions" },
  { id: 114, titleEn: "Return Statement", titleAr: "جملة return", module: "functions" },
  { id: 115, titleEn: "*args & **kwargs", titleAr: "المعاملات المتغيرة", module: "functions" },
  { id: 116, titleEn: "Lambda Functions", titleAr: "دوال لامبدا", module: "functions" },
  { id: 117, titleEn: "map() Function", titleAr: "دالة map", module: "functions" },
  { id: 118, titleEn: "filter() Function", titleAr: "دالة filter", module: "functions" },
  { id: 119, titleEn: "reduce() Function", titleAr: "دالة reduce", module: "functions" },
  { id: 120, titleEn: "Recursion", titleAr: "الاستدعاء الذاتي", module: "functions" },
  { id: 121, titleEn: "Decorators", titleAr: "المزخرفات", module: "functions" },
  { id: 122, titleEn: "Generators", titleAr: "المولدات", module: "functions" },
  { id: 123, titleEn: "Scope & LEGB", titleAr: "النطاق و LEGB", module: "functions" },
  { id: 124, titleEn: "Functions Practice", titleAr: "تطبيقات على الدوال", module: "functions" },
  { id: 125, titleEn: "Functions Summary", titleAr: "ملخص الدوال", module: "functions" },

  // Files Handling (126-133)
  { id: 126, titleEn: "File Open & Read", titleAr: "فتح وقراءة الملفات", module: "files" },
  { id: 127, titleEn: "File Write & Append", titleAr: "الكتابة والإضافة للملفات", module: "files" },
  { id: 128, titleEn: "File Methods", titleAr: "دوال الملفات", module: "files" },
  { id: 129, titleEn: "With Statement", titleAr: "جملة with", module: "files" },
  { id: 130, titleEn: "OS Module", titleAr: "مكتبة os", module: "files" },
  { id: 131, titleEn: "JSON Files", titleAr: "ملفات JSON", module: "files" },
  { id: 132, titleEn: "CSV Files", titleAr: "ملفات CSV", module: "files" },
  { id: 133, titleEn: "Files Summary", titleAr: "ملخص الملفات", module: "files" },

  // Built-in Functions (134-140)
  { id: 134, titleEn: "all() & any()", titleAr: "دوال all و any", module: "builtins" },
  { id: 135, titleEn: "sorted() & reversed()", titleAr: "الترتيب والعكس", module: "builtins" },
  { id: 136, titleEn: "min(), max(), sum()", titleAr: "الحد الأدنى والأقصى والمجموع", module: "builtins" },
  { id: 137, titleEn: "abs(), pow(), divmod()", titleAr: "القيمة المطلقة والأسس", module: "builtins" },
  { id: 138, titleEn: "chr() & ord()", titleAr: "تحويل الحروف والأرقام", module: "builtins" },
  { id: 139, titleEn: "eval() & exec()", titleAr: "تنفيذ الأكواد ديناميكياً", module: "builtins" },
  { id: 140, titleEn: "Built-ins Summary", titleAr: "ملخص الدوال المدمجة", module: "builtins" },

  // Modules & Packages (141-145)
  { id: 141, titleEn: "Importing Modules", titleAr: "استيراد الموديولات", module: "modules" },
  { id: 142, titleEn: "Creating Modules", titleAr: "إنشاء الموديولات", module: "modules" },
  { id: 143, titleEn: "Packages", titleAr: "الحزم", module: "modules" },
  { id: 144, titleEn: "pip & Virtual Envs", titleAr: "pip والبيئات الافتراضية", module: "modules" },
  { id: 145, titleEn: "Modules Summary", titleAr: "ملخص الموديولات", module: "modules" },

  // OOP (146-152)
  { id: 146, titleEn: "OOP Introduction", titleAr: "مقدمة في البرمجة الكائنية", module: "oop" },
  { id: 147, titleEn: "Classes & Objects", titleAr: "الأصناف والكائنات", module: "oop" },
  { id: 148, titleEn: "Class Attributes & Methods", titleAr: "خصائص ودوال الصنف", module: "oop" },
  { id: 149, titleEn: "Inheritance", titleAr: "الوراثة", module: "oop" },
  { id: 150, titleEn: "Polymorphism", titleAr: "تعدد الأشكال", module: "oop" },
  { id: 151, titleEn: "Encapsulation", titleAr: "التغليف", module: "oop" },
  { id: 152, titleEn: "OOP Summary & Final Project", titleAr: "ملخص OOP والمشروع النهائي", module: "oop" },
];

export function getVideoUrl(lessonNumber: number): string {
  return `https://www.youtube.com/embed?listType=playlist&list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs&index=${lessonNumber}`;
}

export function getLessonsByModule(moduleId: string): typeof allLessons {
  return allLessons.filter((l) => l.module === moduleId);
}
