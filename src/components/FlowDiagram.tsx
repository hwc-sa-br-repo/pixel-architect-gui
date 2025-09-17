import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowDown, CheckCircle, XCircle, Clock, Zap } from "lucide-react";

const flowSteps = [
  {
    id: 1,
    title: "Entrada do Lead",
    description: "Lead entra no funil através de formulário ou landing page",
    type: "start",
    icon: Zap,
    color: "bg-gradient-primary",
    decisions: []
  },
  {
    id: 2,
    title: "Qualificação Automática",
    description: "Sistema avalia automaticamente os dados do lead",
    type: "process",
    icon: Clock,
    color: "bg-muted",
    decisions: [
      { condition: "Score > 70", result: "Qualificado", next: 3 },
      { condition: "Score < 70", result: "Não Qualificado", next: 6 }
    ]
  },
  {
    id: 3,
    title: "Nutrição Personalizada",
    description: "Lead recebe conteúdo segmentado via email marketing",
    type: "process",
    icon: CheckCircle,
    color: "bg-gradient-secondary",
    decisions: []
  },
  {
    id: 4,
    title: "Demonstração Agendada",
    description: "Lead agenda uma demo do produto",
    type: "process",
    icon: CheckCircle,
    color: "bg-primary",
    decisions: [
      { condition: "Compareceu", result: "Participou", next: 5 },
      { condition: "Não compareceu", result: "Re-agendamento", next: 3 }
    ]
  },
  {
    id: 5,
    title: "Proposta Comercial",
    description: "Envio de proposta personalizada",
    type: "process",
    icon: CheckCircle,
    color: "bg-secondary",
    decisions: [
      { condition: "Aceita", result: "Cliente", next: 7 },
      { condition: "Recusa", result: "Follow-up", next: 3 }
    ]
  },
  {
    id: 6,
    title: "Re-qualificação",
    description: "Lead entra em processo de re-qualificação",
    type: "process",
    icon: XCircle,
    color: "bg-muted",
    decisions: []
  },
  {
    id: 7,
    title: "Conversão",
    description: "Lead se torna cliente ativo",
    type: "end",
    icon: CheckCircle,
    color: "bg-gradient-primary",
    decisions: []
  }
];

export const FlowDiagram = () => {
  return (
    <div className="space-y-8">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-secondary"></div>
            Fluxograma do Processo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Flow Steps */}
            <div className="grid gap-6">
              {flowSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div className="flex items-start gap-4 p-4 rounded-lg border bg-card shadow-card hover:shadow-elegant transition-all duration-300">
                    {/* Step Icon */}
                    <div className={`p-3 rounded-full ${step.color} flex-shrink-0`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{step.title}</h3>
                        <Badge variant={step.type === 'start' ? 'default' : step.type === 'end' ? 'secondary' : 'outline'}>
                          {step.type === 'start' ? 'Início' : step.type === 'end' ? 'Fim' : 'Processo'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>

                      {/* Decision Points */}
                      {step.decisions.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <h4 className="text-sm font-medium">Pontos de Decisão:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {step.decisions.map((decision, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                                <span className="font-medium">{decision.condition}</span>
                                <ArrowRight className="w-4 h-4" />
                                <span>{decision.result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {index < flowSteps.length - 1 && (
                    <div className="flex justify-center mt-4 mb-4">
                      <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">87%</div>
            <div className="text-muted-foreground">Taxa de Qualificação</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">2.5h</div>
            <div className="text-muted-foreground">Tempo Médio no Funil</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">34%</div>
            <div className="text-muted-foreground">Taxa de Conversão Final</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};