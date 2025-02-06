import React, { useState, FormEvent } from 'react'

interface LoginResponse {
  message: string;
  token?: string;
}

const LogInPage: React.FC = () => {

  const url: string =
    import.meta.env.MODE === "development" ? "http://localhost:8080/" : "/";

  // states
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Fixed typo here
  const [error, setError] = useState<string | null>(null);

  // might be replaced by global / foreign function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation
    if (!username) {
      setError('Username is required.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    // main submission logic
    try {
      const response = await fetch(`${url}/api/auth/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), 
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Login failed, please try again.');
      }

      // handles successful login
      const data: LoginResponse = await response.json();
      console.log('User logged in: ', data);

      // storage for JWT token or handle further user actions
      if (data.token) {
        localStorage.setItem('token', data.token); // stores JWT token
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during login.'); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="log-in-page">
        <h2 className="title">LOGIN</h2>

        <div className="App">
          <form className="login-form">

            <label htmlFor="username" className="inputLabel">Username</label>
            <input 
              type="text" 
              placeholder="Coolguy Beatmaker"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} // handles updating / changing username
            />

            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              placeholder="rockstar@soundcrowd.com"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} // handles updating / changing password
            />

            <button type="submit">Login</button>
          </form>
        </div>

        {error && <p className="error-message">{error}</p>} {/* display error message if exists */}
      </div>
    </form>
  );
};

export default LogInPage;
