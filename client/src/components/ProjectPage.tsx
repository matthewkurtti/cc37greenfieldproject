import React, { useEffect, useState } from 'react';
import './ProjectPage.css';
import { Project } from '../globalTypes';

type ProjectPageProps = {
  project: Project;
};

interface Member {
  id: number;
  name: string;
  role: string;
}

interface Stem {
  id: number;
  stem_name: string;
  url: string;
  project_id: number;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [stems, setStems] = useState<Stem[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Fetch members and stems for the project
    const fetchProjectData = async () => {
      try {
        const membersResponse = await fetch('/api/project/members');
        const membersData = await membersResponse.json();
        setMembers(membersData);

        const stemsResponse = await fetch(`/api/project/${project.id}/stems`);
        const stemsData = await stemsResponse.json();
        setStems(stemsData);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [project.id]);

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setMessage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', project.id.toString());

    try {
      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('File uploaded successfully');
        console.log('Uploaded file:', data.stem);
        setStems((prevStems) => [...prevStems, data.stem]);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="project-page">
      <h2 className="project-page-title">
        Project Title: {project.project_name}
      </h2>
      <h3>Project Description</h3>
      <p className="project-page-desc">{project.description}</p>
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
