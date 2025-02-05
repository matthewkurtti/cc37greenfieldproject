import ProjectPage from './ProjectPage';
import './ProjectItem.css';

type ProjectItemProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const ProjectItem = ({ setCurrentModal }: ProjectItemProps) => {
  return (
    <div onClick={() => setCurrentModal(<ProjectPage />)}>
      <span>Title</span> <span>Description</span>
    </div>
  );
};

export default ProjectItem;
