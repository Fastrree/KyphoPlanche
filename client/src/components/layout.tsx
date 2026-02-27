import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { Moon, Sun, Activity, CalendarDays, ListTodo, Languages, Trash2, Menu } from "lucide-react";
import { useResetData } from "@/hooks/use-logs";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });
  const resetMutation = useResetData();
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsDark(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleReset = async () => {
    resetMutation.mutate(undefined, {
      onSuccess: () => {
        toast({ title: t("common.success"), description: "Data reset complete" });
      }
    });
  };

  const navItems = [
    { title: t("nav.plan"), url: "/", icon: CalendarDays },
    { title: t("nav.daily"), url: "/daily", icon: ListTodo },
    { title: t("nav.tracker"), url: "/tracker", icon: Activity },
  ];

  return (
    <SidebarProvider style={{ "--sidebar-width": "16rem" } as React.CSSProperties}>
      <div className="flex min-h-screen w-full bg-background selection:bg-primary/20">
        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="p-4 flex flex-row items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-xl text-primary">
              <Activity className="w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 text-glow">
              KyphoPlanche
            </h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/70">Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={location === item.url} className="my-1 rounded-xl font-medium transition-all duration-200">
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                          <item.icon className={`w-5 h-5 ${location === item.url ? "text-primary" : "text-muted-foreground"}`} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col w-full">
          <header className="h-16 border-b border-border/40 flex items-center justify-between px-4 sm:px-6 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setLang(lang === "en" ? "tr" : "en")}
                className="rounded-full hover-elevate"
                title="Toggle Language"
              >
                <Languages className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full hover-elevate"
              >
                {isDark ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover-elevate text-destructive/80 hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-card rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("nav.reset")}?</AlertDialogTitle>
                    <AlertDialogDescription>{t("common.reset_confirm")}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">{t("common.cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset} className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">{t("common.confirm")}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full max-w-6xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
