import { useState, FormEvent } from 'react';
import { getData, postData } from '../helpers/fetchHelpers';
import './CreateNewProjectPage.css';

// types
import { User, Project } from '../globalTypes';

type CreateNewProjectPageProps = {
  loggedInUser: User | null;
  setProjectData: React.Dispatch<React.SetStateAction<Project[] | null>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const CreateNewProjectPage = ({
  loggedInUser,
  setProjectData,
  setCurrentModal,
}: CreateNewProjectPageProps) => {
  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

  // handles states
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(loggedInUser);

    // basic validation for required fields
    if (!projectName) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    if (loggedInUser) {
      await postData(
        url,
        `api/project/create`,
        {
          project_name: projectName,
          description: projectDescription,
        },
        loggedInUser.id
      );

      const projectResult = await getData(url, 'api/project');
      setProjectData(projectResult);

      setCurrentModal(null);
    }
  };

  return (
    <>
      <div className="create-new-project-page">
        <h2 className="title">Create a New Project</h2>

        <form className="create-new-project-form" onSubmit={handleSubmit}>
          <label htmlFor="project-name" className="required">
            Project Name
          </label>
          <input
            name="project-name"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)} // sets the value of 'project_name' to this field on change
            placeholder="My Awesome Project"
            autoFocus
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="project-description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)} // sets the value of 'project-description' to this field on change
            placeholder="Tell us about your project..."
          ></textarea>
          {/* TODO convert to a text field instead of text box */}
          <button type="submit">Create Your New Jam!</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default CreateNewProjectPage;
