import { useState, useEffect } from 'react';
import { getData, deleteData } from './helpers/fetchHelpers';

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
  const [currentModal, setCurrentModal] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const result = getData(url, 'api/user');
    setData(result);
  }, []);

  useEffect(() => {
    console.log('DATA:', data);
  }, [data]);

  useEffect(() => {
    console.log('CURRENT MODAL:', currentModal);
  }, [currentModal]);

  useEffect(() => {
    (async () => {
      const result = await getData(url, 'api/user');
      setData(result);
    })();
  }, []);

  // const getData = async () => {
  //   const response = await fetch(`${url}api/user`);
  //   const result = await response.json();
  //   setData(result);
  // };

  return (
    <>
      {currentModal && (
        <Modal currentModal={currentModal} setCurrentModal={setCurrentModal} />
      )}
      <header>
        <img className="logo" src={logo} alt="SoundCrowd's Logo" />
        <nav>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => setCurrentModal(<ProfilePage />)}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setCurrentModal(<SignUpPage />)}
              >
                Sign up
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setCurrentModal(<LogInPage />)}
              >
                Log In
              </button>
            </li>
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
            await deleteData(1, url, 'api/user');
            const result = await getData(url, 'api/user');
            setData(result);
          }}
        >
          Test Delete
        </button>
      </footer>
    </>
  );
}

export default App;

//<button onClick={() => {getData()}}>Test Patch</button>
