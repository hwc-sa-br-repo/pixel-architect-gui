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

const layoutDefaults = {
  showBasicInfo: true,
  showMarketAnalysis: true,
  showIdeaValidation: true,
  showProductRequirements: true,
  showFinancialViability: true,
  showCompetitiveCapacity: true,
};

type LayoutOptionKey = keyof typeof layoutDefaults;

const personalizationControls: {
  key: LayoutOptionKey;
  title: string;
  description: string;
}[] = [
  {
    key: "showBasicInfo",
    title: "Informações Básicas",
    description: "Nome, categoria e narrativa fundamental da ideia.",
  },
  {
    key: "showMarketAnalysis",
    title: "Análise de Mercado",
    description: "Contexto de público-alvo, tamanho e tendências do mercado.",
  },
  {
    key: "showIdeaValidation",
    title: "Validação da Ideia",
    description: "Evidências com clientes e diferenciais competitivos.",
  },
  {
    key: "showProductRequirements",
    title: "Requisitos do Produto",
    description: "Escopo funcional, critérios e restrições do produto.",
  },
  {
    key: "showFinancialViability",
    title: "Viabilidade Financeira",
    description: "Modelo de receita, investimentos e projeções de retorno.",
  },
  {
    key: "showCompetitiveCapacity",
    title: "Capacidade Competitiva",
    description: "Recursos, riscos e micro-oportunidades identificadas.",
  },
];

export const NewIdea = () => {
  const [launchDate, setLaunchDate] = useState<Date>();
  const [ideaStage, setIdeaStage] = useState("descoberta");
  const [layoutOptions, setLayoutOptions] = useState(layoutDefaults);
  const formattedDate = launchDate ? format(launchDate, "PPP", { locale: ptBR }) : "Selecione a data prevista";

  const toggleLayoutOption = (key: LayoutOptionKey) => (checked: boolean) => {
    setLayoutOptions((current) => ({ ...current, [key]: checked }));
  };

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
            Estruture uma nova oportunidade descrevendo problema, solução proposta, impacto esperado e recursos necessários. Esse formulário reflete o fluxo utilizado pela equipe para priorização de ideias.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">Salvar como rascunho</Button>
          <Button variant="gradient">Enviar para avaliação</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          {layoutOptions.showBasicInfo && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Informações Básicas</CardTitle>
                <CardDescription>Defina os conceitos fundamentais da sua ideia.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="idea-name">Nome da ideia</Label>
                    <Input id="idea-name" placeholder="Ex: App de gestão financeira pessoal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idea-category">Categoria</Label>
                    <Select defaultValue="experiencia">
                      <SelectTrigger id="idea-category">
                        <SelectValue placeholder="Selecione uma categoria" />
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
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="idea-owner">Responsável</Label>
                    <Input id="idea-owner" placeholder="Quem lidera essa proposta?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idea-stage">Estágio atual</Label>
                    <Select value={ideaStage} onValueChange={setIdeaStage}>
                      <SelectTrigger id="idea-stage">
                        <SelectValue placeholder="Selecione o estágio" />
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
                  <Label htmlFor="idea-description">Descrição detalhada</Label>
                  <Textarea
                    id="idea-description"
                    placeholder="Descreva sua ideia em detalhes, incluindo o problema que resolve e como funciona."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showMarketAnalysis && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Análise de Mercado</CardTitle>
                <CardDescription>Analise o mercado e identifique oportunidades.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="market-target">Mercado alvo</Label>
                    <Textarea
                      id="market-target"
                      placeholder="Descreva o público-alvo e segmentos impactados."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="market-size">Tamanho do mercado</Label>
                    <Textarea
                      id="market-size"
                      placeholder="Estimativas de TAM, SAM e SOM."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="market-trends">Tendências de mercado</Label>
                    <Textarea
                      id="market-trends"
                      placeholder="Identifique as principais tendências que favorecem sua ideia."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="market-problems">Problemas identificados</Label>
                    <Textarea
                      id="market-problems"
                      placeholder="Quais lacunas e dores do mercado sua ideia resolve?"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showIdeaValidation && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Validação da Ideia</CardTitle>
                <CardDescription>Valide sua proposta de valor e diferencial competitivo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="value-proposition">Proposta de valor</Label>
                    <Textarea
                      id="value-proposition"
                      placeholder="Qual é a proposta de valor única da sua ideia?"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="competitive-edge">Diferencial competitivo</Label>
                    <Textarea
                      id="competitive-edge"
                      placeholder="O que torna sua ideia única no mercado?"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer-validation">Validação com clientes</Label>
                    <Textarea
                      id="customer-validation"
                      placeholder="Descreva como pretende validar a ideia junto aos clientes."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initial-feedback">Feedback inicial</Label>
                    <Textarea
                      id="initial-feedback"
                      placeholder="Registre feedbacks recebidos ou planejados."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showProductRequirements && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Requisitos do Produto</CardTitle>
                <CardDescription>Defina as especificações técnicas e funcionais.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="core-features">Funcionalidades core</Label>
                    <Textarea
                      id="core-features"
                      placeholder="Liste as funcionalidades essenciais do produto."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technical-requirements">Requisitos técnicos</Label>
                    <Textarea
                      id="technical-requirements"
                      placeholder="Integrações, plataformas e tecnologias envolvidas."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="limitations">Restrições e limitações</Label>
                    <Textarea
                      id="limitations"
                      placeholder="Limitações técnicas, regulatórias ou operacionais."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acceptance">Critérios de aceitação</Label>
                    <Textarea
                      id="acceptance"
                      placeholder="Critérios para considerar a entrega bem-sucedida."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {layoutOptions.showFinancialViability && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Viabilidade Financeira</CardTitle>
                <CardDescription>Analise os aspectos financeiros do projeto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="revenue-model">Modelo de receita</Label>
                    <Select>
                      <SelectTrigger id="revenue-model">
                        <SelectValue placeholder="Selecione o modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assinatura">Assinatura</SelectItem>
                        <SelectItem value="transacional">Transacional</SelectItem>
                        <SelectItem value="freemium">Freemium</SelectItem>
                        <SelectItem value="publicidade">Publicidade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initial-investment">Investimento inicial (R$)</Label>
                    <Input id="initial-investment" placeholder="100000" type="number" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="estimated-costs">Custos estimados (mensais)</Label>
                    <Textarea
                      id="estimated-costs"
                      placeholder="Detalhe os principais custos operacionais."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue-projection">Projeção de receita</Label>
                    <Textarea
                      id="revenue-projection"
                      placeholder="Projeções para os próximos 12-24 meses."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="payback-time">Tempo de retorno esperado</Label>
                    <Select>
                      <SelectTrigger id="payback-time">
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3m">Até 3 meses</SelectItem>
                        <SelectItem value="6m">6 meses</SelectItem>
                        <SelectItem value="12m">12 meses</SelectItem>
                        <SelectItem value="24m">24 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="launch-date">Data alvo para experimento</Label>
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
              </CardContent>
            </Card>
          )}

          {layoutOptions.showCompetitiveCapacity && (
            <Card className="border-border/60 bg-background/90 shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Capacidade Competitiva e Micro-oportunidades</CardTitle>
                <CardDescription>Avalie recursos, vantagens competitivas e oportunidades.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="required-resources">Recursos necessários</Label>
                    <Textarea
                      id="required-resources"
                      placeholder="Equipe, tecnologia, parcerias e outros recursos."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-capabilities">Competências da equipe</Label>
                    <Textarea
                      id="team-capabilities"
                      placeholder="Habilidades e experiências disponíveis na equipe."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="competitive-advantages">Vantagens competitivas</Label>
                    <Textarea
                      id="competitive-advantages"
                      placeholder="Diferenciais da sua equipe/empresa."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="identified-risks">Riscos identificados</Label>
                    <Textarea
                      id="identified-risks"
                      placeholder="Principais riscos e como mitigá-los."
                      rows={3}
                    />
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="specific-opportunities">Oportunidades específicas</Label>
                    <Textarea
                      id="specific-opportunities"
                      placeholder="Liste micro-oportunidades específicas identificadas."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="market-niches">Nichos de mercado</Label>
                    <Textarea
                      id="market-niches"
                      placeholder="Nichos específicos a explorar."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="potential-partnerships">Parcerias potenciais</Label>
                    <Textarea
                      id="potential-partnerships"
                      placeholder="Parceiros ou pactos estratégicos."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="micro-actions">Micro-oportunidades</Label>
                    <Textarea
                      id="micro-actions"
                      placeholder="Pequenas iniciativas para gerar resultados rápidos."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-primary/30 bg-primary/5 shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base font-semibold">Personalização rápida</CardTitle>
              <CardDescription>Escolha quais blocos estratégicos deseja visualizar neste cadastro.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {personalizationControls.map((control) => (
                  <div key={control.key} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{control.title}</p>
                      <p className="text-xs text-muted-foreground">{control.description}</p>
                    </div>
                    <Switch
                      checked={layoutOptions[control.key]}
                      onCheckedChange={toggleLayoutOption(control.key)}
                      aria-label={`Alternar ${control.title}`}
                    />
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-dashed border-primary/40 bg-background/60 p-3 text-xs text-muted-foreground">
                Ajuste a visualização conforme o nível de profundidade necessário para apresentar a ideia.
              </div>
            </CardContent>
          </Card>

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
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Canvas de problema-solução anexado</li>
                  <li>Estimativa macro de esforço definida</li>
                  <li>Plano de experimento com duração máxima de 4 semanas</li>
                </ul>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">Checklist de aprovação</p>
                <div className="space-y-2">
                  <label className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                    <Checkbox id="approval-briefing" className="mt-1" />
                    <div>
                      <p className="font-medium">Briefing validado</p>
                      <p className="text-muted-foreground">Problema, hipótese e métrica de sucesso revisados com o sponsor.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                    <Checkbox id="approval-data" className="mt-1" />
                    <div>
                      <p className="font-medium">Dados anexados</p>
                      <p className="text-muted-foreground">Evidências quantitativas e qualitativas disponíveis no repositório.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                    <Checkbox id="approval-team" className="mt-1" />
                    <div>
                      <p className="font-medium">Time envolvido</p>
                      <p className="text-muted-foreground">Stakeholders mapeados e responsabilidades combinadas.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                    <Checkbox id="approval-risks" className="mt-1" />
                    <div>
                      <p className="font-medium">Riscos mapeados</p>
                      <p className="text-muted-foreground">Barreiras e planos de contingência documentados.</p>
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewIdea;
