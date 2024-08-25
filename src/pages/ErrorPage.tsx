import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Oops! Page Not Found</h1>
      <p style={styles.message}>The page you are looking for does not exist.</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleGoBack}>
          Go Back
        </button>
        <button style={styles.button} onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '50px',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '24px',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex' as const,
    justifyContent: 'center' as const,
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ErrorPage;
