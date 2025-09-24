import { useId, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface OpportunityBranch {
  id: string;
  label: string;
  description: string;
  solutionLabel: string;
  solutionDescription: string;
  experimentationLabel: string;
  experimentationDescription: string;
}

interface Hypothesis {
  id: string;
  pain: string;
  opportunities: { id: string; description: string }[];
  howMightWe: string;
  pocSuggestion: string;
  viabilityRisk: string;
  legalConstraints: string;
  note: string;
}

const layoutDefaults = {
  showHeaderBadge: true,
  showAddHypothesisAction: true,
  showHypothesisNotes: true,
  showRiskSection: true,
  showOpportunityTree: true,
};

type LayoutOptionKey = keyof typeof layoutDefaults;

const layoutControls: Array<{
  key: LayoutOptionKey;
  title: string;
  description: string;
}> = [
  {
    key: "showHeaderBadge",
    title: "Faixa de contexto",
    description: "Mostra o selo “Geração de hipóteses” acima do título.",
  },
  {
    key: "showAddHypothesisAction",
    title: "Ação de adicionar",
    description: "Exibe o botão para criar novas hipóteses rapidamente.",
  },
  {
    key: "showHypothesisNotes",
    title: "Notas de alinhamento",
    description: "Mantém o lembrete sobre itens adicionais a cada oportunidade.",
  },
  {
    key: "showRiskSection",
    title: "Riscos e restrições",
    description: "Controla o bloco de risco de viabilidade e aspectos legais.",
  },
  {
    key: "showOpportunityTree",
    title: "Árvore de oportunidades",
    description: "Mostra o fluxo visual entre outcome, oportunidades e testes.",
  },
];

const initialHypothesis: Hypothesis = {
  id: "initial",
  pain:
    "Dor: “Fadiga da decisão”: Com tantas opções, os usuários gastam muito tempo procurando o que assistir e se sentem sobrecarregados.",
  opportunities: [
    {
      id: "opportunity-context",
      description:
        "Oportunidade: Simplificar a escolha com recomendações baseadas em contexto e humor.",
    },
    {
      id: "opportunity-preview",
      description:
        "Oportunidade: Reduzir o medo de “escolher errado” com pré-visualizações imediatas.",
    },
  ],
  howMightWe:
    "Como faremos: Se detectarmos “só explorando” ou “não sei o que ver”, priorizar tiles com recomendação relâmpago baseada em gênero preferido, humor e tempo disponível.",
  pocSuggestion:
    "Sugestão de POC: Criar uma régua inicial de onboarding que reconheça o estado de humor do usuário com opções como “suspense”, “família”, “relax”, “maratonar”. Usar IA para montar 3 títulos personalizados e comunicar o motivo da sugestão.",
  viabilityRisk:
    "Risco de Viabilidade: Limitações na coleta de sinais em tempo real podem atrasar a entrega das recomendações.",
  legalConstraints:
    "Restrições Jurídicas e Regulatórias: Nenhuma. Essa funcionalidade não apresenta riscos de privacidade ou segurança.",
  note:
    "Esses dois itens abaixo não fazem parte da árvore de oportunidades, mas são relacionados a cada oportunidade, devendo portanto ser gerados em toda reunião.",
};

const opportunityBranches: OpportunityBranch[] = [
  {
    id: "branch-a",
    label: "Oportunidade",
    description: "Necessidade desconhecida do cliente",
    solutionLabel: "Solução",
    solutionDescription: "Como pode ser satisfeita",
    experimentationLabel: "Experimentação",
    experimentationDescription: "Como pode ser validada",
  },
  {
    id: "branch-b",
    label: "Oportunidade",
    description: "Necessidade desconhecida do cliente",
    solutionLabel: "Solução",
    solutionDescription: "Como pode ser satisfeita",
    experimentationLabel: "Experimentação",
    experimentationDescription: "Como pode ser validada",
  },
];

const HypothesisCard = ({
  hypothesis,
  onChange,
  onAddOpportunity,
  showNote,
  showRiskSection,
}: {
  hypothesis: Hypothesis;
  onChange: (updated: Hypothesis) => void;
  onAddOpportunity: () => void;
  showNote: boolean;
  showRiskSection: boolean;


}) => {
  const textareaId = useId();

  const updateField = (field: keyof Hypothesis, value: string) => {
    onChange({ ...hypothesis, [field]: value });
  };

  const updateOpportunity = (index: number, value: string) => {
    const updated = [...hypothesis.opportunities];
    updated[index] = { ...updated[index], description: value };
    onChange({ ...hypothesis, opportunities: updated });
  };

  return (
    <Card className="border-border/60 bg-background/80 shadow-sm">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="outline" className="mb-2 w-fit rounded-full border-primary/40 bg-primary/5 text-primary">
            Hipótese
          </Badge>
          <CardTitle className="text-lg font-semibold text-foreground">Diagnóstico estratégico</CardTitle>
          <CardDescription>
            Preencha ou ajuste as relações identificadas entre dores, oportunidades e validações.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="rounded-3xl border border-rose-200/80 bg-rose-50/80 p-4 text-sm leading-relaxed text-rose-900 lg:col-span-4">
            <Label htmlFor={`${textareaId}-pain`} className="text-xs font-semibold uppercase tracking-wide text-rose-600">
              Dor
            </Label>
            <Textarea
              id={`${textareaId}-pain`}
              value={hypothesis.pain}
              onChange={(event) => updateField("pain", event.target.value)}
              className="mt-2 min-h-[120px] resize-none border-none bg-transparent p-0 text-sm text-rose-900 focus-visible:ring-0"
            />
          </div>
          {hypothesis.opportunities.map((item, index) => (
            <div
              key={item.id}
              className="rounded-3xl border border-emerald-200/80 bg-emerald-50/80 p-4 text-sm leading-relaxed text-emerald-900 lg:col-span-4"
            >
              <Label
                htmlFor={`${textareaId}-opportunity-${index}`}
                className="text-xs font-semibold uppercase tracking-wide text-emerald-700"
              >
                Oportunidade
              </Label>
              <Textarea
                id={`${textareaId}-opportunity-${index}`}
                value={item.description}
                onChange={(event) => updateOpportunity(index, event.target.value)}
                className="mt-2 min-h-[120px] resize-none border-none bg-transparent p-0 text-sm text-emerald-900 focus-visible:ring-0"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onAddOpportunity} className="gap-2 text-emerald-700">
            <span className="text-sm font-medium">Adicionar relação</span>
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="rounded-3xl border border-blue-200/80 bg-blue-50/80 p-4 text-sm leading-relaxed text-blue-900 lg:col-span-6">
            <Label htmlFor={`${textareaId}-how`} className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Como faremos
            </Label>
            <Textarea
              id={`${textareaId}-how`}
              value={hypothesis.howMightWe}
              onChange={(event) => updateField("howMightWe", event.target.value)}
              className="mt-2 min-h-[100px] resize-none border-none bg-transparent p-0 text-sm text-blue-900 focus-visible:ring-0"
            />
          </div>
          <div className="rounded-3xl border border-orange-200/80 bg-orange-50/80 p-4 text-sm leading-relaxed text-orange-900 lg:col-span-6">
            <Label htmlFor={`${textareaId}-poc`} className="text-xs font-semibold uppercase tracking-wide text-orange-700">
              Sugestão de POC
            </Label>
            <Textarea
              id={`${textareaId}-poc`}
              value={hypothesis.pocSuggestion}
              onChange={(event) => updateField("pocSuggestion", event.target.value)}
              className="mt-2 min-h-[100px] resize-none border-none bg-transparent p-0 text-sm text-orange-900 focus-visible:ring-0"
            />
          </div>
        </div>

        {showNote && (
          <div className="rounded-2xl border border-dashed border-muted/70 bg-muted/30 p-4 text-xs text-muted-foreground">
            {hypothesis.note}
          </div>
        )}

        {showRiskSection && (
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="rounded-3xl border border-purple-200/80 bg-purple-50/80 p-4 text-sm leading-relaxed text-purple-900 lg:col-span-6">
              <Label htmlFor={`${textareaId}-risk`} className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                Risco de viabilidade
              </Label>
              <Textarea
                id={`${textareaId}-risk`}
                value={hypothesis.viabilityRisk}
                onChange={(event) => updateField("viabilityRisk", event.target.value)}
                className="mt-2 min-h-[80px] resize-none border-none bg-transparent p-0 text-sm text-purple-900 focus-visible:ring-0"
              />
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-900 lg:col-span-6">
              <Label
                htmlFor={`${textareaId}-legal`}
                className="text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                Restrições jurídicas e regulatórias
              </Label>
              <Textarea
                id={`${textareaId}-legal`}
                value={hypothesis.legalConstraints}
                onChange={(event) => updateField("legalConstraints", event.target.value)}
                className="mt-2 min-h-[80px] resize-none border-none bg-transparent p-0 text-sm text-slate-900 focus-visible:ring-0"
              />
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export const HypothesesGeneration = () => {
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([initialHypothesis]);

  const [layoutOptions, setLayoutOptions] = useState(layoutDefaults);

  const toggleLayoutOption = (key: LayoutOptionKey) => (checked: boolean) => {
    setLayoutOptions((current) => ({ ...current, [key]: checked }));
  };


  const handleUpdate = (index: number, updated: Hypothesis) => {
    setHypotheses((current) => {
      const clone = [...current];
      clone[index] = updated;
      return clone;
    });
  };

  const handleAddOpportunity = (id: string) => {
    setHypotheses((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              opportunities: [
                ...item.opportunities,
                {
                  id: `${id}-opportunity-${item.opportunities.length + 1}`,
                  description: "",
                },
              ],
            }
          : item,
      ),
    );
  };

  const handleAddHypothesis = () => {
    setHypotheses((current) => [
      ...current,
      {
        id: `hypothesis-${current.length + 1}`,
        pain: "",
        opportunities: [
          { id: `opportunity-${current.length + 1}-a`, description: "" },
          { id: `opportunity-${current.length + 1}-b`, description: "" },
        ],
        howMightWe: "",
        pocSuggestion: "",
        viabilityRisk: "",
        legalConstraints: "",
        note: initialHypothesis.note,
      },
    ]);
  };

  return (
    <div className="min-h-full space-y-8 bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/80 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            {layoutOptions.showHeaderBadge && (
              <Badge variant="secondary" className="rounded-full bg-purple-100/80 text-purple-700">
                Geração de hipóteses
              </Badge>
            )}
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">Hipóteses e árvore de oportunidades</h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Estruture as dores identificadas, traduza-as em oportunidades acionáveis e organize o fluxo de soluções e
                experimentações para orientar discussões com o time.
              </p>
            </div>
          </div>
          {layoutOptions.showAddHypothesisAction && (
            <div className="flex shrink-0 flex-col items-start gap-3">
              <p className="text-sm font-medium text-muted-foreground">Adicione novas relações</p>
              <Button onClick={handleAddHypothesis} className="rounded-full px-6" variant="outline">
                Adicionar hipótese
              </Button>
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.25fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          {hypotheses.map((hypothesis, index) => (
            <HypothesisCard
              key={hypothesis.id}
              hypothesis={hypothesis}
              onChange={(updated) => handleUpdate(index, updated)}
              onAddOpportunity={() => handleAddOpportunity(hypothesis.id)}
              showNote={layoutOptions.showHypothesisNotes}
              showRiskSection={layoutOptions.showRiskSection}
            />
          ))}

          {layoutOptions.showOpportunityTree && (
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="rounded-full border-purple-200 bg-purple-50 text-purple-700">
                    Árvore de oportunidades
                  </Badge>
                  <CardTitle className="text-lg font-semibold">Fluxo estratégico</CardTitle>
                </div>
                <CardDescription>
                  Visualize a hierarquia de resultado, oportunidades, soluções e experimentações para guiar decisões.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mx-auto max-w-4xl">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="rounded-full border border-purple-200 bg-gradient-to-r from-purple-100 via-white to-purple-50 px-6 py-2 text-sm font-medium text-purple-700 shadow-sm">
                      Outcome
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">O que deve ser alcançado</p>
                  </div>

                  <Separator className="mx-auto my-8 h-px w-3/4 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

                  <div className="grid gap-6 md:grid-cols-2">
                    {opportunityBranches.map((branch) => (
                      <div key={branch.id} className="relative flex flex-col gap-4 rounded-3xl border border-purple-200/70 bg-white/80 p-6 shadow-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">{branch.label}</span>
                          <p className="text-sm text-muted-foreground">{branch.description}</p>
                        </div>
                        <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
                          <span className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                            {branch.solutionLabel}
                          </span>
                          <p className="mt-2 text-sm text-purple-900">{branch.solutionDescription}</p>
                        </div>
                        <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-4">
                          <span className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                            {branch.experimentationLabel}
                          </span>
                          <p className="mt-2 text-sm text-purple-900">{branch.experimentationDescription}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                Ajuste os elementos exibidos na geração de hipóteses sem alterar o conteúdo estratégico registrado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {layoutControls.map((control) => (
                  <div key={control.key} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{control.title}</p>
                      <p className="text-xs text-muted-foreground">{control.description}</p>
                    </div>
                    <Switch
                      checked={layoutOptions[control.key]}
                      onCheckedChange={toggleLayoutOption(control.key)}
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-dashed border-primary/40 bg-background/60 p-4 text-sm text-muted-foreground">
                <p>
                  Personalize a visualização conforme a audiência do workshop, preservando as informações geradas pela equipe.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/70 shadow-sm">
            <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Dica rápida</p>
              <p>
                Combine a árvore de oportunidades com as anotações de risco para identificar quais experimentos precisam de
                reforço regulatório antes de avançar para a fase de testes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HypothesesGeneration;
