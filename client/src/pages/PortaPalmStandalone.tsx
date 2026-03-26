import { PortaPalmPage } from "@/components/sections/PortaPalmPage";

// Minimal standalone wrapper for PortaPalm — this gives PortaPalm
// its own dedicated route (/portapalm) accessible from the Playground.
// We create a synthetic project object since this page doesn't need
// a database entry — it's a playground showcase, not a case study.
const standaloneProject = {
    id: 99,
    title: "PortaPalm",
    year: "2023",
    category: "Industrial",
    overview: "Gesture-Controlled Tactile Telepresence Prototype",
    role: "Solo Project",
    imageUrl: "/images/Playground/industrial/Portapalm.jpg",
};

export default function PortaPalmStandalone() {
    return <PortaPalmPage project={standaloneProject as any} />;
}
