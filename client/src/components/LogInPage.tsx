const LogInPage = () => {
  return (
    <div className="log-in-page">
      <h2>LOG IN PAGE</h2>

      <div className="App">
        <form className="login-form">
          <label>Username</label>
          <input type="text" placeholder="Coolguy Beatmaker" />
          <label>Password</label>
          <input type="email" placeholder="rockstar@soundcrowd.com" />

          <button type={"submit"}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
