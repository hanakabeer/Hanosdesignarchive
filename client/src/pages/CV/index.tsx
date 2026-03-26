import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { FooterContact } from "@/components/sections/FooterContact";
import styles from "./styles.module.css";

export default function CV() {
  const experiences = [
    {
      role: "User Experience Designer",
      company: "Ibdå",
      type: "Internship",
      period: "May 2025 - Present • 10 mos",
      skills: ["User Experience (UX)", "Figma (Software)", "+2 skills"],
      logo: "/images/cv/ibda_logo.jpg"
    },
    {
      role: "Animation Intern",
      company: "Ibdå",
      type: "Internship",
      period: "Dec 2024 - Jan 2025 • 2 mos",
      location: "Remote",
      skills: ["Blender and Adobe Creative Cloud"],
      logo: "/images/cv/ibda_logo.jpg"
    },
    {
      role: "Product Design Consultancy Internship",
      company: "Longevity Wellness Hub",
      type: "Internship",
      period: "Jun 2024 - Jul 2024 • 2 mos",
      skills: ["Graphic Design and Adobe Creative Cloud"],
      logo: "/images/cv/longevity logo.jpg"
    },
    {
      role: "Graphic Designer",
      company: "UniAthena",
      type: "Internship",
      period: "Apr 2023 - Aug 2023 • 5 mos",
      skills: ["Graphic Design and Adobe Creative Cloud"],
      logo: "/images/cv/uniathena_logo.jpg"
    },
    {
      role: "Interior Designer",
      company: "JK Design International",
      type: "Freelance",
      period: "May 2021 - Jun 2022 • 1 yr 2 mos",
      logo: "/images/cv/jk_design_international_logo.jpg"
    }
  ];

  const education = [
    {
      school: "Dubai Institute of Design and Innovation",
      degree: "Bachelor of Design, Product/Multimedia",
      period: "Sep 2023 – May 2027",
      skills: ["Product Design and 3D Modeling"],
      logo: "/images/cv/DIDI_logo_1280.jpg"
    },
    {
      school: "Delhi private school, Sharjah",
      degree: "AISSCE",
      period: "Apr 2009 – Mar 2023",
      logo: "/images/cv/delhi private school.png"
    }
  ];

  const awards = [
    { 
      title: "Winner in UNIVERSAL DESIGN FOR INCLUSION PROGRAM", 
      issuer: "nationalmssociety", 
      date: "Sep 2025",
      logo: "/images/cv/national multiple sclerosis.png"
    },
    { 
      title: "Kartell X DIDI product redesign contest", 
      issuer: "Kartell", 
      date: "Feb 2025",
      logo: "/images/cv/kartell.png"
    },
    { 
      title: "Third place winner - NSTI Next founder Competion", 
      issuer: "Ministry of Education", 
      date: "Feb 2024",
      logo: "/images/cv/Nsti.jpg"
    },
    { 
      title: "ATLAB 3D Printing Olympiad 2017 - Winner", 
      issuer: "ATLAB® Middle East", 
      date: "Nov 2017",
      logo: "/images/cv/atlabme_logo.jpg"
    },
    { 
      title: "Gulf 3D Printing Olympiad 2016 - Runner up", 
      issuer: "ATLAB® Middle East", 
      date: "Nov 2016",
      logo: "/images/cv/atlabme_logo.jpg"
    }
  ];

  const tools = [
    { name: "Figma", logo: "/images/cv/tools/download.png" },
    { name: "Adobe Creative Cloud", logo: "/images/cv/tools/download-1.png" },
    { name: "Blender", logo: "/images/cv/tools/download-2.png" },
    { name: "Photoshop", logo: "/images/cv/tools/download-3.png" },
    { name: "Illustrator", logo: "/images/cv/tools/download-4.png" },
    { name: "InDesign", logo: "/images/cv/tools/download.jpg" },
    { name: "After Effects", logo: "/images/cv/tools/download-1.jpg" },
    { name: "Lightroom", logo: "/images/cv/tools/big_217.jpg" }
  ];

  return (
    <div className={styles.cvPage}>
      <Navbar />
      
      <main className={styles.main}>
        <section className={styles.header}>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img src="/images/cv/profile.JPG" alt="Profile" />
            </div>
            <div className={styles.info}>
              <h1 className={styles.name}>Hana Habeer</h1>
              <p className={styles.title}>Industrial & UI/UX Designer</p>
              <div className={styles.links}>
                <a href="#">LinkedIn</a>
                <span className={styles.dot}>•</span>
                <a href="#">Behance</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.list}>
            {education.map((edu, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLogo}>
                  <img src={edu.logo} alt={edu.school} />
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{edu.school}</h3>
                  <p className={styles.itemSubtitle}>{edu.degree}</p>
                  <p className={styles.itemPeriod}>{edu.period}</p>
                  {edu.skills && (
                    <div className={styles.skills}>
                      <span className={styles.skillIcon}>💎</span>
                      {edu.skills.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.list}>
            {experiences.map((exp, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLogo}>
                  <img src={exp.logo} alt={exp.company} />
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{exp.role}</h3>
                  <p className={styles.itemSubtitle}>{exp.company} • {exp.type}</p>
                  <p className={styles.itemPeriod}>{exp.period}</p>
                  {exp.location && <p className={styles.itemLocation}>{exp.location}</p>}
                  {exp.skills && (
                    <div className={styles.skills}>
                      <span className={styles.skillIcon}>💎</span>
                      {exp.skills.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Toolbox</h2>
          <div className={styles.toolGrid}>
            {tools.map((tool, i) => (
              <motion.div 
                key={i} 
                className={styles.toolItem}
                whileHover={{ y: -5 }}
              >
                <div className={styles.toolLogo}>
                  <img src={tool.logo} alt={tool.name} title={tool.name} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Honors & Awards</h2>
          <div className={styles.list}>
            {awards.map((award, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLogo}>
                  <img src={award.logo} alt={award.title} />
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{award.title}</h3>
                  <p className={styles.itemSubtitle}>Issued by {award.issuer} • {award.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterContact />
    </div>
  );
}
