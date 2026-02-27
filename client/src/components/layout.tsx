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
        <Sidebar className="border-r border-border/40 shadow-xl">
          <SidebarHeader className="p-6 flex flex-row items-center gap-3">
            <div className="bg-primary/20 p-2.5 rounded-2xl text-primary shadow-lg shadow-primary/20">
              <Activity className="w-6 h-6" />
            </div>
            <h1 className="font-display font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary/80 to-primary/40 text-glow">
              KyphoPlanche
            </h1>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/50 mb-2">Main Terminal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={location === item.url} className={`my-1.5 rounded-2xl font-semibold transition-all duration-300 h-12 ${location === item.url ? "modern-card shadow-lg shadow-primary/10" : "hover:bg-muted/50"}`}>
                        <Link href={item.url} className="flex items-center gap-4 px-4">
                          <item.icon className={`w-5 h-5 transition-transform duration-300 ${location === item.url ? "text-primary scale-110" : "text-muted-foreground"}`} />
                          <span className={location === item.url ? "text-foreground" : "text-muted-foreground"}>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col w-full relative">
          <header className="h-20 border-b border-border/40 flex items-center justify-between px-6 sm:px-10 backdrop-blur-2xl bg-background/60 sticky top-0 z-50">
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
