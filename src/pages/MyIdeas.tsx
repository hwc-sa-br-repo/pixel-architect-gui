import { type ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Heart,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IdeaMetric {
  label: string;
  value: number;
  barClass: string;
}

interface IdeaHighlight {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName?: string;
}

interface IdeaAction {
  label: string;
  icon?: LucideIcon;
  variant?: ComponentProps<typeof Button>["variant"];
}

interface IdeaStatus {
  label: string;
  className: string;
}

interface Idea {
  title: string;
  description: string;
  status: IdeaStatus;
  complexity: IdeaStatus;
  metrics: IdeaMetric[];
  tags: string[];
  highlights: IdeaHighlight[];
  actions: IdeaAction[];
}

const myIdeas: Idea[] = [
  {
    title: "Assistente de Onboarding com IA",
    description:
      "Fluxo inteligente que acolhe novos colaboradores, responde dúvidas em tempo real e recomenda recursos relevantes nos primeiros 30 dias.",
    status: {
      label: "Em Co-criação",
      className: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    },
    complexity: {
      label: "Complexidade Média",
      className: "border border-emerald-200 text-emerald-700 bg-emerald-50",
    },
    metrics: [
      { label: "Viabilidade", value: 72, barClass: "bg-emerald-500" },
      { label: "Inovação", value: 91, barClass: "bg-blue-500" },
      { label: "Potencial", value: 88, barClass: "bg-indigo-500" },
      { label: "Complexidade", value: 54, barClass: "bg-amber-500" },
    ],
    tags: ["RH", "Experiência do colaborador", "Automação"],
    highlights: [
      { label: "Adoção", value: "67%", icon: Users, iconClassName: "text-sky-500" },
      { label: "Satisfação", value: "4.7", icon: Heart, iconClassName: "text-rose-500" },
      { label: "ROI Estimado", value: "R$ 2,3 mi", icon: Activity, iconClassName: "text-emerald-500" },
    ],
    actions: [
      { label: "Curtir", icon: Heart, variant: "outline" },
      { label: "Ver Detalhes", icon: Lightbulb },
    ],
  },
  {
    title: "Hub de Feedback Inteligente",
    description:
      "Plataforma que centraliza feedbacks de clientes, clusteriza temas automaticamente e gera sugestões de melhorias priorizadas.",
    status: {
      label: "Pronto para teste",
      className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    },
    complexity: {
      label: "Complexidade Baixa",
      className: "border border-sky-200 text-sky-700 bg-sky-50",
    },
    metrics: [
      { label: "Viabilidade", value: 84, barClass: "bg-emerald-500" },
      { label: "Inovação", value: 78, barClass: "bg-blue-500" },
      { label: "Potencial", value: 90, barClass: "bg-indigo-500" },
      { label: "Complexidade", value: 38, barClass: "bg-amber-500" },
    ],
    tags: ["CX", "Analytics", "SaaS"],
    highlights: [
      { label: "Insights", value: "120/mês", icon: BarChart3, iconClassName: "text-indigo-500" },
      { label: "Colaboração", value: "35 squads", icon: Target, iconClassName: "text-purple-500" },
      { label: "Automação", value: "42%", icon: Sparkles, iconClassName: "text-amber-500" },
    ],
    actions: [
      { label: "Curtir", icon: Heart, variant: "outline" },
      { label: "Ver Detalhes", icon: MessageSquare },
    ],
  },
];

const MyIdeas = () => {
  return (
    <div className="space-y-8 bg-muted/20 p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Minhas Ideias</h1>
        <p className="text-muted-foreground max-w-2xl">
          Revise rapidamente as iniciativas que você acompanha mais de perto, monitore métricas chave e avance com as ações
          recomendadas para cada proposta.
        </p>
      </div>

      <div className="space-y-6">
        {myIdeas.map((idea) => (
          <Card key={idea.title} className="border-border/60 bg-background/95 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-semibold tracking-tight">
                    {idea.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {idea.description}
                  </CardDescription>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={cn("text-sm font-medium", idea.status.className)}>{idea.status.label}</Badge>
                    <Badge variant="outline" className={cn("text-sm font-medium", idea.complexity.className)}>
                      {idea.complexity.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {idea.metrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                      <span>{metric.label}</span>
                      <span className="text-foreground">{metric.value}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className={cn("h-2 rounded-full", metric.barClass)} style={{ width: `${metric.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {idea.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4"
                  >
                    <div className={cn("rounded-full bg-background p-2", highlight.iconClassName)}>
                      <highlight.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {highlight.label}
                      </p>
                      <p className="text-lg font-semibold text-foreground">{highlight.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {idea.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full border-dashed">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-3 border-t border-border/50 bg-muted/20 py-4">
              {idea.actions.map((action) => (
                <Button key={action.label} variant={action.variant ?? "default"} className="gap-2">
                  {action.icon && <action.icon className="h-4 w-4" />}
                  {action.label}
                </Button>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyIdeas;
export { MyIdeas };
