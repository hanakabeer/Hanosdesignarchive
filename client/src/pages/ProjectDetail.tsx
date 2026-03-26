import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import { MumoProjectPage } from "@/components/sections/MumoProject";
import { CascaderProjectPage } from "@/components/sections/CascaderProject";
import { VersaGripProjectPage } from "@/components/sections/VersaGripProject";
import { MycrochetProjectPage } from "@/components/sections/MycrochetProject";
import { BukhooriePage } from "@/components/sections/BukhooriePage";
import { PencilSharpenerPage } from "@/components/sections/PencilSharpenerPage";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [, params] = useRoute("/work/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) return <div style={{ minHeight: '100vh', background: '#f6f6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontFamily: 'Inter, sans-serif' }}>Loading...</div>;
  if (error || !project) return <div style={{ minHeight: '100vh', background: '#f6f6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f00' }}>Project not found</div>;

  // Mumo-specific case study
  if (id === 1) return <MumoProjectPage project={project} />;

  // Cascader case study
  if (id === 2) return <CascaderProjectPage project={project} />;

  // VersaGrip case study
  if (id === 3) return <VersaGripProjectPage project={project} />;

  // Pencil Sharpener case study (replaces PortaPalm at slot 4)
  if (id === 4) return <PencilSharpenerPage project={project} />;

  // Mycrochet case study
  if (id === 5) return <MycrochetProjectPage project={project} />;

  // Bukhoorie case study
  if (id === 6) return <BukhooriePage project={project} />;

  // Generic fallback for other projects
  return (
    <div style={{ background: '#f6f6f4', minHeight: '100vh', color: '#101319' }}>
      <Navbar />
      <main style={{ padding: '8rem 3rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <Link href="/">
          <a style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', textDecoration: 'none', marginBottom: '3rem', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
            <ArrowLeft size={15} /> Back to Archive
          </a>
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#aaa', display: 'block', marginBottom: '0.75rem' }}>{project.category} — {project.year}</span>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2.5rem', color: '#101319' }}>{project.title}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2.5rem' }}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#bbb', marginBottom: '0.5rem' }}>Role</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#101319' }}>{project.role}</p>
            </div>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#bbb', marginBottom: '0.5rem' }}>Overview</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', lineHeight: 1.7, color: '#444', maxWidth: '600px' }}>{project.overview}</p>
            </div>
          </div>
          <div style={{ marginTop: '4rem' }}>
            <img src={project.imageUrl} alt={project.title} style={{ width: '100%', borderRadius: '20px', objectFit: 'cover', maxHeight: '70vh' }} />
          </div>
        </motion.div>
      </main>
      <ProjectNav currentId={id} />
    </div>
  );
}
