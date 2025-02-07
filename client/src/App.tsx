import { useState, useEffect } from 'react';
import { getData, deleteData, postData } from './helpers/fetchHelpers';

// components
import ProjectItem from './components/ProjectItem';
import ProfilePage from './components/ProfilePage';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import Modal from './components/Modal';

// images
import logo from './assets/soundcloud_logo.png';

// styles
import './App.css';

function App() {
  console.log('MODE:', import.meta.env.MODE);

  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  console.log('URL:', url);

  const [data, setData] = useState<object | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<object | null>(null);
  const [currentModal, setCurrentModal] = useState<JSX.Element | null>(null);

  // check to see if the user has a valid session token on page load
  const checkIfLoggedIn = async () => {
    const result = await getData(url, 'api/auth/user');

    if (
      result.message === 'Unauthorized' ||
      result.message === 'User not found'
    ) {
      setLoggedInUser(null);
    } else {
      setLoggedInUser(result);
    }
  };

  // ---------- Testing Logs (START) ----------
  useEffect(() => {
    console.log('DATA:', data);
  }, [data]);

  useEffect(() => {
    console.log('CURRENT MODAL:', currentModal);
  }, [currentModal]);

  useEffect(() => {
    console.log('LOGGED IN USER:', loggedInUser);
  }, [loggedInUser]);
  // ----------- Testing Logs (END) -----------

  useEffect(() => {
    checkIfLoggedIn();

    (async () => {
      const result = await getData(url, 'api/user');
      setData(result);
    })();
  }, []);

  useEffect(() => {
    // checks if the user is logged in when transitioning between modals
    // checks for users logging in or out
    checkIfLoggedIn();
  }, [currentModal]);

  return (
    <>
      {currentModal && (
        <Modal currentModal={currentModal} setCurrentModal={setCurrentModal} />
      )}
      <header>
        <img className="logo" src={logo} alt="SoundCrowd's Logo" />
        <nav>
          <ul>
            {loggedInUser ? (
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentModal(<ProfilePage />)}
                >
                  Profile
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentModal(
                        <SignUpPage
                          setData={setData}
                          setCurrentModal={setCurrentModal}
                        />
                      )
                    }
                  >
                    Sign up
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentModal(
                        <LogInPage setCurrentModal={setCurrentModal} />
                      )
                    }
                  >
                    Log In
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main>
        <section className="news-feed">
          <h2>Recent Projects</h2>
          <ul>
            <li>
              <ProjectItem setCurrentModal={setCurrentModal} />
            </li>
            <li>
              <ProjectItem setCurrentModal={setCurrentModal} />
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <button
          onClick={async () => {
            const result = await getData(url, 'api/user');
            setData(result);
          }}
        >
          Test Get
        </button>
        <button
          onClick={async () => {
            const result = await getData(url, 'api/user', 4);
            setData(result);
          }}
        >
          Test Get By ID
        </button>
        <button
          onClick={async () => {
            await deleteData(url, 'api/user', 6);
            const result = await getData(url, 'api/user');
            setData(result);
          }}
        >
          Test Delete
        </button>
        <button
          onClick={async () => {
            await postData(url, 'api/auth/register', {
              username: 'Joe',
              password: 'joepass',
              city: 'Hamamatsu',
              country: 'Japan',
            });
            const result = await getData(url, 'api/user');
            setData(result);
          }}
        >
          Test Post
        </button>
      </footer>
    </>
  );
}

export default App;
