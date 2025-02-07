export interface User {
  id: number;
  username: string;
  password: string;
  city: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  project_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
