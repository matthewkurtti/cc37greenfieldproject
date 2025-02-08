import './ProjectPage.css';
import { Project } from '../globalTypes'

type ProjectPageProps = { 
  project: Project;
}

const ProjectPage = ( {project}: ProjectPageProps ) => {
  return (
    <div className="project-page">
      <h2 className="project-page-title">Project Title: { project.project_name}</h2>
      <br />
      <hr />
      <h3>Project Description</h3>
      <p className="project-page-desc"> 
        { project.description}
      </p>
      <div className="members">
        <h3 className="members-title">Members</h3>
        <ul>
          <li>
            <div className="member">
              <span className="member-name">Name: Some Guy</span>
              <div className="tags">
                <span className="">Drummer</span>
                <span>Guitarist</span>
                <span>Leader</span>
              </div>
            </div>
          </li>
          <li>
            <div className="member">
              <span>Name: Some Gal</span>
              <div className="tags">
                <span>Vocalist</span>
                <span>Guitarist</span>
                <span>Member</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h3>Stems</h3>
      <div>
        <span>Track name: Awesome track</span>
        <span>Some Guy</span>
      </div>
    </div>
  );
};

export default ProjectPage;

// TODO append users who are on the project to profile page
// TODO append stems on the project to the profile page
