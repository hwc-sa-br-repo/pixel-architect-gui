import { useMemo, useState } from "react";
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
import type { LucideIcon } from "lucide-react";
import { Brain, LayoutDashboard, Layers, PiggyBank, ShieldCheck, Sparkles } from "lucide-react";

interface PainOpportunity {
  id: string;
  pain: string;
  opportunity: string;
  focus: string;
  impact: string;
  icon: LucideIcon;
}

const painsAndOpportunities: PainOpportunity[] = [
  {
    id: "decision-fatigue",
    pain:
      "Fadiga da decisão: Com tantas opções, os usuários gastam muito tempo procurando o que assistir e se sentem sobrecarregados.",
    opportunity:
      "Algoritmos de recomendação e personalização: Criar um sistema que apresenta conteúdo alinhado aos gostos do usuário, reduzindo o tempo de busca.",
    focus: "Personalização inteligente",
    impact: "Reduzir atrito nas escolhas",
    icon: Brain,
  },
  {
    id: "content-fragmentation",
    pain:
      "Fragmentação de conteúdo: O catálogo desejado está espalhado por várias plataformas, forçando o usuário a ter múltiplas assinaturas.",
    opportunity:
      "Produção de conteúdo original e exclusivo: Investir em filmes e séries próprios que não possam ser encontrados em outros serviços.",
    focus: "Conteúdo proprietário",
    impact: "Centralizar catálogos",
    icon: Layers,
  },
  {
    id: "cost-increase",
    pain:
      "Custos crescentes: O valor somado de várias assinaturas se torna caro e os usuários buscam alternativas.",
    opportunity:
      "Planos flexíveis com anúncios: Oferecer modalidades com valores reduzidos e suporte a anúncios para facilitar a entrada.",
    focus: "Modelos comerciais",
    impact: "Abrir portas de entrada",
    icon: PiggyBank,
  },
  {
    id: "poor-experience",
    pain:
      "Experiência de usuário ruim: Interfaces confusas dificultam encontrar o que assistir, gerando frustração.",
    opportunity:
      "Melhoria da interface e usabilidade/UX: Garantir uma navegação simples, intuitiva e com curadoria inteligente.",
    focus: "UX aprimorada",
    impact: "Elevar satisfação diária",
    icon: LayoutDashboard,
  },
  {
    id: "binge-culture",
    pain:
      "Impaciência e cultura do \"binge-watching\": Os usuários querem assistir temporadas completas rapidamente, sem atrasos.",
    opportunity:
      "Lançamento de temporadas completas: Disponibilizar todas as temporadas de uma vez para evitar perda de interesse.",
    focus: "Lançamentos completos",
    impact: "Aumentar maratonas",
    icon: Sparkles,
  },
  {
    id: "expiring-content",
    pain:
      "Conteúdo que desaparece: Filmes e séries são removidos do catálogo quando as licenças expiram, gerando frustração.",
    opportunity:
      "Comunicação transparente e investimento em conteúdo próprio: Informar a saída de títulos com antecedência e focar em produções originais que nunca expiram.",
    focus: "Confiabilidade do catálogo",
    impact: "Manter confiança",
    icon: ShieldCheck,
  },
];

const layoutDefaults = {
  showBadge: true,
  showExport: true,
  showLegend: true,
  showTable: true,
  showInsights: true,
  showNotes: true,
};

type LayoutOptionKey = keyof typeof layoutDefaults;

export const PainMapping = () => {
  const [layoutOptions, setLayoutOptions] = useState(layoutDefaults);
  const totalItems = useMemo(() => painsAndOpportunities.length, []);

  const toggleLayoutOption = (key: LayoutOptionKey) => (checked: boolean) => {
    setLayoutOptions((current) => ({ ...current, [key]: checked }));
  };

  return (
    <div className="min-h-full space-y-8 bg-gradient-to-br from-rose-50/60 via-white to-emerald-50/60 p-6">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/80 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            {layoutOptions.showBadge && (
              <Badge variant="outline" className="border-rose-200 bg-rose-100/80 text-rose-600">
                Mapeamento de dores
              </Badge>
            )}
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Painel de dores & oportunidades
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Visualize os principais problemas relatados pelos usuários e identifique respostas estratégicas prontas para
                priorização. Ajuste os blocos visuais ao lado para adaptar a narrativa da apresentação sem editar dados
                sensíveis.
              </p>
            </div>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-200/70 bg-rose-50/80 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-rose-600">Total de dores mapeadas</dt>
                <dd className="mt-2 text-2xl font-semibold text-rose-700">{totalItems}</dd>
              </div>
              <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                  Soluções estratégicas destacadas
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-emerald-700">{totalItems}</dd>
              </div>
            </dl>
          </div>
          {layoutOptions.showExport && (
            <div className="flex shrink-0 flex-col items-start gap-3">
              <p className="text-sm font-medium text-muted-foreground">Compartilhe esta visão com o time</p>
              <Button className="rounded-full px-6" variant="secondary">
                Exportar visão
              </Button>
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          {layoutOptions.showLegend && (
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg font-semibold">Como ler este painel</CardTitle>
                    <CardDescription>
                      Dores priorizadas à esquerda e respostas estratégicas correspondentes à direita.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-full bg-muted px-3 py-1 text-xs">
                    Visão executiva
                  </Badge>
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <p className="rounded-2xl border border-dashed border-rose-200/80 bg-rose-50/60 p-4">
                    Utilize este painel para iniciar conversas estratégicas com stakeholders e priorizar hipóteses de maior
                    impacto no usuário final.
                  </p>
                  <p className="rounded-2xl border border-dashed border-emerald-200/80 bg-emerald-50/60 p-4">
                    Combine com dados quantitativos, mantendo os blocos visuais travados para evitar alterações acidentais na
                    matriz original.
                  </p>
                </div>
              </CardHeader>
            </Card>
          )}

          {layoutOptions.showTable && (
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-semibold">Dores versus oportunidades</CardTitle>
                <CardDescription>
                  Uma leitura moderna dos principais obstáculos percebidos pelos usuários e das respostas estratégicas
                  recomendadas para gerar valor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {painsAndOpportunities.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "group relative overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-6 shadow-sm transition-all",
                          "hover:-translate-y-1 hover:border-rose-200/80 hover:shadow-lg"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100/80 text-rose-600">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="flex flex-1 flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="rounded-full border-rose-200/80 bg-rose-100/60 text-rose-700">
                                {item.focus}
                              </Badge>
                              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                {item.impact}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">{item.pain}</p>
                            <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-emerald-50 to-white p-4 text-sm font-medium leading-relaxed text-emerald-900 shadow-sm">
                              {item.opportunity}
                            </div>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-200 via-transparent to-emerald-200",
                            index % 2 === 0 ? "opacity-90" : "opacity-60"
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showInsights && (
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-semibold">Insights acionáveis</CardTitle>
                <CardDescription>Conecte dores prioritárias a movimentos estratégicos em destaque.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm md:grid-cols-3">
                <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/80 p-5 text-emerald-900 shadow-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-wide">Personalização</h3>
                  <p className="mt-2 leading-relaxed">
                    Priorize fluxos de recomendação dinâmica para reduzir a fadiga da decisão e prolongar a permanência.
                  </p>
                </div>
                <div className="rounded-3xl border border-rose-200/80 bg-rose-50/80 p-5 text-rose-900 shadow-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-wide">Transparência</h3>
                  <p className="mt-2 leading-relaxed">
                    Estabeleça rituais de comunicação sobre mudanças no catálogo reforçando confiança e engajamento.
                  </p>
                </div>
                <div className="rounded-3xl border border-muted/80 bg-muted/60 p-5 text-muted-foreground shadow-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-wide">Monetização</h3>
                  <p className="mt-2 leading-relaxed">
                    Combine lançamentos completos com testes de planos subsidiados por anúncios para atrair novos segmentos.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-primary/30 bg-primary/5 shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-semibold">Personalização rápida</CardTitle>
              <CardDescription>
                Selecione os blocos visuais que devem aparecer no painel, preservando a estrutura original do mapeamento de
                dores.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Selo contextual</p>
                    <p className="text-xs text-muted-foreground">Faixa informativa que apresenta o tipo de diagnóstico.</p>
                  </div>
                  <Switch checked={layoutOptions.showBadge} onCheckedChange={toggleLayoutOption("showBadge")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Botão de exportação</p>
                    <p className="text-xs text-muted-foreground">Mantém o CTA para compartilhar a visão consolidada.</p>
                  </div>
                  <Switch checked={layoutOptions.showExport} onCheckedChange={toggleLayoutOption("showExport")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Bloco explicativo</p>
                    <p className="text-xs text-muted-foreground">Contextualiza como interpretar o painel comparativo.</p>
                  </div>
                  <Switch checked={layoutOptions.showLegend} onCheckedChange={toggleLayoutOption("showLegend")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Tabela de dores x oportunidades</p>
                    <p className="text-xs text-muted-foreground">Mantém a matriz principal com dores e respostas estratégicas.</p>
                  </div>
                  <Switch checked={layoutOptions.showTable} onCheckedChange={toggleLayoutOption("showTable")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Insights acionáveis</p>
                    <p className="text-xs text-muted-foreground">Cartões de apoio com recomendações práticas.</p>
                  </div>
                  <Switch checked={layoutOptions.showInsights} onCheckedChange={toggleLayoutOption("showInsights")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Notas de apresentação</p>
                    <p className="text-xs text-muted-foreground">Lembretes estratégicos para conduzir a reunião.</p>
                  </div>
                  <Switch checked={layoutOptions.showNotes} onCheckedChange={toggleLayoutOption("showNotes")} />
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-primary/40 bg-background/60 p-4 text-sm text-muted-foreground">
                Ajustar a composição visual não altera nenhum texto base do diagnóstico — os dados permanecem protegidos contra
                edições acidentais.
              </div>
            </CardContent>
          </Card>

          {layoutOptions.showNotes && (
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-semibold">Notas para a reunião</CardTitle>
                <CardDescription>Use como guia rápido durante apresentações.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="rounded-2xl border border-dashed border-rose-200/70 bg-rose-50/60 p-4">
                  Comece destacando o impacto das principais dores antes de detalhar as oportunidades correspondentes.
                </div>
                <div className="rounded-2xl border border-dashed border-emerald-200/70 bg-emerald-50/60 p-4">
                  Mantenha espaço para comentários do time e registre próximos passos ao final da discussão.
                </div>
                <div className="rounded-2xl border border-dashed border-muted/80 bg-muted/40 p-4">
                  Reforce que as hipóteses podem alimentar o backlog de inovação e priorização de experimentos.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PainMapping;
