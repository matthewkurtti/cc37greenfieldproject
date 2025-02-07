import React, { useEffect, useState } from 'react';
import './ProjectPage.css'; // Import the CSS file for styling

// Define the Member interface to type the member objects
interface Member {
  id: number;
  name: string;
  role: string;
}

// Define the Stem interface to type the stem objects
interface Stem {
  id: number;
  stem_name: string;
  url: string;
}

// Define the ProjectPage component as a functional component
const ProjectPage: React.FC = () => {
  // State to store the list of members
  const [members, setMembers] = useState<Member[]>([]);
  // State to store the list of stems
  const [stems, setStems] = useState<Stem[]>([]);
  // State to store messages for user feedback
  const [message, setMessage] = useState<string>('');

  // useEffect hook to fetch project data (members and stems) when the component mounts
  useEffect(() => {
    // Function to fetch project data from the backend
    const fetchProjectData = async () => {
      try {
        // Fetch members data from the backend
        const membersResponse = await fetch('/api/project/members');
        const membersData = await membersResponse.json();
        setMembers(membersData); // Update the members state with the fetched data

        // Fetch stems data from the backend
        const stemsResponse = await fetch('/api/project/stems');
        const stemsData = await stemsResponse.json();
        setStems(stemsData); // Update the stems state with the fetched data
      } catch (error) {
        console.error('Error fetching project data:', error); // Log any errors
      }
    };

    fetchProjectData(); // Call the function to fetch project data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle file upload
  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the file input element and the selected file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setMessage('No file selected'); // Set message if no file is selected
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Append the selected file to the FormData object

    try {
      // Perform the file upload
      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('File uploaded successfully'); // Set success message
        console.log('Uploaded file:', data.stem); // Log the uploaded file details
        // Update the stems state to include the new stem
        setStems((prevStems) => [...prevStems, data.stem]);
      } else {
        setMessage(data.message); // Set error message from the response
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      setMessage('An error occurred'); // Set error message
    }
  };

  return (
    <div className="project-page">
      <h2 className="project-page-title">PROJECT TITLE</h2>
      <br />
      <hr />
      <h3>Project Description</h3>
      <p className="project-page-desc">
        This a description about this awesome project!
      </p>
      <div className="members">
        <h3 className="members-title">Members</h3>
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <div className="member">
                <span className="member-name">Name: {member.name}</span>
                <div className="tags">
                  <span className="">{member.role}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="stems">
        <h3 className="stems-title">Stems</h3>
        <ul>
          {stems.map((stem) => (
            <li key={stem.id}>
              <div className="stem">
                <span className="stem-name">Name: {stem.stem_name}</span>
                <a href={stem.url} target="_blank" rel="noopener noreferrer">
                  Listen
                </a>
                <a href={stem.url} download={stem.stem_name}>
                  <button>Download</button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form id="uploadForm" onSubmit={handleFileUpload}>
        <input type="file" id="fileInput" name="file" required />
        <button type="submit">Upload</button>
      </form>
      <div id="message">{message}</div>
    </div>
  );
};

export default ProjectPage;
