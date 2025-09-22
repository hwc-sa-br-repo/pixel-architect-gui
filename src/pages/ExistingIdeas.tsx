import { type ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Eye,
  Heart,
  Rocket,
  Sparkles,
  Star,
  Target,
  Users,
  ShieldCheck,
  Gauge,
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

const ideas: Idea[] = [
  {
    title: "IA para Diagnóstico Médico",
    description:
      "Sistema de inteligência artificial para auxiliar médicos no diagnóstico precoce de doenças raras e análise de imagens médicas.",
    status: {
      label: "Aprovada",
      className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    },
    complexity: {
      label: "Complexidade Alta",
      className: "border border-amber-200 text-amber-600 bg-amber-50",
    },
    metrics: [
      { label: "Viabilidade", value: 85, barClass: "bg-emerald-500" },
      { label: "Inovação", value: 95, barClass: "bg-blue-500" },
      { label: "Potencial", value: 92, barClass: "bg-indigo-500" },
      { label: "Complexidade", value: 60, barClass: "bg-amber-500" },
    ],
    tags: ["Saúde", "IA", "Machine Learning"],
    highlights: [
      { label: "Avaliação", value: "4.8", icon: Star, iconClassName: "text-amber-500" },
      { label: "Interesse", value: "89.0", icon: Users, iconClassName: "text-sky-500" },
      { label: "ROI Estimado", value: "R$ 7,5 mi", icon: Activity, iconClassName: "text-emerald-500" },
    ],
    actions: [
      { label: "Curtir", icon: Heart, variant: "outline" },
      { label: "Ver Detalhes", icon: Eye },
      { label: "Desenvolver MVP", icon: Rocket, variant: "secondary" },
    ],
  },
  {
    title: "App de Reciclagem Gamificada",
    description:
      "Aplicativo que transforma reciclagem em um jogo, recompensando usuários por práticas sustentáveis e educação ambiental colaborativa.",
    status: {
      label: "Em Análise",
      className: "bg-amber-100 text-amber-700 border border-amber-200",
    },
    complexity: {
      label: "Complexidade Média",
      className: "border border-sky-200 text-sky-700 bg-sky-50",
    },
    metrics: [
      { label: "Viabilidade", value: 75, barClass: "bg-emerald-500" },
      { label: "Inovação", value: 88, barClass: "bg-blue-500" },
      { label: "Potencial", value: 86, barClass: "bg-indigo-500" },
      { label: "Complexidade", value: 55, barClass: "bg-amber-500" },
    ],
    tags: ["Sustentabilidade", "Educação", "Mobile"],
    highlights: [
      { label: "Engajamento", value: "82%", icon: Sparkles, iconClassName: "text-indigo-500" },
      { label: "Comunidade", value: "28 mil", icon: Users, iconClassName: "text-emerald-500" },
      { label: "Pontuação", value: "77.0", icon: BarChart3, iconClassName: "text-sky-500" },
    ],
    actions: [
      { label: "Curtir", icon: Heart, variant: "outline" },
      { label: "Ver Detalhes", icon: Eye },
      { label: "Ver Piloto", icon: Rocket, variant: "secondary" },
    ],
  },
  {
    title: "Blockchain para Certificação",
    description:
      "Plataforma blockchain para certificação e verificação de credenciais acadêmicas e cursos profissionais em tempo real.",
    status: {
      label: "Em Estudo",
      className: "bg-sky-100 text-sky-700 border border-sky-200",
    },
    complexity: {
      label: "Complexidade Alta",
      className: "border border-rose-200 text-rose-600 bg-rose-50",
    },
    metrics: [
      { label: "Viabilidade", value: 68, barClass: "bg-emerald-500" },
      { label: "Inovação", value: 88, barClass: "bg-blue-500" },
      { label: "Potencial", value: 74, barClass: "bg-indigo-500" },
      { label: "Complexidade", value: 70, barClass: "bg-amber-500" },
    ],
    tags: ["Educação", "Blockchain", "Segurança"],
    highlights: [
      { label: "Maturidade", value: "2.8", icon: Gauge, iconClassName: "text-amber-500" },
      { label: "Interesse", value: "77.0", icon: Target, iconClassName: "text-indigo-500" },
      { label: "Conformidade", value: "98%", icon: ShieldCheck, iconClassName: "text-emerald-500" },
    ],
    actions: [
      { label: "Curtir", icon: Heart, variant: "outline" },
      { label: "Ver Detalhes", icon: Eye },
      { label: "Desenvolver MVP", icon: Rocket, variant: "secondary" },
    ],
  },
];

const ExistingIdeas = () => {
  return (
    <div className="space-y-8 bg-muted/20 p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Ideias existentes</h1>
        <p className="text-muted-foreground max-w-2xl">
          Acompanhe as iniciativas que já estão em avaliação na Elo. Compare métricas de viabilidade, inovação e potencial para decidir o próximo passo.
        </p>
      </div>

      <div className="space-y-6">
        {ideas.map((idea) => (
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
                      <div
                        className={cn("h-2 rounded-full", metric.barClass)}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="border border-transparent bg-muted text-foreground/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 border-t border-border/50 pt-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {idea.highlights.map((highlight) => (
                  <div key={highlight.label} className="flex items-center gap-2">
                    <highlight.icon className={cn("h-4 w-4", highlight.iconClassName)} />
                    <div className="leading-tight">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {highlight.label}
                      </p>
                      <p className="text-sm font-semibold text-foreground">{highlight.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {idea.actions.map((action) => (
                  <Button key={action.label} variant={action.variant} className="gap-2">
                    {action.icon ? <action.icon className="h-4 w-4" /> : null}
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { ExistingIdeas };
