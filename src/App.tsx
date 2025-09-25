import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Dashboard } from "./components/Dashboard";
import { NewIdea } from "./pages/NewIdea";
import { ExistingIdeas } from "./pages/ExistingIdeas";
import { MyIdeas } from "./pages/MyIdeas";
import { MarketMapping } from "./pages/MarketMapping";
import { PainMapping } from "./pages/PainMapping";
import { HypothesesGeneration } from "./pages/HypothesesGeneration";
import { BusinessCanvas } from "./pages/BusinessCanvas";
import { StrategyCanvas } from "./pages/StrategyCanvas";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Dashboard />} />
            <Route path="nova-ideia" element={<NewIdea />} />
            <Route path="ideias-existentes" element={<ExistingIdeas />} />
            <Route path="minhas-ideias" element={<MyIdeas />} />
            <Route path="mapeamento-mercado" element={<MarketMapping />} />
            <Route path="mapeamento-dores" element={<PainMapping />} />
            <Route path="geracao-hipoteses" element={<HypothesesGeneration />} />
            <Route path="business-canvas" element={<BusinessCanvas />} />
            <Route path="strategy-canvas" element={<StrategyCanvas />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
