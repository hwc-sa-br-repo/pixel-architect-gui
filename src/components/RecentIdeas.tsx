import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, MessageSquare } from "lucide-react";

interface Idea {
  id: string;
  title: string;
  author: string;
  category: string;
  likes: number;
  views: number;
  comments: number;
  status: "processing" | "completed" | "draft";
}

const mockIdeas: Idea[] = [
  {
    id: "1",
    title: "Marketplace de Serviços para Freelancers Tech",
    author: "João Silva",
    category: "Tecnologia",
    likes: 42,
    views: 156,
    comments: 8,
    status: "completed",
  },
  {
    id: "2",
    title: "App de Gestão Sustentável para Condomínios",
    author: "Maria Santos",
    category: "Sustentabilidade",
    likes: 38,
    views: 142,
    comments: 12,
    status: "processing",
  },
  {
    id: "3",
    title: "Plataforma de Educação Financeira Gamificada",
    author: "Carlos Oliveira",
    category: "Educação",
    likes: 35,
    views: 128,
    comments: 6,
    status: "completed",
  },
  {
    id: "4",
    title: "SaaS para Gestão de Micro-influenciadores",
    author: "Ana Costa",
    category: "Marketing",
    likes: 29,
    views: 98,
    comments: 5,
    status: "draft",
  },
];

const statusColors = {
  processing: "bg-primary/10 text-primary",
  completed: "bg-accent/10 text-accent",
  draft: "bg-muted text-muted-foreground",
};

export function RecentIdeas() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Ideias Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockIdeas.map((idea) => (
          <div
            key={idea.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{idea.title}</h3>
                <p className="text-xs text-muted-foreground">por {idea.author}</p>
              </div>
              <Badge variant="outline" className={statusColors[idea.status]}>
                {idea.status === "processing" && "Processando"}
                {idea.status === "completed" && "Completo"}
                {idea.status === "draft" && "Rascunho"}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant="secondary" className="text-xs">
                {idea.category}
              </Badge>
              <div className="flex items-center gap-3 text-xs text-muted-foreground ml-auto">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {idea.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {idea.views}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {idea.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
