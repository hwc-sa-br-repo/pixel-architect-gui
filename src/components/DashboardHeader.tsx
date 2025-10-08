import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Bell } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <SidebarTrigger />
      <div className="flex-1">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
      </Button>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Nova Ideia
      </Button>
    </header>
  );
}
