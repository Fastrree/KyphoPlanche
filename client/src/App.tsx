import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/lib/language-context";
import { Layout } from "@/components/layout";

import PlanPage from "@/pages/plan";
import DailyPage from "@/pages/daily";
import TrackerPage from "@/pages/tracker";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PlanPage} />
      <Route path="/daily" component={DailyPage} />
      <Route path="/tracker" component={TrackerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Layout>
            <Router />
          </Layout>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
