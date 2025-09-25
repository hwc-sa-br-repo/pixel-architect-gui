import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface StrategicAxis {
  id: string;
  label: string;
  description: string;
  emphasis: "Diferenciar" | "Elevar" | "Otimizar";
  score: number;
}

interface Initiative {
  id: string;
  name: string;
  owner: string;
  status: "Exploração" | "Em andamento" | "Concluída";
  impact: string;
}

const axes: StrategicAxis[] = [
  {
    id: "experience",
    label: "Experiência do cliente",
    description: "Elevar a percepção de valor em cada interação digital.",
    emphasis: "Diferenciar",
    score: 82,
  },
  {
    id: "efficiency",
    label: "Eficiência operacional",
    description: "Reduzir retrabalho e aumentar a velocidade de entrega.",
    emphasis: "Otimizar",
    score: 74,
  },
  {
    id: "innovation",
    label: "Inovação contínua",
    description: "Manter um portfólio de apostas evolutivas e disruptivas.",
    emphasis: "Elevar",
    score: 68,
  },
];

const initiatives: Initiative[] = [
  {
    id: "journey-tracker",
    name: "Journey tracker unificado",
    owner: "Experiência",
    status: "Em andamento",
    impact: "+23% de NPS no piloto",
  },
  {
    id: "automation-pipeline",
    name: "Pipeline de automação",
    owner: "Operações",
    status: "Exploração",
    impact: "Redução de 18% no tempo de ciclo",
  },
  {
    id: "innovation-guild",
    name: "Guilda de inovação",
    owner: "Produto",
    status: "Concluída",
    impact: "5 novas hipóteses validadas",
  },
];

const statusBadgeStyles: Record<Initiative["status"], string> = {
  Exploração: "bg-amber-100 text-amber-700",
  "Em andamento": "bg-sky-100 text-sky-700",
  Concluída: "bg-emerald-100 text-emerald-700",
};

export const StrategyCanvas = () => (
  <div className="min-h-full space-y-8 bg-slate-50/70 p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        <Badge variant="secondary" className="rounded-full bg-purple-100 text-purple-700">
          Strategy Canvas
        </Badge>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Prioridades Estratégicas</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Compare o posicionamento atual com os pilares de diferenciação e identifique iniciativas que aceleram a entrega
            de valor.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm">
          Atualizar métricas
        </Button>
        <Button size="sm">Adicionar iniciativa</Button>
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div className="space-y-6">
        <Card className="border-border/60 bg-background/80 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">Eixos estratégicos</CardTitle>
            <CardDescription>
              Avaliação do desempenho atual em relação à ambição para cada eixo.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-3">
            {axes.map((axis) => (
              <div key={axis.id} className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                  <span className="text-primary">{axis.emphasis}</span>
                  <span className="text-muted-foreground">{axis.score}%</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-foreground">{axis.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{axis.description}</p>
                <Progress value={axis.score} className="mt-4 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/80 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">Iniciativas em destaque</CardTitle>
            <CardDescription>Monitore o progresso das principais alavancas táticas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="rounded-2xl border border-muted-foreground/10 bg-muted/30 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{initiative.name}</p>
                    <p className="text-xs text-muted-foreground">Owner: {initiative.owner}</p>
                  </div>
                  <Badge variant="secondary" className={statusBadgeStyles[initiative.status]}>
                    {initiative.status}
                  </Badge>
                </div>
                <Separator className="my-3" />
                <p className="text-sm text-muted-foreground">Impacto esperado: {initiative.impact}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border-purple-200 bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Roteiro de decisão</CardTitle>
            <CardDescription>Indicadores-chave a revisar nas próximas cerimônias estratégicas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-lg border border-purple-100 bg-purple-50/70 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Sinais de mercado</p>
              <p className="mt-1 text-foreground/80">Evolução da adoção por segmentos enterprise estratégicos.</p>
            </div>
            <div className="rounded-lg border border-purple-100 bg-purple-50/40 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Capacidades internas</p>
              <p className="mt-1 text-foreground/80">Maturidade dos squads em discovery e experimentação.</p>
            </div>
            <div className="rounded-lg border border-purple-100 bg-purple-50/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Riscos críticos</p>
              <p className="mt-1 text-foreground/80">Dependências de integrações prioritárias e compliance.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/80 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Notas rápidas</CardTitle>
            <CardDescription>Registre aprendizados que precisam de acompanhamento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-md border border-muted-foreground/10 bg-muted/40 p-3">
              Propor comitê mensal para revisar indicadores e reordenar apostas.
            </div>
            <div className="rounded-md border border-muted-foreground/10 bg-muted/40 p-3">
              Identificar novos parceiros de dados para enriquecer análises preditivas.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default StrategyCanvas;
