import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";

const stickyRotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0"];
const stickyColors = ["bg-amber-100", "bg-sky-100", "bg-emerald-100", "bg-rose-100"];

const canvasSections: {
  title: string;
  accent: string;
  notes: string[];
  span?: string;
}[] = [
  {
    title: "Parcerias chave",
    accent: "bg-teal-500",
    notes: [
      "Produtoras e distribuidoras de vídeo",
      "Estúdios independentes",
    ],
  },
  {
    title: "Atividades chave",
    accent: "bg-cyan-500",
    notes: [
      "Desenvolvimento e manutenção da plataforma",
      "Marketing",
    ],
  },
  {
    title: "Proposta de valor",
    accent: "bg-emerald-500",
    notes: [
      "Assistir filmes, séries e documentários sob demanda",
      "Conteúdo sem multas e sem custos adicionais",
      "Recomendações personalizadas",
    ],
  },
  {
    title: "Segmento de clientes",
    accent: "bg-sky-600",
    notes: ["Pessoas que curtem entretenimento televisivo"],
  },
  {
    title: "Recursos chave",
    accent: "bg-emerald-600",
    notes: [
      "Plataforma digital",
      "Biblioteca de conteúdo",
    ],
  },
  {
    title: "Relacionamento",
    accent: "bg-indigo-500",
    notes: [
      "Automação de recomendações",
      "Comunicação omnichannel",
      "Programas de fidelidade",
    ],
  },
  {
    title: "Canais",
    accent: "bg-blue-500",
    notes: ["Website", "Consoles parceiros", "Aplicativos móveis"],
  },
  {
    title: "Estrutura de custos",
    accent: "bg-amber-500",
    notes: [
      "Direitos autorais",
      "Custo de manutenção da plataforma",
      "Conteúdo licenciado",
    ],
    span: "md:col-span-6",
  },
  {
    title: "Fonte de receitas",
    accent: "bg-rose-500",
    notes: [
      "Mensalidade",
      "Planos premium",
      "Parcerias com anunciantes",
    ],
    span: "md:col-span-6",
  },
];

const StickyNote = ({ note, index }: { note: string; index: number }) => {
  const rotation = stickyRotations[index % stickyRotations.length];
  const color = stickyColors[index % stickyColors.length];

  return (
    <div className={`relative ${rotation}`}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-3 w-16 -translate-x-1/2 -translate-y-2 rounded bg-slate-200/80 shadow-sm" />
      <div
        className={`rounded-md border border-amber-200/60 ${color} px-4 py-3 text-sm font-medium text-slate-700 shadow-md`}
      >
        {note}
      </div>
    </div>
  );
};

const CanvasSection = ({
  title,
  accent,
  notes,
  span,
}: {
  title: string;
  accent: string;
  notes: string[];
  span?: string;
}) => (
  <section className={`col-span-12 ${span ?? "md:col-span-3"}`}>
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className={`${accent} px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white`}>
        {title}
      </header>
      <div className="space-y-4 bg-slate-50 px-4 py-5">
        {notes.map((note, index) => (
          <StickyNote key={`${title}-${index}`} note={note} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export const BusinessCanvas = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Business Model Canvas</p>
          <h1 className="text-3xl font-semibold">Estruture seu modelo de negócio</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Visualize os pilares centrais do seu negócio em um quadro integrado. Organize parcerias, atividades, recursos,
            proposta de valor e clientes, enquanto mantém controle sobre custos e receitas esperadas.
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

      <div className="grid grid-cols-12 gap-6">
        {canvasSections.map((section) => (
          <CanvasSection key={section.title} {...section} />
        ))}
      </div>
    </div>
  );
};

export default BusinessCanvas;
