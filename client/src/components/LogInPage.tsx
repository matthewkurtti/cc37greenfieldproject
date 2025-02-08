import React, { useState, FormEvent } from 'react';
import { postData } from '../helpers/fetchHelpers';

import './LogInPage.css';

// typescript for the login page props
type LogInPageProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const LogInPage: React.FC<LogInPageProps> = ({ setCurrentModal }) => {
  // changes database target URL depending on current environment
  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  // handles states
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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

    const result = await postData(url, 'api/auth/login', {
      username: username,
      password: password,
    });

    if (result.message === 'Invalid credentials') {
      setErrorMessage('Invalid username or password. Please try again');
    } else {
      setCurrentModal(null);
    }
  };

  return (
    <div className="log-in-page">
      <h2>LOGIN</h2>

      <form className="log-in-form" onSubmit={handleSubmit}>
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
          placeholder="Your Secret Rock Mantra..."
          value={password}
          onChange={(e) => setPassword(e.target.value)} // handles updating / changing password
        />

        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LogInPage;
