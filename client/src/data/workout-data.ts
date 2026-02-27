export interface TaskItem {
  id: string;
  name: { en: string; tr: string };
  desc: { en: string; tr: string };
}

export interface DayPlan {
  id: string;
  dayKey: string;
  tasks: TaskItem[];
}

export const planWeeks1_2: DayPlan[] = [
  {
    id: "w12-mon", dayKey: "plan.mon", tasks: [
      { id: "w12-mon-1", name: { en: "Bird-Dog", tr: "Bird-Dog" }, desc: { en: "3 sets x 10 reps per side", tr: "3 set x 10 tekrar (her iki taraf)" } },
      { id: "w12-mon-2", name: { en: "Dead Bug", tr: "Dead Bug" }, desc: { en: "3 sets x 12 reps", tr: "3 set x 12 tekrar" } },
      { id: "w12-mon-3", name: { en: "Glute Bridge", tr: "Glute Bridge" }, desc: { en: "3 sets x 15 reps", tr: "3 set x 15 tekrar" } },
      { id: "w12-mon-4", name: { en: "Wall Angels", tr: "Wall Angels" }, desc: { en: "3 sets x 10 reps", tr: "3 set x 10 tekrar" } },
    ]
  },
  {
    id: "w12-tue", dayKey: "plan.tue", tasks: [
      { id: "w12-tue-1", name: { en: "Child's Pose", tr: "Çocuk Pozu" }, desc: { en: "Hold 60 seconds", tr: "60 saniye bekle" } },
      { id: "w12-tue-2", name: { en: "Cat-Cow", tr: "Kedi-İnek" }, desc: { en: "2 sets x 15 reps", tr: "2 set x 15 tekrar" } },
    ]
  },
  {
    id: "w12-wed", dayKey: "plan.wed", tasks: [
      { id: "w12-wed-1", name: { en: "Bird-Dog", tr: "Bird-Dog" }, desc: { en: "3 sets x 10 reps per side", tr: "3 set x 10 tekrar (her iki taraf)" } },
      { id: "w12-wed-2", name: { en: "Dead Bug", tr: "Dead Bug" }, desc: { en: "3 sets x 12 reps", tr: "3 set x 12 tekrar" } },
      { id: "w12-wed-3", name: { en: "Plank", tr: "Plank" }, desc: { en: "3 sets x 30-45 seconds", tr: "3 set x 30-45 saniye" } },
    ]
  },
  {
    id: "w12-thu", dayKey: "plan.thu", tasks: [
      { id: "w12-thu-1", name: { en: "Thoracic Extension", tr: "Torasik Ekstansiyon" }, desc: { en: "3 sets x 10 reps", tr: "3 set x 10 tekrar" } },
      { id: "w12-thu-2", name: { en: "Shoulder Dislocations", tr: "Omuz Çevirme" }, desc: { en: "2 sets x 15 reps", tr: "2 set x 15 tekrar" } },
    ]
  },
  {
    id: "w12-fri", dayKey: "plan.fri", tasks: [
      { id: "w12-fri-1", name: { en: "Bird-Dog", tr: "Bird-Dog" }, desc: { en: "3 sets x 10 reps per side", tr: "3 set x 10 tekrar (her iki taraf)" } },
      { id: "w12-fri-2", name: { en: "Wall Angels", tr: "Wall Angels" }, desc: { en: "3 sets x 12 reps", tr: "3 set x 12 tekrar" } },
      { id: "w12-fri-3", name: { en: "Glute Bridge", tr: "Glute Bridge" }, desc: { en: "3 sets x 15 reps", tr: "3 set x 15 tekrar" } },
    ]
  },
  {
    id: "w12-sat", dayKey: "plan.sat", tasks: [
      { id: "w12-sat-1", name: { en: "Active Rest", tr: "Aktif Dinlenme" }, desc: { en: "Light stretching / Walk", tr: "Hafif esneme / Yürüyüş" } },
    ]
  },
  {
    id: "w12-sun", dayKey: "plan.sun", tasks: [
      { id: "w12-sun-1", name: { en: "Rest", tr: "Tam Dinlenme" }, desc: { en: "Recover for next week", tr: "Sonraki hafta için toparlanma" } },
    ]
  }
];

export const planWeeks3_4: DayPlan[] = [
  {
    id: "w34-mon", dayKey: "plan.mon", tasks: [
      { id: "w34-mon-1", name: { en: "Planche Lean", tr: "Planche Lean" }, desc: { en: "3-5 sets x max hold", tr: "3-5 set x max bekleme" } },
      { id: "w34-mon-2", name: { en: "Scapular Pushups", tr: "Skapular Şınav" }, desc: { en: "3 sets x 10-12 reps", tr: "3 set x 10-12 tekrar" } },
      { id: "w34-mon-3", name: { en: "Hollow Body Hold", tr: "Hollow Body Hold" }, desc: { en: "3 sets x 30-45 seconds", tr: "3 set x 30-45 saniye" } },
    ]
  },
  {
    id: "w34-tue", dayKey: "plan.tue", tasks: [
      { id: "w34-tue-1", name: { en: "Superman Hold", tr: "Superman Tutuşu" }, desc: { en: "3 sets x 30 seconds", tr: "3 set x 30 saniye" } },
      { id: "w34-tue-2", name: { en: "Reverse Plank", tr: "Ters Plank" }, desc: { en: "3 sets x 30 seconds", tr: "3 set x 30 saniye" } },
      { id: "w34-tue-3", name: { en: "Pull-ups / Rows", tr: "Barfiks / Row" }, desc: { en: "3 sets x 5-8 reps", tr: "3 set x 5-8 tekrar" } },
    ]
  },
  {
    id: "w34-wed", dayKey: "plan.wed", tasks: [
      { id: "w34-wed-1", name: { en: "Tuck Planche Attempts", tr: "Tuck Planche Denemesi" }, desc: { en: "5-8 attempts", tr: "5-8 deneme" } },
      { id: "w34-wed-2", name: { en: "Planche Lean", tr: "Planche Lean" }, desc: { en: "3 sets x 10-15 seconds", tr: "3 set x 10-15 saniye" } },
      { id: "w34-wed-3", name: { en: "Pike Pushups", tr: "Pike Şınav" }, desc: { en: "3 sets x 8-12 reps", tr: "3 set x 8-12 tekrar" } },
    ]
  },
  {
    id: "w34-thu", dayKey: "plan.thu", tasks: [
      { id: "w34-thu-1", name: { en: "Thoracic Mobility", tr: "Torasik Mobilite" }, desc: { en: "10 mins flow", tr: "10 dk akış" } },
      { id: "w34-thu-2", name: { en: "Core Circuit", tr: "Merkez Bölge Devresi" }, desc: { en: "Dead bug, plank, side plank", tr: "Dead bug, plank, yan plank" } },
    ]
  },
  {
    id: "w34-fri", dayKey: "plan.fri", tasks: [
      { id: "w34-fri-1", name: { en: "Tuck Planche Hold", tr: "Tuck Planche Tutuş" }, desc: { en: "3-5 sets x max hold", tr: "3-5 set x max bekleme" } },
      { id: "w34-fri-2", name: { en: "Pseudo Planche Pushups", tr: "Pseudo Planche Şınav" }, desc: { en: "3 sets x 5-8 reps", tr: "3 set x 5-8 tekrar" } },
      { id: "w34-fri-3", name: { en: "L-Sit Attempts", tr: "L-Sit Denemesi" }, desc: { en: "3 sets x max hold", tr: "3 set x max bekleme" } },
    ]
  },
  {
    id: "w34-sat", dayKey: "plan.sat", tasks: [
      { id: "w34-sat-1", name: { en: "Active Rest", tr: "Aktif Dinlenme" }, desc: { en: "Yoga / Stretching", tr: "Yoga / Esneme" } },
    ]
  },
  {
    id: "w34-sun", dayKey: "plan.sun", tasks: [
      { id: "w34-sun-1", name: { en: "Rest", tr: "Tam Dinlenme" }, desc: { en: "Recover", tr: "Toparlanma" } },
    ]
  }
];

export const dailyMorning: TaskItem[] = [
  { id: "daily-m-1", name: { en: "Knee-to-Chest Stretch", tr: "Diz-Göğüs Esnemesi" }, desc: { en: "Hold 30s per leg", tr: "Her bacak 30 sn" } },
  { id: "daily-m-2", name: { en: "Cat-Cow", tr: "Kedi-İnek" }, desc: { en: "15 reps", tr: "15 tekrar" } },
];

export const dailyEvening: TaskItem[] = [
  { id: "daily-e-1", name: { en: "Rolled Towel Extension", tr: "Rulo Havlu Esnemesi" }, desc: { en: "Lie on back with towel under mid-back for 5-10 mins", tr: "Sırt ortasında havlu ile 5-10 dk sırtüstü yatış" } },
];

export const dailyPosture: TaskItem[] = [
  { id: "daily-p-1", name: { en: "Check Posture", tr: "Duruş Kontrolü" }, desc: { en: "Shoulders back and down, chest up (every 2 hours)", tr: "Omuzlar geride ve aşağıda, göğüs yukarıda (her 2 saatte bir)" } },
  { id: "daily-p-2", name: { en: "Chin Tucks", tr: "Çene Çekme" }, desc: { en: "10 reps to correct forward head", tr: "İleri baş duruşu için 10 tekrar" } },
];
