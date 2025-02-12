import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { getData, postData } from "../helpers/fetchHelpers";
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
  // trigger input through btn
  const clickRef = useRef<HTMLInputElement>(null);
  //store profile images uploaded by user
  //img display url
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  //handle upload
  const handleImgUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedImg = e.target.files ? e.target.files[0] : null;
    const formData = new FormData();
    //send form data with image
    if (uploadedImg && loggedInUser) {
      formData.append("file", uploadedImg);
      formData.append("user_id", loggedInUser?.id.toString());
      try {
        const response = await fetch(`${url}api/user/profile/image`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const profileImgUrlResponse = await response.json();
        if (response.ok) {
          //set image url if exists
          setImgUrl(profileImgUrlResponse.profileImgUrl);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    setImgUrl(loggedInUser ? loggedInUser.profile_img_url : null);
  }, []);
  useEffect(() => {
    // await helper function to get url returned from backend;
    console.log(loggedInUser);
  }, [imgUrl]);

  return (
    <div className="profile-page">
      <h2>PROFILE</h2>
      {loggedInUser && (
        <>
          <img
            className="avatar"
            src={imgUrl ? imgUrl : avatar}
            alt="Your profile picture"
          />
          {/* the btn triggers input */}
          <input
            id="upload-img-input"
            type="file"
            accept="image/*"
            ref={clickRef}
            onChange={(e) => handleImgUpload(e)}
          />
          <button
            id="upload-img-btn"
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
