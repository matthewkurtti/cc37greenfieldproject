import ProjectPage from './ProjectPage';

interface ProjectItemProps {
  project: Project; // ensure project is of the custom type Project
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}

import { Project } from '../globalTypes';

const ProjectItem = ({ project, setCurrentModal }: ProjectItemProps) => {
  return (
    <div
      className="project-item"
      onClick={() => setCurrentModal(<ProjectPage project={project} />)}
    >
      <h3> {project.project_name} </h3>
      {project.description ? (
        <p> {project.description} </p>
      ) : (
        <p className="description">
          No description provided, but it's probably a banger! 💥
        </p>
      )}
    </div>
  );
};

export default ProjectItem;
