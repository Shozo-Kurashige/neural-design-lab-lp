import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Privacy from "@/pages/privacy";
import AiGovernance from "@/pages/ai-governance";
import AiSearchLlmo from "@/pages/ai-search-llmo";
import ForConstruction from "@/pages/for-construction";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/ai-governance" component={AiGovernance} />
      <Route path="/ai-search-llmo" component={AiSearchLlmo} />
      <Route path="/for-construction" component={ForConstruction} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
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
