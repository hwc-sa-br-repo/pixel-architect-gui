import { NavLink } from "react-router-dom";
import {
  Lightbulb,
  TrendingUp,
  Heart,
  Layers,
  Tag,
  CheckCircle,
  Map,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Beaker,
  Search,
  Grid,
  BarChart,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const ideasItems = [
  { title: "Nova Ideia", url: "/nova-ideia", icon: Lightbulb },
  { title: "Ideias Existentes", url: "/ideias-existentes", icon: Layers },
  { title: "Minhas Ideias", url: "/minhas-ideias", icon: Heart },
  { title: "Micro-oportunidades", url: "/micro-oportunidades", icon: TrendingUp },
  { title: "Categorias", url: "/categorias", icon: Tag },
  { title: "Aprovações", url: "/aprovacoes", icon: CheckCircle },
];

const agentsItems = [
  { title: "Mapeamento de Mercado", url: "/mapeamento-mercado", icon: Map },
  { title: "Mapeamento de Dores", url: "/mapeamento-dores", icon: AlertCircle },
  { title: "Geração de Hipóteses", url: "/geracao-hipoteses", icon: Sparkles },
  { title: "Validação de Hipóteses", url: "/validacao-hipoteses", icon: ShieldCheck },
  { title: "Geração de POC", url: "/geracao-poc", icon: Beaker },
  { title: "Pesquisa Externa", url: "/pesquisa-externa", icon: Search },
];

const canvasItems = [
  { title: "Business Canvas", url: "/business-canvas", icon: Grid },
  { title: "Strategy Canvas", url: "/strategy-canvas", icon: BarChart },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">IdeaFlow</span>
            <span className="text-xs text-muted-foreground">Business Ideas</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ideias</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ideasItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Agentes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {agentsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Canvas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {canvasItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/configuracoes" className="hover:bg-sidebar-accent/50">
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/ajuda" className="hover:bg-sidebar-accent/50">
                    <HelpCircle className="h-4 w-4" />
                    <span>Central de Ajuda</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
