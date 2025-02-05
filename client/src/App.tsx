import { useState, useEffect } from 'react';
import ProjectItem from './components/ProjectItem';
import ProfilePage from './components/ProfilePage';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import Modal from './components/Modal';
import './App.css';
import logo from './assets/soundcloud_logo.png';

function App() {
  // TEST

  console.log('MODE:', import.meta.env.MODE);

  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  console.log('URL:', url);

  const [data, setData] = useState<object | null>(null);
  const [currentModal, setCurrentModal] = useState<JSX.Element | null>(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('DATA:', data);
  }, [data]);
  useEffect(() => {
    console.log('CURRENT MODAL:', currentModal);
  }, [currentModal]);

  const getData = async () => {
    const response = await fetch(`${url}api/user`);
    const result = await response.json();
    setData(result);
  };

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
    </>
  );
}

export default App;
