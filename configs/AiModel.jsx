const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: ‘Programming’, Topic: Python, Level:Basic, Duration:1 hours, NoOfChapters:5, in JSON format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"CourseName\": \"Introduction to Python Programming\",\n  \"Description\": \"This course provides a basic introduction to Python programming, covering fundamental concepts and syntax. It is designed for beginners with little to no prior programming experience.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"1 hour\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"ChapterName\": \"Chapter 1: Getting Started with Python\",\n      \"About\": \"Introduction to Python, setting up the development environment, and writing your first Python program.\",\n      \"Duration\": \"10 minutes\" \n    },\n    {\n      \"ChapterName\": \"Chapter 2: Variables and Data Types\",\n      \"About\": \"Understanding variables, different data types (integers, floats, strings, booleans), and working with them.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Chapter 3: Operators and Expressions\",\n      \"About\": \"Exploring various operators (arithmetic, comparison, logical) and how to use them in expressions.\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"ChapterName\": \"Chapter 4: Control Flow (Conditional Statements)\",\n      \"About\": \"Learning about conditional statements (if, elif, else) and how to control the flow of execution based on conditions.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Chapter 5: Loops (for and while)\",\n      \"About\": \"Introduction to loops (for and while) and how to repeat blocks of code efficiently.\",\n      \"Duration\": \"10 minutes\"\n    }\n  ]\n}\n```" },
            ],
        },
        {
            role: "user",
            parts: [
                { text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: ‘Programming’, Topic: Python, Level:Basic, Duration:1 hours, NoOfChapters:5, in JSON format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"CourseName\": \"Introduction to Python Programming\",\n  \"Description\": \"This course provides a foundational understanding of Python programming for beginners.  We'll cover fundamental concepts and syntax, requiring no prior programming knowledge.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"60 minutes\",  //More precise duration\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"ChapterName\": \"Setting up your Python Environment\",\n      \"About\": \"Installing Python, choosing an IDE (or using a simple text editor), and running your first 'Hello, world!' program.\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"ChapterName\": \"Variables, Data Types, and Operators\",\n      \"About\": \"Understanding variables, common data types (integers, floats, strings, booleans), and basic arithmetic, comparison, and assignment operators.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Control Flow: if-else Statements\",\n      \"About\": \"Learning to control the flow of your program using conditional statements (if, elif, else) to make decisions based on different conditions.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Loops: for and while\",\n      \"About\": \"Iterating through code using 'for' loops (for working with sequences) and 'while' loops (for repeating code until a condition is met).\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Basic Input/Output and String Manipulation\",\n      \"About\": \"Getting user input, printing output to the console, and working with strings (concatenation, slicing, methods).\",\n      \"Duration\": \"5 minutes\"\n    }\n  ]\n}\n```\n" },
            ],
        },
    ],
});


export const GenerateChaperContent_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "PROMPT: Explain the concept in Detail on Topic: Python, Chapter: Concurrency and Parallelism in Python, in JSON Format with list of array with field as title, description in detail, Code Example(Code field in <precode> format) if applicable" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"title\": \"Concurrency and Parallelism in Python\",\n  \"chapters\": [\n    {\n      \"title\": \"Understanding Concurrency and Parallelism\",\n      \"description\": \"Concurrency and parallelism are often used interchangeably, but they represent distinct concepts.  Concurrency refers to the ability to deal with multiple tasks seemingly at the same time, even if they aren't executed simultaneously.  Parallelism, on the other hand, involves the simultaneous execution of multiple tasks using multiple processing units (cores).  In Python, concurrency is achieved through techniques like threading and asynchronous programming, while parallelism leverages multiprocessing.\",\n      \"code\": \"\"\n    },\n    {\n      \"title\": \"Threading in Python\",\n      \"description\": \"Python's threading module allows you to create and manage threads, enabling concurrent execution.  However, due to the Global Interpreter Lock (GIL), only one thread can hold control of the Python interpreter at any given time. This limits true parallelism for CPU-bound tasks. Threading is still beneficial for I/O-bound tasks (tasks that spend a lot of time waiting, like network requests or file operations), as threads can switch while waiting, improving overall responsiveness.\",\n      \"code\": \"<precode>\\nimport threading\\nimport time\\n\\ndef worker_function(name):\\n    print(f\\\"Thread {name}: starting\\\")\\n    time.sleep(2)\\n    print(f\\\"Thread {name}: finishing\\\")\\n\\nthreads = []\\nfor i in range(5):\\n    thread = threading.Thread(target=worker_function, args=(i,))\\n    threads.append(thread)\\n    thread.start()\\n\\nfor thread in threads:\\n    thread.join()\\nprint(\\\"All threads finished\\\")\\n</precode>\"\n    },\n    {\n      \"title\": \"Multiprocessing in Python\",\n      \"description\": \"The `multiprocessing` module bypasses the GIL limitation by creating separate processes, each with its own interpreter and memory space. This allows for true parallelism, especially beneficial for CPU-bound tasks.  It's more overhead than threading, but offers significant performance gains when multiple cores are available.\",\n      \"code\": \"<precode>\\nimport multiprocessing\\nimport time\\n\\ndef worker_function(name):\\n    print(f\\\"Process {name}: starting\\\")\\n    time.sleep(2)\\n    print(f\\\"Process {name}: finishing\\\")\\n    return name * 2\\n\\nif __name__ == '__main__':\\n    with multiprocessing.Pool(processes=5) as pool:\\n        results = pool.map(worker_function, range(5))\\n        print(f\\\"Results: {results}\\\")\\n</precode>\"\n    },\n    {\n      \"title\": \"Asynchronous Programming with `asyncio`\",\n      \"description\": \"The `asyncio` library provides a framework for writing concurrent code using the async/await syntax.  It's particularly suited for I/O-bound operations.  `asyncio` achieves concurrency using a single thread and an event loop, efficiently managing multiple tasks without the overhead of creating and managing numerous threads or processes.  It excels at handling many simultaneous network requests or other I/O-heavy tasks.\",\n      \"code\": \"<precode>\\nimport asyncio\\n\\nasync def my_coroutine(i):\\n    print(f\\\"Coroutine {i}: starting\\\")\\n    await asyncio.sleep(1)\\n    print(f\\\"Coroutine {i}: finishing\\\")\\n    return i * 2\\n\\nasync def main():\\n    tasks = [my_coroutine(i) for i in range(5)]\\n    results = await asyncio.gather(*tasks)\\n    print(f\\\"Results: {results}\\\")\\n\\nasyncio.run(main())\\n</precode>\"\n    },\n    {\n      \"title\": \"Choosing the Right Approach\",\n      \"description\": \"The best approach (threading, multiprocessing, or asyncio) depends on the nature of your tasks.  For I/O-bound tasks, threading or asyncio are often sufficient.  For CPU-bound tasks, multiprocessing is generally necessary to leverage multiple cores.  Consider factors like task complexity, dependencies between tasks, and the hardware available when making your decision.\",\n      \"code\": \"\"\n    }\n  ]\n}\n```\n" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
