import { getData, deleteData, postData } from '../helpers/fetchHelpers';
import { User } from '../globalTypes';
import './ProfilePage.css';

type ProfilePageProps = {
  loggedInUser: User | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const ProfilePage = ({ loggedInUser, setCurrentModal }: ProfilePageProps) => {
  // changes database target URL depending on current environment
  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  return (
    <div className="profile-page">
      <h2>PROFILE</h2>
      {loggedInUser && (
        <>
          <p>{loggedInUser.username}</p>
          <p>{loggedInUser.city}</p>
          <p>{loggedInUser.country}</p>
        </>
      )}
      <button
        type="button"
        onClick={async () => {
          await getData(url, 'api/auth/logout');
          setCurrentModal(null);
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
