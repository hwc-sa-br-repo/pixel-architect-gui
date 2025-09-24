import { useState } from "react";
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
  MonitorCog
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [language, setLanguage] = useState("pt-BR");
  const [timezone, setTimezone] = useState("America/Sao_Paulo");

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
        <div className="border-b p-4">
          {state === "expanded" ? (
            <h2 className="bg-gradient-primary bg-clip-text text-lg font-semibold text-transparent">
              Menu Lateral
            </h2>
          ) : (
            <div className="h-6 w-6 rounded bg-gradient-primary" />
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
              <SidebarMenuButton className="gap-3" size="lg" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Configurações</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="gap-3" size="lg">
                <LifeBuoy className="h-4 w-4" />
                <span className="text-sm font-medium">Central Ajuda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarTrigger className="mt-4 w-full" />
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
    </>
  );
}