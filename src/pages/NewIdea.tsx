import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Lightbulb, ListChecks, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const NewIdea = () => {
  const [launchDate, setLaunchDate] = useState<Date>();
  const [ideaStage, setIdeaStage] = useState("descoberta");
  const formattedDate = launchDate ? format(launchDate, "PPP", { locale: ptBR }) : "Selecione a data prevista";

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4 text-primary" />
            Jornada de Ideação
          </div>
          <h1 className="text-2xl font-semibold leading-tight">Cadastrar nova ideia</h1>
          <p className="text-muted-foreground max-w-2xl">
            Estruture uma nova oportunidade descrevendo problema, solução proposta, impacto esperado e recursos necessários. Esse formulário reflete o fluxo utilizado pelo time da Elo para priorização de ideias.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">Salvar como rascunho</Button>
          <Button variant="gradient">Enviar para avaliação</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <Card className="shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle>Detalhes da ideia</CardTitle>
            <CardDescription>
              Preencha as informações principais para que possamos entender o valor estratégico da proposta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="idea-name">Nome da ideia</Label>
                <Input id="idea-name" placeholder="Ex: Onboarding gamificado para novos leads" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idea-owner">Responsável</Label>
                <Input id="idea-owner" placeholder="Quem lidera essa proposta?" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="idea-category">Categoria</Label>
                <Select defaultValue="experiencia">
                  <SelectTrigger id="idea-category">
                    <SelectValue placeholder="Escolha uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="experiencia">Experiência do cliente</SelectItem>
                    <SelectItem value="produto">Evolução de produto</SelectItem>
                    <SelectItem value="processo">Eficiência de processo</SelectItem>
                    <SelectItem value="dados">Dados e insights</SelectItem>
                    <SelectItem value="crescimento">Aquisição e crescimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idea-stage">Estágio atual</Label>
                <Select value={ideaStage} onValueChange={setIdeaStage}>
                  <SelectTrigger id="idea-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="descoberta">Descoberta</SelectItem>
                    <SelectItem value="validacao">Validação</SelectItem>
                    <SelectItem value="prototipo">Protótipo</SelectItem>
                    <SelectItem value="piloto">Piloto</SelectItem>
                    <SelectItem value="lancamento">Lançamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idea-problem">Problema identificado</Label>
              <Textarea
                id="idea-problem"
                placeholder="Descreva a dor observada, os dados que comprovam o problema e o contexto do público afetado."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idea-solution">Solução proposta</Label>
              <Textarea
                id="idea-solution"
                placeholder="Explique a hipótese de solução, principais funcionalidades e o diferencial frente a alternativas."
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="impact">Impacto esperado</Label>
                <Textarea
                  id="impact"
                  placeholder="Quais métricas ou resultados a ideia pretende mover?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Público-alvo</Label>
                <Textarea
                  id="audience"
                  placeholder="Segmentos, personas e jornadas que se beneficiam dessa iniciativa."
                  rows={3}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="channels">Canais de ativação</Label>
                <Input id="channels" placeholder="Ex: Email, automações, app, inside sales" />
              </div>
              <div className="space-y-2">
                <Label>Data alvo para experimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start gap-2 font-normal">
                      <CalendarIcon className="h-4 w-4" />
                      {formattedDate}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar mode="single" selected={launchDate} onSelect={setLaunchDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="metrics">Métricas de sucesso</Label>
                <Textarea
                  id="metrics"
                  placeholder="Quais indicadores serão acompanhados para validar a ideia?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dependencies">Dependências e riscos</Label>
                <Textarea
                  id="dependencies"
                  placeholder="Integrações, aprovações, restrições técnicas ou riscos identificados."
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Habilitar times parceiros</Label>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">Growth & Performance</p>
                    <p className="text-sm text-muted-foreground">Campanhas, automações e mídia paga</p>
                  </div>
                  <Switch id="team-growth" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">Produto & UX</p>
                    <p className="text-sm text-muted-foreground">Discovery, prototipagem e testes</p>
                  </div>
                  <Switch id="team-product" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">Dados & Analytics</p>
                    <p className="text-sm text-muted-foreground">Instrumentação, dashboards e insights</p>
                  </div>
                  <Switch id="team-data" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">Operações Comerciais</p>
                    <p className="text-sm text-muted-foreground">Playbooks, treinamento e enablement</p>
                  </div>
                  <Switch id="team-ops" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Checklist de alinhamento</Label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-start gap-3 rounded-lg border p-3 text-sm">
                  <Checkbox id="check-briefing" className="mt-1" />
                  <div>
                    <p className="font-medium">Briefing validado</p>
                    <p className="text-muted-foreground">Problema, hipótese e métrica de sucesso revisados com o sponsor.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 rounded-lg border p-3 text-sm">
                  <Checkbox id="check-dados" className="mt-1" />
                  <div>
                    <p className="font-medium">Dados anexados</p>
                    <p className="text-muted-foreground">Evidências quantitativas e qualitativas disponíveis no repositório.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 rounded-lg border p-3 text-sm">
                  <Checkbox id="check-time" className="mt-1" />
                  <div>
                    <p className="font-medium">Time envolvido</p>
                    <p className="text-muted-foreground">Stakeholders mapeados e responsabilidades combinadas.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 rounded-lg border p-3 text-sm">
                  <Checkbox id="check-riscos" className="mt-1" />
                  <div>
                    <p className="font-medium">Riscos mapeados</p>
                    <p className="text-muted-foreground">Barreiras e planos de contingência documentados.</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="next-steps">Próximos passos sugeridos</Label>
              <Textarea
                id="next-steps"
                placeholder="Liste atividades, responsáveis e prazos para mover a ideia adiante."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                Recomendações inteligentes
              </CardTitle>
              <CardDescription>
                Sugestões baseadas nas últimas ideias aprovadas para elevar a qualidade do envio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p className="font-medium text-foreground">Valor percebido</p>
                <p>Explique o impacto para o cliente em 2 ou 3 frases objetivas, focando no benefício direto.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Métricas iniciais</p>
                <p>Sugira métricas de entrada (ex: taxa de ativação) e de resultado (ex: MRR incremental).</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Chamado à ação</p>
                <p>Defina qual decisão precisa ser tomada após a avaliação: liberar experimento, priorizar discovery ou arquivar.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ListChecks className="h-4 w-4 text-secondary" />
                Status de aprovação
              </CardTitle>
              <CardDescription>Atualize conforme o ciclo de avaliação evolui.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Backlog estratégico</Badge>
                <Badge variant="outline">2 sponsors interessados</Badge>
                <Badge variant="outline">Análise de viabilidade pendente</Badge>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">Checklist de entregáveis</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Canvas de problema-solução anexado</li>
                  <li>Estimativa macro de esforço definida</li>
                  <li>Plano de experimento com duração máxima de 4 semanas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewIdea;
