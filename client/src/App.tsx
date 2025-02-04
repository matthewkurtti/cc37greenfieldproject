import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const url =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  const [data, setData] = useState(null);

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
      <h1> SoundCrowd </h1>
      <p>{url}</p>
    </>
  );
}

export default App;
