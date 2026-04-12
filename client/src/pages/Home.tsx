import { useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { HeroDissolveScene } from "@/components/sections/HeroDissolve";
import { ApproachNetwork } from "@/components/sections/ApproachNetwork";
import { Playground } from "@/components/sections/Playground";
import { FooterContact } from "@/components/sections/FooterContact";
import { useProjects } from "@/hooks/use-projects";

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  useEffect(() => {
    const scrollToHashTarget = () => {
      const { hash } = window.location;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;

      const navbar = document.querySelector("nav");
      const navHeight = navbar instanceof HTMLElement ? navbar.getBoundingClientRect().height : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "auto",
      });
    };

    const frame = window.requestAnimationFrame(scrollToHashTarget);
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, [isLoading, projects]);

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
