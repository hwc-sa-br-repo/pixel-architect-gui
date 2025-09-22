import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface OverviewMetric {
  key: "marketSize" | "growth" | "opportunity";
  label: string;
  helper: string;
  prefix?: string;
  suffix?: string;
}

interface Segment {
  id: string;
  name: string;
  description: string;
  share: number;
  intensity: "Muito Alto" | "Alto" | "Médio" | "Baixo";
}

interface Competitor {
  id: string;
  name: string;
  focus: string;
  share: number;
  highlight: string;
  highlightAccent: string;
}

const intensityStyles: Record<Segment["intensity"], string> = {
  "Muito Alto": "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Alto: "bg-sky-100 text-sky-700 border border-sky-200",
  Médio: "bg-amber-100 text-amber-700 border border-amber-200",
  Baixo: "bg-rose-100 text-rose-700 border border-rose-200",
};

const overviewConfig: OverviewMetric[] = [
  {
    key: "marketSize",
    label: "Tamanho do Mercado",
    helper: "TAM estimado em 2024",
    prefix: "R$",
  },
  {
    key: "growth",
    label: "Crescimento Anual",
    helper: "CAGR 2024-2027",
    suffix: "%",
  },
  {
    key: "opportunity",
    label: "Oportunidade SAM",
    helper: "Mercado endereçável",
    prefix: "R$",
  },
];

const overview = {
  marketSize: "2.4B",
  growth: "18.5",
  opportunity: "450M",
};

const segments: Segment[] = [
  {
    id: "b2b",
    name: "Empresas B2B",
    description: "Segmento corporativo com alta adoção de soluções digitais e budget dedicado.",
    share: 35,
    intensity: "Muito Alto",
  },
  {
    id: "startups",
    name: "Startups Tech",
    description: "Empresas em rápido crescimento buscando diferenciação competitiva.",
    share: 25,
    intensity: "Alto",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Varejo online focado em otimização de experiência e fidelização.",
    share: 20,
    intensity: "Médio",
  },
  {
    id: "consultoria",
    name: "Consultorias",
    description: "Parceiros estratégicos com influência em decisões de transformação.",
    share: 10,
    intensity: "Médio",
  },
];

const competitors: Competitor[] = [
  {
    id: "competitor-a",
    name: "Competidor A",
    focus: "Foco: Tecnologia",
    share: 35,
    highlight: "Frequência: Baixa",
    highlightAccent: "text-emerald-600",
  },
  {
    id: "competitor-b",
    name: "Competidor B",
    focus: "Foco: Serviços",
    share: 28,
    highlight: "Frequência: Média",
    highlightAccent: "text-sky-600",
  },
  {
    id: "competitor-c",
    name: "Competidor C",
    focus: "Foco: Experiência",
    share: 19,
    highlight: "Frequência: Alta",
    highlightAccent: "text-amber-600",
  },
];

const layoutDefaults = {
  showBadge: true,
  showExport: true,
  showOverview: true,
  showSegments: true,
  showCompetitors: true,
  showSummary: true,
};

type LayoutOptionKey = keyof typeof layoutDefaults;

export const MarketMapping = () => {
  const [layoutOptions, setLayoutOptions] = useState(layoutDefaults);

  const totalSegmentShare = segments.reduce(
    (total, segment) => total + segment.share,
    0
  );

  const toggleLayoutOption = (key: LayoutOptionKey) => (checked: boolean) => {
    setLayoutOptions((current) => ({ ...current, [key]: checked }));
  };

  return (
    <div className="min-h-full space-y-8 bg-muted/20 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          {layoutOptions.showBadge && (
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              Inteligência de mercado
            </Badge>
          )}
          <h1 className="text-2xl font-semibold tracking-tight">Análise de Mercado</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Insights detalhados sobre o mercado-alvo e oportunidades identificadas. Ajuste valores conforme novos dados para
            manter o planejamento atualizado.
          </p>
        </div>
        {layoutOptions.showExport && <Button variant="secondary">Exportar relatório</Button>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          {layoutOptions.showOverview && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Panorama do mercado</CardTitle>
                <CardDescription>Dados consolidados da oportunidade atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {overviewConfig.map((metric) => (
                    <div key={metric.key} className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight">
                        <span className="text-muted-foreground/70">{metric.prefix}</span>
                        {overview[metric.key]}
                        <span className="text-muted-foreground/70">{metric.suffix}</span>
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">{metric.helper}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showSegments && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Segmentos de Mercado</CardTitle>
                <CardDescription>
                  Análise detalhada dos principais segmentos identificados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {segments.map((segment) => (
                  <div
                    key={segment.id}
                    className="rounded-lg border border-border/50 bg-background/80 p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold leading-tight">{segment.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{segment.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <Badge className={cn("text-xs font-semibold", intensityStyles[segment.intensity])}>
                          {segment.intensity}
                        </Badge>
                        <span className="text-lg font-semibold text-foreground">{segment.share}%</span>
                      </div>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary"
                        style={{ width: `${segment.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {layoutOptions.showCompetitors && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Análise Competitiva</CardTitle>
                <CardDescription>Principais players e posicionamento no mercado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {competitors.map((competitor) => (
                  <div
                    key={competitor.id}
                    className="rounded-lg border border-border/50 bg-background/80 p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold leading-tight">{competitor.name}</h3>
                        <p className="text-sm text-muted-foreground">{competitor.focus}</p>
                      </div>
                      <span className="text-lg font-semibold text-foreground">{competitor.share}%</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary/80"
                          style={{ width: `${competitor.share}%` }}
                        />
                      </div>
                      <span className={cn("text-sm font-medium", competitor.highlightAccent)}>
                        {competitor.highlight}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-primary/30 bg-primary/5 shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-semibold">Personalização rápida</CardTitle>
              <CardDescription>
                Selecione quais blocos visuais devem aparecer no painel, mantendo os dados originais intactos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Selo de inteligência</p>
                    <p className="text-xs text-muted-foreground">
                      Exibe a faixa de categoria acima do título principal.
                    </p>
                  </div>
                  <Switch checked={layoutOptions.showBadge} onCheckedChange={toggleLayoutOption("showBadge")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Botão de exportação</p>
                    <p className="text-xs text-muted-foreground">Mostra o CTA para baixar o relatório atualizado.</p>
                  </div>
                  <Switch checked={layoutOptions.showExport} onCheckedChange={toggleLayoutOption("showExport")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Panorama do mercado</p>
                    <p className="text-xs text-muted-foreground">
                      KPIs consolidados que sintetizam o tamanho da oportunidade.
                    </p>
                  </div>
                  <Switch checked={layoutOptions.showOverview} onCheckedChange={toggleLayoutOption("showOverview")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Segmentos em destaque</p>
                    <p className="text-xs text-muted-foreground">Lista comparativa dos públicos priorizados.</p>
                  </div>
                  <Switch checked={layoutOptions.showSegments} onCheckedChange={toggleLayoutOption("showSegments")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Análise competitiva</p>
                    <p className="text-xs text-muted-foreground">Gráfico de barras com os principais players.</p>
                  </div>
                  <Switch checked={layoutOptions.showCompetitors} onCheckedChange={toggleLayoutOption("showCompetitors")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Resumo narrativo</p>
                    <p className="text-xs text-muted-foreground">Texto automatizado que reforça os insights-chave.</p>
                  </div>
                  <Switch checked={layoutOptions.showSummary} onCheckedChange={toggleLayoutOption("showSummary")} />
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-primary/40 bg-background/60 p-4 text-sm text-muted-foreground">
                <p>
                  Alterar a composição visual ajuda a destacar somente os elementos relevantes para cada apresentação sem
                  modificar os números de referência.
                </p>
              </div>
            </CardContent>
          </Card>

          {layoutOptions.showSummary && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Resumo dinâmico</CardTitle>
                <CardDescription>Visão geral rápida com base nos dados configurados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  O mercado endereçável estimado é de
                  <span className="font-semibold text-foreground"> R$ {overview.marketSize}</span>, com crescimento médio de
                  <span className="font-semibold text-foreground"> {overview.growth}% ao ano</span> e oportunidade imediata de
                  <span className="font-semibold text-foreground"> R$ {overview.opportunity}</span>.
                </p>
                <p>
                  Os segmentos prioritários representam
                  <span className="font-semibold text-foreground"> {totalSegmentShare}%</span> do mercado analisado, com
                  destaque para {segments[0]?.name ?? "o segmento líder"}.
                </p>
                <p>
                  A competição é liderada por {competitors[0]?.name ?? "um player principal"}, com {competitors[0]?.share}%
                  de market share. Monitore semanalmente para capturar mudanças relevantes.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketMapping;
