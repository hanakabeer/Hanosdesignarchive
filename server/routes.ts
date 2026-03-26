import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getProjects();
  if (existing.length > 0) return;

  const seedProjects = [
    {
      title: "Mumo",
      category: "Adaptive Menstrual Care",
      year: "2024",
      route: "/work/1",
      role: "Individual Project | Functional POC",
      overview: "An Adaptive Menstrual Care solution designed for accessibility and comfort.",
      imageUrl: "/images/hero images/Mumo.png"
    },
    {
      title: "Cascader",
      category: "Rotomolding Machine",
      year: "2023",
      route: "/work/2",
      role: "Group Project | Modular Fabrication System",
      overview: "A modular fabrication system exploring large-scale rotomolding techniques.",
      imageUrl: "/images/hero images/rotomoldin.png"
    },
    {
      title: "Versa Grip",
      category: "Adaptive Grip Exploration",
      year: "2023",
      route: "/work/3",
      role: "Competition Project | Exploratory Assistive Design Study",
      overview: "An assistive design study on adaptive grip mechanisms for individuals with limited dexterity.",
      imageUrl: "/images/hero images/versagrip.png"
    },
    {
      title: "PortaPalm",
      category: "Gesture-Controlled Robotics",
      year: "2024",
      route: "/work/4",
      role: "Individual Project | Prototype + Code",
      overview: "A gesture-controlled robotic arm prototype exploring how remote hands could intervene in hazardous environments through natural hand motion.",
      imageUrl: "/images/Playground/industrial/Portapalm.jpg"
    },
    {
      title: "Mycrochet",
      category: "Robotic Biocomposite Fabrication System",
      year: "2023",
      route: "/work/5",
      role: "Group Project | Robotic End-Effector POC",
      overview: "Exploring robotic-assisted biocomposite fabrication through custom end-effector design.",
      imageUrl: "/images/hero images/Mycrochet.png"
    },
    {
      title: "Bukhoorie",
      category: "An Adaptive Menstrual Care",
      year: "2022",
      route: "/work/6",
      role: "Individual Project | Functional POC",
      overview: "A specialized project exploring traditional materials and adaptive functional design.",
      imageUrl: "/images/hero images/Kartell.png"
    }
  ];

  for (const p of seedProjects) {
    await storage.createProject(p);
  }
}
