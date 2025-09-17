import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Target, TrendingUp, CheckCircle2 } from "lucide-react";

const funnelStages = [
  {
    id: 1,
    name: "Conscientização",
    users: 10000,
    conversion: 100,
    color: "bg-gradient-primary",
    icon: Users,
    description: "Usuários que conhecem o produto"
  },
  {
    id: 2,
    name: "Interesse",
    users: 5000,
    conversion: 50,
    color: "bg-gradient-secondary",
    icon: Target,
    description: "Usuários interessados em saber mais"
  },
  {
    id: 3,
    name: "Consideração",
    users: 2500,
    conversion: 25,
    color: "bg-primary",
    icon: TrendingUp,
    description: "Usuários avaliando a solução"
  },
  {
    id: 4,
    name: "Conversão",
    users: 1000,
    conversion: 10,
    color: "bg-secondary",
    icon: CheckCircle2,
    description: "Usuários que se tornaram clientes"
  }
];

export const FunnelVisualization = () => {
  return (
    <div className="space-y-8">
      {/* Funnel Header */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
            Visualização do Funil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {funnelStages.map((stage, index) => (
              <div key={stage.id} className="text-center space-y-4">
                {/* Stage Circle */}
                <div className="relative">
                  <div 
                    className={`w-24 h-24 rounded-full ${stage.color} flex items-center justify-center mx-auto shadow-elegant transition-all duration-300 hover:scale-110`}
                  >
                    <stage.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    {stage.conversion}%
                  </Badge>
                </div>

                {/* Stage Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold">{stage.name}</h3>
                  <p className="text-2xl font-bold text-primary">
                    {stage.users.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>

                {/* Connector Arrow */}
                {index < funnelStages.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion Rate Progress */}
          <div className="mt-8 space-y-4">
            <h4 className="font-medium">Taxa de Conversão por Etapa</h4>
            {funnelStages.map((stage) => (
              <div key={stage.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{stage.name}</span>
                  <span className="font-medium">{stage.conversion}%</span>
                </div>
                <Progress 
                  value={stage.conversion} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};