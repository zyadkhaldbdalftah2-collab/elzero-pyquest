import type { Lesson } from "@/types";

// ---------------------------------------------------------------------------
// Lesson 001 – What Is Python & Why Learn It?
// ---------------------------------------------------------------------------
const lesson001: Lesson = {
  id: 1,
  titleAr: "ما هي بايثون ولماذا نتعلمها؟",
  titleEn: "What Is Python & Why Learn It?",
  module: "intro",
  summaryAr: [
    "بايثون هي لغة برمجة عالية المستوى سهلة القراءة والكتابة.",
    "تم إنشاؤها بواسطة جويدو فان روسم عام 1991.",
    "تُستخدم في تطوير الويب، تحليل البيانات، الذكاء الاصطناعي، والأتمتة.",
    "تتميز بصياغة بسيطة وواضحة قريبة من اللغة الإنجليزية.",
    "بايثون لغة مفسّرة (Interpreted) وليست مُجمَّعة.",
    "تدعم أنماط البرمجة الكائنية والوظيفية والإجرائية.",
    "تمتلك مجتمعاً ضخماً ومكتبات جاهزة لكل المجالات تقريباً.",
    "تعتبر من أكثر اللغات طلباً في سوق العمل حالياً.",
  ],
  methods: [
    {
      name: "print()",
      signature: "print(*objects, sep=' ', end='\\n')",
      descriptionAr: "تطبع النص أو القيم على شاشة الإخراج.",
      example: 'print("Hello, Python!")',
    },
    {
      name: "type()",
      signature: "type(object) -> type",
      descriptionAr: "تُرجع نوع الكائن المُمرَّر إليها.",
      example: 'print(type(42))  # <class \'int\'>',
    },
    {
      name: "help()",
      signature: "help(object=None)",
      descriptionAr: "تعرض توثيق المساعدة الخاص بالكائن أو الوحدة.",
      example: "help(print)",
    },
    {
      name: "input()",
      signature: "input(prompt='') -> str",
      descriptionAr: "تقرأ مُدخلاً نصياً من المستخدم عبر لوحة المفاتيح.",
      example: 'name = input("Enter your name: ")',
    },
  ],
  pitfalls: [
    {
      titleAr: "الخلط بين بايثون 2 وبايثون 3",
      wrongCode: 'print "Hello"   # Python 2 syntax',
      correctCode: 'print("Hello")  # Python 3 syntax',
      explanationAr:
        "في بايثون 3، الدالة print تحتاج إلى أقواس. صياغة بايثون 2 بدون أقواس لم تعد مدعومة.",
    },
    {
      titleAr: "عدم التفريق بين اللغة المفسَّرة والمجمَّعة",
      wrongCode: "# الظن أن بايثون تحتاج خطوة تجميع منفصلة مثل C",
      correctCode: "# بايثون تُنفَّذ مباشرة عبر المفسّر: python script.py",
      explanationAr:
        "بايثون لغة مفسّرة؛ لا تحتاج خطوة تجميع يدوية. المفسّر يقرأ الكود وينفذه سطراً بسطر.",
    },
    {
      titleAr: "الاعتقاد أن بايثون بطيئة دائماً",
      wrongCode: "# تجنّب بايثون لكل المشاريع بسبب السرعة",
      correctCode: "# استخدم بايثون مع مكتبات مُحسّنة مثل NumPy للأداء العالي",
      explanationAr:
        "رغم أن بايثون أبطأ من C في التنفيذ المباشر، إلا أن المكتبات المُحسّنة المكتوبة بلغة C تعوّض ذلك في معظم الحالات.",
    },
  ],
  games: {
    fillInTheBlanks: {
      instruction:
        "Fill in the blanks to complete the sentence about Python.",
      codeTemplate:
        "# Python is a ___-level ___ language created by ___ van Rossum.",
      blanks: ["high", "interpreted", "Guido"],
      distractors: ["low", "compiled", "James", "static", "Brendan"],
    },
    bugHunter: {
      instruction:
        "Find the line with the bug in this Python 3 code.",
      code: [
        "# My first Python program",
        'print "Welcome to Python!"',
        'print("Let us learn Python 3")',
        'print("Python is fun")',
      ],
      buggyLineIndex: 1,
      explanation:
        'In Python 3, print is a function and requires parentheses. It should be print("Welcome to Python!").',
    },
    matchThePairs: {
      instruction:
        "Match each Python concept on the left with its definition on the right.",
      pairs: [
        { left: "Interpreted", right: "Code is executed line by line at runtime" },
        { left: "High-level", right: "Closer to human language than machine code" },
        { left: "Guido van Rossum", right: "Creator of Python" },
        { left: "PEP", right: "Python Enhancement Proposal" },
        { left: "CPython", right: "The default Python interpreter written in C" },
      ],
    },
    predictTheOutput: {
      instruction: "What will the following code print?",
      code: 'print(type(3.14).__name__)',
      options: ["int", "float", "str", "number"],
      correctIndex: 1,
      explanation:
        "3.14 is a floating-point number, so type(3.14) returns <class 'float'> and __name__ gives 'float'.",
    },
    codeUnscrambler: {
      instruction:
        "Arrange these lines to form a valid Python program that prints a greeting.",
      correctOrder: [
        '# A simple greeting program',
        'name = "Elzero"',
        'language = "Python"',
        'print("Hello from " + name + " using " + language)',
      ],
    },
    trueOrFalse: {
      instruction:
        "Decide whether each statement about Python is true or false.",
      statements: [
        {
          statement: "Python was first released in 1991.",
          isTrue: true,
          explanation:
            "Guido van Rossum released the first version of Python in 1991.",
        },
        {
          statement: "Python is a compiled language like C++.",
          isTrue: false,
          explanation:
            "Python is an interpreted language; its code is executed by an interpreter at runtime.",
        },
        {
          statement: "Python supports object-oriented programming.",
          isTrue: true,
          explanation:
            "Python fully supports OOP with classes, inheritance, and polymorphism.",
        },
        {
          statement: "Python can only be used for web development.",
          isTrue: false,
          explanation:
            "Python is a general-purpose language used in web dev, data science, AI, scripting, and more.",
        },
        {
          statement: "Python code is case-sensitive.",
          isTrue: true,
          explanation:
            "Python distinguishes between uppercase and lowercase letters. 'Name' and 'name' are different identifiers.",
        },
      ],
    },
    syntaxSpotter: {
      instruction:
        "Determine whether each Python snippet is syntactically valid.",
      snippets: [
        {
          code: 'print("Hello, World!")',
          isValid: true,
          explanation: "This is a correct function call with a string argument.",
        },
        {
          code: 'print "Hello, World!"',
          isValid: false,
          explanation:
            "In Python 3, print is a function and requires parentheses.",
        },
        {
          code: "x = 10",
          isValid: true,
          explanation: "This is a valid variable assignment.",
        },
        {
          code: "10 = x",
          isValid: false,
          explanation:
            "You cannot assign a value to a literal. The variable must be on the left side.",
        },
        {
          code: 'print(type("hello"))',
          isValid: true,
          explanation: "Nested function calls are perfectly valid in Python.",
        },
      ],
    },
    typeDetective: {
      instruction:
        "Identify the Python type of each expression.",
      expressions: [
        {
          expression: '"Hello"',
          correctType: "str",
          options: ["str", "int", "list", "bool"],
        },
        {
          expression: "42",
          correctType: "int",
          options: ["float", "int", "str", "bool"],
        },
        {
          expression: "3.14",
          correctType: "float",
          options: ["int", "float", "str", "complex"],
        },
        {
          expression: "True",
          correctType: "bool",
          options: ["str", "int", "bool", "NoneType"],
        },
        {
          expression: "None",
          correctType: "NoneType",
          options: ["bool", "str", "NoneType", "int"],
        },
      ],
    },
    codeFlashcards: {
      instruction:
        "Review these flashcards about Python fundamentals.",
      cards: [
        {
          term: "Interpreter",
          definition:
            "A program that reads and executes code line by line without a separate compilation step.",
          example: "python script.py",
        },
        {
          term: "High-level language",
          definition:
            "A programming language with strong abstraction from the details of the computer hardware.",
          example: 'print("Hello")  # human-readable syntax',
        },
        {
          term: "Dynamically typed",
          definition:
            "Variable types are determined at runtime, not at compile time.",
          example: 'x = 10\nx = "now a string"  # no error',
        },
        {
          term: "PEP 8",
          definition:
            "The official Python style guide for writing clean and readable code.",
          example: "# Use 4 spaces per indentation level",
        },
        {
          term: "REPL",
          definition:
            "Read-Eval-Print Loop — an interactive Python shell for testing code.",
          example: ">>> 2 + 2\n4",
        },
        {
          term: "Library",
          definition:
            "A collection of pre-written modules and functions you can import and use.",
          example: "import math\nprint(math.sqrt(16))  # 4.0",
        },
      ],
    },
    miniProject: {
      title: "Personal Introduction Script",
      description:
        "Create a Python script that prints a short self-introduction including your name, age, and favorite programming language. Use at least 3 print() calls.",
      starterCode:
        '# Personal Introduction Script\n# TODO: Print your name\n# TODO: Print your age\n# TODO: Print your favorite language\n',
      expectedOutput:
        "My name is Ahmed\nI am 25 years old\nMy favorite language is Python",
      hints: [
        "Use print() with a string argument for each line.",
        "You can use string concatenation with + to combine text.",
        'Remember to wrap text in quotes: "like this".',
      ],
      solution:
        'print("My name is Ahmed")\nprint("I am 25 years old")\nprint("My favorite language is Python")',
    },
  },
  essayQuestions: [
    {
      question:
        "Explain at least three reasons why Python is considered a good language for beginners.",
      modelAnswer:
        "Python is considered beginner-friendly for several reasons. First, its syntax is clean and resembles plain English, making it easy to read and write even for people with no prior programming experience. Second, Python is dynamically typed, so beginners do not need to worry about declaring variable types, reducing the initial learning curve. Third, Python has an extensive standard library and a huge community, meaning beginners can find countless tutorials, documentation, and third-party packages to help them learn and build projects quickly.",
    },
    {
      question:
        "What does it mean that Python is an interpreted language, and how does this differ from a compiled language?",
      modelAnswer:
        "An interpreted language like Python is executed line by line by an interpreter at runtime, without a separate compilation step that converts the entire source code into machine code beforehand. In contrast, a compiled language like C or C++ requires the source code to be fully compiled into an executable binary before it can be run. This means Python programs can be run immediately after writing, which speeds up the development cycle and makes debugging easier. However, interpreted execution is generally slower than running pre-compiled machine code.",
    },
    {
      question:
        "List and briefly describe four real-world application areas where Python is commonly used.",
      modelAnswer:
        "Python is used extensively across many domains. (1) Web Development: Frameworks like Django and Flask allow developers to build robust web applications. (2) Data Science & Analytics: Libraries like Pandas, NumPy, and Matplotlib make data manipulation and visualization straightforward. (3) Artificial Intelligence & Machine Learning: TensorFlow, PyTorch, and scikit-learn power modern AI research and production systems. (4) Automation & Scripting: Python scripts can automate repetitive tasks such as file management, web scraping, and system administration.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 002 – Installing Python & Setting Up
// ---------------------------------------------------------------------------
const lesson002: Lesson = {
  id: 2,
  titleAr: "تثبيت بايثون وإعداد بيئة العمل",
  titleEn: "Installing Python & Setting Up",
  module: "intro",
  summaryAr: [
    "يمكن تحميل بايثون من الموقع الرسمي python.org.",
    "يجب اختيار النسخة الأحدث من بايثون 3 عند التثبيت.",
    "من المهم تفعيل خيار 'Add Python to PATH' أثناء التثبيت على ويندوز.",
    "يمكن التحقق من التثبيت عبر كتابة python --version في سطر الأوامر.",
    "بيئة IDLE تأتي مع بايثون وتوفر محرر كود بسيط.",
    "يُنصح باستخدام محرر VS Code لتجربة أفضل في كتابة الأكواد.",
    "يمكن تشغيل أكواد بايثون مباشرة من سطر الأوامر أو عبر ملفات .py.",
  ],
  methods: [
    {
      name: "python --version",
      signature: "python --version",
      descriptionAr: "أمر في سطر الأوامر يعرض نسخة بايثون المثبتة.",
      example: "python --version\n# Output: Python 3.12.0",
    },
    {
      name: "pip --version",
      signature: "pip --version",
      descriptionAr: "يعرض نسخة مدير الحزم pip المثبتة.",
      example: "pip --version\n# Output: pip 23.2.1",
    },
    {
      name: "pip install",
      signature: "pip install <package>",
      descriptionAr: "يُثبّت حزمة أو مكتبة من فهرس حزم بايثون (PyPI).",
      example: "pip install requests",
    },
    {
      name: "python (REPL)",
      signature: "python",
      descriptionAr:
        "يفتح الوضع التفاعلي (REPL) لكتابة وتنفيذ أوامر بايثون مباشرة.",
      example: '>>> print("Hello from REPL")\nHello from REPL',
    },
    {
      name: "exit()",
      signature: "exit(code=0)",
      descriptionAr: "تُنهي الوضع التفاعلي أو البرنامج الحالي.",
      example: ">>> exit()",
    },
  ],
  pitfalls: [
    {
      titleAr: "نسيان إضافة بايثون إلى PATH",
      wrongCode:
        '# After installing Python without PATH:\n> python\n# "python" is not recognized as a command',
      correctCode:
        '# Reinstall with "Add Python to PATH" checked\n> python --version\n# Python 3.12.0',
      explanationAr:
        "إذا لم تُفعّل خيار 'Add Python to PATH' أثناء التثبيت، لن يتعرف سطر الأوامر على أمر python. أعِد التثبيت مع تفعيل هذا الخيار.",
    },
    {
      titleAr: "الخلط بين أمر python و python3",
      wrongCode:
        "# On some systems:\n> python\n# Opens Python 2 or gives an error",
      correctCode:
        "# Use python3 explicitly on macOS/Linux:\n> python3 --version",
      explanationAr:
        "في بعض أنظمة التشغيل مثل macOS وLinux، الأمر python قد يشير إلى بايثون 2. استخدم python3 للتأكد من تشغيل النسخة الصحيحة.",
    },
    {
      titleAr: "تشغيل ملف بايثون بدون حفظه بامتداد .py",
      wrongCode: '# File saved as "script.txt"\n> python script.txt  # May cause confusion',
      correctCode: '# File saved as "script.py"\n> python script.py',
      explanationAr:
        "يجب حفظ ملفات بايثون بامتداد .py ليتعرف عليها المفسّر والمحرر بشكل صحيح ويتم تلوين الكود.",
    },
  ],
  games: {
    fillInTheBlanks: {
      instruction:
        "Fill in the blanks to complete the terminal commands for checking your Python installation.",
      codeTemplate:
        '# Check Python version\n___ --___\n\n# Install a package\npip ___ requests',
      blanks: ["python", "version", "install"],
      distractors: ["pip", "check", "setup", "run", "download"],
    },
    bugHunter: {
      instruction:
        "Find the line with the error in this terminal session.",
      code: [
        "# Step 1: Open terminal",
        "python --version",
        "# Output: Python 3.12.0",
        "pip install requsets",
        "# Step 4: Run script",
        "python my_script.py",
      ],
      buggyLineIndex: 3,
      explanation:
        'The package name is misspelled. It should be "requests" not "requsets". Correct command: pip install requests.',
    },
    matchThePairs: {
      instruction:
        "Match each tool or command with its purpose.",
      pairs: [
        { left: "python --version", right: "Display the installed Python version" },
        { left: "pip install", right: "Install a Python package from PyPI" },
        { left: "IDLE", right: "Built-in Python editor and interactive shell" },
        { left: "VS Code", right: "Popular code editor with Python extension" },
        { left: "PATH", right: "System variable that locates executable programs" },
      ],
    },
    predictTheOutput: {
      instruction: "What will this terminal command output?",
      code: 'python -c "print(2 ** 10)"',
      options: ["20", "1024", "210", "100"],
      correctIndex: 1,
      explanation:
        "The -c flag runs the given Python code. 2 ** 10 is 2 to the power of 10, which equals 1024.",
    },
    codeUnscrambler: {
      instruction:
        "Arrange these steps in the correct order to set up Python on Windows.",
      correctOrder: [
        "# Step 1: Download Python from python.org",
        '# Step 2: Run installer with "Add Python to PATH" checked',
        "# Step 3: Open Command Prompt",
        "# Step 4: Verify with: python --version",
        "# Step 5: Run your first script: python hello.py",
      ],
    },
    trueOrFalse: {
      instruction:
        "Decide whether each statement about Python installation is true or false.",
      statements: [
        {
          statement:
            "You must add Python to PATH for the 'python' command to work in the terminal.",
          isTrue: true,
          explanation:
            "Without adding Python to PATH, the terminal cannot find the Python executable.",
        },
        {
          statement: "IDLE is a third-party editor that must be installed separately.",
          isTrue: false,
          explanation:
            "IDLE comes bundled with the standard Python installation.",
        },
        {
          statement:
            "pip is the default package manager included with Python 3.",
          isTrue: true,
          explanation:
            "pip is included by default in Python 3.4+ installations.",
        },
        {
          statement:
            "Python files must have the .python extension.",
          isTrue: false,
          explanation:
            "Python files use the .py extension, not .python.",
        },
      ],
    },
    syntaxSpotter: {
      instruction:
        "Determine whether each command-line invocation is correct.",
      snippets: [
        {
          code: "python --version",
          isValid: true,
          explanation: "Correct way to check the installed Python version.",
        },
        {
          code: "python -version",
          isValid: false,
          explanation:
            "The correct flag uses double dashes: --version, not a single dash.",
        },
        {
          code: "pip install numpy",
          isValid: true,
          explanation: "Correct syntax to install the numpy package.",
        },
        {
          code: "pip numpy install",
          isValid: false,
          explanation:
            "The command should be 'pip install numpy' — the subcommand comes before the package name.",
        },
        {
          code: 'python -c "print(1+1)"',
          isValid: true,
          explanation:
            "The -c flag allows running a Python statement directly from the terminal.",
        },
      ],
    },
    typeDetective: {
      instruction:
        "Identify the type returned by each expression in the Python REPL.",
      expressions: [
        {
          expression: 'input("Name: ")',
          correctType: "str",
          options: ["str", "int", "None", "bytes"],
        },
        {
          expression: "int(3.9)",
          correctType: "int",
          options: ["float", "int", "str", "bool"],
        },
        {
          expression: "float(5)",
          correctType: "float",
          options: ["int", "float", "str", "complex"],
        },
        {
          expression: 'bool("")',
          correctType: "bool",
          options: ["str", "bool", "NoneType", "int"],
        },
      ],
    },
    codeFlashcards: {
      instruction:
        "Review these flashcards about Python setup and tools.",
      cards: [
        {
          term: "PATH",
          definition:
            "An environment variable listing directories where the OS looks for executable programs.",
          example: 'C:\\Python312\\;C:\\Python312\\Scripts\\',
        },
        {
          term: "pip",
          definition:
            "Python's default package manager used to install libraries from PyPI.",
          example: "pip install flask",
        },
        {
          term: "IDLE",
          definition:
            "Integrated Development and Learning Environment, bundled with Python.",
        },
        {
          term: "Virtual Environment",
          definition:
            "An isolated Python environment that keeps project dependencies separate.",
          example: "python -m venv myenv",
        },
        {
          term: ".py extension",
          definition:
            "The standard file extension for Python source code files.",
          example: "hello.py",
        },
        {
          term: "REPL",
          definition:
            "An interactive shell that reads input, evaluates it, prints the result, and loops.",
          example: ">>> 5 + 3\n8",
        },
      ],
    },
    miniProject: {
      title: "Environment Checker Script",
      description:
        "Write a Python script that prints the Python version, the current platform, and a welcoming message. Use the sys and platform modules.",
      starterCode:
        'import sys\nimport platform\n\n# TODO: Print Python version\n# TODO: Print platform info\n# TODO: Print a welcome message\n',
      expectedOutput:
        "Python Version: 3.12.0\nPlatform: Windows-10\nWelcome to Python development!",
      hints: [
        "Use sys.version to get the Python version string.",
        "Use platform.system() to get the OS name.",
        "You can use string formatting or concatenation to build your output.",
      ],
      solution:
        'import sys\nimport platform\n\nprint("Python Version: " + sys.version.split()[0])\nprint("Platform: " + platform.system())\nprint("Welcome to Python development!")',
    },
  },
  essayQuestions: [
    {
      question:
        "Describe the step-by-step process to install Python on a Windows machine and verify the installation.",
      modelAnswer:
        "To install Python on Windows, first visit python.org and download the latest Python 3 installer. Run the installer and importantly check the 'Add Python to PATH' checkbox before clicking Install. After installation completes, open Command Prompt and type 'python --version' to verify the installation — it should display the installed version number. You can also type 'pip --version' to confirm that pip, the package manager, is available. Finally, test by typing 'python' to enter the REPL and running a simple command like print('Hello').",
    },
    {
      question:
        "What is the purpose of adding Python to the system PATH, and what problems can occur if you skip this step?",
      modelAnswer:
        "Adding Python to the system PATH allows the operating system to locate the Python executable from any terminal or command prompt window. Without it, typing 'python' in the terminal results in an error like 'python is not recognized as an internal or external command.' This means you would have to navigate to the exact directory where Python is installed or type the full path every time you want to run Python. Adding it to PATH simplifies workflow and is essential for tools like pip and virtual environments to function correctly from any directory.",
    },
    {
      question:
        "Compare IDLE and VS Code as Python development environments. What are the pros and cons of each?",
      modelAnswer:
        "IDLE is Python's built-in development environment. Its pros include being lightweight, requiring no extra installation, and having a simple interface ideal for beginners. However, it lacks advanced features like integrated terminal, Git support, and extensions. VS Code, on the other hand, is a powerful code editor that offers syntax highlighting, IntelliSense (code completion), debugging tools, an integrated terminal, Git integration, and thousands of extensions including excellent Python support. The downside is that VS Code requires a separate download, some initial configuration, and may feel overwhelming to complete beginners. For serious development, VS Code is generally preferred.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 003 – Your First Program – print()
// ---------------------------------------------------------------------------
const lesson003: Lesson = {
  id: 3,
  titleAr: "أول برنامج لك – الطباعة",
  titleEn: "Your First Program – print()",
  module: "intro",
  summaryAr: [
    "الدالة print() تُستخدم لعرض النصوص والقيم على الشاشة.",
    "يمكن طباعة نصوص (سلاسل نصية) بوضعها بين علامتي تنصيص مزدوجة أو مفردة.",
    "يمكن طباعة عدة قيم في نفس السطر بفصلها بفاصلة.",
    "المعامل sep يُحدد الفاصل بين القيم (افتراضياً مسافة).",
    "المعامل end يُحدد ما يُطبع في نهاية السطر (افتراضياً سطر جديد).",
    "يمكن استخدام رموز الهروب مثل \\n للسطر الجديد و \\t للمسافة البادئة.",
    "يمكن طباعة الأرقام والعمليات الحسابية مباشرة بدون علامات تنصيص.",
    "الدالة print() بدون معاملات تطبع سطراً فارغاً.",
  ],
  methods: [
    {
      name: "print()",
      signature: "print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)",
      descriptionAr:
        "تطبع الكائنات المُمررة إليها على مجرى الإخراج مع فاصل ونهاية قابلين للتخصيص.",
      example: 'print("Hello", "World", sep="-")\n# Output: Hello-World',
    },
    {
      name: "sep parameter",
      signature: "print(..., sep=' ')",
      descriptionAr: "يُحدد النص الذي يُوضع بين القيم المطبوعة. الافتراضي هو مسافة واحدة.",
      example: 'print("A", "B", "C", sep=", ")\n# Output: A, B, C',
    },
    {
      name: "end parameter",
      signature: "print(..., end='\\n')",
      descriptionAr: "يُحدد النص المُضاف في نهاية المخرجات. الافتراضي سطر جديد.",
      example: 'print("Hello", end=" ")\nprint("World")\n# Output: Hello World',
    },
    {
      name: "Escape sequences",
      signature: "\\n  \\t  \\\\  \\'  \\\"",
      descriptionAr: "رموز خاصة تُستخدم داخل النصوص لتمثيل أحرف غير مرئية مثل السطر الجديد والتبويب.",
      example: 'print("Line1\\nLine2\\tTabbed")',
    },
    {
      name: "String concatenation",
      signature: '"str1" + "str2"',
      descriptionAr: "دمج نصين أو أكثر باستخدام عامل الجمع +.",
      example: 'print("Hello" + " " + "World")\n# Output: Hello World',
    },
  ],
  pitfalls: [
    {
      titleAr: "نسيان الأقواس عند استخدام print",
      wrongCode: 'print "Hello, World!"',
      correctCode: 'print("Hello, World!")',
      explanationAr:
        "في بايثون 3، print هي دالة وتحتاج أقواس. بدونها ستظهر رسالة خطأ SyntaxError.",
    },
    {
      titleAr: "عدم إغلاق علامات التنصيص",
      wrongCode: 'print("Hello, World!)',
      correctCode: 'print("Hello, World!")',
      explanationAr:
        "يجب إغلاق علامات التنصيص. كل علامة فتح تحتاج علامة إغلاق مطابقة.",
    },
    {
      titleAr: "دمج نص مع رقم بدون تحويل",
      wrongCode: 'print("Age: " + 25)',
      correctCode: 'print("Age: " + str(25))',
      explanationAr:
        "لا يمكن دمج نص (str) مع رقم (int) مباشرة. يجب تحويل الرقم إلى نص باستخدام str() أو استخدام الفواصل.",
    },
    {
      titleAr: "الخلط بين علامات التنصيص المفردة والمزدوجة",
      wrongCode: "print('It's a test')",
      correctCode: 'print("It\'s a test")\n# or\nprint(\'It\\\'s a test\')',
      explanationAr:
        "إذا احتوى النص على فاصلة عليا، استخدم علامات تنصيص مزدوجة أو اهرب الفاصلة بشرطة مائلة عكسية.",
    },
  ],
  games: {
    fillInTheBlanks: {
      instruction:
        "Fill in the blanks to complete the print statements.",
      codeTemplate:
        '# Print with custom separator\nprint("A", "B", "C", ___="-")\n\n# Print without newline at end\nprint("Hello", ___=" ")\nprint("World")',
      blanks: ["sep", "end"],
      distractors: ["div", "split", "stop", "join", "break"],
    },
    bugHunter: {
      instruction:
        "Find the buggy line in this Python code.",
      code: [
        '# Greeting program',
        'print("Welcome to Python")',
        'print("Your age is: " + 25)',
        'print("Have fun!")',
        'print("Goodbye")',
      ],
      buggyLineIndex: 2,
      explanation:
        'You cannot concatenate a string with an integer using +. Fix: print("Your age is: " + str(25)) or print("Your age is:", 25).',
    },
    matchThePairs: {
      instruction:
        "Match each print() feature with its description.",
      pairs: [
        { left: "sep", right: "Separator inserted between multiple values" },
        { left: "end", right: "String appended after the last value" },
        { left: "\\n", right: "Escape sequence for a new line" },
        { left: "\\t", right: "Escape sequence for a tab character" },
        { left: "+", right: "Concatenates two strings together" },
      ],
    },
    predictTheOutput: {
      instruction: "What will the following code print?",
      code: 'print("Hello", "World", sep="***", end="!\\n")',
      options: ["Hello World!", "Hello***World!", "Hello World!\\n", "Hello***World"],
      correctIndex: 1,
      explanation:
        "sep='***' replaces the default space between values, and end='!\\n' adds '!' then a newline at the end.",
    },
    codeUnscrambler: {
      instruction:
        "Arrange these lines to produce the output: 'Name: Ahmed | Age: 20'.",
      correctOrder: [
        'name = "Ahmed"',
        'age = 20',
        'print("Name:", name, "| Age:", age)',
      ],
    },
    trueOrFalse: {
      instruction:
        "Decide whether each statement about print() is true or false.",
      statements: [
        {
          statement: "print() with no arguments prints an empty line.",
          isTrue: true,
          explanation:
            "Calling print() with no arguments outputs just the end character, which defaults to a newline.",
        },
        {
          statement:
            "The default separator between print() arguments is a comma.",
          isTrue: false,
          explanation:
            "The default sep is a space ' ', not a comma.",
        },
        {
          statement:
            "You can use either single quotes or double quotes for strings in print().",
          isTrue: true,
          explanation:
            "Python accepts both 'text' and \"text\" as valid string delimiters.",
        },
        {
          statement:
            "print('Hello' + 5) will print 'Hello5'.",
          isTrue: false,
          explanation:
            "This raises a TypeError because you cannot concatenate str and int. You need str(5).",
        },
        {
          statement:
            "The end parameter of print() defaults to a newline character.",
          isTrue: true,
          explanation:
            "By default, end='\\n', which is why each print() output appears on a new line.",
        },
      ],
    },
    syntaxSpotter: {
      instruction:
        "Determine whether each print statement is syntactically valid in Python 3.",
      snippets: [
        {
          code: 'print("Hello, World!")',
          isValid: true,
          explanation: "Standard valid print function call.",
        },
        {
          code: "print(Hello)",
          isValid: true,
          explanation:
            "Syntactically valid — it tries to print a variable named Hello. It may cause a NameError at runtime if Hello is not defined, but the syntax is correct.",
        },
        {
          code: 'print("A", "B", sep=)',
          isValid: false,
          explanation:
            "sep= requires a value. An empty assignment is a SyntaxError.",
        },
        {
          code: 'print("Line1\\nLine2")',
          isValid: true,
          explanation:
            "Valid use of the newline escape sequence inside a string.",
        },
        {
          code: 'print("Hello",,)',
          isValid: false,
          explanation:
            "Double commas create an empty expression, which is a SyntaxError.",
        },
      ],
    },
    typeDetective: {
      instruction:
        "Identify the type of each value or expression.",
      expressions: [
        {
          expression: '"Hello"',
          correctType: "str",
          options: ["str", "int", "char", "bytes"],
        },
        {
          expression: "100",
          correctType: "int",
          options: ["str", "int", "float", "bool"],
        },
        {
          expression: '"100"',
          correctType: "str",
          options: ["int", "str", "float", "list"],
        },
        {
          expression: "5.0",
          correctType: "float",
          options: ["int", "float", "str", "decimal"],
        },
        {
          expression: 'print("Hi")',
          correctType: "NoneType",
          options: ["str", "NoneType", "int", "void"],
        },
      ],
    },
    codeFlashcards: {
      instruction:
        "Review these flashcards about the print() function.",
      cards: [
        {
          term: "print()",
          definition:
            "Built-in function that outputs text and values to the console.",
          example: 'print("Hello, World!")',
        },
        {
          term: "sep",
          definition:
            "Parameter that specifies the separator string between multiple arguments.",
          example: 'print("A", "B", sep="-")  # A-B',
        },
        {
          term: "end",
          definition:
            "Parameter that specifies the string appended after the output.",
          example: 'print("Hi", end="!\\n")  # Hi!',
        },
        {
          term: "\\n (newline)",
          definition:
            "Escape sequence that moves the cursor to the beginning of the next line.",
          example: 'print("Line1\\nLine2")',
        },
        {
          term: "\\t (tab)",
          definition:
            "Escape sequence that inserts a horizontal tab space.",
          example: 'print("Col1\\tCol2")',
        },
        {
          term: "String concatenation (+)",
          definition:
            "Joining two or more strings into one using the + operator.",
          example: 'print("Hello" + " " + "World")',
        },
      ],
    },
    miniProject: {
      title: "Receipt Printer",
      description:
        "Create a Python script that prints a simple store receipt with items, prices, and a total. Use print() with sep and end parameters and escape sequences for formatting.",
      starterCode:
        '# Receipt Printer\nprint("=" * 30)\nprint("STORE RECEIPT")\nprint("=" * 30)\n# TODO: Print at least 3 items with prices\n# TODO: Print a separator line\n# TODO: Print the total\n',
      expectedOutput:
        "==============================\nSTORE RECEIPT\n==============================\nItem: Apple      Price: $1.50\nItem: Bread      Price: $2.00\nItem: Milk       Price: $3.25\n------------------------------\nTotal: $6.75",
      hints: [
        "Use \\t for tab alignment between item names and prices.",
        "Use print('=' * 30) or print('-' * 30) for separator lines.",
        "You can use sep and end to control spacing.",
      ],
      solution:
        'print("=" * 30)\nprint("STORE RECEIPT")\nprint("=" * 30)\nprint("Item: Apple", "Price: $1.50", sep="\\t")\nprint("Item: Bread", "Price: $2.00", sep="\\t")\nprint("Item: Milk", "Price: $3.25", sep="\\t")\nprint("-" * 30)\nprint("Total: $6.75")',
    },
  },
  essayQuestions: [
    {
      question:
        "Explain the purpose and default values of the sep and end parameters in Python's print() function. Provide examples.",
      modelAnswer:
        "The sep parameter in print() specifies the string used to separate multiple arguments when they are printed. Its default value is a single space ' '. For example, print('A', 'B', 'C') prints 'A B C', but print('A', 'B', 'C', sep='-') prints 'A-B-C'. The end parameter specifies what is printed at the very end of the output. Its default value is a newline character '\\n', which is why successive print calls appear on different lines. For example, print('Hello', end=' ') followed by print('World') produces 'Hello World' on a single line because the first print ends with a space instead of a newline.",
    },
    {
      question:
        "What are escape sequences in Python strings? List at least four and explain when you would use them.",
      modelAnswer:
        "Escape sequences are special character combinations beginning with a backslash (\\) that represent characters which are difficult or impossible to include directly in a string. Common escape sequences include: (1) \\n — newline, used to break text across lines; (2) \\t — tab, used to create horizontal spacing or align columns; (3) \\\\ — literal backslash, used when you need an actual backslash in the string; (4) \\' and \\\" — escaped quotes, used when you need to include a quote character inside a string delimited by the same type of quote. They are essential for formatting output and handling special characters within strings.",
    },
    {
      question:
        "Why does print('Score: ' + 100) cause an error in Python? Explain the error and provide at least two ways to fix it.",
      modelAnswer:
        "This causes a TypeError because Python does not allow concatenation of a string (str) and an integer (int) using the + operator. Python is strongly typed and requires explicit type conversion. There are several ways to fix this: (1) Convert the integer to a string using str(): print('Score: ' + str(100)). (2) Use comma separation in print, which automatically converts values to strings: print('Score:', 100). (3) Use an f-string: print(f'Score: {100}'). (4) Use the format method: print('Score: {}'.format(100)).",
    },
    {
      question:
        "What is the difference between using commas and the + operator to combine values in a print() statement?",
      modelAnswer:
        "When using commas in print(), the arguments are automatically converted to strings and separated by the sep parameter (default is a space). For example, print('Age:', 25) prints 'Age: 25' without any type error. When using the + operator, you are performing string concatenation, which requires all operands to be strings — mixing types like str + int causes a TypeError. Additionally, commas add a separator between values while + joins them directly with nothing in between unless you explicitly add spaces. Commas are generally more convenient and forgiving, while + gives you precise control over formatting.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 004 – Comments & Code Organization
// ---------------------------------------------------------------------------
const lesson004: Lesson = {
  id: 4,
  titleAr: "التعليقات وتنظيم الكود",
  titleEn: "Comments & Code Organization",
  module: "intro",
  summaryAr: [
    "التعليقات هي نصوص يتجاهلها المفسّر وتُستخدم لشرح الكود.",
    "التعليق السطري يبدأ بعلامة # ويمتد حتى نهاية السطر.",
    "لا يوجد تعليق متعدد الأسطر رسمي لكن يمكن استخدام عدة أسطر تبدأ بـ #.",
    "يمكن استخدام نص ثلاثي الاقتباس كتعليق متعدد الأسطر لكنه في الحقيقة سلسلة نصية.",
    "التعليقات الجيدة تشرح 'لماذا' وليس 'ماذا' يفعل الكود.",
    "تنظيم الكود يشمل ترك أسطر فارغة بين الأقسام المنطقية.",
    "PEP 8 يُوصي بترك مسافتين قبل التعليق الجانبي وتبدأ بـ # ومسافة.",
  ],
  methods: [
    {
      name: "Single-line comment (#)",
      signature: "# comment text",
      descriptionAr: "تعليق سطري يبدأ بعلامة # ويتجاهله المفسّر بالكامل.",
      example: '# This is a comment\nprint("Hello")  # Inline comment',
    },
    {
      name: "Multi-line comment (# on each line)",
      signature: "# line 1\n# line 2\n# line 3",
      descriptionAr: "عدة أسطر تعليقات كل منها يبدأ بعلامة # لشرح كتلة كبيرة.",
      example: "# This function calculates\n# the total price including\n# tax and discounts",
    },
    {
      name: 'Docstring (triple quotes)',
      signature: '"""docstring text"""',
      descriptionAr:
        "نص توثيقي يُوضع في بداية الدالة أو الصنف أو الوحدة لوصف عملها.",
      example: 'def greet():\n    """Print a greeting message."""\n    print("Hello")',
    },
    {
      name: "TODO comment",
      signature: "# TODO: description",
      descriptionAr: "تعليق يُشير إلى مهمة يجب إكمالها لاحقاً في الكود.",
      example: "# TODO: Add error handling for invalid input",
    },
  ],
  pitfalls: [
    {
      titleAr: "كتابة تعليقات واضحة من الكود نفسه (تعليقات غير مفيدة)",
      wrongCode: 'x = 10  # Set x to 10',
      correctCode: 'x = 10  # Maximum retry attempts',
      explanationAr:
        "التعليق يجب أن يشرح السبب أو السياق وليس ما يفعله الكود الواضح. 'Set x to 10' لا يضيف معلومة جديدة.",
    },
    {
      titleAr: "استخدام التعليقات بدلاً من تحسين اسم المتغير",
      wrongCode: 'x = 3.14  # pi value',
      correctCode: 'pi = 3.14',
      explanationAr:
        "بدلاً من كتابة تعليق لشرح ما يمثله المتغير، أعطه اسماً واضحاً يُعبّر عن محتواه مباشرة.",
    },
    {
      titleAr: "الخلط بين التعليق والسلسلة النصية الثلاثية",
      wrongCode: '"""\nThis will actually create a string object in memory\n"""\nprint("Hello")',
      correctCode: '# This is a true comment\n# that spans multiple lines\nprint("Hello")',
      explanationAr:
        "السلاسل النصية الثلاثية الاقتباس ليست تعليقات حقيقية؛ بايثون تُنشئ كائن نصي في الذاكرة. استخدم # لتعليقات حقيقية.",
    },
  ],
  games: {
    fillInTheBlanks: {
      instruction:
        "Fill in the blanks to add proper comments to this code.",
      codeTemplate:
        '___ This calculates the area of a circle\nradius = 5\narea = 3.14 * radius ___ 2  ___ Using the formula: π × r²',
      blanks: ["#", "**", "#"],
      distractors: ["//", "*", "/*", "<!--", "++"],
    },
    bugHunter: {
      instruction:
        "Find the line with the error in this code.",
      code: [
        "# Calculate the total price",
        "price = 100",
        "// Apply 10% discount",
        "discount = price * 0.10",
        "total = price - discount",
        'print("Total:", total)',
      ],
      buggyLineIndex: 2,
      explanation:
        "Python uses # for comments, not //. The line should be: # Apply 10% discount.",
    },
    matchThePairs: {
      instruction:
        "Match each comment style with its description.",
      pairs: [
        { left: "#", right: "Single-line comment marker in Python" },
        { left: '"""..."""', right: "Triple-quoted string used as a docstring" },
        { left: "# TODO:", right: "Marks a task that needs to be completed later" },
        { left: "//", right: "NOT a valid comment in Python (used in JavaScript/C)" },
        { left: "PEP 8", right: "Style guide with comment formatting rules" },
      ],
    },
    predictTheOutput: {
      instruction: "What will the following code print?",
      code: 'x = 5  # + 10\nprint(x)',
      options: ["5", "15", "5  # + 10", "Error"],
      correctIndex: 0,
      explanation:
        "Everything after # on the same line is a comment and is ignored. So x = 5 and print(x) outputs 5.",
    },
    codeUnscrambler: {
      instruction:
        "Arrange these lines to form a well-commented Python program.",
      correctOrder: [
        "# Temperature Converter: Celsius to Fahrenheit",
        "",
        "celsius = 30",
        "fahrenheit = (celsius * 9/5) + 32  # Conversion formula",
        'print("Temperature in F:", fahrenheit)',
      ],
    },
    trueOrFalse: {
      instruction:
        "Decide whether each statement about Python comments is true or false.",
      statements: [
        {
          statement: "Comments in Python start with the # symbol.",
          isTrue: true,
          explanation: "The # symbol marks the beginning of a single-line comment.",
        },
        {
          statement: "Python has a built-in multi-line comment syntax using /* */.",
          isTrue: false,
          explanation:
            "Python does not have /* */ comments. Use multiple # lines or triple-quoted strings for multi-line documentation.",
        },
        {
          statement: "A docstring is placed inside triple quotes at the start of a function.",
          isTrue: true,
          explanation:
            'Docstrings use triple quotes ("""...""" or \'\'\'...\'\'\') and are placed as the first statement in a function, class, or module.',
        },
        {
          statement: "Comments affect the performance of a Python program.",
          isTrue: false,
          explanation:
            "Comments are ignored by the interpreter and have no impact on runtime performance.",
        },
        {
          statement:
            'An inline comment should be separated from code by at least two spaces according to PEP 8.',
          isTrue: true,
          explanation:
            "PEP 8 recommends at least two spaces before an inline comment and a single space after the #.",
        },
      ],
    },
    syntaxSpotter: {
      instruction:
        "Determine whether each snippet with comments is syntactically valid.",
      snippets: [
        {
          code: '# This is a comment\nprint("Hello")',
          isValid: true,
          explanation: "A standard single-line comment followed by valid code.",
        },
        {
          code: 'print("Hello")  # greeting',
          isValid: true,
          explanation: "A valid inline comment after a statement.",
        },
        {
          code: '// This is a comment\nprint("Hello")',
          isValid: false,
          explanation: "Python does not use // for comments. Use # instead.",
        },
        {
          code: '"""\nMulti-line\ndocstring\n"""\nprint("Hello")',
          isValid: true,
          explanation:
            "Triple-quoted strings are valid syntax. When not assigned, they act like comments but are still string literals.",
        },
        {
          code: '# print("This is commented out")\nprint("This prints")',
          isValid: true,
          explanation:
            "The first line is commented out and ignored; only the second line executes.",
        },
      ],
    },
    typeDetective: {
      instruction:
        "Identify the type of each value or expression.",
      expressions: [
        {
          expression: '"""hello"""',
          correctType: "str",
          options: ["str", "comment", "NoneType", "bytes"],
        },
        {
          expression: "# 42",
          correctType: "comment",
          options: ["int", "str", "comment", "NoneType"],
        },
        {
          expression: "True",
          correctType: "bool",
          options: ["str", "int", "bool", "NoneType"],
        },
        {
          expression: "None",
          correctType: "NoneType",
          options: ["bool", "NoneType", "str", "int"],
        },
      ],
    },
    codeFlashcards: {
      instruction:
        "Review these flashcards about comments and code organization.",
      cards: [
        {
          term: "Single-line comment",
          definition:
            "A comment starting with # that extends to the end of the line.",
          example: "# This is a single-line comment",
        },
        {
          term: "Inline comment",
          definition:
            "A comment placed on the same line as a statement, after the code.",
          example: "x = 10  # max retries",
        },
        {
          term: "Docstring",
          definition:
            "A string literal placed as the first statement in a module, function, class, or method to document it.",
          example: 'def add(a, b):\n    """Return the sum of a and b."""\n    return a + b',
        },
        {
          term: "TODO comment",
          definition:
            "A comment convention to mark incomplete tasks in code.",
          example: "# TODO: Validate user input before processing",
        },
        {
          term: "PEP 8",
          definition:
            "The official Python style guide that includes rules for comment formatting, indentation, and naming.",
        },
      ],
    },
    miniProject: {
      title: "Commented Calculator",
      description:
        "Write a well-commented Python script that performs basic arithmetic (addition, subtraction, multiplication, division) on two numbers and prints the results. Each section should have a descriptive comment.",
      starterCode:
        '# Commented Calculator\n# TODO: Define two numbers\n# TODO: Perform addition and print result\n# TODO: Perform subtraction and print result\n# TODO: Perform multiplication and print result\n# TODO: Perform division and print result\n',
      expectedOutput:
        "Addition: 15\nSubtraction: 5\nMultiplication: 50\nDivision: 2.0",
      hints: [
        "Define two variables like a = 10 and b = 5.",
        "Use comments to label each arithmetic section.",
        "Remember that division in Python 3 returns a float by default.",
      ],
      solution:
        '# Commented Calculator\n# This script performs basic arithmetic on two numbers\n\n# Define the two operands\na = 10\nb = 5\n\n# Addition\nprint("Addition:", a + b)\n\n# Subtraction\nprint("Subtraction:", a - b)\n\n# Multiplication\nprint("Multiplication:", a * b)\n\n# Division (returns float)\nprint("Division:", a / b)',
    },
  },
  essayQuestions: [
    {
      question:
        "What are comments in Python and why are they important for code quality? Explain with examples.",
      modelAnswer:
        "Comments in Python are lines or portions of lines that begin with the # symbol and are completely ignored by the interpreter during execution. They are important for code quality because they help explain the purpose and reasoning behind code, making it easier for other developers (and your future self) to understand and maintain the codebase. For example, '# Calculate compound interest using annual rate' explains intent, while poorly written comments like '# set x to 5' for 'x = 5' are redundant. Good comments explain 'why' something is done, not 'what' the code does when the code is self-explanatory.",
    },
    {
      question:
        "Explain the difference between a comment and a docstring in Python. When should you use each?",
      modelAnswer:
        "A comment starts with # and is completely ignored by the Python interpreter — it exists solely for human readers. A docstring is a string literal (usually triple-quoted) placed as the first statement in a module, function, class, or method. Unlike comments, docstrings are stored as the __doc__ attribute of the object and can be accessed at runtime using help() or obj.__doc__. Use comments for inline explanations, TODOs, and notes that clarify logic. Use docstrings to formally document what a function, class, or module does, its parameters, and return values, as they serve as official documentation.",
    },
    {
      question:
        "What are some best practices for writing comments according to PEP 8?",
      modelAnswer:
        "PEP 8 provides several guidelines for comments: (1) Block comments should be indented to the same level as the code they describe and start with # followed by a single space. (2) Inline comments should be separated from the code by at least two spaces and start with # followed by a space. (3) Comments should be complete sentences with the first word capitalized. (4) Comments should be kept up to date — outdated comments are worse than no comments. (5) Avoid obvious comments that restate what the code does; instead, explain why something is done. (6) Use docstrings for all public modules, functions, classes, and methods.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 005 – Variables & Naming Rules
// ---------------------------------------------------------------------------
const lesson005: Lesson = {
  id: 5,
  titleAr: "المتغيرات وقواعد التسمية",
  titleEn: "Variables & Naming Rules",
  module: "intro",
  summaryAr: [
    "المتغير هو اسم يُشير إلى قيمة مُخزّنة في الذاكرة.",
    "لا تحتاج للإعلان عن نوع المتغير؛ بايثون تكتشفه تلقائياً.",
    "تتم عملية الإسناد باستخدام علامة = (تعني: أسنِد القيمة اليمنى للاسم الأيسر).",
    "أسماء المتغيرات يجب أن تبدأ بحرف أو شرطة سفلية (_)، لا تبدأ برقم.",
    "أسماء المتغيرات حساسة لحالة الأحرف (name و Name و NAME مختلفة).",
    "لا يمكن استخدام الكلمات المحجوزة مثل if و for و class كأسماء متغيرات.",
    "يُنصح باستخدام أسلوب snake_case لتسمية المتغيرات (مثل: user_name).",
    "يمكن إسناد عدة قيم لعدة متغيرات في سطر واحد: a, b, c = 1, 2, 3.",
  ],
  methods: [
    {
      name: "Assignment (=)",
      signature: "variable = value",
      descriptionAr: "يُسند قيمة إلى متغير. إذا لم يكن المتغير موجوداً يتم إنشاؤه.",
      example: 'name = "Ahmed"\nage = 25',
    },
    {
      name: "type()",
      signature: "type(variable) -> type",
      descriptionAr: "تُرجع نوع البيانات المُخزّنة في المتغير.",
      example: 'x = 10\nprint(type(x))  # <class \'int\'>',
    },
    {
      name: "id()",
      signature: "id(object) -> int",
      descriptionAr: "تُرجع مُعرّف الكائن في الذاكرة (عنوانه الفريد).",
      example: "x = 42\nprint(id(x))  # e.g., 140234866357488",
    },
    {
      name: "del",
      signature: "del variable",
      descriptionAr: "يحذف المتغير من الذاكرة ويزيل اسمه من النطاق الحالي.",
      example: "x = 10\ndel x\n# print(x)  -> NameError",
    },
    {
      name: "Multiple assignment",
      signature: "a, b, c = val1, val2, val3",
      descriptionAr: "يُسند عدة قيم لعدة متغيرات في سطر واحد.",
      example: "x, y, z = 1, 2, 3\nprint(x, y, z)  # 1 2 3",
    },
    {
      name: "isinstance()",
      signature: "isinstance(obj, classinfo) -> bool",
      descriptionAr: "تتحقق مما إذا كان الكائن من نوع معين أو من أحد الأنواع المحددة.",
      example: "x = 10\nprint(isinstance(x, int))  # True",
    },
  ],
  pitfalls: [
    {
      titleAr: "بدء اسم المتغير برقم",
      wrongCode: "1name = \"Ahmed\"",
      correctCode: "name1 = \"Ahmed\"",
      explanationAr:
        "لا يمكن أن يبدأ اسم المتغير برقم. يجب أن يبدأ بحرف أو شرطة سفلية.",
    },
    {
      titleAr: "استخدام كلمة محجوزة كاسم متغير",
      wrongCode: "class = \"Python 101\"",
      correctCode: "class_name = \"Python 101\"",
      explanationAr:
        "class كلمة محجوزة في بايثون ولا يمكن استخدامها كاسم متغير. أضف كلمة توضيحية مثل class_name.",
    },
    {
      titleAr: "الخلط بين = و ==",
      wrongCode: "x == 10  # Trying to assign\nprint(x)",
      correctCode: "x = 10   # Assignment\nprint(x)",
      explanationAr:
        "علامة = تعني إسناد قيمة، بينما == تعني المقارنة. استخدام == بدل = لا يُسند القيمة بل يُقارنها.",
    },
    {
      titleAr: "عدم الانتباه لحساسية حالة الأحرف",
      wrongCode: 'Name = "Ahmed"\nprint(name)  # NameError',
      correctCode: 'name = "Ahmed"\nprint(name)  # Ahmed',
      explanationAr:
        "بايثون حساسة لحالة الأحرف. Name و name متغيران مختلفان تماماً.",
    },
  ],
  games: {
    fillInTheBlanks: {
      instruction:
        "Fill in the blanks to complete valid variable assignments.",
      codeTemplate:
        '# Assign a name and age\n___ = "Ahmed"\nage = ___\n\n# Print both variables\nprint(name, ___)',
      blanks: ["name", "25", "age"],
      distractors: ["Name", "\"25\"", "AGE", "var", "let"],
    },
    bugHunter: {
      instruction:
        "Find the line with the error in this code.",
      code: [
        "# Variable assignment examples",
        'first_name = "Sara"',
        "2nd_name = \"Ali\"",
        "age = 22",
        "print(first_name, age)",
      ],
      buggyLineIndex: 2,
      explanation:
        "Variable names cannot start with a digit. '2nd_name' should be renamed to 'second_name' or 'name_2'.",
    },
    matchThePairs: {
      instruction:
        "Match each variable concept with its definition.",
      pairs: [
        { left: "snake_case", right: "Naming style using lowercase with underscores" },
        { left: "=", right: "Assignment operator that binds a value to a name" },
        { left: "==", right: "Comparison operator that checks equality" },
        { left: "Reserved word", right: "A keyword that cannot be used as a variable name" },
        { left: "Dynamic typing", right: "Variable type is determined at runtime" },
      ],
    },
    predictTheOutput: {
      instruction: "What will the following code print?",
      code: 'x = 10\ny = x\nx = 20\nprint(y)',
      options: ["10", "20", "Error", "None"],
      correctIndex: 0,
      explanation:
        "y = x copies the value 10 to y. Changing x to 20 afterward does not affect y. So y remains 10.",
    },
    codeUnscrambler: {
      instruction:
        "Arrange these lines to swap the values of two variables.",
      correctOrder: [
        "a = 5",
        "b = 10",
        "a, b = b, a",
        'print("a =", a, "b =", b)',
      ],
    },
    trueOrFalse: {
      instruction:
        "Decide whether each statement about Python variables is true or false.",
      statements: [
        {
          statement:
            "Variable names in Python are case-sensitive.",
          isTrue: true,
          explanation:
            "'myVar' and 'myvar' are two different variables in Python.",
        },
        {
          statement:
            "A variable name can start with a number.",
          isTrue: false,
          explanation:
            "Variable names must start with a letter (a-z, A-Z) or an underscore (_), never a digit.",
        },
        {
          statement:
            "You need to declare a variable's type before using it in Python.",
          isTrue: false,
          explanation:
            "Python uses dynamic typing. You simply assign a value and Python determines the type automatically.",
        },
        {
          statement:
            "The keyword 'del' can be used to delete a variable.",
          isTrue: true,
          explanation:
            "'del variable_name' removes the variable from the current scope.",
        },
        {
          statement:
            "a, b = 1, 2 is valid Python for multiple assignment.",
          isTrue: true,
          explanation:
            "Python supports assigning multiple values to multiple variables in a single line using tuple unpacking.",
        },
      ],
    },
    syntaxSpotter: {
      instruction:
        "Determine whether each variable assignment is syntactically valid.",
      snippets: [
        {
          code: "my_name = \"Ali\"",
          isValid: true,
          explanation:
            "Valid snake_case variable name with a string assignment.",
        },
        {
          code: "3cats = 3",
          isValid: false,
          explanation:
            "Variable names cannot start with a digit. Use 'cats3' or 'three_cats'.",
        },
        {
          code: "_private = True",
          isValid: true,
          explanation:
            "Variable names can start with an underscore. This is valid.",
        },
        {
          code: "for = 10",
          isValid: false,
          explanation:
            "'for' is a reserved keyword and cannot be used as a variable name.",
        },
        {
          code: "x, y = 1, 2",
          isValid: true,
          explanation:
            "Multiple assignment (tuple unpacking) is valid Python syntax.",
        },
      ],
    },
    typeDetective: {
      instruction:
        "Identify the type stored in each variable after the assignment.",
      expressions: [
        {
          expression: 'x = "Hello"',
          correctType: "str",
          options: ["str", "int", "list", "char"],
        },
        {
          expression: "y = 42",
          correctType: "int",
          options: ["int", "float", "str", "bool"],
        },
        {
          expression: "z = 3.14",
          correctType: "float",
          options: ["int", "float", "str", "decimal"],
        },
        {
          expression: "flag = False",
          correctType: "bool",
          options: ["str", "int", "bool", "NoneType"],
        },
        {
          expression: "data = None",
          correctType: "NoneType",
          options: ["bool", "str", "NoneType", "void"],
        },
      ],
    },
    codeFlashcards: {
      instruction:
        "Review these flashcards about Python variables and naming rules.",
      cards: [
        {
          term: "Variable",
          definition:
            "A named reference to a value stored in memory.",
          example: "age = 25",
        },
        {
          term: "Assignment operator (=)",
          definition:
            "Binds a value (right side) to a variable name (left side).",
          example: 'name = "Sara"',
        },
        {
          term: "snake_case",
          definition:
            "A naming convention using lowercase letters and underscores to separate words.",
          example: "user_first_name = \"Ali\"",
        },
        {
          term: "Reserved keywords",
          definition:
            "Words that have special meaning in Python and cannot be used as identifiers.",
          example: "# if, for, while, class, def, return, True, False, None",
        },
        {
          term: "Dynamic typing",
          definition:
            "Python determines the type of a variable at runtime based on the assigned value.",
          example: 'x = 10      # int\nx = "hello" # now str',
        },
        {
          term: "Multiple assignment",
          definition:
            "Assigning values to multiple variables in a single statement.",
          example: "a, b, c = 1, 2, 3",
        },
      ],
    },
    miniProject: {
      title: "Personal Info Card",
      description:
        "Create a Python script that stores personal information (name, age, city, is_student) in variables and prints a formatted info card. Use at least 4 variables of different types (str, int, float, bool).",
      starterCode:
        '# Personal Info Card\n# TODO: Create variables for name, age, height, and is_student\n# TODO: Print a formatted info card\n',
      expectedOutput:
        "===== INFO CARD =====\nName: Ahmed\nAge: 20\nHeight: 1.75 m\nStudent: True\n=====================",
      hints: [
        "Use str for name, int for age, float for height, bool for is_student.",
        "Use print('=' * 21) for separator lines.",
        "Use commas in print() to mix types: print('Age:', age).",
      ],
      solution:
        '# Personal Info Card\nname = "Ahmed"\nage = 20\nheight = 1.75\nis_student = True\n\nprint("===== INFO CARD =====")\nprint("Name:", name)\nprint("Age:", age)\nprint("Height:", height, "m")\nprint("Student:", is_student)\nprint("=====================")',
    },
  },
  essayQuestions: [
    {
      question:
        "What are the rules for naming variables in Python? List at least five rules with examples.",
      modelAnswer:
        "Python has several rules for variable naming: (1) Names must start with a letter (a-z, A-Z) or an underscore (_); they cannot start with a digit. Example: 'name1' is valid but '1name' is not. (2) Names can only contain letters, digits, and underscores — no spaces or special characters like @, $, or -. Example: 'user_name' is valid but 'user-name' is not. (3) Names are case-sensitive: 'Age', 'age', and 'AGE' are three different variables. (4) Reserved keywords (if, for, while, class, def, return, etc.) cannot be used as variable names. (5) By convention (PEP 8), variable names should use snake_case: lowercase words separated by underscores, like 'total_price' instead of 'totalPrice' or 'TotalPrice'.",
    },
    {
      question:
        "Explain what dynamic typing means in Python and how it differs from static typing in languages like Java or C.",
      modelAnswer:
        "Dynamic typing means that variable types are determined at runtime based on the value assigned, not at compile time. In Python, you simply write x = 10 and Python knows x is an integer. You can then write x = 'hello' and x becomes a string — no error occurs. In statically typed languages like Java or C, you must declare the variable type explicitly (e.g., int x = 10) and cannot change it later. Attempting to assign a string to an int variable would cause a compile-time error. Dynamic typing makes Python more flexible and faster to write, but it can lead to type-related bugs that are only caught at runtime, whereas static typing catches these errors earlier during compilation.",
    },
    {
      question:
        "What happens when you assign one variable to another in Python (e.g., b = a)? Does changing one affect the other? Explain with examples.",
      modelAnswer:
        "When you write b = a, Python makes b reference the same object that a references. For immutable types like integers and strings, changing a afterward (e.g., a = 20) creates a new object and rebinds a to it, leaving b unchanged. Example: a = 10; b = a; a = 20; print(b) outputs 10. However, for mutable types like lists, both a and b reference the same list object. Modifying the list through one variable affects the other: a = [1, 2]; b = a; a.append(3); print(b) outputs [1, 2, 3]. This distinction between mutable and immutable types is crucial for understanding Python's variable model.",
    },
    {
      question:
        "What is the difference between the = operator and the == operator in Python? Provide examples of common mistakes beginners make.",
      modelAnswer:
        "The = operator is the assignment operator — it assigns the value on the right side to the variable on the left side. For example, x = 10 stores the value 10 in x. The == operator is the comparison (equality) operator — it checks whether two values are equal and returns True or False. For example, x == 10 returns True if x holds 10. A common beginner mistake is using == when they mean to assign: writing x == 5 instead of x = 5, which evaluates the comparison but does not store anything. Another mistake is using = inside conditions: writing if x = 5 instead of if x == 5, which causes a SyntaxError in Python (though some languages allow it).",
    },
  ],
};

// ---------------------------------------------------------------------------
// Export the lesson data map and helper function
// ---------------------------------------------------------------------------
export const lessonData = new Map<number, Lesson>();
lessonData.set(1, lesson001);
lessonData.set(2, lesson002);
lessonData.set(3, lesson003);
lessonData.set(4, lesson004);
lessonData.set(5, lesson005);

export function getLesson(id: number): Lesson | undefined {
  return lessonData.get(id);
}
