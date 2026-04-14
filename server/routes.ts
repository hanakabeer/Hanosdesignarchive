import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import type { Project } from "../shared/schema.js";
import nodemailer from "nodemailer";

function normalizeProject(project: Project): Project {
  if (project.id === 5 || project.route === "/work/5" || project.title === "Pencil Sharpener") {
    return {
      ...project,
      imageUrl: "/images/hero-images/sharpner.png",
    };
  }

  if (project.id === 6 || project.route === "/work/6" || project.title === "Bukhoorie") {
    return {
      ...project,
      imageUrl: "/images/hero-images/kartell.png",
    };
  }

  return project;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.projects.list.path, async (req, res) => {
    try {
      const projects = await storage.getProjects();
      if (projects.length === 0) {
        console.log("No projects found, seeding database...");
        await seedDatabase();
        const seededProjects = await storage.getProjects();
        return res.json(seededProjects.map(normalizeProject));
      }
      res.json(projects.map(normalizeProject));
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(normalizeProject(project));
  });

  app.post(api.contact.send.path, async (req, res) => {
    const parsed = api.contact.send.body.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const { name, email, message } = parsed.data;

    const to = process.env.CONTACT_TO || "kabeer.hana@hotmail.com";
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

    if (!host || !user || !pass) {
      return res.status(500).json({ message: "Email service is not configured" });
    }

    const from = process.env.CONTACT_FROM || user;

    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      const subject = `Portfolio message${name ? ` — ${name}` : ""}`;
      const text = [
        `Name: ${name ?? ""}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n");

      await transporter.sendMail({
        from,
        to,
        replyTo: email,
        subject,
        text,
      });

      return res.status(200).json({ ok: true });
    } catch {
      return res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  try {
    const existing = await storage.getProjects();
    if (existing.length > 0) {
      console.log(`Database already has ${existing.length} projects. Skipping seed.`);
      return;
    }

    console.log("Seeding database with default projects...");
    const seedProjects = [
      {
        title: "Mumo",
        category: "Adaptive Menstrual Care",
        year: "2024",
        route: "/work/1",
        role: "Individual Project | Functional POC",
        overview: "An Adaptive Menstrual Care solution designed for accessibility and comfort.",
        imageUrl: "/images/hero-images/Mumo.png"
      },
      {
        title: "Cascader",
        category: "Rotomolding Machine",
        year: "2023",
        route: "/work/2",
        role: "Group Project | Modular Fabrication System",
        overview: "A modular fabrication system exploring large-scale rotomolding techniques.",
        imageUrl: "/images/hero-images/rotomoldin.png"
      },
      {
        title: "Mycrochet",
        category: "Robotic Biocomposite Fabrication System",
        year: "2023",
        route: "/work/3",
        role: "Group Project | Robotic End-Effector POC",
        overview: "Exploring robotic-assisted biocomposite fabrication through custom end-effector design.",
        imageUrl: "/images/hero-images/Mycrochet.png"
      },
      {
        title: "Versa Grip",
        category: "Adaptive Grip Exploration",
        year: "2023",
        route: "/work/4",
        role: "Competition Project | Exploratory Assistive Design Study",
        overview: "An assistive design study on adaptive grip mechanisms for individuals with limited dexterity.",
        imageUrl: "/images/hero-images/versagrip.png"
      },
      {
        title: "Pencil Sharpener",
        category: "Reverse Engineering Study",
        year: "2022",
        route: "/work/5",
        role: "Individual Project | CAD & Mechanical Teardown",
        overview: "A reverse-engineering study of a manual helical pencil sharpener, from physical teardown to digital reconstruction.",
        imageUrl: "/images/hero-images/sharpner.png"
      },
      {
        title: "Bukhoorie",
        category: "A Ritual Lighting Experience",
        year: "2022",
        route: "/work/6",
        role: "Individual Project | Functional POC",
        overview: "A specialized project exploring traditional materials and adaptive functional design.",
        imageUrl: "/images/hero-images/kartell.png"
      }
    ];

    for (const p of seedProjects) {
      await storage.createProject(p);
    }
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}
