import { Navbar } from "@/components/sections/Navbar";
import { HeroDissolveScene } from "@/components/sections/HeroDissolve";
import { ApproachNetwork } from "@/components/sections/ApproachNetwork";
import { Playground } from "@/components/sections/Playground";
import { FooterContact } from "@/components/sections/FooterContact";
import { useProjects } from "@/hooks/use-projects";

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  return (
    <main className="bg-[#0f1320] min-h-screen text-[#f6f6f4]">
      <Navbar />
      {/* Cinematic dissolve transition: Hero → Featured Projects */}
      <HeroDissolveScene projects={projects || []} isLoading={isLoading} />
      {/* Remaining sections continue below in normal document flow */}
      <ApproachNetwork />
      <Playground />
      <FooterContact />
    </main>
  );
}
