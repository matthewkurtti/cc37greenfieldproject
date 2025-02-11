import { useState, FormEvent } from 'react';
import { getData, postData } from '../helpers/fetchHelpers';
import { randomName } from '../helpers/randomName';
import { User } from '../globalTypes';
import LogInPage from '../components/LogInPage';

import './SignUpPage.css';

type SignUpPageProps = {
  setUserData: React.Dispatch<React.SetStateAction<User[] | null>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const SignUpPage: React.FC<SignUpPageProps> = ({
  setUserData,
  setCurrentModal,
}) => {
  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  // handles states
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
    setUserData(result);
  };

  return (
    <div className="sign-up-page">
      <h2>Join SoundCrowd</h2>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="required">
          Username
        </label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // sets the value of 'username' to this field on change
          placeholder={randomName()}
          autoFocus
        />

        <label htmlFor="password" className="required">
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
          onChange={(e) => setHomeCity(e.target.value)} // sets the value of 'home city' to this field on change
          placeholder="Your Rock Origin..."
        />

        <label htmlFor="country" className="required">
          Your Home Country
        </label>
        <input
          name="country"
          type="text"
          value={homeCountry}
          onChange={(e) => setHomeCountry(e.target.value)} // sets the value of 'home country' to this field on change
          placeholder="The Country You Tour..."
        />

        <button type={'submit'}>Join and Start Jamming!</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

// TODO add required callouts for required fields
// TODO (wishlist) random value for name placeholder

export default SignUpPage;
