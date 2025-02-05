import './ProjectPage.css';

const ProjectPage = () => {
  return (
    <div className="project-page">
      <h2 className="project-page-title">PROJECT TITLE</h2>
      <p className="project-page-desc">
        This a description about this awesome project!
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
