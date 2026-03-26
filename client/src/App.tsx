import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CustomCursor } from "@/components/ui/CustomCursor";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import PortaPalmStandalone from "@/pages/PortaPalmStandalone";
import CV from "@/pages/CV";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work/:id" component={ProjectDetail} />
      <Route path="/portapalm" component={PortaPalmStandalone} />
      <Route path="/cv" component={CV} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
