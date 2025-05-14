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
      question: "What is JSX?",
      answer: "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files."
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