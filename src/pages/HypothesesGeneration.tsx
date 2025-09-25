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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

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

interface TreeSection {
  id: string;
  title: string;
  description: string;
}

interface ExperimentationNode {
  id: string;
  title: string;
  description: string;
}

interface OpportunityTreeState {
  outcome: TreeSection;
  opportunity: TreeSection;
  solution: TreeSection;
  experimentations: ExperimentationNode[];
}

type EditableTreeSection = Exclude<keyof OpportunityTreeState, "experimentations">;

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

const initialOpportunityTree: OpportunityTreeState = {
  outcome: {
    id: "outcome",
    title: "Melhorar experiência do usuário",
    description: "Aumentar satisfação e engajamento dos usuários",
  },
  opportunity: {
    id: "opportunity",
    title: "Nova Oportunidade",
    description: "Clique para editar",
  },
  solution: {
    id: "solution",
    title: "Nova Solução",
    description: "Clique para editar",
  },
  experimentations: [
    { id: "experimentation-1", title: "Nova Experimentação", description: "Clique para editar" },
    { id: "experimentation-2", title: "Nova Experimentação", description: "Clique para editar" },
    { id: "experimentation-3", title: "Nova Experimentação", description: "Clique para editar" },
    { id: "experimentation-4", title: "Nova Experimentação", description: "Clique para editar" },
  ],
};

type TreeNodeVariant = "outcome" | "opportunity" | "solution" | "experimentation";

const treeVariantStyles: Record<
  TreeNodeVariant,
  {
    container: string;
    label: string;
    title: string;
    description: string;
  }
> = {
  outcome: {
    container:
      "border-purple-200/80 bg-gradient-to-b from-purple-50 via-white to-purple-50/70 text-purple-900 shadow-sm",
    label: "text-purple-600",
    title: "text-purple-800",
    description: "text-purple-700",
  },
  opportunity: {
    container:
      "border-amber-200/80 bg-gradient-to-b from-amber-50 via-white to-amber-50/70 text-amber-900 shadow-sm",
    label: "text-amber-600",
    title: "text-amber-800",
    description: "text-amber-700",
  },
  solution: {
    container:
      "border-emerald-200/80 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/70 text-emerald-900 shadow-sm",
    label: "text-emerald-600",
    title: "text-emerald-800",
    description: "text-emerald-700",
  },
  experimentation: {
    container:
      "border-sky-200/80 bg-gradient-to-b from-sky-50 via-white to-sky-50/70 text-sky-900 shadow-sm",
    label: "text-sky-600",
    title: "text-sky-800",
    description: "text-sky-700",
  },
};

const OpportunityTreeNode = ({
  label,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  variant,
  compact,
}: {
  label: string;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  variant: TreeNodeVariant;
  compact?: boolean;
}) => {
  const styles = treeVariantStyles[variant];

  return (
    <div
      className={`flex w-full flex-col gap-3 rounded-[28px] border px-6 py-5 ${
        compact ? "max-w-[220px]" : "max-w-md"
      } ${styles.container}`}
    >
      <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${styles.label}`}>{label}</span>
      <Input
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="Clique para editar"
        className={`h-auto border-none bg-transparent px-0 text-base font-semibold ${styles.title} focus-visible:ring-0`}
      />
      <Textarea
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        placeholder="Clique para editar"
        className={`min-h-[64px] resize-none border-none bg-transparent p-0 text-sm leading-relaxed ${styles.description} focus-visible:ring-0`}
      />
    </div>
  );
};

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
  const [opportunityTree, setOpportunityTree] = useState(initialOpportunityTree);

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

  const updateTreeSection = (
    section: EditableTreeSection,
    field: "title" | "description",
    value: string,
  ) => {
    setOpportunityTree((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  };

  const updateExperimentation = (
    id: string,
    field: "title" | "description",
    value: string,
  ) => {
    setOpportunityTree((current) => ({
      ...current,
      experimentations: current.experimentations.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const handleAddExperimentation = () => {
    setOpportunityTree((current) => ({
      ...current,
      experimentations: [
        ...current.experimentations,
        {
          id: `experimentation-${current.experimentations.length + 1}-${Date.now()}`,
          title: "Nova Experimentação",
          description: "Clique para editar",
        },
      ],
    }));
  };

  const handleRemoveExperimentation = (id: string) => {
    setOpportunityTree((current) => ({
      ...current,
      experimentations: current.experimentations.filter((item) => item.id !== id),
    }));
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
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                  <OpportunityTreeNode
                    label="Outcome"
                    title={opportunityTree.outcome.title}
                    description={opportunityTree.outcome.description}
                    onTitleChange={(value) => updateTreeSection("outcome", "title", value)}
                    onDescriptionChange={(value) => updateTreeSection("outcome", "description", value)}
                    variant="outcome"
                  />

                  <div className="h-10 w-px rounded-full bg-gradient-to-b from-purple-200 via-purple-300 to-purple-200" />

                  <OpportunityTreeNode
                    label="Oportunidade"
                    title={opportunityTree.opportunity.title}
                    description={opportunityTree.opportunity.description}
                    onTitleChange={(value) => updateTreeSection("opportunity", "title", value)}
                    onDescriptionChange={(value) => updateTreeSection("opportunity", "description", value)}
                    variant="opportunity"
                  />

                  <div className="h-10 w-px rounded-full bg-gradient-to-b from-amber-200 via-emerald-200 to-emerald-300" />

                  <OpportunityTreeNode
                    label="Solução"
                    title={opportunityTree.solution.title}
                    description={opportunityTree.solution.description}
                    onTitleChange={(value) => updateTreeSection("solution", "title", value)}
                    onDescriptionChange={(value) => updateTreeSection("solution", "description", value)}
                    variant="solution"
                  />

                  <div className="h-8 w-px rounded-full bg-gradient-to-b from-emerald-200 via-sky-200 to-sky-300" />

                  <div className="flex w-full flex-wrap justify-center gap-4">
                    {opportunityTree.experimentations.map((item) => (
                      <div key={item.id} className="relative flex flex-col items-start gap-3">
                        <OpportunityTreeNode
                          label="Experimentação"
                          title={item.title}
                          description={item.description}
                          onTitleChange={(value) => updateExperimentation(item.id, "title", value)}
                          onDescriptionChange={(value) => updateExperimentation(item.id, "description", value)}
                          variant="experimentation"
                          compact
                        />
                        {opportunityTree.experimentations.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveExperimentation(item.id)}
                            className="absolute -right-2 -top-2 h-8 w-8 rounded-full border border-sky-200 bg-white/90 text-sky-500 hover:bg-sky-50"
                            aria-label="Remover experimentação"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddExperimentation}
                    className="mt-2 flex items-center gap-2 rounded-full border-sky-200 px-5 text-sky-700 hover:bg-sky-50"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar experimentação
                  </Button>
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
