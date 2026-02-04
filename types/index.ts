export type Project = {
  id: string;
  name: string;
  description: string;
  cover: string;
  link?: string;
  demoLink?: string;
  category?: string;
  iconUrl?: string;
  theme?: string;
  role?: string;
  skills?: string[];
  publishedAt?: string;
  videoUrl?: string;
  projectType?: "Frontend" | "Backend" | "Full Stack";
  assets?: { type: "image" | "video"; url: string }[];
};

export type Post = {
  id: string;
  title: string;
  description: string;
  picture: string;
  category?: string;
  createdAt: string;
};

export type Skill = {
  id: string;
  name: string;
  type: "Frontend" | "Backend" | "Other";
  imageUrl: string;
};
