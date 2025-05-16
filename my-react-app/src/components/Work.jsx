import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import '../styles/Work.css'

// Placeholder for your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_your_key_here')

// Payment form component using Stripe Headless API (Elements API)
function HeadlessCheckoutForm() {
  const [paymentElement, setPaymentElement] = useState(null)
  const [stripe, setStripe] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    // Load Stripe instance
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise
      setStripe(stripeInstance)
      
      // Create and mount the Payment Element
      if (stripeInstance) {
        const elements = stripeInstance.elements({
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#4a90e2',
              borderRadius: '8px',
            },
          }
        })
        
        const element = elements.create('payment')
        setPaymentElement(element)
        
        // Mount the payment element to the DOM
        setTimeout(() => {
          element.mount('#payment-element-container')
        }, 100)
      }
    }
    
    initializeStripe()
    
    // Cleanup on unmount
    return () => {
      if (paymentElement) {
        paymentElement.unmount()
      }
    }
  }, [])
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !paymentElement) {
      return
    }
    
    setIsLoading(true)
    
    // Use Stripe Headless API for confirmPayment
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: stripe.elements(),
        confirmParams: {
          return_url: window.location.origin + '/#payment-success',
        },
        redirect: 'if_required'
      })
      
      if (error) {
        setErrorMessage(error.message)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful - you can handle this on your end
        console.log('Payment successful!', paymentIntent)
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="payment-form">
      {/* Container for the Stripe Payment Element */}
      <div id="payment-element-container"></div>
      
      <button 
        disabled={!stripe || isLoading} 
        className="payment-button"
        type="submit"
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  )
}

function Work() {
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [projects] = useState([
    {
      id: 1,
      title: 'Website Development',
      description: 'Custom responsive website built with React',
      price: 1500,
      image: 'https://placehold.co/600x400?text=Website+Dev',
    },
    {
      id: 2,
      title: 'Mobile App Design',
      description: 'UI/UX design for iOS and Android applications',
      price: 2000,
      image: 'https://placehold.co/600x400?text=Mobile+App',
    },
    {
      id: 3,
      title: 'E-commerce Integration',
      description: 'Full-featured online store with payment processing',
      price: 2500,
      image: 'https://placehold.co/600x400?text=E-commerce',
    }
  ])
  const [selectedProject, setSelectedProject] = useState(null)
  
  // In a real app, you would fetch the payment intent from your backend
  useEffect(() => {
    if (selectedProject) {
      // Simulate API call to create a payment intent with the Stripe Headless API
      // This would normally be a server request to create a PaymentIntent
      const createPaymentIntent = async () => {
        try {
          // Simulating API call delay
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // In a real app, this would be the result from your backend
          // that creates a Stripe PaymentIntent and returns the client_secret
          setClientSecret('mock_client_secret_from_headless_api')
          setIsLoading(false)
        } catch (error) {
          console.error('Error creating payment intent:', error)
          setIsLoading(false)
        }
      }
      
      createPaymentIntent()
    }
  }, [selectedProject])
  
  const selectProject = (project) => {
    setSelectedProject(project)
    setIsLoading(true)
  }
  
  return (
    <div className="work-container">
      <h1>Our Services</h1>
      
      {!selectedProject ? (
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p className="price">${project.price}</p>
              <button onClick={() => selectProject(project)}>Select</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="checkout-container">
          <h2>Checkout for {selectedProject.title}</h2>
          <p>Total: ${selectedProject.price}</p>
          
          {isLoading ? (
            <div className="loading">Loading payment form...</div>
          ) : (
            <div className="stripe-payment-container">
              <HeadlessCheckoutForm />
            </div>
          )}
          
          <button className="back-button" onClick={() => setSelectedProject(null)}>
            Back to Services
          </button>
        </div>
      )}
    </div>
  )
}

export default Work
