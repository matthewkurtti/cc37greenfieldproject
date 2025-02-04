import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const url =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const getData = async () => {
    const response = await fetch(`${url}api/user`);
    const result = await response.json();
    setData(result);
  };

  return (
    <>
      <header>
        <div className="logo">
          <span className="icon">🎵</span>
          <h1>SoundCrowd</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#signup">Sign up</a>
            </li>
            <li>
              <a href="#login">Log in</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="news-feed">
          <h2>Song Item</h2>
          <div id="news-items">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
            diam interdum, vehicula neque quis, mattis mi. Maecenas mollis
            accumsan est non volutpat. Duis semper tincidunt tristique. Sed et
            ante leo. Aenean mattis lacus leo, mattis viverra massa gravida ac.
            Quisque id consectetur nulla. Ut tincidunt elit eget nisl malesuada,
            vel condimentum mi bibendum. Etiam accumsan, felis non dapibus
            aliquam, erat mauris ultricies neque, vel tincidunt dui erat a nisi.
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
