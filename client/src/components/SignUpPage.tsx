import { useState, FormEvent } from 'react';
import { getData, postData } from '../helpers/fetchHelpers';

import LogInPage from '../components/LogInPage';

import './SignUpPage.css';

interface SignupResponse {
  message: string;
  token?: string; // optional value
}

type SignUpPageProps = {
  setData: React.Dispatch<React.SetStateAction<object | null>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const SignUpPage: React.FC<SignUpPageProps> = ({
  setData,
  setCurrentModal,
}) => {
  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [homeCity, setHomeCity] = useState<string>('');
  const [homeCountry, setHomeCountry] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation for required fields
    if (!username || !password || !homeCountry) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    await postData(url, 'api/auth/register', {
      username: username,
      password: password,
      city: homeCity,
      country: homeCountry,
    });

    setCurrentModal(<LogInPage setCurrentModal={setCurrentModal} />);
    const result = await getData(url, 'api/user');
    setData(result);

    // try {
    //   const response = await fetch(`${url}api/auth/register`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'applicaton/json',
    //     },
    //     body: JSON.stringify({ username, password, homeCity, homeCountry }),
    //   });
    //   // handles failed signup
    //   if (!response.ok) {
    //     // if no response recieved
    //     const errorData = await response.json(); // get the error data
    //     throw new Error(
    //       errorData.message || 'Signup failed, please try again.'
    //     );
    //   }
    //   // handles successful signup
    //   const data: SignupResponse = await response.json();
    //   console.log('User created successfully: ', data);
    //   // the server may create create a 'JSON Web Token' which can be stored (also applies to login)
    //   if (data.token) {
    //     // if the response containes a JWT, store it
    //     localStorage.setItem('token', data.token);
    //   }
    // } catch (error: any) {
    //   setError(error.message || 'An error occured when creating a new user.');
    // }
  };

  return (
    <>
      <div className="sign-up-page">
        <h2 className="title">Join SoundCrowd</h2>
      </div>

      <form onSubmit={handleSubmit} className="App">
        <label htmlFor="username" className="inputLabel">
          Username
        </label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // sets the value of 'username' to this field on change
          placeholder="Coolguy Beatmaker"
        />

        <label htmlFor="password" className="inputLabel">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // sets the value of 'password' to this field on change
          placeholder="A Secret Rock Mantra..."
        />

        <label htmlFor="city" className="inputLabel">
          Your Home City
        </label>
        <input
          name="city"
          type="text"
          value={homeCity}
          onChange={(e) => setHomeCity(e.target.value)}
          placeholder="Your Rock Origin..."
        />

        <label htmlFor="country" className="inputLabel">
          Your Home Country
        </label>
        <input
          name="country"
          type="text"
          value={homeCountry}
          onChange={(e) => setHomeCountry(e.target.value)}
          placeholder="The Country You Tour..."
        />

        <br></br>
        <hr></hr>
        <br></br>
        <button type={'submit'}>Join and Start Jamming!</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </>
  );
};

// TODO add required callouts for required fields
// TODO (wishlist) random value for name placeholder

export default SignUpPage;
