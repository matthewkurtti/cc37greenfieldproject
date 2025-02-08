import { useState, useEffect } from 'react';
import { getData, deleteData, postData } from './helpers/fetchHelpers';

// types
import { User, Project } from './globalTypes';

// components
import ProjectItem from './components/ProjectItem';
import ProfilePage from './components/ProfilePage';
import CreateNewProjectPage from './components/CreateNewProjectPage';
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
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/'; // sets database target URL based on current environment

  console.log('URL:', url);

  const [userData, setUserData] = useState<object | null>(null);

  const [projectData, setProjectData] = useState<Project[] | null>(null); // ensures that projectData is either an array of project data or null

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
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

  // ---------- Testing Logs (START) ---------- */
  useEffect(() => {
    console.log('USER DATA:', userData);
  }, [userData]);

  useEffect(() => {
    console.log('PROJECT DATA:', projectData);
  }, [projectData]);

  useEffect(() => {
    console.log('CURRENT MODAL:', currentModal);
  }, [currentModal]);

  useEffect(() => {
    console.log('LOGGED IN USER:', loggedInUser);
  }, [loggedInUser]);
  // ----------- Testing Logs (END) ----------- */

  // runs when the page loads
  useEffect(() => {
    checkIfLoggedIn();

    // pulls all data from the database
    (async () => {
      const userResult = await getData(url, 'api/user');
      setUserData(userResult);

      const projectResult = await getData(url, 'api/project');
      setProjectData(projectResult);
    })();
  }, []);

  // checks if the user is logged in when transitioning between modals
  // checks for users logging in or out
  useEffect(() => {
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
            {/* displays a Profile button if the user is logged in */}
            {loggedInUser ? (
              <>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentModal(
                        <CreateNewProjectPage
                          loggedInUser={loggedInUser}
                          setProjectData={setProjectData}
                          setCurrentModal={setCurrentModal}
                        />
                      )
                    }
                  >
                    New Project
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentModal(
                        <ProfilePage
                          loggedInUser={loggedInUser}
                          setCurrentModal={setCurrentModal}
                        />
                      )
                    }
                  >
                    Profile
                  </button>
                </li>
                {/* displays a New Project button if the user is logged in */}
              </>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentModal(
                        <SignUpPage
                          setUserData={setUserData}
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
        {!loggedInUser && (
          <section className="user-not-logged-in-hero">
            <h2 className="frontpage-hero-title">Welcome to SoundCrowd</h2>
            <h3 className="frontpage-hero-subtitle">
              We can't wait to hear from you.
            </h3>
          </section>
        )}
        <section className="news-feed">
          <h2>Recent Projects</h2>
          <ul>
            {projectData &&
              projectData.map((project) => (
                <li key={project.id}>
                  {' '}
                  {/* calls and displays each project by project id */}
                  <ProjectItem
                    project={project}
                    setCurrentModal={setCurrentModal}
                  />
                </li>
              ))}
          </ul>
        </section>
      </main>

      {/* test buttons for functionality testing */}
      {/* <footer>
        <button
          onClick={async () => {
            const result = await getData(url, 'api/user');
            setUserData(result);
          }}
        >
          Test Get
        </button>
        <button
          onClick={async () => {
            const result = await getData(url, 'api/user', 4);
            setUserData(result);
          }}
        >
          Test Get By ID
        </button>
        <button
          onClick={async () => {
            await deleteData(url, 'api/user', 6);
            const result = await getData(url, 'api/user');
            setUserData(result);
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
            setUserData(result);
          }}
        >
          Test Post
        </button>
      </footer> */}
    </>
  );
}

export default App;
