import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface Contributor {
  name: string;
  ideas: number;
  contributions: number;
  rank: number;
}

const mockContributors: Contributor[] = [
  { name: "João Silva", ideas: 12, contributions: 45, rank: 1 },
  { name: "Maria Santos", ideas: 9, contributions: 38, rank: 2 },
  { name: "Carlos Oliveira", ideas: 8, contributions: 32, rank: 3 },
  { name: "Ana Costa", ideas: 7, contributions: 28, rank: 4 },
];

const rankColors = {
  1: "text-yellow-500",
  2: "text-gray-400",
  3: "text-amber-600",
};

export function TopContributors() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Contribuidores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockContributors.map((contributor) => (
          <div
            key={contributor.name}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/5 transition-colors"
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                  {contributor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {contributor.rank <= 3 && (
                <div
                  className={`absolute -top-1 -right-1 h-5 w-5 rounded-full bg-background border-2 flex items-center justify-center ${rankColors[contributor.rank as keyof typeof rankColors]}`}
                >
                  <span className="text-xs font-bold">{contributor.rank}</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{contributor.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {contributor.ideas} ideias
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {contributor.contributions} contribuições
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
