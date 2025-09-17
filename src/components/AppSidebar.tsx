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
  UserCheck 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuSections = [
  {
    title: "Ideias",
    items: [
      { title: "Nova Idéia", url: "/nova-ideia", icon: Lightbulb },
      { title: "Ideias existentes", url: "/ideias-existentes", icon: Archive },
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
  },
  {
    title: "Configuração",
    items: [
      { title: "Repositório de dados", url: "/repositorio-dados", icon: Database },
      { title: "Integrações", url: "/integracoes", icon: Puzzle },
      { title: "Aprovadores", url: "/aprovadores", icon: UserCheck },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
    >
      <div className="p-4 border-b">
        {state === "expanded" ? (
          <h2 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Menu Lateral
          </h2>
        ) : (
          <div className="w-6 h-6 bg-gradient-primary rounded" />
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

      <div className="mt-auto p-4 border-t">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}