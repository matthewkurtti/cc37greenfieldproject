import React, { useState, FormEvent } from 'react';
import { postData } from '../helpers/fetchHelpers';

// interface LoginResponse {
//   message: string;
//   token?: string;
// }

type LogInPageProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const LogInPage: React.FC<LogInPageProps> = ({ setCurrentModal }) => {
  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  // states
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Fixed typo here
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation for required fields
    if (!username || !password) {
      if (!username && !password) {
        setErrorMessage('Username and password fields are required');
      } else if (!username) {
        setErrorMessage('Username field is required');
      } else {
        setErrorMessage('Password field is required');
      }
      return;
    }

    await postData(url, 'api/auth/login', {
      username: username,
      password: password,
    });

    setCurrentModal(null);

    // try {
    //   const response = await fetch(`${url}/api/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //     credentials: 'include',
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || 'Login failed, please try again.');
    //   }

    //   // handles successful login
    //   const data: LoginResponse = await response.json();
    //   console.log('User logged in: ', data);

    //   // storage for JWT token or handle further user actions
    //   if (data.token) {
    //     localStorage.setItem('token', data.token); // stores JWT token
    //   }
    // } catch (error: any) {
    //   setError(error.message || 'An error occurred during login.');
    // }
  };

  return (
    <div className="log-in-page">
      <h2 className="title">LOGIN</h2>
      <div className="App">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="inputLabel">
            Username
          </label>
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default LogInPage;
