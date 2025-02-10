import ProjectPage from './ProjectPage';
import { Project, User } from '../globalTypes';

interface ProjectItemProps {
  project: Project; // ensure project is of the custom type Project
  loggedInUser: User | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}

const ProjectItem = ({
  project,
  loggedInUser,
  setCurrentModal,
}: ProjectItemProps) => {
  return (
    <div
      className="project-item"
      onClick={() =>
        setCurrentModal(
          <ProjectPage project={project} loggedInUser={loggedInUser} />
        )
      }
    >
      <h3> {project.project_name} </h3>
      {project.description ? (
        <p className="description"> {project.description} </p>
      ) : (
        <p className="description">
          No description provided, but it's probably a banger! 💥
        </p>
      )}
    </div>
  );
};

export default ProjectItem;
