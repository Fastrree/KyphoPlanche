import { useLanguage } from "@/lib/language-context";
import { dailyMorning, dailyEvening, dailyPosture, TaskItem } from "@/data/workout-data";
import { useTaskCompletions, useToggleTask } from "@/hooks/use-tasks";
import { CheckCircle2, Circle, Sun, Moon, Maximize } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function DailyPage() {
  const { t, lang } = useLanguage();
  const { data: completions = [] } = useTaskCompletions();
  const toggleTask = useToggleTask();
  
  const today = format(new Date(), 'yyyy-MM-dd');

  const handleToggle = (taskId: string, isCompleted: boolean) => {
    toggleTask.mutate({ date: today, taskId, completed: !isCompleted });
  };

  const isTaskDone = (taskId: string) => {
    return completions.some(c => c.taskId === taskId && c.date === today && c.completed);
  };

  const renderSection = (titleKey: string, tasks: TaskItem[], icon: React.ReactNode, colorClass: string) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-2xl ${colorClass}`}>
          {icon}
        </div>
        <h2 className="text-2xl font-display font-semibold">{t(titleKey)}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task, idx) => {
          const done = isTaskDone(task.id);
          return (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${done ? 'bg-primary/5 border-primary/30 shadow-[0_4px_20px_rgba(var(--primary),0.1)]' : 'bg-card border-border/50 shadow-sm hover:shadow-md hover:border-border'}`}
              onClick={() => handleToggle(task.id, done)}
            >
              <div className="mb-6">
                <h4 className={`font-semibold text-lg ${done ? 'text-primary' : 'text-foreground'}`}>
                  {task.name[lang]}
                </h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{task.desc[lang]}</p>
              </div>
              <div className="flex justify-end">
                <button 
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${done ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                  onClick={(e) => { e.stopPropagation(); handleToggle(task.id, done); }}
                >
                  {done ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      {t("common.completed")}
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" />
                      Mark Done
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 max-w-5xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-border/40 pb-8">
        <div>
          <h1 className="text-5xl font-display font-black tracking-tighter text-foreground">{t("daily.title")}</h1>
          <p className="text-xl text-muted-foreground mt-3 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {format(new Date(), 'EEEE, MMMM do')}
          </p>
        </div>
        <div className="bg-card/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-border/50 shadow-sm text-sm font-bold uppercase tracking-widest text-primary">
          Live Routine
        </div>
      </div>

      {renderSection("daily.morning", dailyMorning, <Sun className="w-6 h-6 text-yellow-500" />, "bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.1)]")}
      {renderSection("daily.evening", dailyEvening, <Moon className="w-6 h-6 text-indigo-400" />, "bg-indigo-400/10 shadow-[0_0_20px_rgba(129,140,248,0.1)]")}
      
      <div className="mt-12 p-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-[2.5rem]">
        <div className="bg-background rounded-[2.4rem] p-2">
          {renderSection("daily.posture", dailyPosture, <Maximize className="w-6 h-6 text-primary" />, "bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.1)]")}
        </div>
      </div>
    </motion.div>
  );
}
