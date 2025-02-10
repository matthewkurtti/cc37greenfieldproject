export interface User {
  id: number;
  username: string;
  city: string;
  country: string;
}

export interface Project {
  id: number;
  leader_id: number;
  project_name: string;
  description: string;
}
