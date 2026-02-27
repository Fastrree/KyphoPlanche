import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { weightHooks, plancheLeanHooks, tuckPlancheHooks, workoutNoteHooks } from "@/hooks/use-logs";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, ArrowUpRight, Scale, Clock, NotebookPen } from "lucide-react";
import { motion } from "framer-motion";

export default function TrackerPage() {
  const { t } = useLanguage();
  const { data: weights = [] } = weightHooks.useList();
  const { data: plancheLeans = [] } = plancheLeanHooks.useList();
  const { data: tuckPlanches = [] } = tuckPlancheHooks.useList();
  const { data: notes = [] } = workoutNoteHooks.useList();

  const createWeight = weightHooks.useCreate();
  const deleteWeight = weightHooks.useDelete();
  const createPlanche = plancheLeanHooks.useCreate();
  const deletePlanche = plancheLeanHooks.useDelete();
  const createTuck = tuckPlancheHooks.useCreate();
  const deleteTuck = tuckPlancheHooks.useDelete();
  const createNote = workoutNoteHooks.useCreate();
  const deleteNote = workoutNoteHooks.useDelete();

  const [weightInput, setWeightInput] = useState("");
  const [plancheInput, setPlancheInput] = useState("");
  const [tuckInput, setTuckInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightInput) return;
    createWeight.mutate({ weight: weightInput });
    setWeightInput("");
  };

  const handlePlancheSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plancheInput) return;
    createPlanche.mutate({ durationSeconds: parseInt(plancheInput, 10) });
    setPlancheInput("");
  };

  const handleTuckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tuckInput) return;
    createTuck.mutate({ durationSeconds: parseInt(tuckInput, 10) });
    setTuckInput("");
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput) return;
    createNote.mutate({ date: format(new Date(), 'yyyy-MM-dd'), note: noteInput });
    setNoteInput("");
  };

  const formatChartDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d');
    } catch {
      return '';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 space-y-12 max-w-6xl mx-auto">
      <div className="relative p-10 modern-card overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="relative z-10">
          <h1 className="text-5xl font-display font-black tracking-tighter">{t("tracker.title")}</h1>
          <p className="text-xl text-muted-foreground mt-3 font-medium max-w-2xl">{t("tracker.stats")}</p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weight Tracker */}
        <Card className="modern-card overflow-hidden hover:border-primary/20 group">
          <CardHeader className="bg-muted/10 border-b border-border/40 p-8">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                  <Scale className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold">{t("tracker.weight")}</span>
              </div>
              {weights.length > 0 && (
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50">
                  Latest: {weights[weights.length-1].weight}kg
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[250px] w-full mb-8 p-4 bg-background/40 rounded-[2rem] border border-white/5 shadow-inner">
              {weights.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weights}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="timestamp" tickFormatter={formatChartDate} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      labelFormatter={formatChartDate}
                    />
                    <Area type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">{t("common.empty")}</div>
              )}
            </div>
            <form onSubmit={handleWeightSubmit} className="flex gap-3">
              <Input 
                type="number" 
                step="0.1"
                placeholder={t("common.weight_kg")} 
                value={weightInput} 
                onChange={e => setWeightInput(e.target.value)}
                className="bg-background/50 h-12 rounded-xl"
              />
              <Button type="submit" disabled={createWeight.isPending} className="h-12 px-6 rounded-xl hover-elevate">
                {createWeight.isPending ? "..." : <Plus className="w-5 h-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Planche Lean Tracker */}
        <Card className="glass-card overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/40 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-chart-2" />
              {t("tracker.planche")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[200px] w-full mb-6">
              {plancheLeans.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={plancheLeans}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="timestamp" tickFormatter={formatChartDate} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px' }} labelFormatter={formatChartDate}/>
                    <Line type="monotone" dataKey="durationSeconds" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--chart-2))' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">{t("common.empty")}</div>
              )}
            </div>
            <form onSubmit={handlePlancheSubmit} className="flex gap-3">
              <Input 
                type="number" 
                placeholder={t("common.duration")} 
                value={plancheInput} 
                onChange={e => setPlancheInput(e.target.value)}
                className="bg-background/50 h-12 rounded-xl"
              />
              <Button type="submit" disabled={createPlanche.isPending} className="h-12 px-6 rounded-xl bg-chart-2 hover:bg-chart-2/80 text-white hover-elevate">
                {createPlanche.isPending ? "..." : <Plus className="w-5 h-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tuck Planche Tracker */}
        <Card className="glass-card overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/40 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ArrowUpRight className="w-5 h-5 text-chart-4" />
              {t("tracker.tuck")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[200px] w-full mb-6">
              {tuckPlanches.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tuckPlanches}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="timestamp" tickFormatter={formatChartDate} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px' }} labelFormatter={formatChartDate} />
                    <Line type="monotone" dataKey="durationSeconds" stroke="hsl(var(--chart-4))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--chart-4))' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">{t("common.empty")}</div>
              )}
            </div>
            <form onSubmit={handleTuckSubmit} className="flex gap-3">
              <Input 
                type="number" 
                placeholder={t("common.duration")} 
                value={tuckInput} 
                onChange={e => setTuckInput(e.target.value)}
                className="bg-background/50 h-12 rounded-xl"
              />
              <Button type="submit" disabled={createTuck.isPending} className="h-12 px-6 rounded-xl bg-chart-4 hover:bg-chart-4/80 text-white hover-elevate">
                {createTuck.isPending ? "..." : <Plus className="w-5 h-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Workout Notes */}
        <Card className="glass-card overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/40 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <NotebookPen className="w-5 h-5 text-chart-3" />
              {t("tracker.notes")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col h-[320px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {notes.length > 0 ? notes.map((note) => (
                <div key={note.id} className="p-4 rounded-xl bg-background/50 border border-border/50 relative group">
                  <div className="text-xs text-muted-foreground mb-1">{formatChartDate(note.timestamp?.toString() || new Date().toISOString())}</div>
                  <p className="text-sm leading-relaxed">{note.note}</p>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10 h-8 w-8 rounded-full"
                    onClick={() => deleteNote.mutate(note.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">{t("common.empty")}</div>
              )}
            </div>
            <form onSubmit={handleNoteSubmit} className="mt-auto flex flex-col gap-3">
              <Textarea 
                placeholder={t("common.note")} 
                value={noteInput} 
                onChange={e => setNoteInput(e.target.value)}
                className="bg-background/50 resize-none rounded-xl"
                rows={2}
              />
              <Button type="submit" disabled={createNote.isPending} className="w-full rounded-xl hover-elevate">
                {createNote.isPending ? "..." : t("common.save")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
