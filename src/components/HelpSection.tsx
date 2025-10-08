import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";

const tutorials = [
  {
    title: "Como Criar sua Primeira Ideia",
    description: "Aprenda a preencher o formulário e submeter sua ideia",
    icon: BookOpen,
    type: "Guia",
  },
  {
    title: "Entendendo os Agentes",
    description: "Conheça cada agente e como eles processam suas ideias",
    icon: Video,
    type: "Vídeo",
  },
  {
    title: "Processo de Aprovação",
    description: "Como funciona o sistema de sugestões e aprovações",
    icon: FileText,
    type: "Artigo",
  },
];

export function HelpSection() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Central de Ajuda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.title}
            className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <tutorial.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{tutorial.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tutorial.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
              <span className="inline-block mt-2 text-xs text-primary font-medium">{tutorial.type}</span>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-2">
          Ver Todos os Tutoriais
        </Button>
      </CardContent>
    </Card>
  );
}
