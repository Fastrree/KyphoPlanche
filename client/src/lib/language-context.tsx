import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "tr";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.plan": "Plan",
    "nav.daily": "Daily",
    "nav.tracker": "Tracker",
    "nav.reset": "Reset Data",
    "plan.title": "4-Week Program",
    "plan.w12": "Weeks 1-2: Rehab & Core",
    "plan.w34": "Weeks 3-4: Strength & Progress",
    "plan.mon": "Monday",
    "plan.tue": "Tuesday",
    "plan.wed": "Wednesday",
    "plan.thu": "Thursday",
    "plan.fri": "Friday",
    "plan.sat": "Saturday",
    "plan.sun": "Sunday",
    "daily.title": "Daily Routines",
    "daily.morning": "Morning Routine",
    "daily.evening": "Evening Routine",
    "daily.posture": "Posture Rules",
    "tracker.title": "Progress Tracker",
    "tracker.stats": "Statistics",
    "tracker.weight": "Body Weight",
    "tracker.planche": "Planche Lean",
    "tracker.tuck": "Tuck Planche",
    "tracker.notes": "Workout Notes",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.reset_confirm": "Are you sure you want to delete all data? This cannot be undone.",
    "common.success": "Success",
    "common.error": "Error occurred",
    "common.completed": "Completed",
    "common.duration": "Duration (sec)",
    "common.weight_kg": "Weight (kg)",
    "common.date": "Date",
    "common.note": "Note",
    "common.empty": "No data yet.",
    "progress.overall": "Overall Completion",
  },
  tr: {
    "nav.plan": "Haftalık Plan",
    "nav.daily": "Günlük",
    "nav.tracker": "Takip",
    "nav.reset": "Verileri Sıfırla",
    "plan.title": "4 Haftalık Program",
    "plan.w12": "Hafta 1-2: Rehab & Merkez",
    "plan.w34": "Hafta 3-4: Güç & Gelişim",
    "plan.mon": "Pazartesi",
    "plan.tue": "Salı",
    "plan.wed": "Çarşamba",
    "plan.thu": "Perşembe",
    "plan.fri": "Cuma",
    "plan.sat": "Cumartesi",
    "plan.sun": "Pazar",
    "daily.title": "Günlük Rutinler",
    "daily.morning": "Sabah Rutini",
    "daily.evening": "Akşam Rutini",
    "daily.posture": "Duruş Kuralları",
    "tracker.title": "Gelişim Takibi",
    "tracker.stats": "İstatistikler",
    "tracker.weight": "Vücut Ağırlığı",
    "tracker.planche": "Planche Lean",
    "tracker.tuck": "Tuck Planche",
    "tracker.notes": "Antrenman Notları",
    "common.save": "Kaydet",
    "common.delete": "Sil",
    "common.cancel": "İptal",
    "common.confirm": "Onayla",
    "common.reset_confirm": "Tüm verileri silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
    "common.success": "Başarılı",
    "common.error": "Hata oluştu",
    "common.completed": "Tamamlandı",
    "common.duration": "Süre (sn)",
    "common.weight_kg": "Kilo (kg)",
    "common.date": "Tarih",
    "common.note": "Not",
    "common.empty": "Henüz veri yok.",
    "progress.overall": "Genel İlerleme",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("app-lang");
    return (saved as Language) || "tr";
  });

  useEffect(() => {
    localStorage.setItem("app-lang", lang);
  }, [lang]);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
