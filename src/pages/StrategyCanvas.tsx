import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Save } from "lucide-react";

interface SectionInsight {
  text: string;
  emphasis?: boolean;
  link?: {
    label: string;
    href: string;
  };
}

interface StrategySection {
  id: number;
  title: string;
  question: string;
  insights: SectionInsight[];
  note?: ReactNode;
}

const strategySections: StrategySection[] = [
  {
    id: 16,
    title: "International Benchmarks",
    question: "Who are the main international benchmarks for the product? (include hyperlinks)",
    insights: [
      {
        text: "As soluções globais mais maduras atendem marketplaces digitais completos com gestão de comissões e liquidação integrada.",
      },
      {
        text: "Ainda não identificamos players que detalhem custos de antecipação para sellers — ponto de atenção para nossa precificação.",
      },
    ],
  },
  {
    id: 17,
    title: "Competitors and International Entrants",
    question:
      "Which are the main national competitors and international entrants? Consider also product substitutes.",
    insights: [
      {
        text: "A antecipação de comissões é tratada como funcionalidade complementar por bancos digitais nacionais.",
      },
      {
        text: "Soluções estrangeiras focam em antecipar saldos totais; nenhuma oferece curadoria de risco para marketplaces locais.",
      },
    ],
  },
  {
    id: 18,
    title: "Unfair Advantage",
    question: "What is your unfair advantage? Why will we be the leaders among the above?",
    insights: [
      {
        text: "Modelos proprietários de risco combinam dados de performance dos sellers com reputação em marketplaces parceiros.",
      },
      {
        text: "Antecipamos apenas o que já foi confirmado pelo marketplace, reduzindo inadimplência e custo de capital.",
      },
    ],
  },
  {
    id: 19,
    title: "Total Addressable Market",
    question:
      "What is the total addressable market (TAM) for the domain? Provide market sizing for TODAY.",
    insights: [
      {
        text: "Segmento de marketplaces movimentou R$ 260 bi em GMV no último ano, com crescimento anual composto de 27%.",
        emphasis: true,
      },
      {
        text: "Considerando ticket médio de antecipação em 8% do GMV, potencial TAM financeiro estimado em R$ 20,8 bi.",
      },
      {
        text: "Para aprofundar a metodologia, confira",
        link: {
          label: "este artigo",
          href: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-granularity-of-growth",
        },
      },
    ],
  },
  {
    id: 20,
    title: "Serviceable Available Market",
    question:
      "What is the serviceable available market (SAM) for the portion of TAM targeted and served today?",
    insights: [
      {
        text: "Target inicial: marketplaces de varejo com +1k sellers ativos e operação nacional consolidada (36 plataformas mapeadas).",
      },
      {
        text: "Volume combinado desses players representa ~45% do GMV total, estimando SAM financeiro em R$ 9,4 bi.",
        emphasis: true,
      },
    ],
  },
  {
    id: 21,
    title: "Go-to-Market",
    question:
      "What is our go-to-market strategy? How will we reach decision-makers in the case of marketplaces?",
    insights: [
      {
        text: "Abordagem ABM focada em diretorias de marketplace, com provas de conceito de 30 dias integradas via API.",
      },
      {
        text: "Programas de revenue-share com ERPs parceiros aceleram onboarding dos sellers e fortalecem a retenção.",
      },
      {
        text: "Estruturação de conteúdo educativo (webinars, playbooks) para reduzir objeções regulatórias e de compliance.",
      },
    ],
  },
];

const cellAccent = ["from-sky-50/60", "from-emerald-50/70", "from-violet-50/70", "from-amber-50/70", "from-blue-50/70", "from-rose-50/70"];

const StrategyCanvasCard = ({ section, index }: { section: StrategySection; index: number }) => (
  <article className="relative isolate overflow-hidden p-6">
    <div
      className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${cellAccent[index % cellAccent.length]} via-white to-white`}
    />
    <header className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {section.id}
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{section.title}</h2>
          <p className="text-xs text-muted-foreground">{section.question}</p>
        </div>
      </div>
    </header>

    <div className="mt-4 space-y-3 text-sm text-slate-700">
      {section.insights.map((insight, insightIndex) => (
        <p
          key={`${section.id}-insight-${insightIndex}`}
          className={insight.emphasis ? "font-semibold text-slate-900" : undefined}
        >
          {insight.text}
          {insight.link ? (
            <a
              href={insight.link.href}
              target="_blank"
              rel="noreferrer"
              className="ml-1 inline-flex items-center gap-1 text-primary underline decoration-dotted underline-offset-4"
            >
              {insight.link.label}
            </a>
          ) : null}
        </p>
      ))}
    </div>

    <footer className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
      <Badge variant="outline" className="border-dashed bg-white/70 text-xs">
        TBD
      </Badge>
      <span>Última revisão há 2 dias</span>
    </footer>
  </article>
);

export const StrategyCanvas = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Strategy Canvas</p>
          <h1 className="text-3xl font-semibold">Mapeie estratégia e posicionamento</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Compare benchmarks, concorrentes e o potencial de mercado para alinhar vantagens competitivas e priorizar iniciativas.
            Utilize a matriz para documentar hipóteses e próximos passos.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Salvar
          </Button>
          <Button variant="gradient" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {strategySections.map((section, index) => (
            <StrategyCanvasCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
