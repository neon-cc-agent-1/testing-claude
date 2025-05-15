import { useState } from 'react'
import '../styles/FAQ.css'

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces. It's maintained by Meta and a community of individual developers and companies."
    },
    {
      question: "Why use React?",
      answer: "React makes it easy to create interactive UIs, efficiently updates components when data changes, and is component-based for better code reusability."
    },
    {
      question: "What is JavaScript?",
      answer: "JavaScript is a programming language that enables interactive web pages. It's an essential part of web applications, allowing for dynamic content, interactive forms, animations, and much more. JavaScript runs on the client-side of the web, which can be used to design/program how web pages behave on the occurrence of an event."
    },
    {
      question: "What is Vite?",
      answer: "Vite (French word for \"quick\", pronounced /vit/) is a modern frontend build tool that significantly improves the frontend development experience. It provides a faster development server with hot module replacement and optimized production builds using Rollup. Vite is designed to work seamlessly with frameworks like React, Vue, and others."
    },
    {
      question: "What is JavaScript?",
      answer: "JavaScript is a programming language that enables interactive web pages. It's an essential part of web applications, running on the client side of the web browser, and allows developers to implement complex features like interactive maps, animated graphics, and responsive form validation."
    },
    {
      question: "What is JSX?",
      answer: "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files."
    },
    {
      question: "What is CSS?",
      answer: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, or in other media."
    },
    {
      question: "What are React Hooks?",
      answer: "Hooks are functions that let you use state and other React features without writing a class. The most commonly used hooks are useState and useEffect."
    },
    {
      question: "How do I install React?",
      answer: "You can start a new React project using tools like Create React App, Vite, or Next.js. For example, with Vite you can run: npm create vite@latest my-app -- --template react"
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
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