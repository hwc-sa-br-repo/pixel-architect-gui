import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Globe, Smartphone, Shield, Zap, BarChart3, Users } from "lucide-react";

const architectureComponents = [
  {
    id: 1,
    name: "Interface Web",
    category: "Frontend",
    description: "React + TypeScript interface responsiva",
    icon: Globe,
    color: "bg-gradient-primary",
    connections: [2, 3]
  },
  {
    id: 2,
    name: "App Mobile",
    category: "Frontend", 
    description: "Aplicativo mobile nativo",
    icon: Smartphone,
    color: "bg-gradient-primary",
    connections: [3]
  },
  {
    id: 3,
    name: "API Gateway",
    category: "Backend",
    description: "Gateway centralizado para APIs",
    icon: Server,
    color: "bg-gradient-secondary",
    connections: [4, 5, 6]
  },
  {
    id: 4,
    name: "Serviço de Autenticação",
    category: "Microservice",
    description: "JWT + OAuth2 authentication",
    icon: Shield,
    color: "bg-muted",
    connections: [7]
  },
  {
    id: 5,
    name: "Engine de Funil",
    category: "Microservice",
    description: "Lógica principal do funil de vendas",
    icon: Zap,
    color: "bg-primary",
    connections: [7, 8]
  },
  {
    id: 6,
    name: "Analytics Engine",
    category: "Microservice",
    description: "Processamento de métricas e relatórios",
    icon: BarChart3,
    color: "bg-secondary",
    connections: [7, 8]
  },
  {
    id: 7,
    name: "Banco de Dados Principal",
    category: "Database",
    description: "PostgreSQL cluster principal",
    icon: Database,
    color: "bg-muted",
    connections: []
  },
  {
    id: 8,
    name: "Cache Redis",
    category: "Database",
    description: "Cache em memória para performance",
    icon: Database,
    color: "bg-muted",
    connections: []
  }
];

const getCategoryColor = (category: string) => {
  const colors = {
    Frontend: "bg-blue-100 text-blue-800",
    Backend: "bg-green-100 text-green-800",
    Microservice: "bg-purple-100 text-purple-800",
    Database: "bg-orange-100 text-orange-800"
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const ArchitectureView = () => {
  return (
    <div className="space-y-8">
      {/* Architecture Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-secondary"></div>
            Visão Geral da Arquitetura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {architectureComponents.map((component) => (
              <div key={component.id} className="relative">
                <Card className="h-full hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    {/* Component Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-full ${component.color}`}>
                        <component.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={getCategoryColor(component.category)}>
                        {component.category}
                      </Badge>
                    </div>

                    {/* Component Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{component.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {component.description}
                      </p>
                    </div>

                    {/* Connections */}
                    {component.connections.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-xs text-muted-foreground mb-2">Conecta com:</div>
                        <div className="flex flex-wrap gap-1">
                          {component.connections.map((connectionId) => {
                            const connectedComponent = architectureComponents.find(c => c.id === connectionId);
                            return (
                              <Badge key={connectionId} variant="outline" className="text-xs">
                                {connectedComponent?.name}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary mb-1">15.2K</div>
            <div className="text-sm text-muted-foreground">Usuários Ativos</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Server className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary mb-1">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary mb-1">142ms</div>
            <div className="text-sm text-muted-foreground">Latência Média</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary mb-1">2.4M</div>
            <div className="text-sm text-muted-foreground">Requests/dia</div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Stack */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Stack Tecnológico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Frontend</h4>
              <div className="space-y-2">
                <Badge variant="outline">React 18</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge variant="outline">Vite</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-secondary">Backend</h4>
              <div className="space-y-2">
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">Express</Badge>
                <Badge variant="outline">GraphQL</Badge>
                <Badge variant="outline">Docker</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Database</h4>
              <div className="space-y-2">
                <Badge variant="outline">PostgreSQL</Badge>
                <Badge variant="outline">Redis</Badge>
                <Badge variant="outline">MongoDB</Badge>
                <Badge variant="outline">Elasticsearch</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-secondary">DevOps</h4>
              <div className="space-y-2">
                <Badge variant="outline">AWS</Badge>
                <Badge variant="outline">Kubernetes</Badge>
                <Badge variant="outline">CI/CD</Badge>
                <Badge variant="outline">Monitoring</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};