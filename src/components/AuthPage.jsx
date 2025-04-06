const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5004'}/api/${isSignup ? 'signup' : 'login'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, name: username })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    navigate('/');
  } catch (error) {
    console.error('Auth error:', error);
    setError(error.message || 'Authentication failed');
  }
};