import { useEffect, useRef, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FullscreenLoader } from "@/components/ui/FullscreenLoader";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import PortaPalmStandalone from "@/pages/PortaPalmStandalone";
import CV from "@/pages/CV";
import PlaygroundMobile from "@/pages/PlaygroundMobile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work/:id" component={ProjectDetail} />
      <Route path="/portapalm" component={PortaPalmStandalone} />
      <Route path="/cv" component={CV} />
      <Route path="/playground" component={PlaygroundMobile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loaderPhase, setLoaderPhase] = useState<"visible" | "exiting" | "hidden">("visible");
  const prevOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    if (loaderPhase !== "hidden") {
      if (prevOverflowRef.current === null) {
        prevOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
      return;
    }
    if (prevOverflowRef.current !== null) {
      document.body.style.overflow = prevOverflowRef.current;
      prevOverflowRef.current = null;
    }
  }, [loaderPhase]);

  useEffect(() => {
    const beginExit = () => {
      window.setTimeout(() => setLoaderPhase("exiting"), 120);
    };

    if (document.readyState === "complete") {
      beginExit();
      return;
    }

    window.addEventListener("load", beginExit, { once: true });
    return () => window.removeEventListener("load", beginExit);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {loaderPhase !== "hidden" && (
        <FullscreenLoader
          phase={loaderPhase === "exiting" ? "exiting" : "visible"}
          onExited={() => setLoaderPhase("hidden")}
        />
      )}
      <CustomCursor />
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
