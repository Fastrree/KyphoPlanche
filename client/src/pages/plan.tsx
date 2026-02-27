import { useLanguage } from "@/lib/language-context";
import { planWeeks1_2, planWeeks3_4, DayPlan } from "@/data/workout-data";
import { useTaskCompletions, useToggleTask } from "@/hooks/use-tasks";
import { CheckCircle2, Circle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function PlanPage() {
  const { t, lang } = useLanguage();
  const { data: completions = [] } = useTaskCompletions();
  const toggleTask = useToggleTask();

  const handleToggle = (taskId: string, isCompleted: boolean) => {
    toggleTask.mutate({ date: "plan", taskId, completed: !isCompleted });
  };

  const isTaskDone = (taskId: string) => {
    return completions.some(c => c.taskId === taskId && c.date === "plan" && c.completed);
  };

  const isDayDone = (day: DayPlan) => {
    return day.tasks.every(task => isTaskDone(task.id));
  };

  const totalTasks = [...planWeeks1_2, ...planWeeks3_4].reduce((acc, day) => acc + day.tasks.length, 0);
  const completedTasks = completions.filter(c => c.date === "plan" && c.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const renderWeek = (titleKey: string, days: DayPlan[]) => (
    <div className="mb-10">
      <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-3">
        <span className="w-2 h-8 bg-primary rounded-full inline-block shadow-[0_0_10px_rgba(var(--primary),0.5)]"></span>
        {t(titleKey)}
      </h2>
      <Accordion type="multiple" className="space-y-4">
        {days.map((day, idx) => {
          const dayDone = isDayDone(day);
          return (
            <AccordionItem key={day.id} value={day.id} className="border border-border/50 bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="px-6 py-4 hover:no-underline group hover:bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${dayDone ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {dayDone ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-semibold">{idx + 1}</span>}
                  </div>
                  <span className="font-semibold text-lg">{t(day.dayKey)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/30 bg-muted/10">
                <div className="space-y-3 mt-4">
                  {day.tasks.map((task) => {
                    const done = isTaskDone(task.id);
                    return (
                      <motion.div 
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${done ? 'bg-primary/5 border-primary/20' : 'bg-background border-border/50 hover:border-border'}`}
                        onClick={() => handleToggle(task.id, done)}
                      >
                        <div>
                          <h4 className={`font-semibold text-base transition-colors ${done ? 'text-primary' : 'text-foreground'}`}>
                            {task.name[lang]}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.desc[lang]}</p>
                        </div>
                        <button 
                          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${done ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.4)] scale-110' : 'text-muted-foreground hover:bg-muted'}`}
                          onClick={(e) => { e.stopPropagation(); handleToggle(task.id, done); }}
                        >
                          {done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <div className="mb-10 p-6 bg-card rounded-3xl border border-border/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h1 className="text-3xl font-display font-bold mb-2">{t("plan.title")}</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{t("progress.overall")}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{progress}%</p>
          </div>
          <div className="w-full sm:w-2/3">
            <Progress value={progress} className="h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </Progress>
          </div>
        </div>
      </div>

      {renderWeek("plan.w12", planWeeks1_2)}
      {renderWeek("plan.w34", planWeeks3_4)}
    </motion.div>
  );
}
