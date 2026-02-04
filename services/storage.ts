import AsyncStorage from "@react-native-async-storage/async-storage";
import mockData from "../assets/data/mockData.json";

const KEYS = {
  PROJECTS: "portfolio_projects",
  POSTS: "portfolio_posts",
  SKILLS: "portfolio_skills",
  INITIALIZED: "portfolio_initialized",
};

export const storage = {
  async init() {
    const initialized = await AsyncStorage.getItem(KEYS.INITIALIZED);
    if (!initialized) {
      await this.saveProjects(mockData.projects);
      await this.savePosts(mockData.posts);
      await this.saveSkills(mockData.skills);
      await AsyncStorage.setItem(KEYS.INITIALIZED, "true");
    }
  },

  async getItems<T>(key: string): Promise<T[]> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting items for key ${key}:`, error);
      return [];
    }
  },

  async saveItems<T>(key: string, items: T[]): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      console.error(`Error saving items for key ${key}:`, error);
    }
  },

  // Projects
  async getProjects() {
    return this.getItems<any>(KEYS.PROJECTS);
  },
  async saveProjects(projects: any[]) {
    return this.saveItems(KEYS.PROJECTS, projects);
  },

  // Posts
  async getPosts() {
    return this.getItems<any>(KEYS.POSTS);
  },
  async savePosts(posts: any[]) {
    return this.saveItems(KEYS.POSTS, posts);
  },

  // Skills
  async getSkills() {
    return this.getItems<any>(KEYS.SKILLS);
  },
  async saveSkills(skills: any[]) {
    return this.saveItems(KEYS.SKILLS, skills);
  },
};
