import { useState, FormEvent } from "react";
import "./SignUpPage.css";

interface SignupResponse {
  message: string;
  token?: string; // optional value
}

const SignUpPage: React.FC = () => {
  const url: string =
    import.meta.env.MODE === "development" ? "http://localhost:8080/" : "/";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [homeCity, setHomeCity] = useState<string>("");
  const [homeCountry, setHomeCountry] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation for required fields
    if (!username || !password || !homeCountry) {
      // user must fill out all fields to register
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${url}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
        },
        body: JSON.stringify({ username, password, homeCity, homeCountry }),
      });

      // handles failed signup
      if (!response.ok) {
        // if no response recieved
        const errorData = await response.json(); // get the error data
        throw new Error(
          errorData.message || "Signup failed, please try again."
        );
      }

      // handles successful signup
      const data: SignupResponse = await response.json();
      console.log("User created successfully: ", data);

      // the server may create create a 'JSON Web Token' which can be stored (also applies to login)
      if (data.token) {
        // if the response containes a JWT, store it
        localStorage.setItem("token", data.token);
      }
    } catch (error: any) {
      setError(error.message || "An error occured when creating a new user.");
    }
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
        <button type={"submit"}>Join and Start Jamming!</button>
      </form>
    </>
  );
};

// TODO add required callouts for required fields
// TODO (wishlist) random value for name placeholder

export default SignUpPage;
