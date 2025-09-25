import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CanvasBlock {
  id: string;
  title: string;
  description: string;
  items: string[];
  accent: string;
}

const canvasBlocks: CanvasBlock[] = [
  {
    id: "value-proposition",
    title: "Proposta de Valor",
    description: "Benefícios centrais oferecidos para o cliente principal.",
    items: [
      "Experiência intuitiva para a jornada digital",
      "Automação dos fluxos mais críticos",
      "Suporte consultivo para escalar resultados",
    ],
    accent: "border-primary/40 bg-primary/5",
  },
  {
    id: "customer-segments",
    title: "Segmentos de Clientes",
    description: "Perfis de usuários e empresas com maior potencial de adoção.",
    items: [
      "Operações digitais em rápido crescimento",
      "Squads que buscam autonomia e governança",
      "Times de inovação focados em experimentação",
    ],
    accent: "border-emerald-300/60 bg-emerald-50/60",
  },
  {
    id: "channels",
    title: "Canais",
    description: "Pontos de contato e relacionamento prioritários.",
    items: [
      "Onboarding assistido com especialistas",
      "Comunidade de clientes e sessões ao vivo",
      "Conteúdos interativos dentro da plataforma",
    ],
    accent: "border-sky-300/60 bg-sky-50/60",
  },
  {
    id: "relationships",
    title: "Relacionamento",
    description: "Como manter proximidade e fidelizar a base.",
    items: [
      "Suporte 24/7 com SLA dedicado",
      "Customer success com planos trimestrais",
      "Programas de co-criação com clientes-chave",
    ],
    accent: "border-violet-300/60 bg-violet-50/60",
  },
  {
    id: "revenue-streams",
    title: "Fontes de Receita",
    description: "Principais estruturas de monetização do modelo.",
    items: [
      "Assinaturas recorrentes por squad",
      "Serviços premium de implementação",
      "Pacotes de analytics e insights",
    ],
    accent: "border-amber-300/60 bg-amber-50/60",
  },
  {
    id: "key-resources",
    title: "Recursos-chave",
    description: "Ativos necessários para entregar a proposta de valor.",
    items: [
      "Plataforma modular de aceleração",
      "Design ops e biblioteca de componentes",
      "Time multidisciplinar especialista",
    ],
    accent: "border-rose-300/60 bg-rose-50/60",
  },
  {
    id: "key-activities",
    title: "Atividades-chave",
    description: "Operações críticas para manter o valor entregue.",
    items: [
      "Mapeamento contínuo de jornadas",
      "Experimentação orientada a dados",
      "Treinamentos e capacitação de squads",
    ],
    accent: "border-blue-300/60 bg-blue-50/60",
  },
  {
    id: "key-partners",
    title: "Parceiros-chave",
    description: "Ecossistema de apoio e co-criação.",
    items: [
      "Consultorias estratégicas regionais",
      "Parcerias com hubs de inovação",
      "Integradores tecnológicos certificados",
    ],
    accent: "border-slate-300/60 bg-slate-50/60",
  },
  {
    id: "cost-structure",
    title: "Estrutura de Custos",
    description: "Principais despesas para manter o modelo de negócio.",
    items: [
      "Equipe de produto e sucesso do cliente",
      "Infraestrutura de dados e segurança",
      "Investimentos em marketing e comunidade",
    ],
    accent: "border-neutral-200 bg-neutral-50",
  },
];

const highlights = [
  {
    title: "Aposta estratégica",
    description: "Priorizar clientes enterprise que buscam aceleração de portfólio digital com governança e escala.",
  },
  {
    title: "Próximos passos",
    description: "Validar novos canais de aquisição e reforçar a jornada de onboarding com mais automações contextuais.",
  },
];

export const BusinessCanvas = () => (
  <div className="min-h-full space-y-8 bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          Business Canvas
        </Badge>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Modelo de Negócio</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Visualize os blocos estratégicos que sustentam a proposta de valor e organize decisões sobre priorização de
            investimentos.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm">
          Exportar visão
        </Button>
        <Button size="sm">Compartilhar</Button>
      </div>
    </div>

    <div className="grid gap-5 xl:grid-cols-[2fr_minmax(0,1fr)]">
      <div className="grid gap-4 md:grid-cols-2">
        {canvasBlocks.map((block) => (
          <Card key={block.id} className={`h-full border-dashed ${block.accent}`}>
            <CardHeader>
              <CardTitle className="text-base font-semibold">{block.title}</CardTitle>
              <CardDescription>{block.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/80">
                {block.items.map((item) => (
                  <li key={item} className="rounded-md bg-white/60 p-2 shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Resumo executivo</CardTitle>
            <CardDescription>
              Destaques do momento atual do negócio e do posicionamento competitivo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {highlights.map((highlight) => (
              <div key={highlight.title} className="rounded-lg border border-primary/20 bg-background/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{highlight.title}</p>
                <p className="mt-2 text-foreground/80">{highlight.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Checklist rápido</CardTitle>
            <CardDescription>Confirme se cada bloco está atualizado com os dados mais recentes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-md border border-muted-foreground/10 bg-muted/40 p-3">
              <span>KPIs associados ao valor</span>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                Em dia
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-md border border-muted-foreground/10 bg-muted/40 p-3">
              <span>Dados de clientes prioritários</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                Revisar
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-md border border-muted-foreground/10 bg-muted/40 p-3">
              <span>Hipóteses de monetização</span>
              <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                Explorar
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Próximos workshops</CardTitle>
            <CardDescription>Organize sessões colaborativas com as áreas envolvidas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Alinhamento com marketing</p>
              <p className="text-xs">Explorar canais de aquisição com campanhas integradas.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium text-foreground">Revisão financeira</p>
              <p className="text-xs">Validar projeções de receita e custos previstos para 2024.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default BusinessCanvas;
