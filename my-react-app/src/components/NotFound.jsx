import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}

export default NotFound;