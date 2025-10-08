import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { RecentIdeas } from "@/components/RecentIdeas";
import { TopContributors } from "@/components/TopContributors";
import { HelpSection } from "@/components/HelpSection";
import { Lightbulb, Users, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen w-full">
      <DashboardHeader />

      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        <section className="rounded-xl p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-background border animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Bem-vindo ao IdeaFlow</h2>
              <p className="text-muted-foreground max-w-3xl">
                Plataforma inteligente para cadastro e validação de ideias de negócio. Aqui você pode submeter suas
                ideias através de um formulário estruturado e acompanhar o processamento por múltiplos agentes
                especializados - desde mapeamento de mercado até validação de hipóteses e geração de POC. Cada ideia
                passa por um processo completo de análise, gerando relatórios detalhados para apoiar suas decisões.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Ideias"
            value="127"
            description="Ideias cadastradas"
            icon={Lightbulb}
            trend={{ value: "+12% este mês", positive: true }}
            gradient
          />
          <StatCard
            title="Colaboradores"
            value="48"
            description="Usuários ativos"
            icon={Users}
            trend={{ value: "+8% este mês", positive: true }}
          />
          <StatCard
            title="Em Processamento"
            value="23"
            description="Sendo analisadas"
            icon={TrendingUp}
          />
          <StatCard
            title="Validadas"
            value="89"
            description="Ideias completas"
            icon={CheckCircle}
            gradient
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <RecentIdeas />
          </div>

          <div className="space-y-6">
            <TopContributors />
            <HelpSection />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-4">
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all animate-fade-in">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Multiagente</h3>
            <p className="text-sm text-muted-foreground">
              Sistema de agentes especializados que trabalham em conjunto para análise completa de cada ideia.
            </p>
          </div>

          <div
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Chain-of-Thought</h3>
            <p className="text-sm text-muted-foreground">
              Raciocínio estruturado em etapas para análise profunda e recomendações fundamentadas.
            </p>
          </div>

          <div
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Gestão Colaborativa</h3>
            <p className="text-sm text-muted-foreground">
              Sistema estilo GitHub para sugestões, aprovações e versionamento de ideias em equipe.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
