import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AboutPage from "@/pages/about-page";
import ServicesPage from "@/pages/services-page";
import Privacy from "@/pages/privacy";
import AiGovernance from "@/pages/ai-governance";
import AiSearchLlmo from "@/pages/ai-search-llmo";
import ForConstruction from "@/pages/for-construction";
import PresidentExcel from "@/pages/president-excel";
import Maesabaki from "@/pages/maesabaki";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/ai-governance" component={AiGovernance} />
      <Route path="/ai-search-llmo" component={AiSearchLlmo} />
      <Route path="/for-construction" component={ForConstruction} />
      <Route path="/maesabaki" component={Maesabaki} />
      <Route path="/president-excel" component={PresidentExcel} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full overflow-x-hidden min-h-screen">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
