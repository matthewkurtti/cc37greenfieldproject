import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../helpers/fetchHelpers";
import { User } from "../globalTypes";
import "./ProfilePage.css";
import avatar from "../assets/avatar.png";
import { ChangeEvent, useEffect } from "react";
import React from "react";
import { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";

type ProfilePageProps = {
  loggedInUser: User | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const ProfilePage = ({ loggedInUser, setCurrentModal }: ProfilePageProps) => {
  // changes database target URL depending on current environment
  const url: string =
    import.meta.env.MODE === "development" ? "http://localhost:8080/" : "/";

  //store profile images uploaded by user
  const clickRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<File | null>(null);

  const handleImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileImg(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    console.log(profileImg);
  }, [profileImg]);

  return (
    <div className="profile-page">
      <h2>PROFILE</h2>
      {loggedInUser && (
        <>
          <img className="avatar" src={avatar} alt="Your profile picture" />
          <input
            type="file"
            accept="image/*"
            ref={clickRef}
            onChange={(e) => handleImgUpload(e)}
          />
          <button
            id="upload-img"
            onClick={() => {
              clickRef.current?.click();
            }}
          >
            Upload Profile Pic
          </button>
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
