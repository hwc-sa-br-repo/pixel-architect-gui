import { useState } from "react";
import eloLogo from "@/assets/elo-logo.svg";
import {
  Lightbulb,
  Archive,
  Target,
  Tag,
  CheckCircle,
  Map,
  Heart,
  Zap,
  Shield,
  FlaskConical,
  Search,
  Database,
  Puzzle,
  UserCheck,
  Settings,
  LifeBuoy,
  Lock,
  MonitorCog,
  HelpCircle,
  PlayCircle,
  BookOpen,
  Headset,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Server,
  Link,
  Code,
  Sparkles,
  Briefcase,
  Bullseye
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const menuSections = [
  {
    title: "Ideias",
    items: [
      { title: "Nova Idéia", url: "/nova-ideia", icon: Lightbulb },
      { title: "Ideias existentes", url: "/ideias-existentes", icon: Archive },
      { title: "Minhas Ideias", url: "/minhas-ideias", icon: Archive },
      { title: "Micro-oportunidades", url: "/micro-oportunidades", icon: Target },
      { title: "Categorias", url: "/categorias", icon: Tag },
      { title: "Aprovações", url: "/aprovacoes", icon: CheckCircle },
    ]
  },
  {
    title: "Agentes",
    items: [
      { title: "Mapeamento de Mercado", url: "/mapeamento-mercado", icon: Map },
      { title: "Mapeamento de Dores", url: "/mapeamento-dores", icon: Heart },
      { title: "Geração de Hipóteses", url: "/geracao-hipoteses", icon: Zap },
      { title: "Validação de Hipóteses", url: "/validacao-hipoteses", icon: Shield },
      { title: "Geração de POC", url: "/geracao-poc", icon: FlaskConical },
      { title: "Pesquisa Externa", url: "/pesquisa-externa", icon: Search },
    ]
  }
];

const settingsNavigation = [
  {
    title: "Repositório de dados",
    description: "Configure as fontes e destinos dos seus dados.",
    url: "/repositorio-dados",
    icon: Database,
  },
  {
    title: "Canvas",
    items: [
      { title: "Business Canvas", url: "/business-canvas", icon: Briefcase },
      { title: "Strategy Canvas", url: "/strategy-canvas", icon: Bullseye },
    ]
  }
];

const settingsNavigation = [
  {
    title: "Repositório de dados",
    description: "Configure as fontes e destinos dos seus dados.",
    url: "/repositorio-dados",
    icon: Database,
  },
  {
    title: "Integrações",
    description: "Gerencie conexões com ferramentas externas.",
    url: "/integracoes",
    icon: Puzzle,
  },
  {
    title: "Aprovadores",
    description: "Defina responsáveis pelas aprovações.",
    url: "/aprovadores",
    icon: UserCheck,
  },
];

const helpCenterFaqs = [
  {
    id: "faq-onboarding",
    question: "Como começar a usar o sistema?",
    description: "Passo a passo inicial com recomendações de configurações.",
    category: "Onboarding",
  },
  {
    id: "faq-validation",
    question: "Como interpretar os scores de validação?",
    description: "Entenda como calculamos os indicadores de confiança.",
    category: "Insights",
  },
  {
    id: "faq-sharing",
    question: "Posso salvar minhas análises e compartilhar com o time?",
    description: "Veja como colaborar e controlar permissões de acesso.",
    category: "Colaboração",
  },
  {
    id: "faq-updates",
    question: "Com que frequência devo atualizar as análises?",
    description: "Sugestões de cadência para manter os dados atuais.",
    category: "Boas práticas",
  },
];

const helpCenterTutorials = [
  {
    id: "tutorial-overview",
    title: "Introdução ao sistema",
    duration: "05:32",
  },
  {
    id: "tutorial-market",
    title: "Análise de Mercado Eficaz",
    duration: "08:15",
  },
  {
    id: "tutorial-validation",
    title: "Validação de idéias",
    duration: "06:48",
  },
  {
    id: "tutorial-interpretation",
    title: "Interpretando resultados",
    duration: "04:27",
  },
];

const helpCenterDocs = [
  {
    id: "doc-user-guide",
    title: "Guia do usuário",
    description: "Manual completo de utilização do sistema.",
    icon: BookOpen,
  },
  {
    id: "doc-api",
    title: "API Documentation",
    description: "Referência completa para integrações.",
    icon: Code,
  },
  {
    id: "doc-methodology",
    title: "Metodologias",
    description: "Fundamentos teóricos das análises.",
    icon: HelpCircle,
  },
  {
    id: "doc-best-practices",
    title: "Melhores práticas",
    description: "Dicas para obter mais resultados.",
    icon: Sparkles,
  },
];

const helpCenterChannels = [
  {
    id: "channel-email",
    label: "Email",
    value: "suporte@besleyteam.com",
    description: "Retorno médio em até 4 horas úteis.",
    icon: Mail,
  },
  {
    id: "channel-phone",
    label: "Telefone",
    value: "+55 (11) 4002-8922",
    description: "Suporte humano de segunda a sexta, 8h às 20h.",
    icon: Phone,
  },
  {
    id: "channel-chat",
    label: "Chat online",
    value: "Equipe disponível agora",
    description: "Tempo de espera estimado inferior a 2 minutos.",
    icon: MessageSquare,
  },
];

const helpCenterStatus = [
  {
    id: "status-api",
    label: "API Principal",
    status: "Operacional",
  },
  {
    id: "status-db",
    label: "Banco de Dados",
    status: "Operacional",
  },
  {
    id: "status-analytics",
    label: "Sistema de Análise",
    status: "Operacional",
  },
];

const helpCenterResources = [
  {
    id: "resource-changelog",
    label: "Changelog",
  },
  {
    id: "resource-webinars",
    label: "Webinars",
  },
  {
    id: "resource-comunidade",
    label: "Comunidade",
  },
  {
    id: "resource-blog",
    label: "Blog",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [language, setLanguage] = useState("pt-BR");
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [supportPriority, setSupportPriority] = useState("normal");

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50";

  const handleSettingsNavigation = (url: string) => {
    navigate(url);
    setIsSettingsOpen(false);
  };

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-r"
      >
        <div className="flex h-12 items-center border-b px-4">
          {state === "expanded" ? (
            <h2 className="bg-gradient-primary bg-clip-text text-lg font-semibold text-transparent">
              Menu Lateral
            </h2>
          ) : (
            <img src={eloLogo} alt="Elo Funil Design" className="h-6 w-6" />
          )}
        </div>

        <SidebarContent>
          {menuSections.map((section) => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
                {section.title}
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={getNavCls}
                          title={state === "collapsed" ? item.title : undefined}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t p-4">
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton className="gap-2" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Configurações</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="gap-2" onClick={() => setIsHelpCenterOpen(true)}>
                <LifeBuoy className="h-4 w-4" />
                <span className="text-sm font-medium">Central Ajuda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarTrigger className="w-full" />
        </SidebarFooter>
      </Sidebar>

      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent side="right" className="w-full max-w-3xl overflow-y-auto border-l bg-background p-0 sm:max-w-2xl lg:max-w-3xl">
          <div className="flex h-full flex-col">
            <div className="border-b bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6">
              <SheetHeader className="items-start gap-2 text-left">
                <div className="flex items-center gap-2 text-primary">
                  <Settings className="h-5 w-5" />
                  <SheetTitle>Central de configurações</SheetTitle>
                </div>
                <SheetDescription className="max-w-xl text-sm">
                  Ajuste preferências da plataforma e acesse os hubs administrativos sem sair do fluxo atual.
                </SheetDescription>
              </SheetHeader>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <Card className="border-border/60 bg-card/70">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-semibold">Acessos rápidos</CardTitle>
                    <CardDescription>Opções antes disponíveis no agrupamento de configuração.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  {settingsNavigation.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleSettingsNavigation(item.url)}
                      className="flex h-full items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4 text-left transition hover:border-primary/40 hover:bg-primary/5"
                    >
                      <item.icon className="mt-1 h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/70">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">Segurança</CardTitle>
                    <CardDescription>Configurações de segurança e privacidade.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" placeholder="Digite sua senha" autoComplete="current-password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" placeholder="Crie uma nova senha" autoComplete="new-password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" placeholder="Repita a nova senha" autoComplete="new-password" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Button type="button" variant="default" className="rounded-full">
                      Alterar Senha
                    </Button>
                    <div className="flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
                      Recomendamos atualizar sua senha a cada 90 dias.
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Autenticação de Dois Fatores</p>
                      <p className="text-xs text-muted-foreground">Adicione uma camada extra de segurança ao login.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                      <Button type="button" variant="outline" className="rounded-full">
                        Configurar autenticação 2FA
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/70">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <MonitorCog className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">Preferências do Sistema</CardTitle>
                    <CardDescription>Personalize idioma, fuso e comportamentos padrão.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language" className="rounded-xl">
                          <SelectValue placeholder="Selecione um idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">Inglês (Estados Unidos)</SelectItem>
                          <SelectItem value="es-ES">Espanhol (Espanha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone" className="rounded-xl">
                          <SelectValue placeholder="Selecione um fuso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Sao_Paulo">America/Sao_Paulo</SelectItem>
                          <SelectItem value="America/Mexico_City">America/Mexico_City</SelectItem>
                          <SelectItem value="Europe/Lisbon">Europe/Lisbon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 rounded-xl border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Modo Escuro</p>
                        <p className="text-xs text-muted-foreground">Alternar tema da interface.</p>
                      </div>
                      <Switch checked={darkModeEnabled} onCheckedChange={setDarkModeEnabled} />
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Salvamento Automático</p>
                        <p className="text-xs text-muted-foreground">Salvar automaticamente suas alterações.</p>
                      </div>
                      <Switch checked={autoSaveEnabled} onCheckedChange={setAutoSaveEnabled} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isHelpCenterOpen} onOpenChange={setIsHelpCenterOpen}>
        <SheetContent side="right" className="w-full max-w-3xl overflow-y-auto border-l bg-background p-0 sm:max-w-2xl lg:max-w-3xl">
          <div className="flex h-full flex-col">
            <div className="border-b bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6">
              <SheetHeader className="items-start gap-2 text-left">
                <div className="flex items-center gap-2 text-primary">
                  <LifeBuoy className="h-5 w-5" />
                  <SheetTitle>Central de Ajuda</SheetTitle>
                </div>
                <SheetDescription className="max-w-xl text-sm">
                  Acesse tutoriais, FAQs e canais de suporte para solucionar dúvidas sem sair do fluxo atual.
                </SheetDescription>
              </SheetHeader>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(320px,1fr)]">
                <div className="space-y-6">
                  <Card className="border-border/60 bg-card/70">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">Perguntas frequentes</CardTitle>
                        <CardDescription>Suporte para as dúvidas mais comuns.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {helpCenterFaqs.map((faq) => (
                        <button
                          key={faq.id}
                          type="button"
                          className="flex w-full items-start justify-between gap-4 rounded-xl border border-border/60 bg-background/60 p-4 text-left transition hover:border-primary/40 hover:bg-primary/5"
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-foreground">{faq.question}</p>
                            <p className="text-xs text-muted-foreground">{faq.description}</p>
                          </div>
                          <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary">
                            {faq.category}
                          </Badge>
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-border/60 bg-card/70">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <PlayCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">Tutoriais em vídeo</CardTitle>
                        <CardDescription>Aprenda visualmente com a curadoria da equipe.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {helpCenterTutorials.map((tutorial) => (
                        <div
                          key={tutorial.id}
                          className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/60 p-4"
                        >
                          <div>
                            <p className="text-sm font-semibold text-foreground">{tutorial.title}</p>
                            <p className="text-xs text-muted-foreground">Duração • {tutorial.duration}</p>
                          </div>
                          <Button type="button" variant="ghost" className="rounded-full px-4">
                            Assistir
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-border/60 bg-card/70">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">Documentação</CardTitle>
                        <CardDescription>Conteúdos para aprofundar o uso da plataforma.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                      {helpCenterDocs.map((doc) => (
                        <button
                          key={doc.id}
                          type="button"
                          className="flex h-full flex-col items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4 text-left transition hover:border-primary/40 hover:bg-primary/5"
                        >
                          <doc.icon className="h-4 w-4 text-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-foreground">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">{doc.description}</p>
                          </div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border-primary/30 bg-primary/5">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Headset className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">Contate o suporte</CardTitle>
                        <CardDescription>Envie uma mensagem para nossa equipe técnica.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="support-subject">Assunto</Label>
                        <Input id="support-subject" placeholder="Descreva sua dúvida" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-message">Mensagem</Label>
                        <Textarea
                          id="support-message"
                          placeholder="Detalhe o desafio ou problema encontrado"
                          className="min-h-[120px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-priority">Prioridade</Label>
                        <Select value={supportPriority} onValueChange={setSupportPriority}>
                          <SelectTrigger id="support-priority" className="rounded-xl">
                            <SelectValue placeholder="Selecione uma prioridade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baixa">Baixa</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                            <SelectItem value="critica">Crítica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="button" className="w-full rounded-full">
                        Enviar mensagem
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/60 bg-card/70">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">Canais de contato</CardTitle>
                        <CardDescription>Escolha o canal mais conveniente.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {helpCenterChannels.map((channel) => (
                        <div
                          key={channel.id}
                          className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4"
                        >
                          <channel.icon className="mt-1 h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{channel.label}</p>
                            <p className="text-xs text-muted-foreground">{channel.value}</p>
                            <p className="text-xs text-muted-foreground/80">{channel.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-border/60 bg-card/70">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Server className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">Status do sistema</CardTitle>
                        <CardDescription>Monitore a saúde das principais rotas.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {helpCenterStatus.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/60 p-3"
                          >
                            <p className="text-sm font-medium text-foreground">{service.label}</p>
                            <Badge className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                              {service.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" className="w-full gap-2">
                        <Globe className="h-4 w-4" /> Ver página de status
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">Uptime (últimos 90 dias): 99,8%</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/60 bg-card/70">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Link className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">Recursos úteis</CardTitle>
                        <CardDescription>Referências adicionais para se aprofundar.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {helpCenterResources.map((resource) => (
                        <button
                          key={resource.id}
                          type="button"
                          className="flex w-full items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/60 p-3 text-left transition hover:border-primary/40 hover:bg-primary/5"
                        >
                          <span className="text-sm font-medium text-foreground">{resource.label}</span>
                          <Badge variant="outline" className="rounded-full">Acessar</Badge>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}