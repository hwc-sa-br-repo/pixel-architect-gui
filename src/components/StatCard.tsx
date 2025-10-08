import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  gradient?: boolean;
}

export function StatCard({ title, value, description, icon: Icon, trend, gradient }: StatCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
            gradient ? "bg-gradient-to-br from-primary to-accent" : "bg-muted"
          }`}
        >
          <Icon className={`h-5 w-5 ${gradient ? "text-white" : "text-muted-foreground"}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className={`text-xs mt-2 ${trend.positive ? "text-accent" : "text-destructive"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
