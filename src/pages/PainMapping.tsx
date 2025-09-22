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

interface PainOpportunity {
  id: string;
  pain: string;
  opportunity: string;
}

const painsAndOpportunities: PainOpportunity[] = [
  {
    id: "decision-fatigue",
    pain:
      "Fadiga da decisão: Com tantas opções, os usuários gastam muito tempo procurando o que assistir e se sentem sobrecarregados.",
    opportunity:
      "Algoritmos de recomendação e personalização: Criar um sistema que apresenta conteúdo alinhado aos gostos do usuário, reduzindo o tempo de busca.",
  },
  {
    id: "content-fragmentation",
    pain:
      "Fragmentação de conteúdo: O catálogo desejado está espalhado por várias plataformas, forçando o usuário a ter múltiplas assinaturas.",
    opportunity:
      "Produção de conteúdo original e exclusivo: Investir em filmes e séries próprios que não possam ser encontrados em outros serviços.",
  },
  {
    id: "cost-increase",
    pain:
      "Custos crescentes: O valor somado de várias assinaturas se torna caro e os usuários buscam alternativas.",
    opportunity:
      "Planos flexíveis com anúncios: Oferecer modalidades com valores reduzidos e suporte a anúncios para facilitar a entrada.",
  },
  {
    id: "poor-experience",
    pain:
      "Experiência de usuário ruim: Interfaces confusas dificultam encontrar o que assistir, gerando frustração.",
    opportunity:
      "Melhoria da interface e usabilidade/UX: Garantir uma navegação simples, intuitiva e com curadoria inteligente.",
  },
  {
    id: "binge-culture",
    pain:
      "Impaciência e cultura do \"binge-watching\": Os usuários querem assistir temporadas completas rapidamente, sem atrasos.",
    opportunity:
      "Lançamento de temporadas completas: Disponibilizar todas as temporadas de uma vez para evitar perda de interesse.",
  },
  {
    id: "expiring-content",
    pain:
      "Conteúdo que desaparece: Filmes e séries são removidos do catálogo quando as licenças expiram, gerando frustração.",
    opportunity:
      "Comunicação transparente e investimento em conteúdo próprio: Informar a saída de títulos com antecedência e focar em produções originais que nunca expiram.",
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

  const toggleLayoutOption = (key: LayoutOptionKey) => (checked: boolean) => {
    setLayoutOptions((current) => ({ ...current, [key]: checked }));
  };

  return (
    <div className="min-h-full space-y-8 bg-muted/20 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          {layoutOptions.showBadge && (
            <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-600">
              Mapeamento de dores
            </Badge>
          )}
          <h1 className="text-2xl font-semibold tracking-tight">Painel de dores & oportunidades</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Visualize os principais problemas relatados pelos usuários e as oportunidades estratégicas relacionadas.
            Utilize as opções ao lado para ajustar somente os blocos gráficos exibidos, preservando os dados originais.
          </p>
        </div>
        {layoutOptions.showExport && <Button variant="secondary">Exportar visão</Button>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          {layoutOptions.showLegend && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Como ler este painel</CardTitle>
                <CardDescription>
                  Dores priorizadas à esquerda e respostas estratégicas correspondentes à direita.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  A coluna verde destaca soluções ou movimentos estratégicos sugeridos para cada dor identificada. Utilize como
                  insumo para roadmaps, fluxos de ideação e alinhamentos com stakeholders.
                </p>
                <p>
                  Você pode ocultar blocos visuais conforme a necessidade de apresentação sem editar nenhuma informação
                  sensível.
                </p>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showTable && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Dores versus oportunidades</CardTitle>
                <CardDescription>
                  Relação direta entre os principais obstáculos percebidos e possíveis soluções estratégicas.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-hidden rounded-xl border border-border/60 p-0">
                <div className="grid grid-cols-2 bg-rose-50 text-sm font-semibold uppercase tracking-wide text-rose-700">
                  <div className="border-r border-border/60 px-4 py-3">Dores do usuário / Problema</div>
                  <div className="px-4 py-3 text-emerald-700">Oportunidade (Solução / Estratégia)</div>
                </div>
                <div>
                  {painsAndOpportunities.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 border-t border-border/50 text-sm"
                    >
                      <div
                        className={cn(
                          "border-r border-border/60 px-4 py-4 leading-relaxed",
                          index % 2 === 0 ? "bg-background" : "bg-muted/40"
                        )}
                      >
                        {item.pain}
                      </div>
                      <div
                        className={cn(
                          "px-4 py-4 font-medium leading-relaxed text-emerald-900",
                          index % 2 === 0 ? "bg-emerald-50" : "bg-emerald-100"
                        )}
                      >
                        {item.opportunity}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showInsights && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Insights acionáveis</CardTitle>
                <CardDescription>Sugestões rápidas para orientar discussões de produto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="rounded-lg border border-dashed border-emerald-300/70 bg-emerald-50/80 p-4 text-emerald-900">
                  Priorize os fluxos de personalização para reduzir a fadiga da decisão e aumentar o tempo médio de
                  permanência.
                </div>
                <div className="rounded-lg border border-dashed border-rose-200 bg-rose-50/70 p-4 text-rose-900">
                  Crie rituais de comunicação ativa sobre mudanças no catálogo para reforçar transparência e confiança.
                </div>
                <div className="rounded-lg border border-dashed border-slate-200 bg-muted/50 p-4 text-muted-foreground">
                  Combine lançamentos completos com testes A/B de planos subsidiados por anúncios para novos segmentos.
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-rose-200 bg-rose-50/70 shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-semibold">Personalização gráfica</CardTitle>
              <CardDescription>
                Escolha quais blocos visuais devem aparecer sem alterar nenhuma informação da matriz de dores.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Selo contextual</p>
                    <p className="text-xs text-muted-foreground">Faixa informativa sobre o tipo de diagnóstico.</p>
                  </div>
                  <Switch checked={layoutOptions.showBadge} onCheckedChange={toggleLayoutOption("showBadge")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Botão de exportação</p>
                    <p className="text-xs text-muted-foreground">Exibe o CTA para compartilhar a visão em PDF.</p>
                  </div>
                  <Switch checked={layoutOptions.showExport} onCheckedChange={toggleLayoutOption("showExport")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Bloco explicativo</p>
                    <p className="text-xs text-muted-foreground">Contextualiza como interpretar a matriz comparativa.</p>
                  </div>
                  <Switch checked={layoutOptions.showLegend} onCheckedChange={toggleLayoutOption("showLegend")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Tabela de dores x oportunidades</p>
                    <p className="text-xs text-muted-foreground">Exibe o grid principal sem permitir edição de dados.</p>
                  </div>
                  <Switch checked={layoutOptions.showTable} onCheckedChange={toggleLayoutOption("showTable")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Insights acionáveis</p>
                    <p className="text-xs text-muted-foreground">Cartões auxiliares com orientações de uso.</p>
                  </div>
                  <Switch checked={layoutOptions.showInsights} onCheckedChange={toggleLayoutOption("showInsights")} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Notas de apresentação</p>
                    <p className="text-xs text-muted-foreground">Lembretes sobre o objetivo da sessão de análise.</p>
                  </div>
                  <Switch checked={layoutOptions.showNotes} onCheckedChange={toggleLayoutOption("showNotes")} />
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-rose-300 bg-background/70 p-4 text-sm text-muted-foreground">
                Os controles acima apenas adicionam ou removem componentes visuais. Os textos originais permanecem
                protegidos contra alterações acidentais.
              </div>
            </CardContent>
          </Card>

          {layoutOptions.showNotes && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Notas para a reunião</CardTitle>
                <CardDescription>Use como guia rápido durante apresentações.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Comece destacando o impacto das principais dores antes de detalhar as oportunidades correspondentes.</p>
                <p>Mantenha espaço para comentários do time e registre próximos passos ao final da discussão.</p>
                <p>Reforce que as hipóteses podem alimentar o backlog de inovação e priorização de experimentos.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PainMapping;
