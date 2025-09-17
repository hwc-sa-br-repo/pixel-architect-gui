import { Card } from "@/components/ui/card";
import { FunnelVisualization } from "./FunnelVisualization";
import { FormComponents } from "./FormComponents";
import { FlowDiagram } from "./FlowDiagram";
import { ArchitectureView } from "./ArchitectureView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interface de arquitetura avançada com visualização de funil, componentes modulares e fluxos interativos
        </p>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="funnel" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="funnel">Funil</TabsTrigger>
          <TabsTrigger value="forms">Formulários</TabsTrigger>
          <TabsTrigger value="flow">Fluxograma</TabsTrigger>
          <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-6">
          <FunnelVisualization />
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <FormComponents />
        </TabsContent>

        <TabsContent value="flow" className="space-y-6">
          <FlowDiagram />
        </TabsContent>

        <TabsContent value="architecture" className="space-y-6">
          <ArchitectureView />
        </TabsContent>
      </Tabs>
    </div>
  );
};