import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../helpers/fetchHelpers";
import { User } from "../globalTypes";
import "./ProfilePage.css";
import avatar from "../assets/avatar.png";

type ProfilePageProps = {
  loggedInUser: User | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const ProfilePage = ({ loggedInUser, setCurrentModal }: ProfilePageProps) => {
  // changes database target URL depending on current environment
  const url: string =
    import.meta.env.MODE === "development" ? "http://localhost:8080/" : "/";

  return (
    <div className="profile-page">
      <h2>PROFILE</h2>
      {loggedInUser && (
        <>
          <img className="avatar" src={avatar} alt="Your profile picture" />
          <button>Upload Profile Pic</button>
          <input type="file" />
          <label>USERNAME</label>
          <p>{loggedInUser.username}</p>
          {loggedInUser.city && (
            <>
              <label>CITY</label>
              <p>{loggedInUser.city}</p>
            </>
          )}
          <label>COUNTRY</label>
          <p>{loggedInUser.country}</p>
        </>
      )}

      <button
        type="button"
        onClick={async () => {
          await getData(url, "api/auth/logout");
          setCurrentModal(null);
        }}
      >
        Log Out{" "}
        <span className="nav-icon">
          <FontAwesomeIcon
            icon={faRightToBracket}
            size="lg"
            flip="horizontal"
          />
        </span>
      </button>
    </div>
  );
};

export default ProfilePage;
