// ==================== FEATURES CONFIGURATION ====================

// Language translations
const TRANSLATIONS = {
  en: {
    dashboard: "Dashboard",
    goals: "Saving Goals",
    transactions: "Transactions",
    analytics: "Analytics",
    calendar: "Calendar",
    wallets: "Wallets",
    recurring: "Recurring",
    challenges: "Challenges",
    wishlist: "Wishlist",
    achievements: "Achievements",
    netWorth: "Net Worth",
    settings: "Settings",
    income: "Income",
    expense: "Expense",
    saving: "Saving",
    available: "Available",
    total: "Total",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    close: "Close",
    today: "Today",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    daily: "Daily",
    all: "All",
    active: "Active",
    completed: "Completed",
    locked: "Locked",
    unlocked: "Unlocked",
    startChallenge: "Start Challenge",
    quitChallenge: "Quit Challenge",
    achievementUnlocked: "Achievement Unlocked!",
    notifications: "Notifications",
    language: "Language",
    general: "General",
    data: "Data",
    export: "Export",
    import: "Import",
    reset: "Reset",
    enable: "Enable",
    disable: "Disable",
    // Add more as needed
  },
  pl: {
    dashboard: "Panel główny",
    goals: "Cele oszczędnościowe",
    transactions: "Transakcje",
    analytics: "Analityka",
    calendar: "Kalendarz",
    wallets: "Portfele",
    recurring: "Cykliczne",
    challenges: "Wyzwania",
    wishlist: "Lista życzeń",
    achievements: "Osiągnięcia",
    netWorth: "Wartość netto",
    settings: "Ustawienia",
    income: "Przychód",
    expense: "Wydatek",
    saving: "Oszczędność",
    available: "Dostępne",
    total: "Suma",
    save: "Zapisz",
    cancel: "Anuluj",
    delete: "Usuń",
    edit: "Edytuj",
    add: "Dodaj",
    close: "Zamknij",
    today: "Dziś",
    weekly: "Tygodniowo",
    monthly: "Miesięcznie",
    yearly: "Rocznie",
    daily: "Dziennie",
    all: "Wszystkie",
    active: "Aktywne",
    completed: "Ukończone",
    locked: "Zablokowane",
    unlocked: "Odblokowane",
    startChallenge: "Rozpocznij wyzwanie",
    quitChallenge: "Przerwij wyzwanie",
    achievementUnlocked: "Odblokowano osiągnięcie!",
    notifications: "Powiadomienia",
    language: "Język",
    general: "Ogólne",
    data: "Dane",
    export: "Eksportuj",
    import: "Importuj",
    reset: "Resetuj",
    enable: "Włącz",
    disable: "Wyłącz",
  },
  de: {
    dashboard: "Dashboard",
    goals: "Sparziele",
    transactions: "Transaktionen",
    analytics: "Analytik",
    calendar: "Kalender",
    wallets: "Geldbörsen",
    recurring: "Wiederkehrend",
    challenges: "Herausforderungen",
    wishlist: "Wunschliste",
    achievements: "Erfolge",
    netWorth: "Nettovermögen",
    settings: "Einstellungen",
    income: "Einkommen",
    expense: "Ausgabe",
    saving: "Sparen",
    available: "Verfügbar",
    total: "Gesamt",
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    add: "Hinzufügen",
    close: "Schließen",
    today: "Heute",
  },
  es: {
    dashboard: "Panel",
    goals: "Metas de ahorro",
    transactions: "Transacciones",
    analytics: "Analítica",
    calendar: "Calendario",
    wallets: "Carteras",
    recurring: "Recurrente",
    challenges: "Desafíos",
    wishlist: "Lista de deseos",
    achievements: "Logros",
    netWorth: "Patrimonio neto",
    settings: "Configuración",
    income: "Ingreso",
    expense: "Gasto",
    saving: "Ahorro",
    available: "Disponible",
    total: "Total",
    save: "Guardar",
    cancel: "Cancelar",
  },
  fr: {
    dashboard: "Tableau de bord",
    goals: "Objectifs d'épargne",
    transactions: "Transactions",
    analytics: "Analytique",
    calendar: "Calendrier",
    wallets: "Portefeuilles",
    recurring: "Récurrent",
    challenges: "Défis",
    wishlist: "Liste de souhaits",
    achievements: "Succès",
    netWorth: "Valeur nette",
    settings: "Paramètres",
    income: "Revenu",
    expense: "Dépense",
    saving: "Épargne",
  },
  // Add more languages as needed
};

// Achievements configuration
const ACHIEVEMENTS_CONFIG = [
  // Savings milestones
  {
    id: "first_save",
    name: "First Steps",
    desc: "Make your first savings deposit",
    icon: "🌱",
    xp: 50,
    condition: (data) => data.stats.totalSavedAllTime > 0,
  },
  {
    id: "save_100",
    name: "Century Saver",
    desc: "Save a total of 100",
    icon: "💯",
    xp: 100,
    condition: (data) => data.stats.totalSavedAllTime >= 100,
  },
  {
    id: "save_500",
    name: "Half Grand",
    desc: "Save a total of 500",
    icon: "🎖️",
    xp: 200,
    condition: (data) => data.stats.totalSavedAllTime >= 500,
  },
  {
    id: "save_1000",
    name: "Grand Saver",
    desc: "Save a total of 1,000",
    icon: "🏆",
    xp: 500,
    condition: (data) => data.stats.totalSavedAllTime >= 1000,
  },
  {
    id: "save_5000",
    name: "Super Saver",
    desc: "Save a total of 5,000",
    icon: "💎",
    xp: 1000,
    condition: (data) => data.stats.totalSavedAllTime >= 5000,
  },
  {
    id: "save_10000",
    name: "Legendary Saver",
    desc: "Save a total of 10,000",
    icon: "👑",
    xp: 2000,
    condition: (data) => data.stats.totalSavedAllTime >= 10000,
  },

  // Streak achievements
  {
    id: "streak_3",
    name: "On a Roll",
    desc: "Save for 3 days in a row",
    icon: "🔥",
    xp: 75,
    condition: (data) => data.stats.streak >= 3,
  },
  {
    id: "streak_7",
    name: "Week Warrior",
    desc: "Save for 7 days in a row",
    icon: "⚡",
    xp: 150,
    condition: (data) => data.stats.streak >= 7,
  },
  {
    id: "streak_14",
    name: "Fortnight Fighter",
    desc: "Save for 14 days in a row",
    icon: "💪",
    xp: 300,
    condition: (data) => data.stats.streak >= 14,
  },
  {
    id: "streak_30",
    name: "Monthly Master",
    desc: "Save for 30 days in a row",
    icon: "🌟",
    xp: 500,
    condition: (data) => data.stats.streak >= 30,
  },
  {
    id: "streak_100",
    name: "Century Streak",
    desc: "Save for 100 days in a row",
    icon: "🎯",
    xp: 2000,
    condition: (data) => data.stats.streak >= 100,
  },

  // Goals achievements
  {
    id: "first_goal",
    name: "Goal Setter",
    desc: "Create your first savings goal",
    icon: "🎯",
    xp: 50,
    condition: (data) => data.goals.length >= 1,
  },
  {
    id: "goal_complete",
    name: "Goal Getter",
    desc: "Complete a savings goal",
    icon: "✅",
    xp: 200,
    condition: (data) => data.goals.some((g) => g.current >= g.target),
  },
  {
    id: "goals_3",
    name: "Triple Threat",
    desc: "Have 3 active goals",
    icon: "🎪",
    xp: 100,
    condition: (data) => data.goals.length >= 3,
  },
  {
    id: "goals_5_complete",
    name: "High Achiever",
    desc: "Complete 5 goals",
    icon: "🏅",
    xp: 500,
    condition: (data) =>
      data.goals.filter((g) => g.current >= g.target).length >= 5,
  },

  // Transaction achievements
  {
    id: "transactions_10",
    name: "Getting Started",
    desc: "Record 10 transactions",
    icon: "📝",
    xp: 50,
    condition: (data) => data.transactions.length >= 10,
  },
  {
    id: "transactions_50",
    name: "Tracker",
    desc: "Record 50 transactions",
    icon: "📊",
    xp: 150,
    condition: (data) => data.transactions.length >= 50,
  },
  {
    id: "transactions_100",
    name: "Meticulous",
    desc: "Record 100 transactions",
    icon: "🔍",
    xp: 300,
    condition: (data) => data.transactions.length >= 100,
  },
  {
    id: "transactions_500",
    name: "Data Master",
    desc: "Record 500 transactions",
    icon: "📈",
    xp: 750,
    condition: (data) => data.transactions.length >= 500,
  },

  // Challenges
  {
    id: "first_challenge",
    name: "Challenger",
    desc: "Complete your first challenge",
    icon: "🏋️",
    xp: 200,
    condition: (data) => (data.completedChallenges || []).length >= 1,
  },
  {
    id: "challenges_3",
    name: "Challenge Champion",
    desc: "Complete 3 challenges",
    icon: "🎖️",
    xp: 500,
    condition: (data) => (data.completedChallenges || []).length >= 3,
  },

  // Wallets
  {
    id: "multi_wallet",
    name: "Diversified",
    desc: "Create 3 different wallets",
    icon: "👛",
    xp: 100,
    condition: (data) => (data.wallets || []).length >= 3,
  },

  // Wishlist
  {
    id: "wishlist_buy",
    name: "Dream Buyer",
    desc: "Buy an item from your wishlist",
    icon: "🎁",
    xp: 150,
    condition: (data) => (data.purchasedWishlistItems || 0) >= 1,
  },

  // Net Worth
  {
    id: "positive_networth",
    name: "In the Black",
    desc: "Achieve positive net worth",
    icon: "📊",
    xp: 100,
    condition: (data) => calculateNetWorth(data) > 0,
  },
  {
    id: "networth_10000",
    name: "Five Figures",
    desc: "Reach 10,000 net worth",
    icon: "💰",
    xp: 1000,
    condition: (data) => calculateNetWorth(data) >= 10000,
  },

  // Special
  {
    id: "early_bird",
    name: "Early Bird",
    desc: "Add a transaction before 7 AM",
    icon: "🌅",
    xp: 75,
    condition: (data) => data.earlyBirdTransaction || false,
  },
  {
    id: "night_owl",
    name: "Night Owl",
    desc: "Add a transaction after 11 PM",
    icon: "🦉",
    xp: 75,
    condition: (data) => data.nightOwlTransaction || false,
  },
  {
    id: "weekend_saver",
    name: "Weekend Warrior",
    desc: "Save on both Saturday and Sunday",
    icon: "📅",
    xp: 100,
    condition: (data) => data.weekendSaver || false,
  },
];

// Challenges configuration
const CHALLENGES_CONFIG = [
  {
    id: "52_week",
    name: "52-Week Challenge",
    description:
      "Save $1 in week 1, $2 in week 2, and so on for 52 weeks. Total savings: $1,378!",
    icon: "📅",
    duration: 52,
    durationType: "weeks",
    type: "progressive",
    baseAmount: 1,
    increment: 1,
    totalTarget: 1378,
    difficulty: "medium",
  },
  {
    id: "no_spend_week",
    name: "No-Spend Week",
    description:
      "Go an entire week without any non-essential spending. Emergency expenses don't count!",
    icon: "🚫",
    duration: 7,
    durationType: "days",
    type: "no_spend",
    difficulty: "hard",
  },
  {
    id: "daily_saver",
    name: "30-Day Daily Saver",
    description: "Save any amount every single day for 30 days straight.",
    icon: "💪",
    duration: 30,
    durationType: "days",
    type: "daily_save",
    difficulty: "medium",
  },
  {
    id: "spare_change",
    name: "Spare Change Challenge",
    description: "Round up all purchases and save the difference for 30 days.",
    icon: "🪙",
    duration: 30,
    durationType: "days",
    type: "round_up",
    difficulty: "easy",
  },
  {
    id: "no_eating_out",
    name: "No Eating Out",
    description: "Avoid restaurants and takeout for 2 weeks. Cook at home!",
    icon: "🍳",
    duration: 14,
    durationType: "days",
    type: "category_restrict",
    restrictCategory: "food",
    difficulty: "medium",
  },
  {
    id: "savings_sprint",
    name: "Savings Sprint",
    description: "Save 20% of your income for an entire month.",
    icon: "🏃",
    duration: 30,
    durationType: "days",
    type: "percentage",
    targetPercentage: 20,
    difficulty: "hard",
  },
  {
    id: "penny_challenge",
    name: "365-Day Penny Challenge",
    description:
      "Save $0.01 on day 1, $0.02 on day 2... By day 365, you'll have $667.95!",
    icon: "💵",
    duration: 365,
    durationType: "days",
    type: "progressive",
    baseAmount: 0.01,
    increment: 0.01,
    totalTarget: 667.95,
    difficulty: "easy",
  },
  {
    id: "minimalist_month",
    name: "Minimalist Month",
    description:
      "Only spend on absolute necessities for 30 days. No wants, only needs!",
    icon: "🧘",
    duration: 30,
    durationType: "days",
    type: "minimalist",
    difficulty: "extreme",
  },
  {
    id: "coffee_break",
    name: "Coffee Break Challenge",
    description:
      "Skip your daily coffee purchase for 30 days and save the money instead.",
    icon: "☕",
    duration: 30,
    durationType: "days",
    type: "skip_purchase",
    estimatedSavings: 150,
    difficulty: "easy",
  },
  {
    id: "double_up",
    name: "Double Up Week",
    description: "Save twice your usual daily amount for one week.",
    icon: "✌️",
    duration: 7,
    durationType: "days",
    type: "double",
    difficulty: "medium",
  },
];

// Saver levels
const SAVER_LEVELS = [
  { level: 1, name: "Beginner Saver", icon: "🌱", minXP: 0, maxXP: 100 },
  { level: 2, name: "Casual Saver", icon: "🌿", minXP: 100, maxXP: 300 },
  { level: 3, name: "Regular Saver", icon: "🌳", minXP: 300, maxXP: 600 },
  { level: 4, name: "Dedicated Saver", icon: "💰", minXP: 600, maxXP: 1000 },
  { level: 5, name: "Expert Saver", icon: "💎", minXP: 1000, maxXP: 1500 },
  { level: 6, name: "Master Saver", icon: "🏆", minXP: 1500, maxXP: 2500 },
  { level: 7, name: "Elite Saver", icon: "👑", minXP: 2500, maxXP: 4000 },
  { level: 8, name: "Legendary Saver", icon: "⭐", minXP: 4000, maxXP: 6000 },
  { level: 9, name: "Mythical Saver", icon: "🌟", minXP: 6000, maxXP: 10000 },
  { level: 10, name: "Savings God", icon: "🔱", minXP: 10000, maxXP: Infinity },
];

// Features data structure
let featuresData = {
  wallets: [
    {
      id: "main",
      name: "Main Wallet",
      balance: 0,
      color: "#8b5cf6",
      emoji: "💰",
      isDefault: true,
    },
  ],
  recurring: [],
  wishlist: [],
  challenges: {
    active: [],
    completed: [],
  },
  achievements: {
    unlocked: [],
    xp: 0,
  },
  networth: {
    assets: [],
    liabilities: [],
  },
  tags: [],
  settings: {
    language: "en",
    notifications: {
      enabled: false,
      dailyReminder: true,
      goalProgress: true,
      billReminders: true,
      achievements: true,
      weeklySummary: false,
      reminderTime: "20:00",
    },
    weekStartsOn: 1,
    dateFormat: "MM/DD/YYYY",
  },
  calendar: {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
  },
};

// ==================== INITIALIZATION ====================
function initFeatures() {
  loadFeaturesData();
  applyLanguage(featuresData.settings.language);
  initCalendar();
  initNotifications();
  processRecurringTransactions();
  checkAchievements();
  updateAllFeaturesBadges();
}

function loadFeaturesData() {
  const saved = localStorage.getItem("saveai_features_data");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      featuresData = { ...featuresData, ...parsed };
    } catch (e) {
      console.error("Error loading features data:", e);
    }
  }
}

function saveFeaturesData() {
  try {
    localStorage.setItem("saveai_features_data", JSON.stringify(featuresData));
  } catch (e) {
    console.error("Error saving features data:", e);
  }
}

function updateAllFeaturesBadges() {
  // Update wallets count
  const walletsCount = document.getElementById("walletsCount");
  if (walletsCount) {
    walletsCount.textContent = featuresData.wallets.length;
  }

  // Update recurring count
  const recurringCount = document.getElementById("recurringCount");
  if (recurringCount) {
    recurringCount.textContent = featuresData.recurring.length;
  }

  // Update wishlist count
  const wishlistCount = document.getElementById("wishlistCount");
  if (wishlistCount) {
    wishlistCount.textContent = featuresData.wishlist.length;
  }

  // Update achievements badge (show if new achievements available)
  const achievementsNew = document.getElementById("achievementsNew");
  if (achievementsNew) {
    const newAchievements = checkForNewAchievements();
    if (newAchievements > 0) {
      achievementsNew.style.display = "flex";
      achievementsNew.textContent = newAchievements;
    } else {
      achievementsNew.style.display = "none";
    }
  }
}

// ==================== LANGUAGE / i18n ====================
function applyLanguage(lang) {
  const translations = TRANSLATIONS[lang] || TRANSLATIONS.en;
  featuresData.settings.language = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  // Update language selector
  document.querySelectorAll(".language-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  saveFeaturesData();
}

function setLanguage(lang) {
  applyLanguage(lang);
  showToast(
    "success",
    "Language Changed",
    `Language set to ${lang.toUpperCase()}`
  );
}

function t(key) {
  const lang = featuresData.settings.language || "en";
  const translations = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return translations[key] || key;
}

// ==================== CALENDAR ====================
// ==================== IMPROVED CALENDAR WITH BILLS ====================

// Calendar events data structure
let calendarEvents = [];

function initCalendar() {
  const now = new Date();
  featuresData.calendar = featuresData.calendar || {};
  featuresData.calendar.currentMonth = now.getMonth();
  featuresData.calendar.currentYear = now.getFullYear();
  featuresData.calendar.events = featuresData.calendar.events || [];
  calendarEvents = featuresData.calendar.events;
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  const { currentMonth, currentYear } = featuresData.calendar;
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startingDay = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Update month/year display
  const monthYearEl = document.getElementById("calendarMonthYear");
  if (monthYearEl) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  }

  // Day headers
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let html = dayNames
    .map((day) => `<div class="calendar-header-cell">${day}</div>`)
    .join("");

  // Previous month days
  const prevMonth = new Date(currentYear, currentMonth, 0);
  const prevMonthDays = prevMonth.getDate();
  for (let i = startingDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const date = new Date(currentYear, currentMonth - 1, day);
    html += createCalendarDayHTML(date, true);
  }

  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.getTime() === today.getTime();
    html += createCalendarDayHTML(date, false, isToday);
  }

  // Next month days
  const remainingCells = 42 - (startingDay + totalDays);
  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    html += createCalendarDayHTML(date, true);
  }

  grid.innerHTML = html;
}

function createCalendarDayHTML(date, isOtherMonth, isToday = false) {
  const dateStr = formatDateKey(date);
  const dayNum = date.getDate();

  // Get all events for this day
  const transactions = getTransactionsForDate(date);
  const bills = getBillsForDate(date);
  const recurring = getRecurringForDate(date);
  const events = getEventsForDate(date);

  const hasIncome = transactions.income > 0;
  const hasSaving = transactions.saving > 0;
  const hasExpense = transactions.expense > 0;
  const hasBills = bills.length > 0;
  const hasRecurring = recurring.length > 0;
  const hasEvents = events.length > 0;

  const isPast = date < new Date().setHours(0, 0, 0, 0);
  const hasUnpaidBills = bills.some((b) => !b.paid && isPast);

  let dotsHtml = '<div class="calendar-day-dots">';
  if (hasIncome)
    dotsHtml += '<span class="calendar-dot income" title="Income"></span>';
  if (hasSaving)
    dotsHtml += '<span class="calendar-dot saving" title="Savings"></span>';
  if (hasExpense)
    dotsHtml += '<span class="calendar-dot expense" title="Expense"></span>';
  if (hasBills)
    dotsHtml += `<span class="calendar-dot bill ${
      hasUnpaidBills ? "overdue" : ""
    }" title="Bill"></span>`;
  if (hasRecurring)
    dotsHtml +=
      '<span class="calendar-dot recurring" title="Recurring"></span>';
  if (hasEvents)
    dotsHtml += '<span class="calendar-dot event" title="Event"></span>';
  dotsHtml += "</div>";

  // Show mini preview of events
  let previewHtml = '<div class="calendar-day-preview">';

  // Show up to 2 items
  let itemCount = 0;

  bills.forEach((bill) => {
    if (itemCount < 2) {
      previewHtml += `<div class="calendar-preview-item bill ${
        bill.paid ? "paid" : ""
      }">${bill.emoji || "📄"} ${truncate(bill.name, 10)}</div>`;
      itemCount++;
    }
  });

  events.forEach((event) => {
    if (itemCount < 2) {
      previewHtml += `<div class="calendar-preview-item event">${
        event.emoji || "📌"
      } ${truncate(event.name, 10)}</div>`;
      itemCount++;
    }
  });

  recurring.forEach((r) => {
    if (itemCount < 2) {
      const icon =
        r.type === "income" ? "💵" : r.type === "saving" ? "🐷" : "💸";
      previewHtml += `<div class="calendar-preview-item recurring">${icon} ${truncate(
        r.name,
        10
      )}</div>`;
      itemCount++;
    }
  });

  // Show total if there are transactions
  const total = transactions.income - transactions.expense;
  if (total !== 0 && itemCount < 2) {
    const sign = total > 0 ? "+" : "";
    const colorClass = total > 0 ? "positive" : "negative";
    previewHtml += `<div class="calendar-preview-item amount ${colorClass}">${sign}${formatCurrency(
      total
    )}</div>`;
  }

  previewHtml += "</div>";

  // Show "more" indicator
  const totalItems =
    bills.length +
    events.length +
    recurring.length +
    (transactions.income || transactions.expense || transactions.saving
      ? 1
      : 0);
  const moreHtml =
    totalItems > 2
      ? `<div class="calendar-more">+${totalItems - 2} more</div>`
      : "";

  return `
    <div class="calendar-day ${isOtherMonth ? "other-month" : ""} ${
    isToday ? "today" : ""
  } ${hasUnpaidBills ? "has-overdue" : ""}" 
         data-date="${dateStr}" 
         onclick="openDayModal('${dateStr}')"
         ondragover="handleDragOver(event)"
         ondrop="handleDrop(event, '${dateStr}')">
      <div class="calendar-day-header">
        <span class="calendar-day-number">${dayNum}</span>
        ${dotsHtml}
      </div>
      ${previewHtml}
      ${moreHtml}
    </div>
  `;
}

function truncate(str, length) {
  if (!str) return "";
  return str.length > length ? str.substring(0, length) + "..." : str;
}

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDateKey(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function changeCalendarMonth(delta) {
  featuresData.calendar.currentMonth += delta;

  if (featuresData.calendar.currentMonth > 11) {
    featuresData.calendar.currentMonth = 0;
    featuresData.calendar.currentYear++;
  } else if (featuresData.calendar.currentMonth < 0) {
    featuresData.calendar.currentMonth = 11;
    featuresData.calendar.currentYear--;
  }

  saveFeaturesData();
  renderCalendar();
}

function goToToday() {
  const now = new Date();
  featuresData.calendar.currentMonth = now.getMonth();
  featuresData.calendar.currentYear = now.getFullYear();
  saveFeaturesData();
  renderCalendar();
}

// ==================== BILLS ====================
function getBillsForDate(date) {
  const dateStr = formatDateKey(date);
  return (featuresData.bills || []).filter((bill) => {
    if (bill.dueDate === dateStr) return true;

    // Check recurring bills
    if (bill.recurring) {
      return isRecurringOnDate(bill, date);
    }

    return false;
  });
}

function isRecurringOnDate(bill, date) {
  const dueDate = parseDateKey(bill.dueDate);

  switch (bill.frequency) {
    case "weekly":
      return date.getDay() === dueDate.getDay();
    case "monthly":
      return date.getDate() === dueDate.getDate();
    case "yearly":
      return (
        date.getDate() === dueDate.getDate() &&
        date.getMonth() === dueDate.getMonth()
      );
    default:
      return false;
  }
}

// ==================== CALENDAR EVENTS ====================
function getEventsForDate(date) {
  const dateStr = formatDateKey(date);
  return (featuresData.calendar.events || []).filter((e) => e.date === dateStr);
}

function getTransactionsForDate(date) {
  const dateStr = date.toDateString();
  const result = { income: 0, saving: 0, expense: 0 };

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    if (tDate.toDateString() === dateStr) {
      result[t.type] = (result[t.type] || 0) + t.amount;
    }
  });

  return result;
}

function getRecurringForDate(date) {
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();

  return featuresData.recurring.filter((r) => {
    if (!r.active) return false;

    const startDate = new Date(r.startDate);
    if (date < startDate) return false;

    if (r.endDate && date > new Date(r.endDate)) return false;

    switch (r.frequency) {
      case "daily":
        return true;
      case "weekly":
        return startDate.getDay() === dayOfWeek;
      case "biweekly":
        const weeksDiff = Math.floor(
          (date - startDate) / (7 * 24 * 60 * 60 * 1000)
        );
        return startDate.getDay() === dayOfWeek && weeksDiff % 2 === 0;
      case "monthly":
        return startDate.getDate() === dayOfMonth;
      case "yearly":
        return (
          startDate.getDate() === dayOfMonth &&
          startDate.getMonth() === date.getMonth()
        );
      default:
        return false;
    }
  });
}

// ==================== DAY MODAL ====================
function openDayModal(dateStr) {
  const modal = document.getElementById("dayModal");
  if (!modal) {
    createDayModal();
  }

  const date = parseDateKey(dateStr);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  document.getElementById("dayModalTitle").textContent = formattedDate;
  document.getElementById("dayModalDate").value = dateStr;

  renderDayModalContent(dateStr);

  document.getElementById("dayModal").classList.add("active");
}

function closeDayModal() {
  const modal = document.getElementById("dayModal");
  if (modal) modal.classList.remove("active");
}

function createDayModal() {
  const modalHTML = `
    <div class="modal-overlay" id="dayModal">
      <div class="modal modal-lg">
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="modal-title-icon">📅</span>
            <span id="dayModalTitle">Select Date</span>
          </h2>
          <button class="modal-close" onclick="closeDayModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <input type="hidden" id="dayModalDate">
        
        <div class="day-modal-tabs">
          <button class="day-modal-tab active" onclick="switchDayTab('overview')">Overview</button>
          <button class="day-modal-tab" onclick="switchDayTab('bills')">Bills</button>
          <button class="day-modal-tab" onclick="switchDayTab('transactions')">Transactions</button>
          <button class="day-modal-tab" onclick="switchDayTab('events')">Events</button>
        </div>
        
        <div class="day-modal-content" id="dayModalContent">
          <!-- Content rendered here -->
        </div>
        
        <div class="day-modal-actions">
          <button class="btn btn-secondary" onclick="closeDayModal()">Close</button>
          <div class="day-modal-quick-actions">
            <button class="btn btn-success" onclick="quickAddBill()">
              <i class="fas fa-file-invoice-dollar"></i> Add Bill
            </button>
            <button class="btn btn-primary" onclick="quickAddEvent()">
              <i class="fas fa-calendar-plus"></i> Add Event
            </button>
            <button class="btn btn-info" onclick="quickAddTransaction()">
              <i class="fas fa-exchange-alt"></i> Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function switchDayTab(tab) {
  document
    .querySelectorAll(".day-modal-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelector(`.day-modal-tab[onclick*="${tab}"]`)
    .classList.add("active");

  const dateStr = document.getElementById("dayModalDate").value;
  renderDayModalContent(dateStr, tab);
}

function renderDayModalContent(dateStr, tab = "overview") {
  const content = document.getElementById("dayModalContent");
  if (!content) return;

  const date = parseDateKey(dateStr);
  const transactions = getTransactionsForDateDetails(date);
  const bills = getBillsForDate(date);
  const recurring = getRecurringForDate(date);
  const events = getEventsForDate(date);

  let html = "";

  switch (tab) {
    case "overview":
      html = renderDayOverview(date, transactions, bills, recurring, events);
      break;
    case "bills":
      html = renderDayBills(dateStr, bills);
      break;
    case "transactions":
      html = renderDayTransactions(transactions, recurring);
      break;
    case "events":
      html = renderDayEvents(dateStr, events);
      break;
  }

  content.innerHTML = html;
}

function getTransactionsForDateDetails(date) {
  const dateStr = date.toDateString();
  return appData.transactions.filter((t) => {
    const tDate = new Date(t.date);
    return tDate.toDateString() === dateStr;
  });
}

function renderDayOverview(date, transactions, bills, recurring, events) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = date < today;
  const isToday = date.getTime() === today.getTime();
  const isFuture = date > today;

  let totalIncome = 0;
  let totalExpense = 0;
  let totalSaving = 0;

  transactions.forEach((t) => {
    if (t.type === "income") totalIncome += t.amount;
    else if (t.type === "expense") totalExpense += t.amount;
    else if (t.type === "saving") totalSaving += t.amount;
  });

  const net = totalIncome - totalExpense;

  let html = '<div class="day-overview">';

  // Summary cards
  html += `
    <div class="day-summary-cards">
      <div class="day-summary-card income">
        <div class="day-summary-icon"><i class="fas fa-arrow-down"></i></div>
        <div class="day-summary-info">
          <div class="day-summary-value">${formatCurrency(totalIncome)}</div>
          <div class="day-summary-label">Income</div>
        </div>
      </div>
      <div class="day-summary-card expense">
        <div class="day-summary-icon"><i class="fas fa-arrow-up"></i></div>
        <div class="day-summary-info">
          <div class="day-summary-value">${formatCurrency(totalExpense)}</div>
          <div class="day-summary-label">Expenses</div>
        </div>
      </div>
      <div class="day-summary-card saving">
        <div class="day-summary-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="day-summary-info">
          <div class="day-summary-value">${formatCurrency(totalSaving)}</div>
          <div class="day-summary-label">Saved</div>
        </div>
      </div>
      <div class="day-summary-card net ${net >= 0 ? "positive" : "negative"}">
        <div class="day-summary-icon"><i class="fas fa-balance-scale"></i></div>
        <div class="day-summary-info">
          <div class="day-summary-value">${net >= 0 ? "+" : ""}${formatCurrency(
    net
  )}</div>
          <div class="day-summary-label">Net</div>
        </div>
      </div>
    </div>
  `;

  // Upcoming bills
  if (bills.length > 0) {
    html += `
      <div class="day-section">
        <h4><i class="fas fa-file-invoice-dollar"></i> Bills Due</h4>
        <div class="day-items-list">
    `;

    bills.forEach((bill, index) => {
      const statusClass = bill.paid ? "paid" : isPast ? "overdue" : "pending";
      const statusText = bill.paid ? "Paid" : isPast ? "Overdue" : "Pending";

      html += `
        <div class="day-item bill ${statusClass}">
          <div class="day-item-icon">${bill.emoji || "📄"}</div>
          <div class="day-item-info">
            <div class="day-item-name">${bill.name}</div>
            <div class="day-item-meta">${bill.category || "Bill"}</div>
          </div>
          <div class="day-item-amount">${formatCurrency(bill.amount)}</div>
          <div class="day-item-status ${statusClass}">${statusText}</div>
          ${
            !bill.paid
              ? `
            <button class="btn btn-sm btn-success" onclick="markBillPaid(${bill.id})">
              <i class="fas fa-check"></i> Pay
            </button>
          `
              : ""
          }
        </div>
      `;
    });

    html += "</div></div>";
  }

  // Recurring transactions
  if (recurring.length > 0) {
    html += `
      <div class="day-section">
        <h4><i class="fas fa-sync-alt"></i> Scheduled</h4>
        <div class="day-items-list">
    `;

    recurring.forEach((r) => {
      const icon =
        r.type === "income"
          ? "arrow-down"
          : r.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const colorClass = r.type;

      html += `
        <div class="day-item recurring ${colorClass}">
          <div class="day-item-icon ${colorClass}"><i class="fas fa-${icon}"></i></div>
          <div class="day-item-info">
            <div class="day-item-name">${r.name}</div>
            <div class="day-item-meta">${r.frequency} • ${r.category}</div>
          </div>
          <div class="day-item-amount ${colorClass}">${
        r.type === "expense" ? "-" : "+"
      }${formatCurrency(r.amount)}</div>
        </div>
      `;
    });

    html += "</div></div>";
  }

  // Events
  if (events.length > 0) {
    html += `
      <div class="day-section">
        <h4><i class="fas fa-calendar-check"></i> Events</h4>
        <div class="day-items-list">
    `;

    events.forEach((event) => {
      html += `
        <div class="day-item event">
          <div class="day-item-icon">${event.emoji || "📌"}</div>
          <div class="day-item-info">
            <div class="day-item-name">${event.name}</div>
            <div class="day-item-meta">${event.description || ""}</div>
          </div>
          ${
            event.amount
              ? `<div class="day-item-amount">${formatCurrency(
                  event.amount
                )}</div>`
              : ""
          }
          <button class="btn btn-sm btn-secondary" onclick="deleteEvent(${
            event.id
          })">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    });

    html += "</div></div>";
  }

  // Transactions
  if (transactions.length > 0) {
    html += `
      <div class="day-section">
        <h4><i class="fas fa-exchange-alt"></i> Transactions</h4>
        <div class="day-items-list">
    `;

    transactions.forEach((t) => {
      const icon =
        t.type === "income"
          ? "arrow-down"
          : t.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const colorClass = t.type;
      const time = new Date(t.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      html += `
        <div class="day-item transaction ${colorClass}">
          <div class="day-item-icon ${colorClass}"><i class="fas fa-${icon}"></i></div>
          <div class="day-item-info">
            <div class="day-item-name">${t.description || t.type}</div>
            <div class="day-item-meta">${time} • ${
        t.category || "General"
      }</div>
          </div>
          <div class="day-item-amount ${colorClass}">${
        t.type === "expense" ? "-" : "+"
      }${formatCurrency(t.amount)}</div>
        </div>
      `;
    });

    html += "</div></div>";
  }

  // Empty state
  if (
    bills.length === 0 &&
    recurring.length === 0 &&
    events.length === 0 &&
    transactions.length === 0
  ) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">${
          isToday ? "📅" : isFuture ? "🔮" : "📋"
        }</div>
        <div class="empty-state-title">${
          isToday
            ? "Nothing planned for today"
            : isFuture
            ? "Nothing scheduled yet"
            : "No activity on this day"
        }</div>
        <div class="empty-state-text">${
          isFuture
            ? "Add bills, events, or recurring transactions"
            : "Use the buttons below to add items"
        }</div>
      </div>
    `;
  }

  html += "</div>";
  return html;
}

function renderDayBills(dateStr, bills) {
  let html = '<div class="day-bills">';

  html += `
    <div class="day-section-header">
      <h4>Bills Due on This Day</h4>
      <button class="btn btn-sm btn-primary" onclick="openBillModal('${dateStr}')">
        <i class="fas fa-plus"></i> Add Bill
      </button>
    </div>
  `;

  if (bills.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">📄</div>
        <div class="empty-state-title">No bills due</div>
        <div class="empty-state-text">Add a bill reminder for this date</div>
      </div>
    `;
  } else {
    html += '<div class="bills-list">';

    bills.forEach((bill) => {
      const isPast = parseDateKey(dateStr) < new Date().setHours(0, 0, 0, 0);
      const statusClass = bill.paid ? "paid" : isPast ? "overdue" : "pending";

      html += `
        <div class="bill-card ${statusClass}">
          <div class="bill-header">
            <span class="bill-emoji">${bill.emoji || "📄"}</span>
            <div class="bill-info">
              <div class="bill-name">${bill.name}</div>
              <div class="bill-category">${
                bill.category || "Uncategorized"
              }</div>
            </div>
            <div class="bill-amount">${formatCurrency(bill.amount)}</div>
          </div>
          <div class="bill-footer">
            <div class="bill-status ${statusClass}">
              <i class="fas fa-${
                bill.paid
                  ? "check-circle"
                  : isPast
                  ? "exclamation-circle"
                  : "clock"
              }"></i>
              ${bill.paid ? "Paid" : isPast ? "Overdue" : "Pending"}
            </div>
            <div class="bill-actions">
              ${
                !bill.paid
                  ? `
                <button class="btn btn-sm btn-success" onclick="markBillPaid(${bill.id})">
                  <i class="fas fa-check"></i> Mark Paid
                </button>
              `
                  : `
                <button class="btn btn-sm btn-secondary" onclick="markBillUnpaid(${bill.id})">
                  <i class="fas fa-undo"></i> Unmark
                </button>
              `
              }
              <button class="btn btn-sm btn-secondary" onclick="editBill(${
                bill.id
              })">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteBill(${
                bill.id
              })">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          ${
            bill.recurring
              ? `
            <div class="bill-recurring">
              <i class="fas fa-sync-alt"></i> Repeats ${bill.frequency}
            </div>
          `
              : ""
          }
          ${bill.notes ? `<div class="bill-notes">${bill.notes}</div>` : ""}
        </div>
      `;
    });

    html += "</div>";
  }

  html += "</div>";
  return html;
}

function renderDayTransactions(transactions, recurring) {
  let html = '<div class="day-transactions">';

  if (recurring.length > 0) {
    html += `
      <div class="day-section">
        <h4><i class="fas fa-sync-alt"></i> Scheduled for This Day</h4>
        <div class="day-items-list">
    `;

    recurring.forEach((r) => {
      const icon =
        r.type === "income"
          ? "arrow-down"
          : r.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const colorClass = r.type;

      html += `
        <div class="transaction-item">
          <div class="transaction-icon ${colorClass}">
            <i class="fas fa-${icon}"></i>
          </div>
          <div class="transaction-details">
            <div class="transaction-name">${
              r.name
            } <span class="transaction-original">(Recurring)</span></div>
            <div class="transaction-meta">
              <span>${r.frequency}</span>
              <span>•</span>
              <span>${r.category}</span>
            </div>
          </div>
          <div class="transaction-amount ${
            colorClass === "expense" ? "negative" : "positive"
          }">
            ${r.type === "expense" ? "-" : "+"}${formatCurrency(r.amount)}
          </div>
        </div>
      `;
    });

    html += "</div></div>";
  }

  html += `
    <div class="day-section">
      <h4><i class="fas fa-exchange-alt"></i> Transactions</h4>
  `;

  if (transactions.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">💳</div>
        <div class="empty-state-title">No transactions</div>
        <div class="empty-state-text">No money moved on this day</div>
      </div>
    `;
  } else {
    html += '<div class="day-items-list">';

    transactions.forEach((t) => {
      const icon =
        t.type === "income"
          ? "arrow-down"
          : t.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const colorClass = t.type;
      const time = new Date(t.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      html += `
        <div class="transaction-item">
          <div class="transaction-icon ${colorClass}">
            <i class="fas fa-${icon}"></i>
          </div>
          <div class="transaction-details">
            <div class="transaction-name">${t.description || t.type}</div>
            <div class="transaction-meta">
              <span>${time}</span>
              <span>•</span>
              <span>${t.category || "General"}</span>
              ${
                t.tags && t.tags.length > 0
                  ? `<span>•</span><span>${t.tags.join(", ")}</span>`
                  : ""
              }
            </div>
          </div>
          <div class="transaction-amount ${
            colorClass === "expense" ? "negative" : "positive"
          }">
            ${t.type === "expense" ? "-" : "+"}${formatCurrency(t.amount)}
          </div>
        </div>
      `;
    });

    html += "</div>";
  }

  html += "</div></div>";
  return html;
}

function renderDayEvents(dateStr, events) {
  let html = '<div class="day-events">';

  html += `
    <div class="day-section-header">
      <h4>Events & Reminders</h4>
      <button class="btn btn-sm btn-primary" onclick="openEventModal('${dateStr}')">
        <i class="fas fa-plus"></i> Add Event
      </button>
    </div>
  `;

  if (events.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">📌</div>
        <div class="empty-state-title">No events</div>
        <div class="empty-state-text">Add a reminder or event for this date</div>
      </div>
    `;
  } else {
    html += '<div class="events-list">';

    events.forEach((event) => {
      html += `
        <div class="event-card">
          <div class="event-emoji">${event.emoji || "📌"}</div>
          <div class="event-info">
            <div class="event-name">${event.name}</div>
            ${
              event.description
                ? `<div class="event-desc">${event.description}</div>`
                : ""
            }
            ${
              event.amount
                ? `<div class="event-amount">${formatCurrency(
                    event.amount
                  )}</div>`
                : ""
            }
          </div>
          <div class="event-actions">
            <button class="btn btn-sm btn-secondary" onclick="editEvent(${
              event.id
            })">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteEvent(${
              event.id
            })">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });

    html += "</div>";
  }

  html += "</div>";
  return html;
}

// ==================== BILL MANAGEMENT ====================
function openBillModal(dateStr = null) {
  let modal = document.getElementById("billModal");
  if (!modal) {
    createBillModal();
    modal = document.getElementById("billModal");
  }

  // Reset form
  document.getElementById("billName").value = "";
  document.getElementById("billAmount").value = "";
  document.getElementById("billCategory").value = "utilities";
  document.getElementById("billDueDate").value =
    dateStr || new Date().toISOString().split("T")[0];
  document.getElementById("billRecurring").checked = false;
  document.getElementById("billFrequency").value = "monthly";
  document.getElementById("billNotes").value = "";
  document.getElementById("editBillId").value = "";
  document.getElementById("billFrequencyGroup").style.display = "none";

  // Reset emoji
  document
    .querySelectorAll("#billEmojiPicker .emoji-option")
    .forEach((e) => e.classList.remove("selected"));
  document
    .querySelector('#billEmojiPicker .emoji-option[data-emoji="📄"]')
    .classList.add("selected");

  setupEmojiPicker("billEmojiPicker");

  modal.classList.add("active");
}

function createBillModal() {
  const modalHTML = `
    <div class="modal-overlay" id="billModal">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="modal-title-icon">📄</span>
            <span id="billModalTitle">Add Bill</span>
          </h2>
          <button class="modal-close" onclick="closeBillModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="form-group">
          <label class="form-label">Bill Name</label>
          <input type="text" class="form-input" id="billName" placeholder="e.g., Electricity, Netflix, Rent">
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Amount</label>
            <input type="number" class="form-input" id="billAmount" placeholder="0" step="0.01">
          </div>
          <div class="form-group">
            <label class="form-label">Due Date</label>
            <input type="date" class="form-input" id="billDueDate">
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-input" id="billCategory">
            <option value="utilities">💡 Utilities</option>
            <option value="rent">🏠 Rent/Mortgage</option>
            <option value="insurance">🛡️ Insurance</option>
            <option value="subscriptions">📱 Subscriptions</option>
            <option value="phone">📞 Phone/Internet</option>
            <option value="loan">💳 Loan Payment</option>
            <option value="credit">💳 Credit Card</option>
            <option value="other">📦 Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Icon</label>
          <div class="emoji-picker" id="billEmojiPicker">
            <button class="emoji-option selected" data-emoji="📄">📄</button>
            <button class="emoji-option" data-emoji="💡">💡</button>
            <button class="emoji-option" data-emoji="🏠">🏠</button>
            <button class="emoji-option" data-emoji="📱">📱</button>
            <button class="emoji-option" data-emoji="📞">📞</button>
            <button class="emoji-option" data-emoji="💳">💳</button>
            <button class="emoji-option" data-emoji="🛡️">🛡️</button>
            <button class="emoji-option" data-emoji="🚗">🚗</button>
            <button class="emoji-option" data-emoji="🏥">🏥</button>
            <button class="emoji-option" data-emoji="🎬">🎬</button>
            <button class="emoji-option" data-emoji="🎵">🎵</button>
            <button class="emoji-option" data-emoji="☁️">☁️</button>
          </div>
        </div>
        
        <div class="form-group">
          <label class="toggle-option">
            <input type="checkbox" id="billRecurring" onchange="toggleBillRecurring()">
            <span class="toggle-slider"></span>
            <span class="toggle-label">Recurring Bill</span>
          </label>
        </div>
        
        <div class="form-group" id="billFrequencyGroup" style="display: none;">
          <label class="form-label">Frequency</label>
          <select class="form-input" id="billFrequency">
            <option value="weekly">Weekly</option>
            <option value="monthly" selected>Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Notes (Optional)</label>
          <textarea class="form-input form-textarea" id="billNotes" placeholder="Any additional notes..."></textarea>
        </div>
        
        <input type="hidden" id="editBillId" value="">
        
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="closeBillModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveBill()">
            <i class="fas fa-check"></i> Save Bill
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function closeBillModal() {
  const modal = document.getElementById("billModal");
  if (modal) modal.classList.remove("active");
}

function toggleBillRecurring() {
  const isRecurring = document.getElementById("billRecurring").checked;
  document.getElementById("billFrequencyGroup").style.display = isRecurring
    ? "block"
    : "none";
}

function saveBill() {
  const name = document.getElementById("billName").value.trim();
  const amount = parseFloat(document.getElementById("billAmount").value);
  const dueDate = document.getElementById("billDueDate").value;
  const category = document.getElementById("billCategory").value;
  const recurring = document.getElementById("billRecurring").checked;
  const frequency = document.getElementById("billFrequency").value;
  const notes = document.getElementById("billNotes").value.trim();
  const editId = document.getElementById("editBillId").value;

  const selectedEmoji = document.querySelector(
    "#billEmojiPicker .emoji-option.selected"
  );
  const emoji = selectedEmoji ? selectedEmoji.dataset.emoji : "📄";

  if (!name) {
    showToast("error", "Error", "Please enter a bill name");
    return;
  }

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  if (!dueDate) {
    showToast("error", "Error", "Please select a due date");
    return;
  }

  featuresData.bills = featuresData.bills || [];

  const billData = {
    id: editId ? parseInt(editId) : Date.now(),
    name,
    amount,
    dueDate,
    category,
    emoji,
    recurring,
    frequency: recurring ? frequency : null,
    notes,
    paid: false,
    createdAt: new Date().toISOString(),
  };

  if (editId) {
    const index = featuresData.bills.findIndex(
      (b) => b.id === parseInt(editId)
    );
    if (index !== -1) {
      billData.paid = featuresData.bills[index].paid;
      featuresData.bills[index] = billData;
      showToast("success", "Updated", `"${name}" has been updated`);
    }
  } else {
    featuresData.bills.push(billData);
    showToast("success", "Bill Added", `"${name}" due on ${dueDate}`);

    // Schedule notification if enabled
    if (featuresData.settings.notifications.billReminders) {
      scheduleBillReminder(billData);
    }
  }

  saveFeaturesData();
  renderCalendar();
  closeBillModal();

  // Refresh day modal if open
  const dayModalDate = document.getElementById("dayModalDate");
  if (dayModalDate && dayModalDate.value) {
    renderDayModalContent(dayModalDate.value);
  }
}

function markBillPaid(billId) {
  const bill = (featuresData.bills || []).find((b) => b.id === billId);
  if (bill) {
    bill.paid = true;
    bill.paidDate = new Date().toISOString();

    // Record as expense transaction
    const transaction = {
      amount: bill.amount,
      type: "expense",
      description: `${bill.name} (Bill)`,
      category: bill.category,
      date: new Date().toISOString(),
      billId: billId,
      spendSource: "available",
    };

    appData.transactions.push(transaction);
    appData.stats.totalSpentAllTime =
      (appData.stats.totalSpentAllTime || 0) + bill.amount;

    saveData();
    saveFeaturesData();
    updateUI();
    renderCalendar();

    // Refresh day modal if open
    const dayModalDate = document.getElementById("dayModalDate");
    if (dayModalDate && dayModalDate.value) {
      renderDayModalContent(dayModalDate.value);
    }

    showToast("success", "Bill Paid", `${bill.name} marked as paid`);

    // Check achievements
    checkAchievements();
  }
}

function markBillUnpaid(billId) {
  const bill = (featuresData.bills || []).find((b) => b.id === billId);
  if (bill) {
    bill.paid = false;
    bill.paidDate = null;

    saveFeaturesData();
    renderCalendar();

    const dayModalDate = document.getElementById("dayModalDate");
    if (dayModalDate && dayModalDate.value) {
      renderDayModalContent(dayModalDate.value);
    }

    showToast("info", "Bill Unmarked", `${bill.name} marked as unpaid`);
  }
}

function editBill(billId) {
  const bill = (featuresData.bills || []).find((b) => b.id === billId);
  if (!bill) return;

  openBillModal();

  document.getElementById("billName").value = bill.name;
  document.getElementById("billAmount").value = bill.amount;
  document.getElementById("billDueDate").value = bill.dueDate;
  document.getElementById("billCategory").value = bill.category;
  document.getElementById("billRecurring").checked = bill.recurring;
  document.getElementById("billFrequency").value = bill.frequency || "monthly";
  document.getElementById("billNotes").value = bill.notes || "";
  document.getElementById("editBillId").value = bill.id;
  document.getElementById("billFrequencyGroup").style.display = bill.recurring
    ? "block"
    : "none";

  document.querySelectorAll("#billEmojiPicker .emoji-option").forEach((e) => {
    e.classList.toggle("selected", e.dataset.emoji === bill.emoji);
  });

  document.getElementById("billModalTitle").textContent = "Edit Bill";
}

function deleteBill(billId) {
  const bill = (featuresData.bills || []).find((b) => b.id === billId);
  if (bill && confirm(`Delete "${bill.name}"?`)) {
    featuresData.bills = featuresData.bills.filter((b) => b.id !== billId);
    saveFeaturesData();
    renderCalendar();

    const dayModalDate = document.getElementById("dayModalDate");
    if (dayModalDate && dayModalDate.value) {
      renderDayModalContent(dayModalDate.value);
    }

    showToast("info", "Deleted", `"${bill.name}" has been deleted`);
  }
}

// ==================== CALENDAR EVENTS ====================
function openEventModal(dateStr = null) {
  let modal = document.getElementById("eventModal");
  if (!modal) {
    createEventModal();
    modal = document.getElementById("eventModal");
  }

  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value =
    dateStr || new Date().toISOString().split("T")[0];
  document.getElementById("eventDescription").value = "";
  document.getElementById("eventAmount").value = "";
  document.getElementById("editEventId").value = "";

  document
    .querySelectorAll("#eventEmojiPicker .emoji-option")
    .forEach((e) => e.classList.remove("selected"));
  document
    .querySelector('#eventEmojiPicker .emoji-option[data-emoji="📌"]')
    .classList.add("selected");

  setupEmojiPicker("eventEmojiPicker");

  modal.classList.add("active");
}

function createEventModal() {
  const modalHTML = `
    <div class="modal-overlay" id="eventModal">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="modal-title-icon">📌</span>
            <span>Add Event</span>
          </h2>
          <button class="modal-close" onclick="closeEventModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="form-group">
          <label class="form-label">Event Name</label>
          <input type="text" class="form-input" id="eventName" placeholder="e.g., Payday, Birthday, Vacation">
        </div>
        
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="eventDate">
        </div>
        
        <div class="form-group">
          <label class="form-label">Description (Optional)</label>
          <textarea class="form-input form-textarea" id="eventDescription" placeholder="Add details..."></textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">Expected Amount (Optional)</label>
          <input type="number" class="form-input" id="eventAmount" placeholder="0" step="0.01">
        </div>
        
        <div class="form-group">
          <label class="form-label">Icon</label>
          <div class="emoji-picker" id="eventEmojiPicker">
            <button class="emoji-option selected" data-emoji="📌">📌</button>
            <button class="emoji-option" data-emoji="🎂">🎂</button>
            <button class="emoji-option" data-emoji="🎉">🎉</button>
            <button class="emoji-option" data-emoji="💰">💰</button>
            <button class="emoji-option" data-emoji="✈️">✈️</button>
            <button class="emoji-option" data-emoji="🏖️">🏖️</button>
            <button class="emoji-option" data-emoji="🎁">🎁</button>
            <button class="emoji-option" data-emoji="💒">💒</button>
            <button class="emoji-option" data-emoji="🏠">🏠</button>
            <button class="emoji-option" data-emoji="🚗">🚗</button>
            <button class="emoji-option" data-emoji="📅">📅</button>
            <button class="emoji-option" data-emoji="⭐">⭐</button>
          </div>
        </div>
        
        <input type="hidden" id="editEventId" value="">
        
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="closeEventModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveEvent()">
            <i class="fas fa-check"></i> Save Event
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function closeEventModal() {
  const modal = document.getElementById("eventModal");
  if (modal) modal.classList.remove("active");
}

function saveEvent() {
  const name = document.getElementById("eventName").value.trim();
  const date = document.getElementById("eventDate").value;
  const description = document.getElementById("eventDescription").value.trim();
  const amount =
    parseFloat(document.getElementById("eventAmount").value) || null;
  const editId = document.getElementById("editEventId").value;

  const selectedEmoji = document.querySelector(
    "#eventEmojiPicker .emoji-option.selected"
  );
  const emoji = selectedEmoji ? selectedEmoji.dataset.emoji : "📌";

  if (!name) {
    showToast("error", "Error", "Please enter an event name");
    return;
  }

  if (!date) {
    showToast("error", "Error", "Please select a date");
    return;
  }

  featuresData.calendar.events = featuresData.calendar.events || [];

  const eventData = {
    id: editId ? parseInt(editId) : Date.now(),
    name,
    date,
    description,
    amount,
    emoji,
    createdAt: new Date().toISOString(),
  };

  if (editId) {
    const index = featuresData.calendar.events.findIndex(
      (e) => e.id === parseInt(editId)
    );
    if (index !== -1) {
      featuresData.calendar.events[index] = eventData;
      showToast("success", "Updated", `"${name}" has been updated`);
    }
  } else {
    featuresData.calendar.events.push(eventData);
    showToast("success", "Event Added", `"${name}" on ${date}`);
  }

  saveFeaturesData();
  renderCalendar();
  closeEventModal();

  const dayModalDate = document.getElementById("dayModalDate");
  if (dayModalDate && dayModalDate.value) {
    renderDayModalContent(dayModalDate.value);
  }
}

function editEvent(eventId) {
  const event = (featuresData.calendar.events || []).find(
    (e) => e.id === eventId
  );
  if (!event) return;

  openEventModal();

  document.getElementById("eventName").value = event.name;
  document.getElementById("eventDate").value = event.date;
  document.getElementById("eventDescription").value = event.description || "";
  document.getElementById("eventAmount").value = event.amount || "";
  document.getElementById("editEventId").value = event.id;

  document.querySelectorAll("#eventEmojiPicker .emoji-option").forEach((e) => {
    e.classList.toggle("selected", e.dataset.emoji === event.emoji);
  });
}

function deleteEvent(eventId) {
  const event = (featuresData.calendar.events || []).find(
    (e) => e.id === eventId
  );
  if (event && confirm(`Delete "${event.name}"?`)) {
    featuresData.calendar.events = featuresData.calendar.events.filter(
      (e) => e.id !== eventId
    );
    saveFeaturesData();
    renderCalendar();

    const dayModalDate = document.getElementById("dayModalDate");
    if (dayModalDate && dayModalDate.value) {
      renderDayModalContent(dayModalDate.value);
    }

    showToast("info", "Deleted", `"${event.name}" has been deleted`);
  }
}

// Quick add functions from day modal
function quickAddBill() {
  const dateStr = document.getElementById("dayModalDate").value;
  closeDayModal();
  openBillModal(dateStr);
}

function quickAddEvent() {
  const dateStr = document.getElementById("dayModalDate").value;
  closeDayModal();
  openEventModal(dateStr);
}

function quickAddTransaction() {
  closeDayModal();
  openTransactionModal("saving");
}

// Drag and drop support (for moving events)
function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}

function handleDrop(event, dateStr) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");

  const data = event.dataTransfer.getData("text/plain");
  if (data) {
    try {
      const item = JSON.parse(data);
      if (item.type === "event") {
        moveEvent(item.id, dateStr);
      } else if (item.type === "bill") {
        moveBill(item.id, dateStr);
      }
    } catch (e) {
      console.error("Drop error:", e);
    }
  }
}

function moveEvent(eventId, newDate) {
  const event = (featuresData.calendar.events || []).find(
    (e) => e.id === eventId
  );
  if (event) {
    event.date = newDate;
    saveFeaturesData();
    renderCalendar();
    showToast("success", "Moved", `"${event.name}" moved to ${newDate}`);
  }
}

function moveBill(billId, newDate) {
  const bill = (featuresData.bills || []).find((b) => b.id === billId);
  if (bill) {
    bill.dueDate = newDate;
    saveFeaturesData();
    renderCalendar();
    showToast(
      "success",
      "Moved",
      `"${bill.name}" due date changed to ${newDate}`
    );
  }
}
// ==================== WALLETS ====================
function renderWallets() {
  const grid = document.getElementById("walletsGrid");
  if (!grid) return;

  // Calculate total across all wallets
  let totalAll = 0;
  featuresData.wallets.forEach((w) => {
    totalAll += w.balance;
  });

  const totalEl = document.getElementById("totalAllWallets");
  if (totalEl) {
    totalEl.textContent = formatCurrency(totalAll);
  }

  let html = "";

  featuresData.wallets.forEach((wallet, index) => {
    html += `
      <div class="wallet-card" style="--wallet-color: ${wallet.color}">
        <div class="wallet-card-header">
          <span class="wallet-emoji">${wallet.emoji}</span>
          <div class="wallet-menu">
            <button class="goal-menu-btn" onclick="editWallet('${
              wallet.id
            }')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            ${
              !wallet.isDefault
                ? `
              <button class="goal-menu-btn delete" onclick="deleteWallet('${wallet.id}')" title="Delete">
                <i class="fas fa-trash"></i>
              </button>
            `
                : ""
            }
          </div>
        </div>
        <div class="wallet-name">${wallet.name}</div>
        <div class="wallet-balance">${formatCurrency(wallet.balance)}</div>
        <div class="wallet-actions">
          <button class="btn btn-sm btn-secondary" onclick="transferFromWallet('${
            wallet.id
          }')">
            <i class="fas fa-exchange-alt"></i> Transfer
          </button>
          <button class="btn btn-sm btn-primary" onclick="addToWallet('${
            wallet.id
          }')">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="add-wallet-card" onclick="openWalletModal()">
      <div class="add-goal-icon">
        <i class="fas fa-plus"></i>
      </div>
      <div class="add-goal-text">Add New Wallet</div>
    </div>
  `;

  grid.innerHTML = html;
}

function openWalletModal(walletId = null) {
  const modal = document.getElementById("walletModal");
  if (!modal) return;

  modal.classList.add("active");

  // Reset form
  document.getElementById("walletName").value = "";
  document.getElementById("walletBalance").value = "";
  document.getElementById("editWalletId").value = "";

  // Reset color picker
  document
    .querySelectorAll("#walletColorPicker .color-option")
    .forEach((c) => c.classList.remove("selected"));
  document
    .querySelector('#walletColorPicker .color-option[data-color="#8b5cf6"]')
    .classList.add("selected");

  // Reset emoji picker
  document
    .querySelectorAll("#walletEmojiPicker .emoji-option")
    .forEach((e) => e.classList.remove("selected"));
  document
    .querySelector('#walletEmojiPicker .emoji-option[data-emoji="💰"]')
    .classList.add("selected");

  if (walletId) {
    const wallet = featuresData.wallets.find((w) => w.id === walletId);
    if (wallet) {
      document.getElementById("walletName").value = wallet.name;
      document.getElementById("walletBalance").value = wallet.balance;
      document.getElementById("editWalletId").value = walletId;

      // Set color
      document
        .querySelectorAll("#walletColorPicker .color-option")
        .forEach((c) => {
          c.classList.toggle("selected", c.dataset.color === wallet.color);
        });

      // Set emoji
      document
        .querySelectorAll("#walletEmojiPicker .emoji-option")
        .forEach((e) => {
          e.classList.toggle("selected", e.dataset.emoji === wallet.emoji);
        });
    }
  }

  // Setup pickers
  setupColorPicker("walletColorPicker");
  setupEmojiPicker("walletEmojiPicker");
}

function closeWalletModal() {
  const modal = document.getElementById("walletModal");
  if (modal) modal.classList.remove("active");
}

function setupColorPicker(pickerId) {
  const picker = document.getElementById(pickerId);
  if (!picker) return;

  picker.querySelectorAll(".color-option").forEach((option) => {
    option.onclick = () => {
      picker
        .querySelectorAll(".color-option")
        .forEach((o) => o.classList.remove("selected"));
      option.classList.add("selected");
    };
  });
}

function setupEmojiPicker(pickerId) {
  const picker = document.getElementById(pickerId);
  if (!picker) return;

  picker.querySelectorAll(".emoji-option").forEach((option) => {
    option.onclick = () => {
      picker
        .querySelectorAll(".emoji-option")
        .forEach((o) => o.classList.remove("selected"));
      option.classList.add("selected");
    };
  });
}

function saveWallet() {
  const name = document.getElementById("walletName").value.trim();
  const balance =
    parseFloat(document.getElementById("walletBalance").value) || 0;
  const editId = document.getElementById("editWalletId").value;

  if (!name) {
    showToast("error", "Error", "Please enter a wallet name");
    return;
  }

  const selectedColor = document.querySelector(
    "#walletColorPicker .color-option.selected"
  );
  const selectedEmoji = document.querySelector(
    "#walletEmojiPicker .emoji-option.selected"
  );

  const color = selectedColor ? selectedColor.dataset.color : "#8b5cf6";
  const emoji = selectedEmoji ? selectedEmoji.dataset.emoji : "💰";

  if (editId) {
    // Edit existing wallet
    const wallet = featuresData.wallets.find((w) => w.id === editId);
    if (wallet) {
      wallet.name = name;
      wallet.balance = balance;
      wallet.color = color;
      wallet.emoji = emoji;
      showToast("success", "Wallet Updated", `"${name}" has been updated`);
    }
  } else {
    // Create new wallet
    const newWallet = {
      id: "wallet_" + Date.now(),
      name: name,
      balance: balance,
      color: color,
      emoji: emoji,
      isDefault: false,
      createdAt: new Date().toISOString(),
    };
    featuresData.wallets.push(newWallet);
    showToast("success", "Wallet Created", `"${name}" has been created`);
  }

  saveFeaturesData();
  renderWallets();
  updateAllFeaturesBadges();
  closeWalletModal();
}

function editWallet(walletId) {
  openWalletModal(walletId);
}

function deleteWallet(walletId) {
  const wallet = featuresData.wallets.find((w) => w.id === walletId);
  if (!wallet) return;

  if (wallet.isDefault) {
    showToast("error", "Cannot Delete", "You cannot delete the main wallet");
    return;
  }

  if (
    confirm(
      `Are you sure you want to delete "${
        wallet.name
      }"?\n\nBalance: ${formatCurrency(wallet.balance)}`
    )
  ) {
    // Transfer balance to main wallet
    const mainWallet = featuresData.wallets.find((w) => w.isDefault);
    if (mainWallet && wallet.balance > 0) {
      mainWallet.balance += wallet.balance;
    }

    featuresData.wallets = featuresData.wallets.filter(
      (w) => w.id !== walletId
    );
    saveFeaturesData();
    renderWallets();
    updateAllFeaturesBadges();
    showToast("info", "Wallet Deleted", `"${wallet.name}" has been deleted`);
  }
}

function addToWallet(walletId) {
  const amount = prompt("Enter amount to add:");
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

  const wallet = featuresData.wallets.find((w) => w.id === walletId);
  if (wallet) {
    wallet.balance += parseFloat(amount);
    saveFeaturesData();
    renderWallets();
    showToast(
      "success",
      "Added to Wallet",
      `${formatCurrency(parseFloat(amount))} added to ${wallet.name}`
    );
  }
}

function transferFromWallet(fromWalletId) {
  if (featuresData.wallets.length < 2) {
    showToast(
      "info",
      "No Transfer Available",
      "Create another wallet to transfer funds"
    );
    return;
  }

  const fromWallet = featuresData.wallets.find((w) => w.id === fromWalletId);
  if (!fromWallet) return;

  const otherWallets = featuresData.wallets.filter(
    (w) => w.id !== fromWalletId
  );
  const options = otherWallets
    .map((w) => `${w.name} (${formatCurrency(w.balance)})`)
    .join("\n");

  const toWalletIndex = prompt(
    `Transfer from "${
      fromWallet.name
    }"\n\nSelect destination wallet (enter number):\n${otherWallets
      .map((w, i) => `${i + 1}. ${w.name}`)
      .join("\n")}`
  );

  if (!toWalletIndex || isNaN(toWalletIndex)) return;

  const toWallet = otherWallets[parseInt(toWalletIndex) - 1];
  if (!toWallet) {
    showToast("error", "Error", "Invalid wallet selection");
    return;
  }

  const amount = prompt(
    `Enter amount to transfer (Available: ${formatCurrency(
      fromWallet.balance
    )}):`
  );
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

  const transferAmount = parseFloat(amount);
  if (transferAmount > fromWallet.balance) {
    showToast(
      "error",
      "Insufficient Funds",
      `You only have ${formatCurrency(fromWallet.balance)} in this wallet`
    );
    return;
  }

  fromWallet.balance -= transferAmount;
  toWallet.balance += transferAmount;
  saveFeaturesData();
  renderWallets();
  showToast(
    "success",
    "Transfer Complete",
    `${formatCurrency(transferAmount)} transferred to ${toWallet.name}`
  );
}

// Update wallet dropdown in recurring modal
function updateWalletDropdowns() {
  const selects = document.querySelectorAll("#recurringWallet");
  selects.forEach((select) => {
    select.innerHTML = featuresData.wallets
      .map((w) => `<option value="${w.id}">${w.emoji} ${w.name}</option>`)
      .join("");
  });
} // ==================== WALLETS ====================
function renderWallets() {
  const grid = document.getElementById("walletsGrid");
  if (!grid) return;

  // Calculate total across all wallets
  let totalAll = 0;
  featuresData.wallets.forEach((w) => {
    totalAll += w.balance;
  });

  const totalEl = document.getElementById("totalAllWallets");
  if (totalEl) {
    totalEl.textContent = formatCurrency(totalAll);
  }

  let html = "";

  featuresData.wallets.forEach((wallet, index) => {
    html += `
      <div class="wallet-card" style="--wallet-color: ${wallet.color}">
        <div class="wallet-card-header">
          <span class="wallet-emoji">${wallet.emoji}</span>
          <div class="wallet-menu">
            <button class="goal-menu-btn" onclick="editWallet('${
              wallet.id
            }')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            ${
              !wallet.isDefault
                ? `
              <button class="goal-menu-btn delete" onclick="deleteWallet('${wallet.id}')" title="Delete">
                <i class="fas fa-trash"></i>
              </button>
            `
                : ""
            }
          </div>
        </div>
        <div class="wallet-name">${wallet.name}</div>
        <div class="wallet-balance">${formatCurrency(wallet.balance)}</div>
        <div class="wallet-actions">
          <button class="btn btn-sm btn-secondary" onclick="transferFromWallet('${
            wallet.id
          }')">
            <i class="fas fa-exchange-alt"></i> Transfer
          </button>
          <button class="btn btn-sm btn-primary" onclick="addToWallet('${
            wallet.id
          }')">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="add-wallet-card" onclick="openWalletModal()">
      <div class="add-goal-icon">
        <i class="fas fa-plus"></i>
      </div>
      <div class="add-goal-text">Add New Wallet</div>
    </div>
  `;

  grid.innerHTML = html;
}

function openWalletModal(walletId = null) {
  const modal = document.getElementById("walletModal");
  if (!modal) return;

  modal.classList.add("active");

  // Reset form
  document.getElementById("walletName").value = "";
  document.getElementById("walletBalance").value = "";
  document.getElementById("editWalletId").value = "";

  // Reset color picker
  document
    .querySelectorAll("#walletColorPicker .color-option")
    .forEach((c) => c.classList.remove("selected"));
  document
    .querySelector('#walletColorPicker .color-option[data-color="#8b5cf6"]')
    .classList.add("selected");

  // Reset emoji picker
  document
    .querySelectorAll("#walletEmojiPicker .emoji-option")
    .forEach((e) => e.classList.remove("selected"));
  document
    .querySelector('#walletEmojiPicker .emoji-option[data-emoji="💰"]')
    .classList.add("selected");

  if (walletId) {
    const wallet = featuresData.wallets.find((w) => w.id === walletId);
    if (wallet) {
      document.getElementById("walletName").value = wallet.name;
      document.getElementById("walletBalance").value = wallet.balance;
      document.getElementById("editWalletId").value = walletId;

      // Set color
      document
        .querySelectorAll("#walletColorPicker .color-option")
        .forEach((c) => {
          c.classList.toggle("selected", c.dataset.color === wallet.color);
        });

      // Set emoji
      document
        .querySelectorAll("#walletEmojiPicker .emoji-option")
        .forEach((e) => {
          e.classList.toggle("selected", e.dataset.emoji === wallet.emoji);
        });
    }
  }

  // Setup pickers
  setupColorPicker("walletColorPicker");
  setupEmojiPicker("walletEmojiPicker");
}

function closeWalletModal() {
  const modal = document.getElementById("walletModal");
  if (modal) modal.classList.remove("active");
}

function setupColorPicker(pickerId) {
  const picker = document.getElementById(pickerId);
  if (!picker) return;

  picker.querySelectorAll(".color-option").forEach((option) => {
    option.onclick = () => {
      picker
        .querySelectorAll(".color-option")
        .forEach((o) => o.classList.remove("selected"));
      option.classList.add("selected");
    };
  });
}

function setupEmojiPicker(pickerId) {
  const picker = document.getElementById(pickerId);
  if (!picker) return;

  picker.querySelectorAll(".emoji-option").forEach((option) => {
    option.onclick = () => {
      picker
        .querySelectorAll(".emoji-option")
        .forEach((o) => o.classList.remove("selected"));
      option.classList.add("selected");
    };
  });
}

function saveWallet() {
  const name = document.getElementById("walletName").value.trim();
  const balance =
    parseFloat(document.getElementById("walletBalance").value) || 0;
  const editId = document.getElementById("editWalletId").value;

  if (!name) {
    showToast("error", "Error", "Please enter a wallet name");
    return;
  }

  const selectedColor = document.querySelector(
    "#walletColorPicker .color-option.selected"
  );
  const selectedEmoji = document.querySelector(
    "#walletEmojiPicker .emoji-option.selected"
  );

  const color = selectedColor ? selectedColor.dataset.color : "#8b5cf6";
  const emoji = selectedEmoji ? selectedEmoji.dataset.emoji : "💰";

  if (editId) {
    // Edit existing wallet
    const wallet = featuresData.wallets.find((w) => w.id === editId);
    if (wallet) {
      wallet.name = name;
      wallet.balance = balance;
      wallet.color = color;
      wallet.emoji = emoji;
      showToast("success", "Wallet Updated", `"${name}" has been updated`);
    }
  } else {
    // Create new wallet
    const newWallet = {
      id: "wallet_" + Date.now(),
      name: name,
      balance: balance,
      color: color,
      emoji: emoji,
      isDefault: false,
      createdAt: new Date().toISOString(),
    };
    featuresData.wallets.push(newWallet);
    showToast("success", "Wallet Created", `"${name}" has been created`);
  }

  saveFeaturesData();
  renderWallets();
  updateAllFeaturesBadges();
  closeWalletModal();
}

function editWallet(walletId) {
  openWalletModal(walletId);
}

function deleteWallet(walletId) {
  const wallet = featuresData.wallets.find((w) => w.id === walletId);
  if (!wallet) return;

  if (wallet.isDefault) {
    showToast("error", "Cannot Delete", "You cannot delete the main wallet");
    return;
  }

  if (
    confirm(
      `Are you sure you want to delete "${
        wallet.name
      }"?\n\nBalance: ${formatCurrency(wallet.balance)}`
    )
  ) {
    // Transfer balance to main wallet
    const mainWallet = featuresData.wallets.find((w) => w.isDefault);
    if (mainWallet && wallet.balance > 0) {
      mainWallet.balance += wallet.balance;
    }

    featuresData.wallets = featuresData.wallets.filter(
      (w) => w.id !== walletId
    );
    saveFeaturesData();
    renderWallets();
    updateAllFeaturesBadges();
    showToast("info", "Wallet Deleted", `"${wallet.name}" has been deleted`);
  }
}

function addToWallet(walletId) {
  const amount = prompt("Enter amount to add:");
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

  const wallet = featuresData.wallets.find((w) => w.id === walletId);
  if (wallet) {
    wallet.balance += parseFloat(amount);
    saveFeaturesData();
    renderWallets();
    showToast(
      "success",
      "Added to Wallet",
      `${formatCurrency(parseFloat(amount))} added to ${wallet.name}`
    );
  }
}

function transferFromWallet(fromWalletId) {
  if (featuresData.wallets.length < 2) {
    showToast(
      "info",
      "No Transfer Available",
      "Create another wallet to transfer funds"
    );
    return;
  }

  const fromWallet = featuresData.wallets.find((w) => w.id === fromWalletId);
  if (!fromWallet) return;

  const otherWallets = featuresData.wallets.filter(
    (w) => w.id !== fromWalletId
  );
  const options = otherWallets
    .map((w) => `${w.name} (${formatCurrency(w.balance)})`)
    .join("\n");

  const toWalletIndex = prompt(
    `Transfer from "${
      fromWallet.name
    }"\n\nSelect destination wallet (enter number):\n${otherWallets
      .map((w, i) => `${i + 1}. ${w.name}`)
      .join("\n")}`
  );

  if (!toWalletIndex || isNaN(toWalletIndex)) return;

  const toWallet = otherWallets[parseInt(toWalletIndex) - 1];
  if (!toWallet) {
    showToast("error", "Error", "Invalid wallet selection");
    return;
  }

  const amount = prompt(
    `Enter amount to transfer (Available: ${formatCurrency(
      fromWallet.balance
    )}):`
  );
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

  const transferAmount = parseFloat(amount);
  if (transferAmount > fromWallet.balance) {
    showToast(
      "error",
      "Insufficient Funds",
      `You only have ${formatCurrency(fromWallet.balance)} in this wallet`
    );
    return;
  }

  fromWallet.balance -= transferAmount;
  toWallet.balance += transferAmount;
  saveFeaturesData();
  renderWallets();
  showToast(
    "success",
    "Transfer Complete",
    `${formatCurrency(transferAmount)} transferred to ${toWallet.name}`
  );
}

// Update wallet dropdown in recurring modal
function updateWalletDropdowns() {
  const selects = document.querySelectorAll("#recurringWallet");
  selects.forEach((select) => {
    select.innerHTML = featuresData.wallets
      .map((w) => `<option value="${w.id}">${w.emoji} ${w.name}</option>`)
      .join("");
  });
}
// ==================== RECURRING TRANSACTIONS ====================
function renderRecurring() {
  const list = document.getElementById("recurringList");
  if (!list) return;

  // Calculate totals
  let incomeTotal = 0;
  let expenseTotal = 0;
  let savingTotal = 0;

  featuresData.recurring.forEach((r) => {
    if (!r.active) return;
    const monthlyAmount = getMonthlyEquivalent(r.amount, r.frequency);
    if (r.type === "income") incomeTotal += monthlyAmount;
    else if (r.type === "expense") expenseTotal += monthlyAmount;
    else if (r.type === "saving") savingTotal += monthlyAmount;
  });

  // Update summary cards
  const incomeEl = document.getElementById("recurringIncomeTotal");
  const expenseEl = document.getElementById("recurringExpenseTotal");
  const savingEl = document.getElementById("recurringSavingTotal");
  const netEl = document.getElementById("recurringNetTotal");

  if (incomeEl) incomeEl.textContent = formatCurrency(incomeTotal);
  if (expenseEl) expenseEl.textContent = formatCurrency(expenseTotal);
  if (savingEl) savingEl.textContent = formatCurrency(savingTotal);
  if (netEl)
    netEl.textContent = formatCurrency(
      incomeTotal - expenseTotal - savingTotal
    );

  if (featuresData.recurring.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔄</div>
        <div class="empty-state-title">No Recurring Transactions</div>
        <div class="empty-state-text">Add recurring income or expenses to automate your tracking</div>
        <button class="btn btn-primary" onclick="openRecurringModal()">
          <i class="fas fa-plus"></i> Add Recurring
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  featuresData.recurring.forEach((r, index) => {
    const icon =
      r.type === "income"
        ? "arrow-down"
        : r.type === "saving"
        ? "piggy-bank"
        : "arrow-up";
    const colorClass = r.type;
    const frequencyText =
      {
        daily: "Daily",
        weekly: "Weekly",
        biweekly: "Bi-weekly",
        monthly: "Monthly",
        yearly: "Yearly",
      }[r.frequency] || r.frequency;

    html += `
      <div class="recurring-item">
        <div class="recurring-item-icon ${colorClass}">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="recurring-item-info">
          <div class="recurring-item-name">${r.name}</div>
          <div class="recurring-item-meta">
            <span>${frequencyText}</span>
            <span>•</span>
            <span>Next: ${getNextOccurrence(r)}</span>
            ${
              !r.active
                ? '<span class="transaction-original">(Paused)</span>'
                : ""
            }
          </div>
        </div>
        <div class="recurring-item-amount ${colorClass}">
          ${r.type === "expense" ? "-" : "+"}${formatCurrency(r.amount)}
        </div>
        <div class="wallet-menu" style="margin-left: 12px;">
          <button class="goal-menu-btn" onclick="toggleRecurring(${index})" title="${
      r.active ? "Pause" : "Resume"
    }">
            <i class="fas fa-${r.active ? "pause" : "play"}"></i>
          </button>
          <button class="goal-menu-btn" onclick="editRecurring(${index})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="goal-menu-btn delete" onclick="deleteRecurring(${index})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  list.innerHTML = html;
}

function getMonthlyEquivalent(amount, frequency) {
  switch (frequency) {
    case "daily":
      return amount * 30;
    case "weekly":
      return amount * 4.33;
    case "biweekly":
      return amount * 2.17;
    case "monthly":
      return amount;
    case "yearly":
      return amount / 12;
    default:
      return amount;
  }
}

function getNextOccurrence(recurring) {
  const today = new Date();
  const start = new Date(recurring.startDate);
  let next = new Date(start);

  while (next <= today) {
    switch (recurring.frequency) {
      case "daily":
        next.setDate(next.getDate() + 1);
        break;
      case "weekly":
        next.setDate(next.getDate() + 7);
        break;
      case "biweekly":
        next.setDate(next.getDate() + 14);
        break;
      case "monthly":
        next.setMonth(next.getMonth() + 1);
        break;
      case "yearly":
        next.setFullYear(next.getFullYear() + 1);
        break;
    }
  }

  if (recurring.endDate && next > new Date(recurring.endDate)) {
    return "Ended";
  }

  return next.toLocaleDateString();
}

function openRecurringModal(index = null) {
  const modal = document.getElementById("recurringModal");
  if (!modal) return;

  modal.classList.add("active");
  updateWalletDropdowns();

  // Reset form
  document.getElementById("recurringName").value = "";
  document.getElementById("recurringAmount").value = "";
  document.getElementById("recurringFrequency").value = "monthly";
  document.getElementById("recurringStartDate").value = new Date()
    .toISOString()
    .split("T")[0];
  document.getElementById("recurringEndDate").value = "";
  document.getElementById("recurringCategory").value = "salary";
  document.getElementById("recurringType").value = "income";
  document.getElementById("editRecurringId").value = "";

  // Reset type buttons
  document.querySelectorAll(".recurring-type-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.type === "income");
  });

  if (index !== null && featuresData.recurring[index]) {
    const r = featuresData.recurring[index];
    document.getElementById("recurringName").value = r.name;
    document.getElementById("recurringAmount").value = r.amount;
    document.getElementById("recurringFrequency").value = r.frequency;
    document.getElementById("recurringStartDate").value =
      r.startDate.split("T")[0];
    document.getElementById("recurringEndDate").value = r.endDate
      ? r.endDate.split("T")[0]
      : "";
    document.getElementById("recurringCategory").value = r.category;
    document.getElementById("recurringType").value = r.type;
    document.getElementById("editRecurringId").value = index;

    document.querySelectorAll(".recurring-type-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.type === r.type);
    });
  }
}

function closeRecurringModal() {
  const modal = document.getElementById("recurringModal");
  if (modal) modal.classList.remove("active");
}

function setRecurringType(type) {
  document.getElementById("recurringType").value = type;
  document.querySelectorAll(".recurring-type-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.type === type);
  });
}

function saveRecurring() {
  const name = document.getElementById("recurringName").value.trim();
  const amount = parseFloat(document.getElementById("recurringAmount").value);
  const frequency = document.getElementById("recurringFrequency").value;
  const startDate = document.getElementById("recurringStartDate").value;
  const endDate = document.getElementById("recurringEndDate").value;
  const category = document.getElementById("recurringCategory").value;
  const type = document.getElementById("recurringType").value;
  const walletId = document.getElementById("recurringWallet").value;
  const editIndex = document.getElementById("editRecurringId").value;

  if (!name) {
    showToast("error", "Error", "Please enter a description");
    return;
  }

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  if (!startDate) {
    showToast("error", "Error", "Please select a start date");
    return;
  }

  const recurringData = {
    name,
    amount,
    frequency,
    startDate,
    endDate: endDate || null,
    category,
    type,
    walletId,
    active: true,
    lastProcessed: null,
    createdAt: new Date().toISOString(),
  };

  if (editIndex !== "") {
    featuresData.recurring[parseInt(editIndex)] = {
      ...featuresData.recurring[parseInt(editIndex)],
      ...recurringData,
    };
    showToast("success", "Updated", `"${name}" has been updated`);
  } else {
    featuresData.recurring.push(recurringData);
    showToast("success", "Created", `"${name}" has been added`);
  }

  saveFeaturesData();
  renderRecurring();
  updateAllFeaturesBadges();
  closeRecurringModal();
}

function toggleRecurring(index) {
  const r = featuresData.recurring[index];
  if (r) {
    r.active = !r.active;
    saveFeaturesData();
    renderRecurring();
    showToast(
      "info",
      r.active ? "Resumed" : "Paused",
      `"${r.name}" has been ${r.active ? "resumed" : "paused"}`
    );
  }
}

function editRecurring(index) {
  openRecurringModal(index);
}

function deleteRecurring(index) {
  const r = featuresData.recurring[index];
  if (r && confirm(`Delete "${r.name}"?`)) {
    featuresData.recurring.splice(index, 1);
    saveFeaturesData();
    renderRecurring();
    updateAllFeaturesBadges();
    showToast("info", "Deleted", `"${r.name}" has been deleted`);
  }
}

function processRecurringTransactions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  featuresData.recurring.forEach((r) => {
    if (!r.active) return;

    const lastProcessed = r.lastProcessed ? new Date(r.lastProcessed) : null;
    const startDate = new Date(r.startDate);

    if (startDate > today) return;
    if (r.endDate && new Date(r.endDate) < today) return;

    // Check if should process today
    if (shouldProcessToday(r, today, lastProcessed)) {
      // Auto-add transaction
      const transaction = {
        amount: r.amount,
        type: r.type,
        description: `${r.name} (Auto)`,
        category: r.category,
        date: new Date().toISOString(),
        isRecurring: true,
        recurringId: featuresData.recurring.indexOf(r),
      };

      appData.transactions.push(transaction);

      if (r.type === "saving") {
        appData.stats.totalSavedAllTime =
          (appData.stats.totalSavedAllTime || 0) + r.amount;
      }

      r.lastProcessed = today.toISOString();
    }
  });

  saveFeaturesData();
  saveData();
  updateUI();
}

function shouldProcessToday(recurring, today, lastProcessed) {
  if (lastProcessed) {
    lastProcessed.setHours(0, 0, 0, 0);
    if (lastProcessed.getTime() === today.getTime()) return false;
  }

  const start = new Date(recurring.startDate);
  start.setHours(0, 0, 0, 0);

  switch (recurring.frequency) {
    case "daily":
      return true;
    case "weekly":
      return today.getDay() === start.getDay();
    case "biweekly":
      const weeksDiff = Math.floor((today - start) / (7 * 24 * 60 * 60 * 1000));
      return today.getDay() === start.getDay() && weeksDiff % 2 === 0;
    case "monthly":
      return today.getDate() === start.getDate();
    case "yearly":
      return (
        today.getDate() === start.getDate() &&
        today.getMonth() === start.getMonth()
      );
    default:
      return false;
  }
}
// ==================== CHALLENGES ====================
let currentChallengeFilter = "available";

function renderChallenges() {
  const grid = document.getElementById("challengesGrid");
  if (!grid) return;

  const activeChallenges = featuresData.challenges.active || [];
  const completedChallenges = featuresData.challenges.completed || [];

  let challengesToShow = [];

  switch (currentChallengeFilter) {
    case "available":
      challengesToShow = CHALLENGES_CONFIG.filter(
        (c) =>
          !activeChallenges.find((a) => a.id === c.id) &&
          !completedChallenges.find((comp) => comp.id === c.id)
      ).map((c) => ({ ...c, status: "available" }));
      break;
    case "active":
      challengesToShow = activeChallenges.map((a) => {
        const config = CHALLENGES_CONFIG.find((c) => c.id === a.id);
        return { ...config, ...a, status: "active" };
      });
      break;
    case "completed":
      challengesToShow = completedChallenges.map((comp) => {
        const config = CHALLENGES_CONFIG.find((c) => c.id === comp.id);
        return { ...config, ...comp, status: "completed" };
      });
      break;
  }

  if (challengesToShow.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🏆</div>
        <div class="empty-state-title">No ${currentChallengeFilter} challenges</div>
        <div class="empty-state-text">
          ${
            currentChallengeFilter === "available"
              ? "You've started all available challenges!"
              : currentChallengeFilter === "active"
              ? "Start a challenge to see it here"
              : "Complete challenges to see them here"
          }
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = challengesToShow
    .map((challenge) => {
      const difficultyColors = {
        easy: "var(--accent-green)",
        medium: "var(--accent-yellow)",
        hard: "var(--accent-orange)",
        extreme: "var(--accent-red)",
      };

      let progressHtml = "";
      if (challenge.status === "active") {
        const progress = calculateChallengeProgress(challenge);
        progressHtml = `
        <div class="challenge-progress">
          <div class="challenge-progress-bar">
            <div class="challenge-progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="challenge-progress-text">${progress}% Complete</div>
        </div>
      `;
      }

      return `
      <div class="challenge-card ${
        challenge.status
      }" onclick="openChallengeDetails('${challenge.id}')">
        ${
          challenge.status !== "available"
            ? `
          <span class="challenge-badge ${challenge.status}">${
                challenge.status === "active" ? "Active" : "Completed"
              }</span>
        `
            : ""
        }
        <div class="challenge-icon">${challenge.icon}</div>
        <div class="challenge-name">${challenge.name}</div>
        <div class="challenge-description">${challenge.description}</div>
        <div class="challenge-stats">
          <div class="challenge-stat">
            <div class="challenge-stat-value">${challenge.duration}</div>
            <div class="challenge-stat-label">${challenge.durationType}</div>
          </div>
          <div class="challenge-stat">
            <div class="challenge-stat-value" style="color: ${
              difficultyColors[challenge.difficulty]
            }">${challenge.difficulty}</div>
            <div class="challenge-stat-label">Difficulty</div>
          </div>
          ${
            challenge.totalTarget
              ? `
            <div class="challenge-stat">
              <div class="challenge-stat-value">${formatCurrency(
                challenge.totalTarget
              )}</div>
              <div class="challenge-stat-label">Target</div>
            </div>
          `
              : ""
          }
        </div>
        ${progressHtml}
      </div>
    `;
    })
    .join("");
}

function filterChallenges(filter) {
  currentChallengeFilter = filter;

  document.querySelectorAll(".challenge-tab").forEach((tab) => {
    tab.classList.toggle(
      "active",
      tab.textContent.toLowerCase().includes(filter)
    );
  });

  renderChallenges();
}

function calculateChallengeProgress(challenge) {
  if (!challenge.startDate) return 0;

  const start = new Date(challenge.startDate);
  const now = new Date();
  const daysPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24));

  switch (challenge.type) {
    case "progressive":
    case "daily_save":
      const totalDays =
        challenge.durationType === "weeks"
          ? challenge.duration * 7
          : challenge.duration;
      return Math.min(100, Math.round((daysPassed / totalDays) * 100));
    case "no_spend":
    case "category_restrict":
    case "minimalist":
      const targetDays = challenge.duration;
      const successDays = challenge.successDays || 0;
      return Math.min(100, Math.round((successDays / targetDays) * 100));
    default:
      return 0;
  }
}

function openChallengeDetails(challengeId) {
  const modal = document.getElementById("challengeModal");
  if (!modal) return;

  const config = CHALLENGES_CONFIG.find((c) => c.id === challengeId);
  const active = (featuresData.challenges.active || []).find(
    (a) => a.id === challengeId
  );
  const completed = (featuresData.challenges.completed || []).find(
    (c) => c.id === challengeId
  );

  const challenge = { ...config, ...(active || completed || {}) };
  const status = active ? "active" : completed ? "completed" : "available";

  const content = document.getElementById("challengeModalContent");
  const actions = document.getElementById("challengeModalActions");
  const title = document.getElementById("challengeModalTitle");

  title.innerHTML = `<span class="modal-title-icon">${challenge.icon}</span><span>${challenge.name}</span>`;

  let progressHtml = "";
  let statsHtml = "";

  if (status === "active") {
    const progress = calculateChallengeProgress(challenge);
    const daysRemaining = calculateDaysRemaining(challenge);
    const amountSaved = challenge.amountSaved || 0;

    progressHtml = `
      <div class="challenge-detail-progress">
        <div class="challenge-progress-circle" style="--progress: ${progress}%">
          <span>${progress}%</span>
        </div>
        <div class="challenge-progress-info">
          <div class="challenge-progress-stat">
            <span class="value">${daysRemaining}</span>
            <span class="label">Days Remaining</span>
          </div>
          <div class="challenge-progress-stat">
            <span class="value">${formatCurrency(amountSaved)}</span>
            <span class="label">Saved So Far</span>
          </div>
        </div>
      </div>
    `;
  }

  if (status === "completed") {
    statsHtml = `
      <div class="challenge-completed-stats">
        <div class="completed-badge">🏆 Completed!</div>
        <p>You completed this challenge on ${new Date(
          challenge.completedDate
        ).toLocaleDateString()}</p>
        <p>Total saved: ${formatCurrency(challenge.totalSaved || 0)}</p>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="challenge-detail">
      <div class="challenge-detail-header">
        <div class="challenge-detail-icon">${challenge.icon}</div>
        <div class="challenge-detail-info">
          <div class="challenge-difficulty ${
            challenge.difficulty
          }">${challenge.difficulty.toUpperCase()}</div>
          <div class="challenge-duration">${challenge.duration} ${
    challenge.durationType
  }</div>
        </div>
      </div>
      
      <div class="challenge-detail-description">
        ${challenge.description}
      </div>
      
      ${progressHtml}
      ${statsHtml}
      
      <div class="challenge-detail-rules">
        <h4>How it works:</h4>
        <ul>
          ${getChallengeRules(challenge)
            .map((rule) => `<li>${rule}</li>`)
            .join("")}
        </ul>
      </div>
      
      ${
        challenge.totalTarget
          ? `
        <div class="challenge-detail-target">
          <span class="label">Target Amount:</span>
          <span class="value">${formatCurrency(challenge.totalTarget)}</span>
        </div>
      `
          : ""
      }
    </div>
  `;

  // Update action buttons
  if (status === "available") {
    actions.innerHTML = `
      <button class="btn btn-secondary" onclick="closeChallengeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="startChallenge('${challengeId}')">
        <i class="fas fa-play"></i> Start Challenge
      </button>
    `;
  } else if (status === "active") {
    actions.innerHTML = `
      <button class="btn btn-secondary" onclick="closeChallengeModal()">Close</button>
      <button class="btn btn-danger" onclick="quitChallenge('${challengeId}')">
        <i class="fas fa-times"></i> Quit Challenge
      </button>
      <button class="btn btn-success" onclick="logChallengeProgress('${challengeId}')">
        <i class="fas fa-check"></i> Log Progress
      </button>
    `;
  } else {
    actions.innerHTML = `
      <button class="btn btn-secondary" onclick="closeChallengeModal()">Close</button>
      <button class="btn btn-primary" onclick="restartChallenge('${challengeId}')">
        <i class="fas fa-redo"></i> Start Again
      </button>
    `;
  }

  modal.classList.add("active");
}

function closeChallengeModal() {
  const modal = document.getElementById("challengeModal");
  if (modal) modal.classList.remove("active");
}

function getChallengeRules(challenge) {
  const rules = [];

  switch (challenge.type) {
    case "progressive":
      rules.push(
        `Save ${formatCurrency(challenge.baseAmount)} on the first ${
          challenge.durationType === "weeks" ? "week" : "day"
        }`
      );
      rules.push(
        `Increase by ${formatCurrency(challenge.increment)} each ${
          challenge.durationType === "weeks" ? "week" : "day"
        }`
      );
      rules.push(
        `Complete all ${challenge.duration} ${challenge.durationType}`
      );
      break;
    case "no_spend":
      rules.push("No discretionary spending allowed");
      rules.push("Essential expenses (food, medicine, bills) are okay");
      rules.push(`Last ${challenge.duration} days`);
      break;
    case "daily_save":
      rules.push("Save any amount every single day");
      rules.push("Even $1 counts!");
      rules.push("Missing a day ends the challenge");
      break;
    case "category_restrict":
      rules.push(`Avoid spending on ${challenge.restrictCategory}`);
      rules.push("Find alternatives or go without");
      rules.push(`Last ${challenge.duration} days`);
      break;
    case "percentage":
      rules.push(`Save ${challenge.targetPercentage}% of all income`);
      rules.push("Track your savings rate daily");
      rules.push("Meet the target by month end");
      break;
    default:
      rules.push("Follow the challenge guidelines");
      rules.push(
        `Complete within ${challenge.duration} ${challenge.durationType}`
      );
  }

  return rules;
}

function calculateDaysRemaining(challenge) {
  if (!challenge.startDate) return challenge.duration;

  const start = new Date(challenge.startDate);
  const totalDays =
    challenge.durationType === "weeks"
      ? challenge.duration * 7
      : challenge.duration;
  const end = new Date(start);
  end.setDate(end.getDate() + totalDays);

  const now = new Date();
  const remaining = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

  return Math.max(0, remaining);
}

function startChallenge(challengeId) {
  const config = CHALLENGES_CONFIG.find((c) => c.id === challengeId);
  if (!config) return;

  const activeChallenge = {
    id: challengeId,
    startDate: new Date().toISOString(),
    amountSaved: 0,
    successDays: 0,
    logs: [],
  };

  featuresData.challenges.active = featuresData.challenges.active || [];
  featuresData.challenges.active.push(activeChallenge);

  saveFeaturesData();
  closeChallengeModal();
  renderChallenges();

  showToast(
    "success",
    "Challenge Started!",
    `You've started "${config.name}". Good luck!`
  );
  addAIMessage(
    `🏆 Great! You've started the "${config.name}" challenge!\n\n${config.description}\n\nI'll help you track your progress. You can log your progress anytime from the Challenges section.`
  );

  checkAchievements();
}

function quitChallenge(challengeId) {
  if (
    !confirm(
      "Are you sure you want to quit this challenge? Your progress will be lost."
    )
  )
    return;

  featuresData.challenges.active = (
    featuresData.challenges.active || []
  ).filter((c) => c.id !== challengeId);

  saveFeaturesData();
  closeChallengeModal();
  renderChallenges();

  showToast("info", "Challenge Quit", "You can start it again anytime");
}

function logChallengeProgress(challengeId) {
  const challenge = (featuresData.challenges.active || []).find(
    (c) => c.id === challengeId
  );
  if (!challenge) return;

  const config = CHALLENGES_CONFIG.find((c) => c.id === challengeId);

  let amount = 0;

  if (config.type === "progressive" || config.type === "daily_save") {
    const input = prompt("Enter amount saved today:");
    if (!input || isNaN(parseFloat(input))) return;
    amount = parseFloat(input);
  }

  // Log progress
  challenge.logs = challenge.logs || [];
  challenge.logs.push({
    date: new Date().toISOString(),
    amount: amount,
  });

  challenge.amountSaved = (challenge.amountSaved || 0) + amount;
  challenge.successDays = (challenge.successDays || 0) + 1;

  // Check if challenge completed
  const progress = calculateChallengeProgress(challenge);
  if (progress >= 100) {
    completeChallenge(challengeId);
  } else {
    saveFeaturesData();
    closeChallengeModal();
    openChallengeDetails(challengeId);
    showToast(
      "success",
      "Progress Logged",
      `${formatCurrency(amount)} added to your challenge!`
    );
  }
}

function completeChallenge(challengeId) {
  const challenge = (featuresData.challenges.active || []).find(
    (c) => c.id === challengeId
  );
  if (!challenge) return;

  const config = CHALLENGES_CONFIG.find((c) => c.id === challengeId);

  // Move to completed
  featuresData.challenges.active = featuresData.challenges.active.filter(
    (c) => c.id !== challengeId
  );
  featuresData.challenges.completed = featuresData.challenges.completed || [];
  featuresData.challenges.completed.push({
    ...challenge,
    completedDate: new Date().toISOString(),
    totalSaved: challenge.amountSaved,
  });

  saveFeaturesData();
  closeChallengeModal();
  renderChallenges();

  showToast(
    "success",
    "🎉 Challenge Completed!",
    `Congratulations! You completed "${config.name}"!`
  );
  showAchievementPopup(
    "🏆",
    "Challenge Complete!",
    `You finished ${config.name}`,
    "+200 XP"
  );

  // Add XP
  featuresData.achievements.xp = (featuresData.achievements.xp || 0) + 200;
  saveFeaturesData();

  checkAchievements();
}

function restartChallenge(challengeId) {
  // Remove from completed
  featuresData.challenges.completed = (
    featuresData.challenges.completed || []
  ).filter((c) => c.id !== challengeId);
  saveFeaturesData();

  // Start fresh
  startChallenge(challengeId);
}
// ==================== WISHLIST ====================
function renderWishlist() {
  const grid = document.getElementById("wishlistGrid");
  if (!grid) return;

  const items = featuresData.wishlist || [];
  const sortMethod = document.getElementById("wishlistSort")
    ? document.getElementById("wishlistSort").value
    : "priority";

  // Sort items
  items.sort((a, b) => {
    switch (sortMethod) {
      case "priority":
        const pMap = { high: 3, medium: 2, low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "affordable":
        const aAfford = a.price <= appData.availableBalance ? 1 : 0;
        const bAfford = b.price <= appData.availableBalance ? 1 : 0;
        return bAfford - aAfford;
      default:
        return 0;
    }
  });

  // Calculate totals
  let totalValue = 0;
  let affordableCount = 0;

  items.forEach((item) => {
    totalValue += item.price;
    if (item.price <= appData.availableBalance) affordableCount++;
  });

  document.getElementById("wishlistTotal").textContent =
    formatCurrency(totalValue);
  document.getElementById("wishlistAffordable").textContent = affordableCount;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🎁</div>
        <div class="empty-state-title">Your wishlist is empty</div>
        <div class="empty-state-text">Add items you want to buy to track them</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = items
    .map((item) => {
      const canAfford = item.price <= appData.availableBalance;
      const progress = Math.min(
        100,
        Math.round((appData.availableBalance / item.price) * 100)
      );

      return `
      <div class="wishlist-item">
        <div class="wishlist-item-image">
          ${
            item.image
              ? `<img src="${item.image}" alt="${item.name}">`
              : `<span style="font-size: 48px;">${item.emoji || "🎁"}</span>`
          }
          <div class="wishlist-item-priority ${item.priority}"></div>
        </div>
        <div class="wishlist-item-content">
          <div class="wishlist-item-name">${item.name}</div>
          <div class="wishlist-item-price">${formatCurrency(item.price)}</div>
          
          <div class="wishlist-item-status ${
            canAfford ? "affordable" : "saving"
          }">
            ${canAfford ? "✅ Can afford!" : `⏳ ${progress}% saved`}
          </div>
          
          <div class="wishlist-item-actions">
            <button class="btn btn-sm btn-secondary" onclick="editWishlist('${
              item.id
            }')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteWishlist('${
              item.id
            }')">
              <i class="fas fa-trash"></i>
            </button>
            ${
              canAfford
                ? `
              <button class="btn btn-sm btn-success" onclick="buyWishlistItem('${item.id}')">
                <i class="fas fa-shopping-cart"></i> Buy
              </button>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

function openWishlistModal(itemId = null) {
  const modal = document.getElementById("wishlistModal");
  if (!modal) return;

  modal.classList.add("active");

  document.getElementById("wishlistItemName").value = "";
  document.getElementById("wishlistItemPrice").value = "";
  document.getElementById("wishlistItemPriority").value = "medium";
  document.getElementById("wishlistItemUrl").value = "";
  document.getElementById("wishlistItemImage").value = "";
  document.getElementById("wishlistItemNotes").value = "";
  document.getElementById("editWishlistId").value = "";

  document
    .querySelectorAll("#wishlistCategoryPicker .emoji-option")
    .forEach((e) => e.classList.remove("selected"));
  document
    .querySelector('#wishlistCategoryPicker .emoji-option[data-emoji="🎁"]')
    .classList.add("selected");

  setupEmojiPicker("wishlistCategoryPicker");

  if (itemId) {
    const item = featuresData.wishlist.find((i) => i.id === itemId);
    if (item) {
      document.getElementById("wishlistItemName").value = item.name;
      document.getElementById("wishlistItemPrice").value = item.price;
      document.getElementById("wishlistItemPriority").value = item.priority;
      document.getElementById("wishlistItemUrl").value = item.url || "";
      document.getElementById("wishlistItemImage").value = item.image || "";
      document.getElementById("wishlistItemNotes").value = item.notes || "";
      document.getElementById("editWishlistId").value = item.id;

      document
        .querySelectorAll("#wishlistCategoryPicker .emoji-option")
        .forEach((e) => {
          e.classList.toggle("selected", e.dataset.emoji === item.emoji);
        });
    }
  }
}

function closeWishlistModal() {
  const modal = document.getElementById("wishlistModal");
  if (modal) modal.classList.remove("active");
}

function saveWishlistItem() {
  const name = document.getElementById("wishlistItemName").value.trim();
  const price = parseFloat(document.getElementById("wishlistItemPrice").value);
  const priority = document.getElementById("wishlistItemPriority").value;
  const url = document.getElementById("wishlistItemUrl").value.trim();
  const image = document.getElementById("wishlistItemImage").value.trim();
  const notes = document.getElementById("wishlistItemNotes").value.trim();
  const editId = document.getElementById("editWishlistId").value;

  const selectedEmoji = document.querySelector(
    "#wishlistCategoryPicker .emoji-option.selected"
  );
  const emoji = selectedEmoji ? selectedEmoji.dataset.emoji : "🎁";

  if (!name || !price) {
    showToast("error", "Error", "Name and price are required");
    return;
  }

  const itemData = {
    id: editId ? editId : "item_" + Date.now(),
    name,
    price,
    priority,
    url,
    image,
    notes,
    emoji,
    createdAt: new Date().toISOString(),
  };

  if (editId) {
    const index = featuresData.wishlist.findIndex((i) => i.id === editId);
    if (index !== -1) featuresData.wishlist[index] = itemData;
  } else {
    featuresData.wishlist.push(itemData);
  }

  saveFeaturesData();
  renderWishlist();
  updateAllFeaturesBadges();
  closeWishlistModal();
  showToast("success", "Saved", "Wishlist item saved successfully");
}

function deleteWishlist(id) {
  if (confirm("Remove this item from wishlist?")) {
    featuresData.wishlist = featuresData.wishlist.filter((i) => i.id !== id);
    saveFeaturesData();
    renderWishlist();
    updateAllFeaturesBadges();
  }
}

function buyWishlistItem(id) {
  const item = featuresData.wishlist.find((i) => i.id === id);
  if (!item) return;

  if (confirm(`Buy "${item.name}" for ${formatCurrency(item.price)}?`)) {
    // Add expense
    appData.transactions.push({
      amount: item.price,
      type: "expense",
      description: `Bought wishlist item: ${item.name}`,
      category: "shopping",
      date: new Date().toISOString(),
      spendSource: "available",
    });

    // Remove from wishlist
    featuresData.wishlist = featuresData.wishlist.filter((i) => i.id !== id);
    featuresData.purchasedWishlistItems =
      (featuresData.purchasedWishlistItems || 0) + 1;

    saveData();
    saveFeaturesData();
    updateUI();
    renderTransactions();
    renderWishlist();
    updateAllFeaturesBadges();
    checkAchievements();

    showToast("success", "Item Purchased!", `Enjoy your new ${item.name}! 🎉`);
    addAIMessage(
      `🎉 Congratulations on buying "${item.name}" from your wishlist! You worked hard for it!`
    );
  }
}

function sortWishlist() {
  renderWishlist();
}

// ==================== ACHIEVEMENTS LOGIC ====================
function renderAchievements() {
  const grid = document.getElementById("achievementsGrid");
  if (!grid) return;

  const unlockedIds = featuresData.achievements.unlocked || [];
  let filter = "all";

  // Check active tab
  document.querySelectorAll(".achievement-tab").forEach((tab) => {
    if (tab.classList.contains("active")) {
      filter = tab.textContent.toLowerCase();
    }
  });

  // Calculate totals
  const totalXP = featuresData.achievements.xp || 0;
  const currentLevel = SAVER_LEVELS.find(
    (l) => totalXP >= l.minXP && totalXP < l.maxXP
  );
  const nextLevel = SAVER_LEVELS.find(
    (l) => l.level === currentLevel.level + 1
  );

  // Update Summary
  document.getElementById("currentLevelBadge").textContent = currentLevel.icon;
  document.getElementById("currentLevelName").textContent = currentLevel.name;
  document.getElementById("totalXP").textContent = totalXP;
  document.getElementById(
    "unlockedCount"
  ).textContent = `${unlockedIds.length}/${ACHIEVEMENTS_CONFIG.length}`;

  if (nextLevel) {
    const progress =
      ((totalXP - currentLevel.minXP) /
        (currentLevel.maxXP - currentLevel.minXP)) *
      100;
    document.getElementById("levelProgressBar").style.width = `${progress}%`;
    document.getElementById(
      "levelProgressText"
    ).textContent = `${totalXP}/${currentLevel.maxXP} XP to next level`;
  } else {
    document.getElementById("levelProgressBar").style.width = "100%";
    document.getElementById("levelProgressText").textContent =
      "Max Level Reached!";
  }

  // Filter and Render Cards
  let achievementsToShow = ACHIEVEMENTS_CONFIG;
  if (filter === "unlocked") {
    achievementsToShow = ACHIEVEMENTS_CONFIG.filter((a) =>
      unlockedIds.includes(a.id)
    );
  } else if (filter === "locked") {
    achievementsToShow = ACHIEVEMENTS_CONFIG.filter(
      (a) => !unlockedIds.includes(a.id)
    );
  }

  grid.innerHTML = achievementsToShow
    .map((ach) => {
      const isUnlocked = unlockedIds.includes(ach.id);
      return `
      <div class="achievement-card ${isUnlocked ? "unlocked" : "locked"}">
        <div class="achievement-icon">${ach.icon}</div>
        <div class="achievement-name">${ach.name}</div>
        <div class="achievement-desc">${ach.desc}</div>
        <div class="achievement-xp">+${ach.xp} XP</div>
      </div>
    `;
    })
    .join("");
}

function checkAchievements() {
  const combinedData = { ...appData, ...featuresData };
  let newUnlock = false;

  ACHIEVEMENTS_CONFIG.forEach((ach) => {
    if (featuresData.achievements.unlocked.includes(ach.id)) return;

    if (ach.condition(combinedData)) {
      unlockAchievement(ach);
      newUnlock = true;
    }
  });

  if (newUnlock) {
    saveFeaturesData();
    renderAchievements();
  }
}

function unlockAchievement(achievement) {
  featuresData.achievements.unlocked.push(achievement.id);
  featuresData.achievements.xp =
    (featuresData.achievements.xp || 0) + achievement.xp;

  showAchievementPopup(
    achievement.icon,
    "Achievement Unlocked!",
    achievement.name,
    `+${achievement.xp} XP`
  );

  if (featuresData.settings.notifications.achievements) {
    showNotification(
      "Achievement Unlocked! 🏆",
      `You unlocked: ${achievement.name}`
    );
  }
}

function showAchievementPopup(icon, title, name, xp) {
  const popup = document.getElementById("achievementPopup");
  if (!popup) return;

  document.getElementById("achievementPopupBadge").textContent = icon;
  document.getElementById("achievementPopupName").textContent = name;
  document.getElementById("achievementPopupXP").textContent = xp;

  popup.classList.add("active");
  setTimeout(() => popup.classList.remove("active"), 4000);
}

function filterAchievements(filter) {
  document.querySelectorAll(".achievement-tab").forEach((tab) => {
    tab.classList.toggle(
      "active",
      tab.textContent.toLowerCase() === filter.toLowerCase()
    );
  });
  renderAchievements();
}

function checkForNewAchievements() {
  // Utility to check count without side effects (used for badges)
  const combinedData = { ...appData, ...featuresData };
  let count = 0;
  ACHIEVEMENTS_CONFIG.forEach((ach) => {
    if (!featuresData.achievements.unlocked.includes(ach.id)) {
      if (ach.condition(combinedData)) count++;
    }
  });
  return count;
}

// ==================== NET WORTH ====================
function renderNetWorth() {
  const chartCtx = document.getElementById("netWorthChart");
  if (!chartCtx) return;

  const assets = featuresData.networth.assets || [];
  const liabilities = featuresData.networth.liabilities || [];

  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
  const netWorth =
    totalAssets - totalLiabilities + appData.savings + appData.availableBalance;

  // Include savings and balance as cash assets
  const cashAsset = appData.savings + appData.availableBalance;

  document.getElementById("totalNetWorth").textContent =
    formatCurrency(netWorth);
  document.getElementById("totalAssets").textContent = formatCurrency(
    totalAssets + cashAsset
  );
  document.getElementById("totalLiabilities").textContent =
    formatCurrency(totalLiabilities);

  renderAssetList(assets, cashAsset);
  renderLiabilityList(liabilities);
  renderNetWorthChart(totalAssets + cashAsset, totalLiabilities);
}

function renderAssetList(assets, cash) {
  const list = document.getElementById("assetsList");
  let html = "";

  // Always show cash/savings
  html += `
    <div class="networth-item">
      <div class="networth-item-name">💵 Cash & Savings</div>
      <div class="networth-item-value" style="color: var(--accent-green)">${formatCurrency(
        cash
      )}</div>
    </div>
  `;

  assets.forEach((asset) => {
    html += `
      <div class="networth-item">
        <div class="networth-item-name">${asset.icon || "💎"} ${
      asset.name
    }</div>
        <div class="networth-item-value">${formatCurrency(asset.value)}</div>
        <button class="btn btn-sm btn-icon" onclick="deleteAsset('${
          asset.id
        }')" style="margin-left: 8px; color: var(--text-muted)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  });

  list.innerHTML = html;
}

function renderLiabilityList(liabilities) {
  const list = document.getElementById("liabilitiesList");
  let html = "";

  liabilities.forEach((liability) => {
    html += `
      <div class="networth-item">
        <div class="networth-item-name">${liability.icon || "💳"} ${
      liability.name
    }</div>
        <div class="networth-item-value" style="color: var(--accent-red)">${formatCurrency(
          liability.value
        )}</div>
        <button class="btn btn-sm btn-icon" onclick="deleteLiability('${
          liability.id
        }')" style="margin-left: 8px; color: var(--text-muted)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  });

  list.innerHTML = html;
}

function openAssetModal() {
  document.getElementById("assetModal").classList.add("active");
  document.getElementById("assetModalTitle").textContent = "Add Asset";
  document.getElementById("assetType").value = "asset";
  document.getElementById("assetName").value = "";
  document.getElementById("assetValue").value = "";
}

function openLiabilityModal() {
  document.getElementById("assetModal").classList.add("active");
  document.getElementById("assetModalTitle").textContent = "Add Liability";
  document.getElementById("assetType").value = "liability";
  document.getElementById("assetName").value = "";
  document.getElementById("assetValue").value = "";
}

function closeAssetModal() {
  document.getElementById("assetModal").classList.remove("active");
}

function saveAsset() {
  const type = document.getElementById("assetType").value;
  const name = document.getElementById("assetName").value.trim();
  const value = parseFloat(document.getElementById("assetValue").value);
  const category = document.getElementById("assetCategory").value;

  if (!name || isNaN(value)) {
    showToast("error", "Error", "Invalid input");
    return;
  }

  const item = {
    id: Date.now().toString(),
    name,
    value,
    category,
    icon: type === "asset" ? "💎" : "💳",
  };

  if (type === "asset") {
    featuresData.networth.assets.push(item);
  } else {
    featuresData.networth.liabilities.push(item);
  }

  saveFeaturesData();
  renderNetWorth();
  closeAssetModal();
}

function deleteAsset(id) {
  featuresData.networth.assets = featuresData.networth.assets.filter(
    (a) => a.id !== id
  );
  saveFeaturesData();
  renderNetWorth();
}

function deleteLiability(id) {
  featuresData.networth.liabilities = featuresData.networth.liabilities.filter(
    (l) => l.id !== id
  );
  saveFeaturesData();
  renderNetWorth();
}

function calculateNetWorth(data) {
  const assets = (data.networth?.assets || []).reduce(
    (sum, a) => sum + a.value,
    0
  );
  const liabilities = (data.networth?.liabilities || []).reduce(
    (sum, l) => sum + l.value,
    0
  );
  const cash = (data.savings || 0) + (data.availableBalance || 0);
  return assets + cash - liabilities;
}

function renderNetWorthChart(assets, liabilities) {
  const ctx = document.getElementById("netWorthChart");
  if (!ctx) return;

  // Simple bar chart
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Assets", "Liabilities", "Net Worth"],
      datasets: [
        {
          label: "Amount",
          data: [assets, liabilities, assets - liabilities],
          backgroundColor: [
            "rgba(16, 185, 129, 0.5)",
            "rgba(239, 68, 68, 0.5)",
            "rgba(139, 92, 246, 0.5)",
          ],
          borderColor: ["#10b981", "#ef4444", "#8b5cf6"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "#a1a1aa" },
        },
        x: {
          grid: { display: false },
          ticks: { color: "#a1a1aa" },
        },
      },
    },
  });
}

// ==================== REPORTS & PREDICTIONS ====================
function openReportModal() {
  document.getElementById("reportModal").classList.add("active");
}

function closeReportModal() {
  document.getElementById("reportModal").classList.remove("active");
}

function generateReport() {
  // In a real PWA, you would use jsPDF.
  // Here we'll use the browser's print function with a specialized print view.

  const printContent = document.createElement("div");
  printContent.id = "print-area";

  const now = new Date();
  const reportHTML = `
    <div style="padding: 40px; font-family: sans-serif; color: black; background: white;">
      <h1 style="text-align: center; margin-bottom: 10px;">Money AI Pro Report</h1>
      <p style="text-align: center; color: #666;">Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}</p>
      
      <div style="margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h3>Financial Summary</h3>
          <p><strong>Total Income:</strong> ${formatCurrency(
            appData.totalIncome
          )}</p>
          <p><strong>Total Savings:</strong> ${formatCurrency(
            appData.savings
          )}</p>
          <p><strong>Available Balance:</strong> ${formatCurrency(
            appData.availableBalance
          )}</p>
          <p><strong>Net Worth:</strong> ${formatCurrency(
            calculateNetWorth({ ...appData, ...featuresData })
          )}</p>
        </div>
        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h3>Statistics</h3>
          <p><strong>Saving Streak:</strong> ${appData.stats.streak} days</p>
          <p><strong>Total Transactions:</strong> ${
            appData.transactions.length
          }</p>
          <p><strong>Active Goals:</strong> ${
            appData.goals.filter((g) => g.current < g.target).length
          }</p>
          <p><strong>Completed Challenges:</strong> ${
            (featuresData.challenges.completed || []).length
          }</p>
        </div>
      </div>

      <h3 style="margin-top: 40px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Recent Transactions</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left;">Date</th>
            <th style="padding: 10px; text-align: left;">Description</th>
            <th style="padding: 10px; text-align: left;">Category</th>
            <th style="padding: 10px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${appData.transactions
            .slice(-15)
            .reverse()
            .map(
              (t) => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px;">${new Date(
                t.date
              ).toLocaleDateString()}</td>
              <td style="padding: 10px;">${t.description}</td>
              <td style="padding: 10px;">${t.category}</td>
              <td style="padding: 10px; text-align: right; color: ${
                t.type === "expense" ? "red" : "green"
              };">
                ${t.type === "expense" ? "-" : "+"}${formatCurrency(t.amount)}
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      
      <p style="text-align: center; margin-top: 50px; font-size: 12px; color: #999;">End of Report • Money AI Pro</p>
    </div>
  `;

  printContent.innerHTML = reportHTML;
  document.body.appendChild(printContent);

  // Add print styles
  const style = document.createElement("style");
  style.innerHTML = `
    @media print {
      body > * { display: none !important; }
      #print-area { display: block !important; }
    }
  `;
  document.head.appendChild(style);

  window.print();

  // Cleanup
  document.body.removeChild(printContent);
  document.head.removeChild(style);
  closeReportModal();
}

function openPredictionsModal() {
  document.getElementById("predictionsModal").classList.add("active");
  calculatePredictions();
}

function closePredictionsModal() {
  document.getElementById("predictionsModal").classList.remove("active");
}

function calculatePredictions() {
  const content = document.getElementById("predictionsContent");
  if (!content) return;

  // Simple prediction based on average daily spending
  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  const daysPassed = now.getDate();

  let monthlySpent = 0;
  appData.transactions.forEach((t) => {
    const d = new Date(t.date);
    if (t.type === "expense" && d.getMonth() === now.getMonth()) {
      monthlySpent += t.amount;
    }
  });

  const avgDaily = daysPassed > 0 ? monthlySpent / daysPassed : 0;
  const predictedTotal = avgDaily * daysInMonth;
  const remaining = predictedTotal - monthlySpent;

  content.innerHTML = `
    <div class="prediction-card">
      <div class="prediction-icon">🔮</div>
      <h3>End of Month Forecast</h3>
      <div class="prediction-amount">${formatCurrency(predictedTotal)}</div>
      <p>Based on your current spending of <strong>${formatCurrency(
        avgDaily
      )}/day</strong></p>
    </div>
    
    <div class="prediction-details">
      <div class="prediction-row">
        <span>Already Spent:</span>
        <span>${formatCurrency(monthlySpent)}</span>
      </div>
      <div class="prediction-row">
        <span>Predicted Remaining:</span>
        <span>${formatCurrency(remaining)}</span>
      </div>
    </div>
    
    <div class="ai-tip-box">
      <i class="fas fa-robot"></i>
      <p>
        ${
          predictedTotal > appData.dailyIncome * 30
            ? "⚠️ You are projected to spend more than your income this month! Try cutting back on non-essentials."
            : "✅ You are on track to stay within your income! Great job!"
        }
      </p>
    </div>
  `;
}

// ==================== SETTINGS & NOTIFICATIONS ====================
function openSettingsModal() {
  document.getElementById("settingsModal").classList.add("active");

  // Load current settings
  document.getElementById("settingsCurrency").value = appData.settings.currency;
  document.getElementById("settingsSavingsGoal").value =
    appData.settings.savingsPercentage;
  document.getElementById("settingsSavingsLabel").textContent =
    appData.settings.savingsPercentage + "%";

  // Toggles
  document.getElementById("notifyDailyReminder").checked =
    featuresData.settings.notifications.dailyReminder;
  document.getElementById("notifyGoalProgress").checked =
    featuresData.settings.notifications.goalProgress;
}

function closeSettingsModal() {
  document.getElementById("settingsModal").classList.remove("active");
}

function saveSettings() {
  const newCurrency = document.getElementById("settingsCurrency").value;
  const newRate = document.getElementById("settingsSavingsGoal").value;

  // Update core settings
  if (newCurrency !== appData.settings.currency) {
    setCurrency(newCurrency); // This function is in script.js
  }

  appData.settings.savingsPercentage = parseInt(newRate);

  // Update feature settings
  featuresData.settings.notifications.dailyReminder = document.getElementById(
    "notifyDailyReminder"
  ).checked;
  featuresData.settings.notifications.goalProgress =
    document.getElementById("notifyGoalProgress").checked;

  saveData(); // Save core data
  saveFeaturesData(); // Save feature data

  closeSettingsModal();
  showToast("success", "Settings Saved", "Your preferences have been updated");
}

function showSettingsTab(tabName) {
  document
    .querySelectorAll(".settings-content")
    .forEach((el) => (el.style.display = "none"));
  document.getElementById(
    `settings${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`
  ).style.display = "block";

  document
    .querySelectorAll(".settings-tab")
    .forEach((el) => el.classList.remove("active"));
  // This logic assumes specific tab buttons have handlers, simple toggle for now
}

function initNotifications() {
  if ("Notification" in window && featuresData.settings.notifications.enabled) {
    // Check if we need to send a daily reminder
    const lastReminded = localStorage.getItem("last_daily_reminder");
    const today = new Date().toDateString();

    if (
      lastReminded !== today &&
      featuresData.settings.notifications.dailyReminder
    ) {
      setTimeout(() => {
        showNotification(
          "Daily Reminder",
          "Don't forget to log your expenses and savings today! 💰"
        );
        localStorage.setItem("last_daily_reminder", today);
      }, 5000); // Show shortly after app open
    }
  }
}

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    showToast(
      "error",
      "Not Supported",
      "This browser does not support notifications"
    );
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      featuresData.settings.notifications.enabled = true;
      saveFeaturesData();
      showToast("success", "Enabled", "Notifications have been enabled");
      showNotification("Hello!", "Notifications are working perfectly 🎉");
    }
  });
}

function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: "icons/icon-192.png",
      badge: "icons/icon-192.png",
    });
  }
}

function scheduleBillReminder(bill) {
  // In a real app, this would use the Push API or Service Worker
  // Here we just log it for demonstration
  console.log(`Reminder scheduled for bill: ${bill.name} on ${bill.dueDate}`);
}

function updateSettingsSavingsLabel() {
  const val = document.getElementById("settingsSavingsGoal").value;
  document.getElementById("settingsSavingsLabel").textContent = val + "%";
}

// ==================== PANEL SWITCHING LOGIC (OVERRIDES SCRIPT.JS) ====================
function switchPanel(panelName) {
  currentPanel = panelName;

  // 1. Update Navigation Styling
  document.querySelectorAll(".nav-item[data-panel]").forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-panel") === panelName
    );
  });

  // 2. Hide ALL Panels
  const allPanels = [
    "dashboardPanel",
    "goalsPanel",
    "transactionsPanel",
    "analyticsPanel",
    "calendarPanel",
    "walletsPanel",
    "recurringPanel",
    "challengesPanel",
    "wishlistPanel",
    "achievementsPanel",
    "networthPanel",
  ];

  allPanels.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  // 3. Show the Selected Panel
  // Special case for dashboard (id is dashboardPanel, not dashboardPanelPanel)
  const targetId =
    panelName === "dashboard" ? "dashboardPanel" : panelName + "Panel";
  const targetPanel = document.getElementById(targetId);

  if (targetPanel) {
    targetPanel.style.display = "block";
  }

  // 4. Trigger Specific Render Functions
  // This ensures the data is fresh when you click the tab
  switch (panelName) {
    case "dashboard":
      updateUI();
      break;
    case "goals":
      renderGoals(); // Function in script.js
      if (typeof renderGoalsPanel === "function") renderGoalsPanel();
      break;
    case "transactions":
      renderTransactions(); // Function in script.js
      if (typeof renderTransactionsPanel === "function")
        renderTransactionsPanel();
      break;
    case "analytics":
      if (typeof renderAnalyticsPanel === "function") renderAnalyticsPanel();
      break;
    case "calendar":
      renderCalendar();
      break;
    case "wallets":
      renderWallets();
      break;
    case "recurring":
      renderRecurring();
      break;
    case "challenges":
      renderChallenges();
      break;
    case "wishlist":
      renderWishlist();
      break;
    case "achievements":
      renderAchievements();
      break;
    case "networth":
      renderNetWorth();
      break;
  }

  // 5. Close Mobile Sidebar (if open)
  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  }
}

// Disable Tags UI
document.addEventListener("DOMContentLoaded", () => {
  const tagsGroup = document.getElementById("tagsFormGroup");
  if (tagsGroup) tagsGroup.style.display = "none";
});
