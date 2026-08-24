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
        10,
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
      total,
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
    "0",
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
          (date - startDate) / (7 * 24 * 60 * 60 * 1000),
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
            net,
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
                  event.amount,
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
                    event.amount,
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
    "#billEmojiPicker .emoji-option.selected",
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
      (b) => b.id === parseInt(editId),
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
    "#eventEmojiPicker .emoji-option.selected",
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
      (e) => e.id === parseInt(editId),
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
    (e) => e.id === eventId,
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
    (e) => e.id === eventId,
  );
  if (event && confirm(`Delete "${event.name}"?`)) {
    featuresData.calendar.events = featuresData.calendar.events.filter(
      (e) => e.id !== eventId,
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
    (e) => e.id === eventId,
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
      `"${bill.name}" due date changed to ${newDate}`,
    );
  }
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
            appData.totalIncome,
          )}</p>
          <p><strong>Total Savings:</strong> ${formatCurrency(
            appData.savings,
          )}</p>
          <p><strong>Available Balance:</strong> ${formatCurrency(
            appData.availableBalance,
          )}</p>
          <p><strong>Net Worth:</strong> ${formatCurrency(
            calculateNetWorth({ ...appData, ...featuresData }),
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
                t.date,
              ).toLocaleDateString()}</td>
              <td style="padding: 10px;">${t.description}</td>
              <td style="padding: 10px;">${t.category}</td>
              <td style="padding: 10px; text-align: right; color: ${
                t.type === "expense" ? "red" : "green"
              };">
                ${t.type === "expense" ? "-" : "+"}${formatCurrency(t.amount)}
              </td>
            </tr>
          `,
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
    0,
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
        avgDaily,
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
    "notifyDailyReminder",
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
    `settings${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`,
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
          "Don't forget to log your expenses and savings today! 💰",
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
      "This browser does not support notifications",
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

  document.querySelectorAll(".nav-item[data-panel]").forEach((item) => {
    item.classList.toggle("active", item.dataset.panel === panelName);
  });

  [
    "dashboardPanel",
    "goalsPanel",
    "transactionsPanel",
    "analyticsPanel",
    "calendarPanel",
  ].forEach((id) => {
    const panel = document.getElementById(id);
    if (panel) panel.style.display = "none";
  });

  const selectedPanel = document.getElementById(`${panelName}Panel`);
  if (selectedPanel) selectedPanel.style.display = "block";

  switch (panelName) {
    case "dashboard":
      updateUI();
      break;
    case "goals":
      renderGoals();
      renderGoalsPanel?.();
      break;
    case "transactions":
      renderTransactions();
      renderTransactionsPanel?.();
      break;
    case "analytics":
      renderAnalyticsPanel?.();
      break;
    case "calendar":
      initCalendar();
      renderCalendar();
      break;
  }
}

// Disable Tags UI
document.addEventListener("DOMContentLoaded", () => {
  const tagsGroup = document.getElementById("tagsFormGroup");
  if (tagsGroup) tagsGroup.style.display = "none";
});
