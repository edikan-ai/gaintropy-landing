import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const Demo = lazy(() => import("./pages/Demo"));
const Explorer = lazy(() => import("./pages/Explorer"));
const Calculator = lazy(() => import("./calculator/CalculatorPage"));

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/demo"} component={Demo} />
      {/* Problem Library Explorer — accessible by direct URL only,
          intentionally not linked from the homepage navigation. */}
      <Route path={"/explore"} component={Explorer} />
      <Route path={"/calculator"} component={Calculator} />
      <Route path={"/library"} component={Explorer} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
