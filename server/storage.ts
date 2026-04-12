import { projects, type Project, type InsertProject } from "../shared/schema.js";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    const { db } = await import("./db.js");
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const { db } = await import("./db.js");
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const { db } = await import("./db.js");
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }
}

class InMemoryStorage implements IStorage {
  private _projects: Project[] = [];
  private _nextId = 1;

  async getProjects(): Promise<Project[]> {
    return this._projects;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this._projects.find((p) => p.id === id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = { id: this._nextId++, ...insertProject };
    this._projects.push(project);
    return project;
  }
}

export const storage: IStorage =
  process.env.DATABASE_URL ? new DatabaseStorage() : new InMemoryStorage();
