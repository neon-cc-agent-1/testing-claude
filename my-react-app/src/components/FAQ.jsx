import { useState } from 'react'
import '../styles/FAQ.css'

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "What is C++?",
      answer: "C++ is a high-performance, general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language. It supports object-oriented, procedural, and generic programming paradigms, and is widely used for developing operating systems, game engines, desktop applications, and performance-critical software."
    },
    {
      question: "What is Xamarin?",
      answer: "Xamarin is a Microsoft-owned cross-platform mobile app development framework that allows developers to build native Android, iOS, and Windows apps using C# and .NET. It provides a single shared codebase, native UI controls, and direct access to native APIs, enabling developers to create apps with native performance and look-and-feel while sharing business logic across platforms."
    },
    {
      question: "What is the stack in programming?",
      answer: "The stack is a region of memory that stores temporary variables created by each function. Variables are declared, stored, and initialized during runtime. When a function is called, its variables are pushed onto the stack, and when the function exits, they are popped off. The stack has a fixed size and operates in a Last-In-First-Out (LIFO) manner."
    },
    {
      question: "What is the heap in programming?",
      answer: "The heap is a region of memory used for dynamic memory allocation. Unlike the stack, memory in the heap is not automatically managed and can be accessed globally. Objects allocated on the heap have no dependencies with the values below them on the stack, and their lifetimes are not tied to the scope in which they were created. The heap has no size restrictions but may become fragmented."
    },
    {
      question: "What is a pointer?",
      answer: "A pointer is a variable that stores the memory address of another variable. Pointers are used to indirectly access variables, dynamically allocate memory, efficiently pass large data structures to functions, and implement complex data structures like linked lists and trees."
    },
    {
      question: "What is a data structure?",
      answer: "A data structure is a specialized format for organizing, processing, retrieving, and storing data. Common data structures include arrays, linked lists, stacks, queues, trees, graphs, hash tables, heaps, and sets. The choice of data structure impacts the efficiency of algorithms that use it."
    },
    {
      question: "What is an algorithm?",
      answer: "An algorithm is a step-by-step procedure or formula for solving a problem. In programming, algorithms are the core processes for computation and data processing. Examples include sorting algorithms (quicksort, merge sort), search algorithms (binary search), and graph algorithms (Dijkstra's algorithm)."
    },
    {
      question: "What is time complexity?",
      answer: "Time complexity is a measure of the amount of time an algorithm takes to run as a function of the input size. It's commonly expressed using Big O notation, such as O(1) for constant time, O(log n) for logarithmic time, O(n) for linear time, O(n log n) for linearithmic time, and O(n²) for quadratic time."
    },
    {
      question: "What is space complexity?",
      answer: "Space complexity is a measure of the amount of memory an algorithm or data structure requires relative to the input size. Like time complexity, it's often expressed using Big O notation. Space complexity includes both auxiliary space (extra space used by the algorithm) and the space needed to store the input."
    },
    {
      question: "What is recursion?",
      answer: "Recursion is a programming technique where a function calls itself to solve a problem. A recursive function typically has a base case that stops the recursion and a recursive case that breaks the problem into smaller instances. While elegant for certain problems like tree traversals, recursion can lead to stack overflow errors if not properly implemented."
    },
    {
      question: "What is object-oriented programming?",
      answer: "Object-oriented programming (OOP) is a programming paradigm based on the concept of 'objects' that contain data (attributes) and code (methods). The four main principles of OOP are encapsulation (bundling data and methods), inheritance (creating new classes from existing ones), polymorphism (objects taking different forms), and abstraction (hiding implementation details)."
    },
    {
      question: "What is functional programming?",
      answer: "Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. It emphasizes expressions rather than statements, immutability, first-class and higher-order functions, and recursion instead of iteration."
    },
    {
      question: "What is a compiler?",
      answer: "A compiler is a software program that translates source code written in a high-level programming language into machine code, intermediate code, or another target language. The compilation process typically includes lexical analysis, syntax analysis, semantic analysis, code optimization, and code generation."
    },
    {
      question: "What is an interpreter?",
      answer: "An interpreter is a program that directly executes instructions written in a programming language without requiring them to be compiled into machine language first. Interpreters process and execute the program line by line, making debugging easier but typically running slower than compiled code."
    },
    {
      question: "What is garbage collection?",
      answer: "Garbage collection is an automatic memory management process that reclaims memory occupied by objects that are no longer in use by the program. It relieves programmers from manually freeing allocated memory, preventing memory leaks. Common strategies include reference counting, mark-and-sweep, and generational collection algorithms."
    },
    {
      question: "What is a closure in programming?",
      answer: "A closure is a function that has access to variables from its outer (enclosing) lexical scope, even after the outer function has returned. Closures 'close over' the variables they need, preserving access to them. They're commonly used for data encapsulation, creating private variables, and in callback functions."
    },
    {
      question: "What is the difference between compiled and interpreted languages?",
      answer: "Compiled languages (like C++ and Rust) translate code to machine code before execution, resulting in faster performance but platform-specific executables. Interpreted languages (like Python and JavaScript) translate code at runtime line-by-line, offering more flexibility and platform independence but typically slower execution. Some languages use a hybrid approach with just-in-time compilation."
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      <h2>Programming Q&A</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ