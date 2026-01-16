// ==================== CONFIGURATION ====================
const CURRENCIES = {
  USD: { symbol: "$", name: "US Dollar", flag: "🇺🇸", locale: "en-US" },
  EUR: { symbol: "€", name: "Euro", flag: "🇪🇺", locale: "de-DE" },
  PLN: { symbol: "zł", name: "Polish Złoty", flag: "🇵🇱", locale: "pl-PL" },
  GBP: { symbol: "£", name: "British Pound", flag: "🇬🇧", locale: "en-GB" },
  JPY: { symbol: "¥", name: "Japanese Yen", flag: "🇯🇵", locale: "ja-JP" },
  CHF: { symbol: "Fr", name: "Swiss Franc", flag: "🇨🇭", locale: "de-CH" },
  CAD: { symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦", locale: "en-CA" },
  AUD: { symbol: "A$", name: "Australian Dollar", flag: "🇦🇺", locale: "en-AU" },
};

// Exchange rates (all rates relative to each currency) - CORRECTED
const EXCHANGE_RATES = {
  USD: {
    EUR: 0.86,
    PLN: 3.64,
    GBP: 0.75,
    USD: 1,
    JPY: 158.15,
    CHF: 0.8,
    CAD: 1.39,
    AUD: 1.49,
  },
  EUR: {
    USD: 1.09,
    PLN: 4.3,
    GBP: 0.86,
    EUR: 1,
    JPY: 162.8,
    CHF: 0.96,
    CAD: 1.48,
    AUD: 1.67,
  },
  PLN: {
    USD: 0.25,
    EUR: 0.23,
    GBP: 0.2,
    PLN: 1,
    JPY: 37.85,
    CHF: 0.22,
    CAD: 0.34,
    AUD: 0.39,
  },
  GBP: {
    USD: 1.27,
    EUR: 1.16,
    PLN: 5.0,
    GBP: 1,
    JPY: 189.2,
    CHF: 1.11,
    CAD: 1.72,
    AUD: 1.94,
  },
  JPY: {
    USD: 0.0067,
    EUR: 0.0061,
    PLN: 0.026,
    GBP: 0.0053,
    JPY: 1,
    CHF: 0.0059,
    CAD: 0.0091,
    AUD: 0.01,
  },
  CHF: {
    USD: 1.14,
    EUR: 1.04,
    PLN: 4.49,
    GBP: 0.9,
    JPY: 170.0,
    CHF: 1,
    CAD: 1.55,
    AUD: 1.74,
  },
  CAD: {
    USD: 0.74,
    EUR: 0.68,
    PLN: 2.9,
    GBP: 0.58,
    JPY: 109.9,
    CHF: 0.65,
    CAD: 1,
    AUD: 1.13,
  },
  AUD: {
    USD: 0.65,
    EUR: 0.6,
    PLN: 2.58,
    GBP: 0.52,
    JPY: 97.7,
    CHF: 0.57,
    CAD: 0.89,
    AUD: 1,
  },
};

const EXPENSE_CATEGORIES = [
  { id: "food", name: "Food & Dining", emoji: "🍔" },
  { id: "transport", name: "Transport", emoji: "🚗" },
  { id: "shopping", name: "Shopping", emoji: "🛍️" },
  { id: "entertainment", name: "Entertainment", emoji: "🎬" },
  { id: "bills", name: "Bills & Utilities", emoji: "📄" },
  { id: "health", name: "Health", emoji: "🏥" },
  { id: "education", name: "Education", emoji: "📚" },
  { id: "travel", name: "Travel", emoji: "✈️" },
  { id: "subscriptions", name: "Subscriptions", emoji: "📱" },
  { id: "other", name: "Other", emoji: "📦" },
];

const INCOME_CATEGORIES = [
  { id: "salary", name: "Salary", emoji: "💼" },
  { id: "freelance", name: "Freelance", emoji: "💻" },
  { id: "investment", name: "Investment", emoji: "📈" },
  { id: "gift", name: "Gift", emoji: "🎁" },
  { id: "refund", name: "Refund", emoji: "💵" },
  { id: "bonus", name: "Bonus", emoji: "🎉" },
  { id: "rental", name: "Rental Income", emoji: "🏠" },
  { id: "other", name: "Other", emoji: "📦" },
];

const SAVINGS_TIPS = [
  "💡 The 50/30/20 rule: 50% needs, 30% wants, 20% savings!",
  "💡 Automate your savings - set up automatic transfers on payday.",
  "💡 Track every expense for a week to find hidden savings opportunities.",
  "💡 Before buying, wait 24 hours. You might realize you don't need it!",
  "💡 Cook at home more - restaurant meals cost 3-5x more than home cooking.",
  "💡 Cancel unused subscriptions - they add up faster than you think!",
  "💡 Use the envelope method: allocate cash for each spending category.",
  "💡 Set specific savings goals - you're 42% more likely to achieve them!",
  "💡 Pay yourself first - save before you spend, not after.",
  "💡 Challenge yourself: try a no-spend weekend once a month.",
  "💡 Round up your purchases and save the difference automatically.",
  "💡 Review and negotiate your bills annually - you could save hundreds!",
  "💡 Build an emergency fund covering 3-6 months of expenses.",
  "💡 The latte factor: small daily expenses add up to big yearly costs.",
  "💡 Use cash for discretionary spending - it hurts more to spend physical money!",
];

const AI_RESPONSES = {
  greetings: [
    "Hey there! 👋 How can I help you with your savings today?",
    "Hello! Ready to crush those savings goals? 💪",
    "Hi! I'm here to help you make smart money moves! 🚀",
  ],
  encouragement: [
    "You're doing amazing! Keep up the great work! 🌟",
    "Every penny saved is a penny earned! 💰",
    "Your future self will thank you for saving today! 🎯",
    "Consistency is key - you've got this! 💪",
  ],
  spending_warnings: [
    "Remember, every expense takes you further from your goals! 💭",
    "Think twice before spending - is this a need or a want? 🤔",
    "Consider if this expense aligns with your financial goals! 📊",
  ],
  confused: [
    "I'm not quite sure I understood that. Try asking about your savings, goals, or say things like 'add $50 to savings'.",
    "Could you rephrase that? I can help with savings summaries, adding money, or giving financial tips!",
    "Hmm, I didn't catch that. Try asking 'how much can I save?' or 'show my progress'.",
  ],
};

// ==================== APP STATE ====================
let appData = {
  savings: 0,
  dailyIncome: 0,
  goals: [],
  transactions: [],
  settings: {
    currency: "USD",
    savingsPercentage: 20,
    theme: "dark",
    notifications: true,
  },
  stats: {
    streak: 0,
    lastSaveDate: null,
    totalSavedAllTime: 0,
    totalSpentAllTime: 0,
  },
  onboardingComplete: false,
  availableBalance: 0,
  totalIncome: 0,
};

let currentTransactionFilter = "all";
let currentPanel = "dashboard";
let savingsChart = null;
let comparisonChart = null;
let currentChartPeriod = "week";

// ==================== CURRENCY CONVERSION ====================
function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;

  const rate = EXCHANGE_RATES[fromCurrency]?.[toCurrency];
  if (rate) {
    return amount * rate;
  }

  // Fallback: convert through USD if direct rate not found
  const toUSD = EXCHANGE_RATES[fromCurrency]?.["USD"] || 1;
  const fromUSD = EXCHANGE_RATES["USD"]?.[toCurrency] || 1;
  return amount * toUSD * fromUSD;
}

function getExchangeRate(fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return 1;
  return EXCHANGE_RATES[fromCurrency]?.[toCurrency] || 1;
}

function formatCurrencyWithSymbol(amount, currencyCode) {
  const currency = CURRENCIES[currencyCode];
  if (!currency) return amount.toFixed(2);

  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  return `${currency.symbol}${formatted}`;
}

// ==================== INITIALIZATION ====================
function init() {
  loadData();

  if (!appData.onboardingComplete) {
    showOnboarding();
  } else {
    hideOnboarding();
    initializeApp();
  }
}

function initializeApp() {
  createPanelStructure();
  updateUI();
  renderGoals();
  renderTransactions();
  initChat();
  initCharts();
  updateGreeting();
  setupEventListeners();
  updateStreak();
  switchPanel("dashboard");
}

function createPanelStructure() {
  const dashboardPanel = document.getElementById("dashboardPanel");
  if (!dashboardPanel) return;

  const contentArea = dashboardPanel.parentElement;

  // Goals Panel
  if (!document.getElementById("goalsPanel")) {
    const goalsPanel = document.createElement("div");
    goalsPanel.id = "goalsPanel";
    goalsPanel.className = "panel-content";
    goalsPanel.style.display = "none";
    goalsPanel.innerHTML = `
      <div class="panel-header">
        <h2>🎯 Saving Goals</h2>
        <p>Track and manage your savings goals</p>
      </div>
      <div class="goals-grid" id="goalsPanelGrid"></div>
    `;
    contentArea.insertBefore(goalsPanel, document.querySelector(".ai-panel"));
  }

  // Transactions Panel
  if (!document.getElementById("transactionsPanel")) {
    const transactionsPanel = document.createElement("div");
    transactionsPanel.id = "transactionsPanel";
    transactionsPanel.className = "panel-content";
    transactionsPanel.style.display = "none";
    transactionsPanel.innerHTML = `
      <div class="panel-header">
        <h2>📋 All Transactions</h2>
        <p>Complete history of your financial activity</p>
      </div>
      <div class="transactions-controls">
        <div class="transactions-tabs" id="transactionsPanelTabs">
          <button class="transaction-tab active" onclick="filterTransactions('all')">All</button>
          <button class="transaction-tab" onclick="filterTransactions('income')">Income</button>
          <button class="transaction-tab" onclick="filterTransactions('saving')">Savings</button>
          <button class="transaction-tab" onclick="filterTransactions('expense')">Expenses</button>
        </div>
        <div class="transactions-actions">
          <button class="btn btn-success" onclick="openIncomeModal()">
            <i class="fas fa-plus"></i> Income
          </button>
          <button class="btn btn-primary" onclick="openTransactionModal('saving')">
            <i class="fas fa-piggy-bank"></i> Save
          </button>
          <button class="btn btn-danger" onclick="openSpendModal()">
            <i class="fas fa-shopping-cart"></i> Spend
          </button>
        </div>
      </div>
      <div class="transactions-section full-height">
        <div class="transaction-list" id="transactionsPanelList"></div>
      </div>
    `;
    contentArea.insertBefore(
      transactionsPanel,
      document.querySelector(".ai-panel")
    );
  }

  // Analytics Panel
  if (!document.getElementById("analyticsPanel")) {
    const analyticsPanel = document.createElement("div");
    analyticsPanel.id = "analyticsPanel";
    analyticsPanel.className = "panel-content";
    analyticsPanel.style.display = "none";
    analyticsPanel.innerHTML = `
      <div class="panel-header">
        <h2>📊 Analytics</h2>
        <p>Insights into your financial health</p>
      </div>
      <div class="analytics-grid">
        <div class="analytics-card">
          <h3>💰 Savings Overview</h3>
          <div class="analytics-stat">
            <span class="analytics-value" id="analyticsTotalSaved">$0</span>
            <span class="analytics-label">Total Saved</span>
          </div>
          <div class="analytics-stat">
            <span class="analytics-value" id="analyticsAvailable">$0</span>
            <span class="analytics-label">Available Balance</span>
          </div>
        </div>
        <div class="analytics-card">
          <h3>💸 Spending Overview</h3>
          <div class="analytics-stat">
            <span class="analytics-value negative" id="analyticsMonthlySpent">$0</span>
            <span class="analytics-label">This Month</span>
          </div>
          <div class="analytics-stat">
            <span class="analytics-value negative" id="analyticsAllTimeSpent">$0</span>
            <span class="analytics-label">All-Time Spent</span>
          </div>
        </div>
        <div class="analytics-card">
          <h3>📈 Savings Rate</h3>
          <div class="analytics-stat">
            <span class="analytics-value" id="analyticsRate">0%</span>
            <span class="analytics-label">Current Rate</span>
          </div>
          <div class="analytics-stat">
            <span class="analytics-value" id="analyticsStreak">0</span>
            <span class="analytics-label">Day Streak</span>
          </div>
        </div>
        <div class="analytics-card full-width">
          <h3>📊 Spending by Category</h3>
          <div class="category-breakdown" id="categoryBreakdown"></div>
        </div>
        <div class="analytics-card full-width">
          <h3>💱 Currency Converter</h3>
          <div class="converter-inline">
            <div class="converter-row">
              <input type="number" id="inlineConverterAmount" class="form-input" placeholder="100" value="100">
              <select id="inlineConverterFrom" class="form-input">
                ${Object.keys(CURRENCIES)
                  .map(
                    (c) =>
                      `<option value="${c}" ${c === "PLN" ? "selected" : ""}>${
                        CURRENCIES[c].flag
                      } ${c}</option>`
                  )
                  .join("")}
              </select>
              <span class="converter-arrow"><i class="fas fa-arrow-right"></i></span>
              <select id="inlineConverterTo" class="form-input">
                ${Object.keys(CURRENCIES)
                  .map(
                    (c) =>
                      `<option value="${c}" ${c === "USD" ? "selected" : ""}>${
                        CURRENCIES[c].flag
                      } ${c}</option>`
                  )
                  .join("")}
              </select>
              <button class="btn btn-primary" onclick="convertInline()">Convert</button>
            </div>
            <div class="converter-result" id="inlineConverterResult">
              Enter an amount and click Convert
            </div>
          </div>
        </div>
      </div>
    `;
    contentArea.insertBefore(
      analyticsPanel,
      document.querySelector(".ai-panel")
    );
  }
}

function loadData() {
  const saved = localStorage.getItem("saveAI_pro_data");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appData = { ...appData, ...parsed };
    } catch (e) {
      console.error("Error loading data:", e);
    }
  }
}

function saveData() {
  try {
    localStorage.setItem("saveAI_pro_data", JSON.stringify(appData));
  } catch (e) {
    console.error("Error saving data:", e);
    showToast("error", "Save Error", "Could not save data to storage");
  }
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-item[data-panel]").forEach((item) => {
    item.addEventListener("click", function () {
      const panel = this.getAttribute("data-panel");
      switchPanel(panel);
    });
  });

  // Emoji picker
  document.querySelectorAll(".emoji-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".emoji-option")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  // Close modals on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Close modals when clicking outside
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.classList.remove("active");
  });
}

// ==================== PANEL NAVIGATION ====================
function switchPanel(panelName) {
  currentPanel = panelName;

  // Update navigation
  document.querySelectorAll(".nav-item[data-panel]").forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-panel") === panelName
    );
  });

  // Hide all panels
  document.getElementById("dashboardPanel").style.display = "none";
  const goalsPanel = document.getElementById("goalsPanel");
  const transactionsPanel = document.getElementById("transactionsPanel");
  const analyticsPanel = document.getElementById("analyticsPanel");

  if (goalsPanel) goalsPanel.style.display = "none";
  if (transactionsPanel) transactionsPanel.style.display = "none";
  if (analyticsPanel) analyticsPanel.style.display = "none";

  // Show selected panel
  switch (panelName) {
    case "dashboard":
      document.getElementById("dashboardPanel").style.display = "block";
      break;
    case "goals":
      if (goalsPanel) {
        goalsPanel.style.display = "block";
        renderGoalsPanel();
      }
      break;
    case "transactions":
      if (transactionsPanel) {
        transactionsPanel.style.display = "block";
        renderTransactionsPanel();
      }
      break;
    case "analytics":
      if (analyticsPanel) {
        analyticsPanel.style.display = "block";
        renderAnalyticsPanel();
      }
      break;
  }
}

function renderGoalsPanel() {
  const grid = document.getElementById("goalsPanelGrid");
  if (!grid) return;

  let html = "";

  appData.goals.forEach((goal, index) => {
    const progress = (goal.current / goal.target) * 100;
    const remaining = goal.target - goal.current;
    const dailySaving =
      appData.dailyIncome * (appData.settings.savingsPercentage / 100);
    const daysNeeded = dailySaving > 0 ? Math.ceil(remaining / dailySaving) : 0;

    let progressClass = "low";
    if (progress >= 75) progressClass = "high";
    else if (progress >= 40) progressClass = "medium";
    if (progress >= 100) progressClass = "complete";

    let etaText = "";
    if (progress >= 100) {
      etaText = "✅ Goal completed!";
    } else if (goal.deadline) {
      const deadline = new Date(goal.deadline);
      const daysLeft = Math.ceil(
        (deadline - new Date()) / (1000 * 60 * 60 * 24)
      );
      etaText =
        daysLeft > 0
          ? `📅 ${daysLeft} days until deadline`
          : "⚠️ Deadline passed";
    } else if (daysNeeded > 0) {
      etaText = `⏱️ ~${daysNeeded} days to reach goal`;
    } else {
      etaText = "💡 Set income for estimate";
    }

    html += `
      <div class="goal-card priority-${goal.priority || "medium"}">
        <div class="goal-header">
          <span class="goal-emoji">${goal.emoji}</span>
          <div class="goal-menu">
            <button class="goal-menu-btn" onclick="openAddToGoalModal(${index})" title="Add money">
              <i class="fas fa-plus"></i>
            </button>
            <button class="goal-menu-btn delete" onclick="deleteGoal(${index})" title="Delete goal">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="goal-name">${goal.name}</div>
        <div class="goal-amounts">
          <span class="goal-current">${formatCurrency(goal.current)}</span>
          <span class="goal-target">of ${formatCurrency(goal.target)}</span>
        </div>
        <div class="goal-progress">
          <div class="goal-progress-bar ${progressClass}" style="width: ${Math.min(
      progress,
      100
    )}%"></div>
        </div>
        <div class="goal-footer">
          <div class="goal-eta">${etaText}</div>
          <div class="goal-percentage">${Math.min(progress, 100).toFixed(
            0
          )}%</div>
        </div>
        <div class="goal-actions">
          <button class="goal-btn add" onclick="openAddToGoalModal(${index})">
            <i class="fas fa-plus"></i> Add Money
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="add-goal-card" onclick="openGoalModal()">
      <div class="add-goal-icon">
        <i class="fas fa-plus"></i>
      </div>
      <div class="add-goal-text">Add New Goal</div>
    </div>
  `;

  grid.innerHTML = html;
}

function renderTransactionsPanel() {
  const list = document.getElementById("transactionsPanelList");
  if (!list) return;

  let transactions = [...appData.transactions].reverse();

  if (currentTransactionFilter !== "all") {
    transactions = transactions.filter(
      (t) => t.type === currentTransactionFilter
    );
  }

  if (transactions.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-title">No transactions yet</div>
        <div class="empty-state-text">Start by adding your income, savings, or expenses!</div>
      </div>
    `;
    return;
  }

  list.innerHTML = transactions
    .map((t) => {
      const iconClass = t.type;
      const icon =
        t.type === "income"
          ? "arrow-down"
          : t.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const amountClass = t.type === "expense" ? "negative" : "positive";
      const sign = t.type === "expense" ? "-" : "+";
      const date = new Date(t.date);
      const formattedDate = date.toLocaleDateString(
        CURRENCIES[appData.settings.currency].locale,
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
      const formattedTime = date.toLocaleTimeString(
        CURRENCIES[appData.settings.currency].locale,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      // Show original currency if different
      let currencyNote = "";
      if (
        t.originalCurrency &&
        t.originalCurrency !== appData.settings.currency
      ) {
        currencyNote = `<span class="transaction-original">(${formatCurrencyWithSymbol(
          t.originalAmount,
          t.originalCurrency
        )})</span>`;
      }

      // Show spend source for expenses
      let sourceNote = "";
      if (t.type === "expense" && t.spendSource === "savings") {
        sourceNote = `<span class="transaction-original">(from savings)</span>`;
      }

      return `
      <div class="transaction-item">
        <div class="transaction-icon ${iconClass}">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">${
            t.description || t.type.charAt(0).toUpperCase() + t.type.slice(1)
          } ${currencyNote}${sourceNote}</div>
          <div class="transaction-meta">
            <span class="transaction-category">${getCategoryEmoji(
              t.category
            )} ${t.category || "General"}</span>
            <span>${formattedDate} • ${formattedTime}</span>
          </div>
        </div>
        <div class="transaction-amount ${amountClass}">${sign}${formatCurrency(
        t.amount
      )}</div>
      </div>
    `;
    })
    .join("");
}

function renderAnalyticsPanel() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let monthlyIncome = 0;
  let monthlySaved = 0;
  let monthlySpent = 0;
  const categorySpending = {};

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    if (
      tDate.getMonth() === currentMonth &&
      tDate.getFullYear() === currentYear
    ) {
      if (t.type === "income") monthlyIncome += t.amount;
      if (t.type === "saving") monthlySaved += t.amount;
      if (t.type === "expense") {
        monthlySpent += t.amount;
        const cat = t.category || "other";
        categorySpending[cat] = (categorySpending[cat] || 0) + t.amount;
      }
    }
  });

  const savingsRate =
    monthlyIncome > 0 ? ((monthlySaved / monthlyIncome) * 100).toFixed(0) : 0;

  // Update analytics values
  const totalSavedEl = document.getElementById("analyticsTotalSaved");
  const analyticsAvailableEl = document.getElementById("analyticsAvailable");
  const monthlySpentEl = document.getElementById("analyticsMonthlySpent");
  const allTimeSpentEl = document.getElementById("analyticsAllTimeSpent");
  const rateEl = document.getElementById("analyticsRate");
  const streakEl = document.getElementById("analyticsStreak");

  if (totalSavedEl) totalSavedEl.textContent = formatCurrency(appData.savings);
  if (analyticsAvailableEl)
    analyticsAvailableEl.textContent = formatCurrency(appData.availableBalance);
  if (monthlySpentEl) monthlySpentEl.textContent = formatCurrency(monthlySpent);
  if (allTimeSpentEl)
    allTimeSpentEl.textContent = formatCurrency(
      appData.stats.totalSpentAllTime || 0
    );
  if (rateEl) rateEl.textContent = savingsRate + "%";
  if (streakEl) streakEl.textContent = appData.stats.streak + " days";

  // Render category breakdown
  const categoryBreakdown = document.getElementById("categoryBreakdown");
  if (categoryBreakdown) {
    if (Object.keys(categorySpending).length === 0) {
      categoryBreakdown.innerHTML =
        '<p class="empty-text">No expenses this month</p>';
    } else {
      const sortedCategories = Object.entries(categorySpending).sort(
        (a, b) => b[1] - a[1]
      );
      const totalSpent = Object.values(categorySpending).reduce(
        (a, b) => a + b,
        0
      );

      categoryBreakdown.innerHTML = sortedCategories
        .map(([cat, amount]) => {
          const percentage = ((amount / totalSpent) * 100).toFixed(0);
          const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.id === cat) || {
            emoji: "📦",
            name: cat,
          };

          return `
          <div class="category-item">
            <div class="category-info">
              <span class="category-emoji">${categoryInfo.emoji}</span>
              <span class="category-name">${categoryInfo.name}</span>
            </div>
            <div class="category-bar-container">
              <div class="category-bar" style="width: ${percentage}%"></div>
            </div>
            <div class="category-amount">${formatCurrency(
              amount
            )} (${percentage}%)</div>
          </div>
        `;
        })
        .join("");
    }
  }

  // Update inline converter to show current currency
  const inlineConverterTo = document.getElementById("inlineConverterTo");
  if (inlineConverterTo) {
    inlineConverterTo.value = appData.settings.currency;
  }
}

function convertInline() {
  const amount = parseFloat(
    document.getElementById("inlineConverterAmount").value
  );
  const fromCurrency = document.getElementById("inlineConverterFrom").value;
  const toCurrency = document.getElementById("inlineConverterTo").value;
  const resultEl = document.getElementById("inlineConverterResult");

  if (!amount || amount <= 0) {
    resultEl.innerHTML =
      '<span class="error">Please enter a valid amount</span>';
    return;
  }

  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  const rate = getExchangeRate(fromCurrency, toCurrency);

  resultEl.innerHTML = `
    <div class="conversion-result">
      <span class="conversion-from">${
        CURRENCIES[fromCurrency].flag
      } ${formatCurrencyWithSymbol(amount, fromCurrency)}</span>
      <span class="conversion-equals">=</span>
      <span class="conversion-to">${
        CURRENCIES[toCurrency].flag
      } ${formatCurrencyWithSymbol(converted, toCurrency)}</span>
    </div>
    <div class="conversion-rate">Rate: 1 ${fromCurrency} = ${rate.toFixed(
    4
  )} ${toCurrency}</div>
  `;
}

// ==================== CURRENCY CONVERTER MODAL ====================
function openConverterModal() {
  document.getElementById("converterModal").classList.add("active");

  const baseCurrency = appData.settings.currency;
  const available = appData.availableBalance || 0;

  // Set default currencies
  document.getElementById("converterFrom").value =
    baseCurrency === "PLN" ? "EUR" : "PLN";
  document.getElementById("converterTo").value = baseCurrency;
  document.getElementById("converterAmount").value = "100";

  // Show available balance
  document.getElementById("converterAvailableBalance").textContent =
    formatCurrency(available);
  document.getElementById("ratesBaseCurrency").textContent = baseCurrency;

  updateConversion();
  updateRatesTable();
}

function closeConverterModal() {
  document.getElementById("converterModal").classList.remove("active");
}

function swapCurrencies() {
  const fromSelect = document.getElementById("converterFrom");
  const toSelect = document.getElementById("converterTo");
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  updateConversion();
}

function updateConversion() {
  const amount =
    parseFloat(document.getElementById("converterAmount").value) || 0;
  const fromCurrency = document.getElementById("converterFrom").value;
  const toCurrency = document.getElementById("converterTo").value;

  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  const rate = getExchangeRate(fromCurrency, toCurrency);

  const resultEl = document.getElementById("converterResult");
  resultEl.innerHTML = `
    <div class="converter-result-label">${
      CURRENCIES[fromCurrency].flag
    } ${formatCurrencyWithSymbol(amount, fromCurrency)} =</div>
    <div class="converter-result-value">${
      CURRENCIES[toCurrency].flag
    } ${formatCurrencyWithSymbol(converted, toCurrency)}</div>
    <div class="converter-result-rate">1 ${fromCurrency} = ${rate.toFixed(
    4
  )} ${toCurrency}</div>
  `;
}

function updateRatesTable() {
  const table = document.getElementById("ratesTable");
  if (!table) return;

  const currentCurrency = appData.settings.currency;
  const allCurrencies = [
    "USD",
    "EUR",
    "PLN",
    "GBP",
    "JPY",
    "CHF",
    "CAD",
    "AUD",
  ];

  let html = "";

  allCurrencies.forEach((from) => {
    if (from !== currentCurrency) {
      const rate = getExchangeRate(from, currentCurrency);
      html += `
        <div class="rate-item">
          <span class="rate-from">${CURRENCIES[from].flag} 1 ${from}</span>
          <span class="rate-equals">=</span>
          <span class="rate-to">${formatCurrencyWithSymbol(
            rate,
            currentCurrency
          )}</span>
        </div>
      `;
    }
  });

  table.innerHTML = html;
}

function addConvertedAsIncome() {
  const amount =
    parseFloat(document.getElementById("converterAmount").value) || 0;
  const fromCurrency = document.getElementById("converterFrom").value;

  if (amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  closeConverterModal();

  // Open income modal with pre-filled values
  document.getElementById("incomeModal").classList.add("active");
  setIncomeType("foreign");
  document.getElementById("incomeForeignAmount").value = amount;
  document.getElementById("incomeForeignCurrency").value = fromCurrency;
  calculateIncomeConversion();

  // Reset category
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const defaultCat = document.querySelector(
    '#incomeCategoryGrid .category-option[data-category="salary"]'
  );
  if (defaultCat) defaultCat.classList.add("selected");
}

// ==================== INCOME MODAL ====================
function openIncomeModal() {
  document.getElementById("incomeModal").classList.add("active");
  document.getElementById("incomeLocalAmount").value = "";
  document.getElementById("incomeForeignAmount").value = "";
  document.getElementById("incomeDescription").value = "";

  const baseCurrency = appData.settings.currency;
  document.getElementById(
    "incomeLocalCurrencyHint"
  ).textContent = `(${baseCurrency})`;
  document.getElementById("localCurrencyLabel").textContent = baseCurrency;

  // Set foreign currency to something different than base
  const foreignSelect = document.getElementById("incomeForeignCurrency");
  if (foreignSelect.value === baseCurrency) {
    foreignSelect.value = baseCurrency === "PLN" ? "EUR" : "PLN";
  }

  setIncomeType("local");

  // Reset category
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const defaultCat = document.querySelector(
    '#incomeCategoryGrid .category-option[data-category="salary"]'
  );
  if (defaultCat) defaultCat.classList.add("selected");
}

function closeIncomeModal() {
  document.getElementById("incomeModal").classList.remove("active");
}

function setIncomeType(type) {
  const localBtn = document.getElementById("incomeTypeLocal");
  const foreignBtn = document.getElementById("incomeTypeForeign");
  const localForm = document.getElementById("incomeLocalForm");
  const foreignForm = document.getElementById("incomeForeignForm");

  if (type === "local") {
    localBtn.classList.add("active");
    foreignBtn.classList.remove("active");
    localForm.style.display = "block";
    foreignForm.style.display = "none";
  } else {
    localBtn.classList.remove("active");
    foreignBtn.classList.add("active");
    localForm.style.display = "none";
    foreignForm.style.display = "block";
    calculateIncomeConversion();
  }
}

function calculateIncomeConversion() {
  const amount =
    parseFloat(document.getElementById("incomeForeignAmount").value) || 0;
  const fromCurrency = document.getElementById("incomeForeignCurrency").value;
  const toCurrency = appData.settings.currency;
  const preview = document.getElementById("incomeConversionPreview");

  if (amount > 0) {
    const converted = convertCurrency(amount, fromCurrency, toCurrency);
    const rate = getExchangeRate(fromCurrency, toCurrency);

    preview.innerHTML = `
      <i class="fas fa-arrow-down"></i>
      <span class="conversion-preview-result">
        ${CURRENCIES[fromCurrency].flag} ${formatCurrencyWithSymbol(
      amount,
      fromCurrency
    )} = 
        <strong>${CURRENCIES[toCurrency].flag} ${formatCurrencyWithSymbol(
      converted,
      toCurrency
    )}</strong>
      </span>
      <span class="conversion-preview-rate">(Rate: 1 ${fromCurrency} = ${rate.toFixed(
      4
    )} ${toCurrency})</span>
    `;
  } else {
    preview.innerHTML = `
      <i class="fas fa-arrow-down"></i>
      <span>Enter amount to see conversion to ${appData.settings.currency}</span>
    `;
  }
}

function selectIncomeCategory(categoryId) {
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const selected = document.querySelector(
    `#incomeCategoryGrid .category-option[data-category="${categoryId}"]`
  );
  if (selected) selected.classList.add("selected");
}

function confirmAddIncome() {
  const isLocalType = document
    .getElementById("incomeTypeLocal")
    .classList.contains("active");
  const description = document.getElementById("incomeDescription").value.trim();
  const selectedCategory = document.querySelector(
    "#incomeCategoryGrid .category-option.selected"
  );
  const category = selectedCategory
    ? selectedCategory.dataset.category
    : "other";

  let amount, originalAmount, originalCurrency;

  if (isLocalType) {
    amount = parseFloat(document.getElementById("incomeLocalAmount").value);
    originalAmount = amount;
    originalCurrency = appData.settings.currency;
  } else {
    originalAmount = parseFloat(
      document.getElementById("incomeForeignAmount").value
    );
    originalCurrency = document.getElementById("incomeForeignCurrency").value;

    // Convert from foreign currency to user's base currency
    amount = convertCurrency(
      originalAmount,
      originalCurrency,
      appData.settings.currency
    );
  }

  if (!amount || amount <= 0 || isNaN(amount)) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  // Create transaction with converted amount
  const transaction = {
    amount: amount, // Stored in user's base currency
    type: "income",
    description: description || "Income",
    category: category,
    date: new Date().toISOString(),
    originalAmount: originalAmount,
    originalCurrency: originalCurrency,
  };

  appData.transactions.push(transaction);
  saveData();
  updateUI();
  renderTransactions();
  updateCharts();
  closeIncomeModal();

  const categoryInfo = INCOME_CATEGORIES.find((c) => c.id === category) || {
    emoji: "💰",
    name: "Income",
  };

  let message = `${categoryInfo.emoji} Income recorded: ${formatCurrency(
    amount
  )}`;
  if (originalCurrency !== appData.settings.currency) {
    message += ` (from ${
      CURRENCIES[originalCurrency].flag
    } ${formatCurrencyWithSymbol(originalAmount, originalCurrency)})`;
  }

  showToast("success", "Income Added", message);

  // AI response
  const suggestedSaving = amount * (appData.settings.savingsPercentage / 100);
  let aiMessage = `💵 Income of ${formatCurrency(amount)} recorded!`;

  if (originalCurrency !== appData.settings.currency) {
    const rate = getExchangeRate(originalCurrency, appData.settings.currency);
    aiMessage += `\n\n💱 Converted from ${
      CURRENCIES[originalCurrency].flag
    } ${formatCurrencyWithSymbol(originalAmount, originalCurrency)}`;
    aiMessage += `\nRate: 1 ${originalCurrency} = ${rate.toFixed(4)} ${
      appData.settings.currency
    }`;
  }

  aiMessage += `\n\n💰 Your available balance is now: ${formatCurrency(
    appData.availableBalance
  )}`;
  aiMessage += `\n\n💡 I recommend saving ${formatCurrency(suggestedSaving)} (${
    appData.settings.savingsPercentage
  }%) from this income.`;

  addAIMessage(aiMessage);
}

// ==================== SPEND MODAL ====================
function openSpendModal() {
  const modal = document.getElementById("spendModal");
  modal.classList.add("active");

  document.getElementById("spendAmount").value = "";
  document.getElementById("spendDescription").value = "";
  document.getElementById(
    "spendCurrencyHint"
  ).textContent = `(${appData.settings.currency})`;

  // Calculate available and savings
  const available = appData.availableBalance || 0;
  const savings = appData.savings || 0;

  // Update amounts in toggle buttons
  document.getElementById("spendAvailableAmount").textContent =
    formatCurrency(available);
  document.getElementById("spendSavingsAmount").textContent =
    formatCurrency(savings);

  // Reset to available source
  setSpendSource("available");

  // Reset category selection
  document
    .querySelectorAll("#spendCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const defaultCat = document.querySelector(
    '#spendCategoryGrid .category-option[data-category="food"]'
  );
  if (defaultCat) defaultCat.classList.add("selected");
}

function closeSpendModal() {
  const modal = document.getElementById("spendModal");
  if (modal) modal.classList.remove("active");
}

function setSpendSource(source) {
  document.getElementById("spendSource").value = source;

  const availableBtn = document.getElementById("spendFromAvailable");
  const savingsBtn = document.getElementById("spendFromSavings");
  const warning = document.getElementById("spendSavingsWarning");

  if (source === "available") {
    availableBtn.classList.add("active");
    savingsBtn.classList.remove("active");
    warning.style.display = "none";
  } else {
    availableBtn.classList.remove("active");
    savingsBtn.classList.add("active");
    warning.style.display = "flex";
  }
}

function selectSpendCategory(categoryId) {
  document
    .querySelectorAll("#spendCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const selected = document.querySelector(
    `#spendCategoryGrid .category-option[data-category="${categoryId}"]`
  );
  if (selected) selected.classList.add("selected");
}

function confirmSpend() {
  const amount = parseFloat(document.getElementById("spendAmount").value);
  const description = document.getElementById("spendDescription").value.trim();
  const selectedCategory = document.querySelector(
    "#spendCategoryGrid .category-option.selected"
  );
  const category = selectedCategory
    ? selectedCategory.dataset.category
    : "other";
  const spendSource = document.getElementById("spendSource").value;

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  const available = appData.availableBalance || 0;
  const savings = appData.savings || 0;

  // Check if enough funds based on source
  if (spendSource === "available") {
    if (amount > available) {
      showToast(
        "error",
        "Insufficient Funds",
        `You only have ${formatCurrency(available)} available`
      );
      return;
    }
  } else {
    if (amount > savings) {
      showToast(
        "error",
        "Insufficient Savings",
        `You only have ${formatCurrency(savings)} in savings`
      );
      return;
    }
  }

  // Create expense transaction
  const transaction = {
    amount: amount,
    type: "expense",
    description: description || "Expense",
    category: category,
    date: new Date().toISOString(),
    spendSource: spendSource,
  };

  appData.transactions.push(transaction);
  appData.stats.totalSpentAllTime =
    (appData.stats.totalSpentAllTime || 0) + amount;

  saveData();
  updateUI();
  renderGoals();
  renderTransactions();
  updateCharts();
  closeSpendModal();

  const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.id === category) || {
    emoji: "📦",
    name: "Other",
  };
  const sourceText =
    spendSource === "savings" ? "from savings" : "from available balance";

  showToast(
    "info",
    "Expense Recorded",
    `${formatCurrency(amount)} spent on ${categoryInfo.name} ${sourceText}`
  );

  // AI response
  const spendingMessage =
    AI_RESPONSES.spending_warnings[
      Math.floor(Math.random() * AI_RESPONSES.spending_warnings.length)
    ];
  addAIMessage(
    `${categoryInfo.emoji} Recorded: ${formatCurrency(amount)} spent on "${
      description || categoryInfo.name
    }" ${sourceText}\n\nYour new available balance: ${formatCurrency(
      appData.availableBalance
    )}\nYour savings: ${formatCurrency(appData.savings)}\n\n${spendingMessage}`
  );
}

// ==================== ONBOARDING ====================
let currentOnboardingStep = 1;
let selectedOnboardingCurrency = "USD";

function showOnboarding() {
  document.getElementById("onboardingOverlay").classList.add("active");
}

function hideOnboarding() {
  document.getElementById("onboardingOverlay").classList.remove("active");
}

function nextOnboardingStep() {
  if (currentOnboardingStep < 3) {
    document
      .querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`)
      .classList.remove("active");
    document
      .querySelector(`.onboarding-dot[data-step="${currentOnboardingStep}"]`)
      .classList.remove("active");
    document
      .querySelector(`.onboarding-dot[data-step="${currentOnboardingStep}"]`)
      .classList.add("completed");

    currentOnboardingStep++;

    document
      .querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`)
      .classList.add("active");
    document
      .querySelector(`.onboarding-dot[data-step="${currentOnboardingStep}"]`)
      .classList.add("active");

    // Update income label for step 3
    if (currentOnboardingStep === 3) {
      document.getElementById(
        "onboardingIncomeLabel"
      ).textContent = `Daily Income (${selectedOnboardingCurrency})`;
    }
  }
}

function prevOnboardingStep() {
  if (currentOnboardingStep > 1) {
    document
      .querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`)
      .classList.remove("active");
    document
      .querySelector(`.onboarding-dot[data-step="${currentOnboardingStep}"]`)
      .classList.remove("active");

    currentOnboardingStep--;

    document
      .querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`)
      .classList.add("active");
    document
      .querySelector(`.onboarding-dot[data-step="${currentOnboardingStep}"]`)
      .classList.remove("completed");
    document
      .querySelector(`.onboarding-dot[data-step="${currentOnboardingStep}"]`)
      .classList.add("active");
  }
}

function selectOnboardingCurrency(currency) {
  selectedOnboardingCurrency = currency;
  document
    .querySelectorAll(".onboarding-card .currency-btn-large")
    .forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.currency === currency);
    });
}

function updateSavingsRateLabel() {
  const rate = document.getElementById("onboardingSavingsRate").value;
  document.getElementById("savingsRateLabel").textContent = rate + "%";
}

function completeOnboarding() {
  const income =
    parseFloat(document.getElementById("onboardingIncome").value) || 0;
  const rate =
    parseInt(document.getElementById("onboardingSavingsRate").value) || 20;

  appData.settings.currency = selectedOnboardingCurrency;
  appData.dailyIncome = income;
  appData.settings.savingsPercentage = rate;
  appData.onboardingComplete = true;

  saveData();
  hideOnboarding();
  initializeApp();

  showToast(
    "success",
    "Welcome!",
    "Your account is set up. Let's start saving!"
  );

  setTimeout(() => {
    const dailySaving = (income * rate) / 100;
    addAIMessage(
      `Welcome to SaveAI Pro! 🎉\n\nI've set up your account with:\n• Currency: ${
        CURRENCIES[selectedOnboardingCurrency].flag
      } ${selectedOnboardingCurrency}\n• Daily income: ${formatCurrency(
        income
      )}\n• Savings goal: ${rate}%\n\nThat means you should save ${formatCurrency(
        dailySaving
      )} per day!\n\n💡 Important: Add income first, then you can save from your available balance.\n\n💱 Tip: You can add income in different currencies and I'll convert it automatically!`
    );
  }, 500);
}

// ==================== CURRENCY ====================
function setCurrency(currency) {
  appData.settings.currency = currency;
  saveData();

  document.querySelectorAll("#currencyOptions .currency-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.currency === currency);
  });

  updateUI();
  renderGoals();
  renderTransactions();
  updateCharts();

  showToast(
    "success",
    "Currency Changed",
    `Now displaying in ${CURRENCIES[currency].name} (${CURRENCIES[currency].symbol})`
  );
}

function formatCurrency(amount, showSymbol = true) {
  const currency = CURRENCIES[appData.settings.currency];
  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  return showSymbol ? `${currency.symbol}${formatted}` : formatted;
}

function getCurrencySymbol() {
  return CURRENCIES[appData.settings.currency].symbol;
}

// ==================== UI UPDATES ====================
function updateUI() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let totalIncome = 0;
  let totalSavings = 0;
  let totalExpensesFromAvailable = 0;
  let totalExpensesFromSavings = 0;
  let monthlyIncome = 0;
  let monthlySaved = 0;
  let monthlyExpenses = 0;

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    const isCurrentMonth =
      tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;

    if (t.type === "income") {
      totalIncome += t.amount;
      if (isCurrentMonth) monthlyIncome += t.amount;
    }
    if (t.type === "saving") {
      totalSavings += t.amount;
      if (isCurrentMonth) monthlySaved += t.amount;
    }
    if (t.type === "expense") {
      if (t.spendSource === "savings") {
        totalExpensesFromSavings += t.amount;
      } else {
        totalExpensesFromAvailable += t.amount;
      }
      if (isCurrentMonth) monthlyExpenses += t.amount;
    }
  });

  // Available = Income - Savings - Expenses from available
  // Savings = Total saved - Expenses from savings
  const availableBalance =
    totalIncome - totalSavings - totalExpensesFromAvailable;
  const currentSavings = totalSavings - totalExpensesFromSavings;

  appData.availableBalance = Math.max(0, availableBalance);
  appData.totalIncome = totalIncome;
  appData.savings = Math.max(0, currentSavings);

  const savingsRate =
    totalIncome > 0 ? ((currentSavings / totalIncome) * 100).toFixed(0) : 0;

  // Update main stats
  const availableBalanceEl = document.getElementById("availableBalance");
  if (availableBalanceEl)
    availableBalanceEl.textContent = formatCurrency(appData.availableBalance);

  const totalSavingsEl = document.getElementById("totalSavings");
  if (totalSavingsEl)
    totalSavingsEl.textContent = formatCurrency(appData.savings);

  const totalIncomeEl = document.getElementById("totalIncome");
  if (totalIncomeEl) totalIncomeEl.textContent = formatCurrency(totalIncome);

  const savingsRateEl = document.getElementById("savingsRate");
  if (savingsRateEl) savingsRateEl.textContent = savingsRate + "%";

  // Update sidebar
  const sidebarTotalEl = document.getElementById("sidebarTotal");
  if (sidebarTotalEl)
    sidebarTotalEl.textContent = formatCurrency(appData.savings, false);

  const sidebarCurrencyEl = document.getElementById("sidebarCurrency");
  if (sidebarCurrencyEl)
    sidebarCurrencyEl.textContent = appData.settings.currency;

  const sidebarAvailableEl = document.getElementById("sidebarAvailable");
  if (sidebarAvailableEl)
    sidebarAvailableEl.textContent = formatCurrency(
      appData.availableBalance,
      false
    );

  const sidebarGoalsEl = document.getElementById("sidebarGoals");
  if (sidebarGoalsEl)
    sidebarGoalsEl.textContent = appData.goals.filter(
      (g) => g.current < g.target
    ).length;

  // Update goals count badge
  const goalsCountEl = document.getElementById("goalsCount");
  if (goalsCountEl) goalsCountEl.textContent = appData.goals.length;

  // Update welcome banner
  const welcomeAvailableEl = document.getElementById("welcomeAvailable");
  if (welcomeAvailableEl)
    welcomeAvailableEl.textContent = formatCurrency(appData.availableBalance);

  const welcomeStreakEl = document.getElementById("welcomeStreak");
  if (welcomeStreakEl)
    welcomeStreakEl.textContent = appData.stats.streak + " days";

  const goalsProgress = calculateOverallGoalsProgress();
  const welcomeGoalsProgressEl = document.getElementById(
    "welcomeGoalsProgress"
  );
  if (welcomeGoalsProgressEl)
    welcomeGoalsProgressEl.textContent = goalsProgress + "%";

  // Update welcome message
  updateWelcomeMessage(savingsRate, goalsProgress);

  // Update date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDateEl = document.getElementById("currentDate");
  if (currentDateEl) {
    currentDateEl.textContent = now.toLocaleDateString(
      CURRENCIES[appData.settings.currency].locale,
      options
    );
  }

  // Update currency hints in modals
  const goalCurrencyHint = document.getElementById("goalCurrencyHint");
  const transactionCurrencyHint = document.getElementById(
    "transactionCurrencyHint"
  );
  if (goalCurrencyHint)
    goalCurrencyHint.textContent = `(${appData.settings.currency})`;
  if (transactionCurrencyHint)
    transactionCurrencyHint.textContent = `(${appData.settings.currency})`;

  // Update active currency button
  document.querySelectorAll("#currencyOptions .currency-btn").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.dataset.currency === appData.settings.currency
    );
  });

  // Update available to save displays
  updateAvailableToSaveDisplays();

  // Update trends
  updateTrends();

  // Save data
  saveData();
}

function updateAvailableToSaveDisplays() {
  const available = appData.availableBalance || 0;
  const formatted = formatCurrency(available);

  const availableToSaveEl = document.getElementById("availableToSave");
  if (availableToSaveEl) availableToSaveEl.textContent = formatted;

  const availableToSaveGoalEl = document.getElementById("availableToSaveGoal");
  if (availableToSaveGoalEl) availableToSaveGoalEl.textContent = formatted;
}

function updateWelcomeMessage(savingsRate, goalsProgress) {
  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeText = document.getElementById("welcomeText");

  if (!welcomeTitle || !welcomeText) return;

  let title = "Keep up the great work! 🎉";
  let text = "You're making excellent progress on your savings journey.";

  const available = appData.availableBalance || 0;

  if (available <= 0 && appData.totalIncome > 0) {
    title = "All funds allocated! 💪";
    text = "You've used all your income. Add more income to continue saving.";
  } else if (savingsRate >= 30) {
    title = "Amazing savings rate! 🌟";
    text = "You're saving more than most people. Keep crushing it!";
  } else if (savingsRate >= 20) {
    title = "Great job saving! 💪";
    text = "You're on track with the recommended savings rate.";
  } else if (savingsRate >= 10) {
    title = "Good progress! 📈";
    text =
      "Try to increase your savings a bit more to reach your goals faster.";
  } else if (savingsRate > 0) {
    title = "Every bit counts! 💰";
    text = "Consider saving a bit more each month to build your wealth.";
  } else if (appData.totalIncome === 0) {
    title = "Let's get started! 🚀";
    text = "Add your first income to begin your savings journey.";
  } else {
    title = "Time to save! 💰";
    text = "You have available funds. Start saving towards your goals!";
  }

  welcomeTitle.textContent = title;
  welcomeText.textContent = text;
}

function updateTrends() {
  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const thisYear = now.getFullYear();
  const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  let thisMonthSavings = 0;
  let lastMonthSavings = 0;
  let thisMonthIncome = 0;
  let lastMonthIncome = 0;

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    const tMonth = tDate.getMonth();
    const tYear = tDate.getFullYear();

    if (tMonth === thisMonth && tYear === thisYear) {
      if (t.type === "saving") thisMonthSavings += t.amount;
      if (t.type === "income") thisMonthIncome += t.amount;
    } else if (tMonth === lastMonth && tYear === lastYear) {
      if (t.type === "saving") lastMonthSavings += t.amount;
      if (t.type === "income") lastMonthIncome += t.amount;
    }
  });

  updateTrendBadge("savingsTrend", thisMonthSavings, lastMonthSavings);
  updateTrendBadge("incomeTrend", thisMonthIncome, lastMonthIncome);
  updateTrendBadge(
    "availableTrend",
    thisMonthIncome - thisMonthSavings,
    lastMonthIncome - lastMonthSavings
  );
}

function updateTrendBadge(elementId, current, previous) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let percentChange = 0;
  if (previous > 0) {
    percentChange = (((current - previous) / previous) * 100).toFixed(0);
  } else if (current > 0) {
    percentChange = 100;
  }

  const isPositive = percentChange >= 0;
  element.className = `stat-trend ${isPositive ? "up" : "down"}`;
  element.innerHTML = `<i class="fas fa-arrow-${
    isPositive ? "up" : "down"
  }"></i> ${isPositive ? "+" : ""}${percentChange}%`;
}

function calculateOverallGoalsProgress() {
  if (appData.goals.length === 0) return 0;

  let totalProgress = 0;
  appData.goals.forEach((goal) => {
    totalProgress += Math.min((goal.current / goal.target) * 100, 100);
  });

  return Math.round(totalProgress / appData.goals.length);
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good Morning!";
  let emoji = "☀️";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon!";
    emoji = "🌤️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening!";
    emoji = "🌅";
  } else if (hour >= 21 || hour < 5) {
    greeting = "Good Night!";
    emoji = "🌙";
  }

  const greetingTextEl = document.getElementById("greetingText");
  const greetingEmojiEl = document.getElementById("greetingEmoji");

  if (greetingTextEl) greetingTextEl.textContent = greeting;
  if (greetingEmojiEl) greetingEmojiEl.textContent = emoji;
}

function updateStreak() {
  const today = new Date().toDateString();
  const lastSave = appData.stats.lastSaveDate;

  if (lastSave) {
    const lastDate = new Date(lastSave);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      lastDate.toDateString() !== today &&
      lastDate.toDateString() !== yesterday.toDateString()
    ) {
      appData.stats.streak = 0;
    }
  }

  saveData();
}

// ==================== GOALS MANAGEMENT ====================
function renderGoals() {
  const grid = document.getElementById("goalsGrid");
  if (!grid) return;

  let html = "";

  appData.goals.forEach((goal, index) => {
    const progress = (goal.current / goal.target) * 100;
    const remaining = goal.target - goal.current;
    const dailySaving =
      appData.dailyIncome * (appData.settings.savingsPercentage / 100);
    const daysNeeded = dailySaving > 0 ? Math.ceil(remaining / dailySaving) : 0;

    let progressClass = "low";
    if (progress >= 75) progressClass = "high";
    else if (progress >= 40) progressClass = "medium";
    if (progress >= 100) progressClass = "complete";

    let etaText = "";
    if (progress >= 100) {
      etaText = "✅ Goal completed!";
    } else if (goal.deadline) {
      const deadline = new Date(goal.deadline);
      const daysLeft = Math.ceil(
        (deadline - new Date()) / (1000 * 60 * 60 * 24)
      );
      etaText =
        daysLeft > 0
          ? `📅 ${daysLeft} days until deadline`
          : "⚠️ Deadline passed";
    } else if (daysNeeded > 0) {
      etaText = `⏱️ ~${daysNeeded} days to reach goal`;
    } else {
      etaText = "💡 Set income for estimate";
    }

    html += `
      <div class="goal-card priority-${goal.priority || "medium"}">
        <div class="goal-header">
          <span class="goal-emoji">${goal.emoji}</span>
          <div class="goal-menu">
            <button class="goal-menu-btn" onclick="openAddToGoalModal(${index})" title="Add money">
              <i class="fas fa-plus"></i>
            </button>
            <button class="goal-menu-btn delete" onclick="deleteGoal(${index})" title="Delete goal">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="goal-name">${goal.name}</div>
        <div class="goal-amounts">
          <span class="goal-current">${formatCurrency(goal.current)}</span>
          <span class="goal-target">of ${formatCurrency(goal.target)}</span>
        </div>
        <div class="goal-progress">
          <div class="goal-progress-bar ${progressClass}" style="width: ${Math.min(
      progress,
      100
    )}%"></div>
        </div>
        <div class="goal-footer">
          <div class="goal-eta">${etaText}</div>
          <div class="goal-percentage">${Math.min(progress, 100).toFixed(
            0
          )}%</div>
        </div>
        <div class="goal-actions">
          <button class="goal-btn add" onclick="openAddToGoalModal(${index})">
            <i class="fas fa-plus"></i> Add Money
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="add-goal-card" onclick="openGoalModal()">
      <div class="add-goal-icon">
        <i class="fas fa-plus"></i>
      </div>
      <div class="add-goal-text">Add New Goal</div>
    </div>
  `;

  grid.innerHTML = html;
  updateGoalSelect();
}

function updateGoalSelect() {
  const select = document.getElementById("goalSelect");
  if (!select) return;

  select.innerHTML = '<option value="">No specific goal</option>';
  appData.goals.forEach((goal, index) => {
    if (goal.current < goal.target) {
      select.innerHTML += `<option value="${index}">${goal.emoji} ${
        goal.name
      } (${formatCurrency(goal.target - goal.current)} left)</option>`;
    }
  });
}

function openGoalModal() {
  document.getElementById("goalModal").classList.add("active");
  document.getElementById("goalName").value = "";
  document.getElementById("goalAmount").value = "";
  document.getElementById("goalDeadline").value = "";

  document
    .querySelectorAll(".emoji-option")
    .forEach((b) => b.classList.remove("selected"));
  document
    .querySelector('.emoji-option[data-emoji="🎯"]')
    .classList.add("selected");

  selectPriority("medium");
}

function closeGoalModal() {
  document.getElementById("goalModal").classList.remove("active");
}

function selectPriority(priority) {
  document.querySelectorAll(".priority-option").forEach((opt) => {
    opt.classList.remove("selected");
  });
  const selectedOption = document.querySelector(
    `.priority-option[data-priority="${priority}"]`
  );
  if (selectedOption) selectedOption.classList.add("selected");
}

function createGoal() {
  const name = document.getElementById("goalName").value.trim();
  const amount = parseFloat(document.getElementById("goalAmount").value);
  const deadline = document.getElementById("goalDeadline").value;
  const selectedEmoji = document.querySelector(".emoji-option.selected");
  const selectedPriority = document.querySelector(".priority-option.selected");

  const emoji = selectedEmoji ? selectedEmoji.dataset.emoji : "🎯";
  const priority = selectedPriority
    ? selectedPriority.dataset.priority
    : "medium";

  if (!name) {
    showToast("error", "Error", "Please enter a goal name");
    return;
  }

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid target amount");
    return;
  }

  const newGoal = {
    name: name,
    target: amount,
    current: 0,
    emoji: emoji,
    priority: priority,
    deadline: deadline || null,
    createdAt: new Date().toISOString(),
  };

  appData.goals.push(newGoal);
  saveData();
  renderGoals();
  updateUI();
  closeGoalModal();

  showToast(
    "success",
    "Goal Created!",
    `"${name}" has been added to your goals`
  );

  const dailySaving =
    appData.dailyIncome * (appData.settings.savingsPercentage / 100);
  const daysNeeded = dailySaving > 0 ? Math.ceil(amount / dailySaving) : 0;

  let message = `Great! I've created your goal "${name}" for ${formatCurrency(
    amount
  )}! 🎯\n\n`;
  if (daysNeeded > 0) {
    message += `At your current savings rate, you'll reach this goal in approximately ${daysNeeded} days.`;
  } else {
    message += `Set your daily income so I can estimate when you'll reach this goal!`;
  }

  addAIMessage(message);
}

function deleteGoal(index) {
  const goal = appData.goals[index];
  if (
    confirm(
      `Are you sure you want to delete "${
        goal.name
      }"?\n\nYou have ${formatCurrency(
        goal.current
      )} saved towards this goal. This amount will remain in your savings.`
    )
  ) {
    appData.goals.splice(index, 1);
    saveData();
    renderGoals();
    updateUI();
    showToast("info", "Goal Deleted", `"${goal.name}" has been removed`);
  }
}

function openAddToGoalModal(goalIndex) {
  const goal = appData.goals[goalIndex];
  const available = appData.availableBalance || 0;

  document.getElementById("addToGoalModal").classList.add("active");
  document.getElementById("addToGoalId").value = goalIndex;
  document.getElementById("addToGoalAmount").value = "";

  const progress = ((goal.current / goal.target) * 100).toFixed(0);
  const remaining = goal.target - goal.current;

  document.getElementById("addToGoalInfo").innerHTML = `
    <div style="font-size: 40px; margin-bottom: 12px;">${goal.emoji}</div>
    <div style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">${
      goal.name
    }</div>
    <div style="color: var(--text-secondary); margin-bottom: 12px;">
      ${formatCurrency(goal.current)} / ${formatCurrency(
    goal.target
  )} (${progress}%)
    </div>
    <div style="color: var(--accent-green); font-weight: 600;">
      ${formatCurrency(remaining)} remaining
    </div>
  `;

  document.getElementById("availableToSaveGoal").textContent =
    formatCurrency(available);
}

function closeAddToGoalModal() {
  document.getElementById("addToGoalModal").classList.remove("active");
}

function addMoneyToGoal() {
  const amount = parseFloat(document.getElementById("addToGoalAmount").value);
  const goalIndex = parseInt(document.getElementById("addToGoalId").value);
  const available = appData.availableBalance || 0;

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  // Check if user has enough available balance
  if (amount > available) {
    showToast(
      "error",
      "Insufficient Funds",
      `You only have ${formatCurrency(
        available
      )} available to save. Add more income first!`
    );
    return;
  }

  const goal = appData.goals[goalIndex];
  const previousCurrent = goal.current;
  goal.current += amount;

  appData.transactions.push({
    amount: amount,
    type: "saving",
    description: `Added to goal: ${goal.name}`,
    category: "goal",
    date: new Date().toISOString(),
    goalId: goalIndex,
  });

  appData.stats.totalSavedAllTime += amount;
  appData.stats.lastSaveDate = new Date().toISOString();
  appData.stats.streak++;

  saveData();
  renderGoals();
  renderTransactions();
  updateUI();
  updateCharts();
  closeAddToGoalModal();

  const newProgress = ((goal.current / goal.target) * 100).toFixed(0);

  if (goal.current >= goal.target) {
    showToast(
      "success",
      "🎉 Goal Completed!",
      `Congratulations! You've reached "${goal.name}"!`
    );
    addAIMessage(
      `🎉🎊 CONGRATULATIONS! 🎊🎉\n\nYou've completed your goal "${
        goal.name
      }"!\n\nYou saved ${formatCurrency(
        goal.target
      )} - that's absolutely amazing! 💪\n\nWhat's your next savings goal? I'm here to help you achieve it!`
    );
  } else {
    showToast(
      "success",
      "Money Added!",
      `${formatCurrency(amount)} added to "${goal.name}"`
    );

    if (newProgress >= 75 && (previousCurrent / goal.target) * 100 < 75) {
      addAIMessage(
        `Wow! You're at ${newProgress}% of your goal "${goal.name}"! 🔥\n\nYou're so close to achieving it! Keep going!`
      );
    } else if (
      newProgress >= 50 &&
      (previousCurrent / goal.target) * 100 < 50
    ) {
      addAIMessage(
        `Halfway there! 🎯\n\nYou've reached ${newProgress}% of your goal "${goal.name}". Keep up the momentum!`
      );
    }
  }
}

// ==================== TRANSACTIONS ====================
function renderTransactions(filter = currentTransactionFilter) {
  const list = document.getElementById("transactionList");
  if (!list) return;

  let transactions = [...appData.transactions].reverse();

  if (filter !== "all") {
    transactions = transactions.filter((t) => t.type === filter);
  }

  const recent = transactions.slice(0, 10);

  if (recent.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-title">No transactions yet</div>
        <div class="empty-state-text">Start by adding your income, then you can save!</div>
      </div>
    `;
    return;
  }

  list.innerHTML = recent
    .map((t) => {
      const iconClass = t.type;
      const icon =
        t.type === "income"
          ? "arrow-down"
          : t.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const amountClass = t.type === "expense" ? "negative" : "positive";
      const sign = t.type === "expense" ? "-" : "+";
      const date = new Date(t.date);
      const formattedDate = date.toLocaleDateString(
        CURRENCIES[appData.settings.currency].locale,
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
      const formattedTime = date.toLocaleTimeString(
        CURRENCIES[appData.settings.currency].locale,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      // Show original currency if different
      let currencyNote = "";
      if (
        t.originalCurrency &&
        t.originalCurrency !== appData.settings.currency
      ) {
        currencyNote = `<span class="transaction-original">(${formatCurrencyWithSymbol(
          t.originalAmount,
          t.originalCurrency
        )})</span>`;
      }

      // Show spend source for expenses
      let sourceNote = "";
      if (t.type === "expense" && t.spendSource === "savings") {
        sourceNote = `<span class="transaction-original">(from savings)</span>`;
      }

      return `
      <div class="transaction-item">
        <div class="transaction-icon ${iconClass}">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">${
            t.description || t.type.charAt(0).toUpperCase() + t.type.slice(1)
          } ${currencyNote}${sourceNote}</div>
          <div class="transaction-meta">
            <span class="transaction-category">${getCategoryEmoji(
              t.category
            )} ${t.category || "General"}</span>
            <span>${formattedDate} • ${formattedTime}</span>
          </div>
        </div>
        <div class="transaction-amount ${amountClass}">${sign}${formatCurrency(
        t.amount
      )}</div>
      </div>
    `;
    })
    .join("");
}

function getCategoryEmoji(category) {
  const expenseCat = EXPENSE_CATEGORIES.find((c) => c.id === category);
  if (expenseCat) return expenseCat.emoji;

  const incomeCat = INCOME_CATEGORIES.find((c) => c.id === category);
  if (incomeCat) return incomeCat.emoji;

  const defaultEmojis = {
    salary: "💼",
    freelance: "💻",
    investment: "📈",
    gift: "🎁",
    goal: "🎯",
    general: "💰",
  };
  return defaultEmojis[category] || "💰";
}

function filterTransactions(filter) {
  currentTransactionFilter = filter;

  // Update tabs in dashboard
  document
    .querySelectorAll(".transactions-header .transaction-tab")
    .forEach((tab) => {
      const tabText = tab.textContent.toLowerCase();
      tab.classList.toggle(
        "active",
        (filter === "all" && tabText === "all") || tabText.includes(filter)
      );
    });

  // Update tabs in transactions panel
  document
    .querySelectorAll("#transactionsPanelTabs .transaction-tab")
    .forEach((tab) => {
      const tabText = tab.textContent.toLowerCase();
      tab.classList.toggle(
        "active",
        (filter === "all" && tabText === "all") || tabText.includes(filter)
      );
    });

  renderTransactions(filter);

  if (currentPanel === "transactions") {
    renderTransactionsPanel();
  }
}

function searchTransactions() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (!query) {
    renderTransactions();
    return;
  }

  const list = document.getElementById("transactionList");

  const filtered = appData.transactions
    .filter(
      (t) =>
        (t.description && t.description.toLowerCase().includes(query)) ||
        t.type.toLowerCase().includes(query) ||
        (t.category && t.category.toLowerCase().includes(query))
    )
    .reverse();

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">No results found</div>
        <div class="empty-state-text">Try a different search term</div>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered
    .map((t) => {
      const iconClass = t.type;
      const icon =
        t.type === "income"
          ? "arrow-down"
          : t.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const amountClass = t.type === "expense" ? "negative" : "positive";
      const sign = t.type === "expense" ? "-" : "+";
      const date = new Date(t.date);
      const formattedDate = date.toLocaleDateString();

      return `
      <div class="transaction-item">
        <div class="transaction-icon ${iconClass}">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">${t.description || t.type}</div>
          <div class="transaction-meta">
            <span>${getCategoryEmoji(t.category)} ${
        t.category || "General"
      }</span>
            <span>${formattedDate}</span>
          </div>
        </div>
        <div class="transaction-amount ${amountClass}">${sign}${formatCurrency(
        t.amount
      )}</div>
      </div>
    `;
    })
    .join("");
}

function openTransactionModal(type) {
  const available = appData.availableBalance || 0;

  document.getElementById("transactionModal").classList.add("active");
  document.getElementById("transactionType").value = type;
  document.getElementById("transactionAmount").value = "";
  document.getElementById("transactionDesc").value = "";
  document.getElementById("transactionCategory").value = "general";

  const icons = {
    income: "💵",
    saving: "🐷",
    expense: "💸",
  };

  const titles = {
    income: "Add Income",
    saving: "Add to Savings",
    expense: "Add Expense",
  };

  document.getElementById("transactionModalIcon").textContent = icons[type];
  document.getElementById("transactionModalTitleText").textContent =
    titles[type];
  document.getElementById("goalSelectGroup").style.display =
    type === "saving" ? "block" : "none";

  // Show/hide available balance info for savings
  const savingAvailableInfo = document.getElementById("savingAvailableInfo");
  if (savingAvailableInfo) {
    savingAvailableInfo.style.display = type === "saving" ? "flex" : "none";
  }

  const availableToSaveEl = document.getElementById("availableToSave");
  if (availableToSaveEl)
    availableToSaveEl.textContent = formatCurrency(available);

  updateGoalSelect();
}

function closeTransactionModal() {
  document.getElementById("transactionModal").classList.remove("active");
}

function addTransaction() {
  const amount = parseFloat(document.getElementById("transactionAmount").value);
  const description = document.getElementById("transactionDesc").value.trim();
  const type = document.getElementById("transactionType").value;
  const category = document.getElementById("transactionCategory").value;
  const goalIndex = document.getElementById("goalSelect").value;
  const available = appData.availableBalance || 0;

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  // For savings, check if user has enough available balance
  if (type === "saving") {
    if (amount > available) {
      showToast(
        "error",
        "Insufficient Funds",
        `You only have ${formatCurrency(
          available
        )} available to save. Add more income first!`
      );
      return;
    }
  }

  const transaction = {
    amount: amount,
    type: type,
    description: description || type.charAt(0).toUpperCase() + type.slice(1),
    category: category,
    date: new Date().toISOString(),
  };

  appData.transactions.push(transaction);

  if (type === "saving") {
    appData.stats.totalSavedAllTime += amount;
    appData.stats.lastSaveDate = new Date().toISOString();
    appData.stats.streak++;

    if (goalIndex !== "") {
      const idx = parseInt(goalIndex);
      appData.goals[idx].current += amount;
      transaction.goalId = idx;
    }
  }

  saveData();
  updateUI();
  renderGoals();
  renderTransactions();
  updateCharts();
  closeTransactionModal();

  showToast(
    "success",
    "Transaction Added",
    `${type.charAt(0).toUpperCase() + type.slice(1)} of ${formatCurrency(
      amount
    )} recorded`
  );

  if (type === "saving") {
    const encouragement =
      AI_RESPONSES.encouragement[
        Math.floor(Math.random() * AI_RESPONSES.encouragement.length)
      ];
    addAIMessage(
      `${formatCurrency(
        amount
      )} added to your savings! 🎉\n\nYour new total savings is ${formatCurrency(
        appData.savings
      )}.\nAvailable balance: ${formatCurrency(
        appData.availableBalance
      )}\n\n${encouragement}`
    );
  }
}

function showAllTransactions() {
  switchPanel("transactions");
}

// ==================== CHARTS ====================
function initCharts() {
  const savingsCtx = document.getElementById("savingsChart");
  const comparisonCtx = document.getElementById("comparisonChart");

  if (!savingsCtx || !comparisonCtx) return;

  if (savingsChart) savingsChart.destroy();
  if (comparisonChart) comparisonChart.destroy();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#6b7280",
          callback: (value) => getCurrencySymbol() + value,
        },
      },
    },
  };

  const savingsData = getSavingsChartData();

  savingsChart = new Chart(savingsCtx, {
    type: "line",
    data: {
      labels: savingsData.labels,
      datasets: [
        {
          label: "Savings",
          data: savingsData.data,
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#8b5cf6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    },
    options: chartOptions,
  });

  const comparisonData = getComparisonChartData();

  comparisonChart = new Chart(comparisonCtx, {
    type: "doughnut",
    data: {
      labels: ["Savings", "Income", "Expenses"],
      datasets: [
        {
          data: comparisonData,
          backgroundColor: ["#8b5cf6", "#10b981", "#ef4444"],
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#9ca3af",
            padding: 20,
            usePointStyle: true,
          },
        },
      },
    },
  });
}

function getSavingsChartData() {
  const labels = [];
  const data = [];
  const now = new Date();

  let days = 7;
  if (currentChartPeriod === "month") days = 30;
  if (currentChartPeriod === "year") days = 12;

  if (currentChartPeriod === "year") {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString("en-US", { month: "short" }));

      let monthSavings = 0;
      appData.transactions.forEach((t) => {
        const tDate = new Date(t.date);
        if (
          tDate.getMonth() === date.getMonth() &&
          tDate.getFullYear() === date.getFullYear()
        ) {
          if (t.type === "saving") monthSavings += t.amount;
        }
      });
      data.push(monthSavings);
    }
  } else {
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(
        date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })
      );

      let daySavings = 0;
      appData.transactions.forEach((t) => {
        const tDate = new Date(t.date);
        if (tDate.toDateString() === date.toDateString()) {
          if (t.type === "saving") daySavings += t.amount;
        }
      });
      data.push(daySavings);
    }
  }

  return { labels, data };
}

function getComparisonChartData() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let income = 0;
  let savings = 0;
  let expenses = 0;

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    if (
      tDate.getMonth() === currentMonth &&
      tDate.getFullYear() === currentYear
    ) {
      if (t.type === "income") income += t.amount;
      if (t.type === "saving") savings += t.amount;
      if (t.type === "expense") expenses += t.amount;
    }
  });

  return [savings || 0.1, income || 0.1, expenses || 0.1];
}

function setChartPeriod(period) {
  currentChartPeriod = period;

  document.querySelectorAll(".chart-period-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent.toLowerCase() === period);
  });

  updateCharts();
}

function updateCharts() {
  if (savingsChart) {
    const savingsData = getSavingsChartData();
    savingsChart.data.labels = savingsData.labels;
    savingsChart.data.datasets[0].data = savingsData.data;
    savingsChart.update();
  }

  if (comparisonChart) {
    const comparisonData = getComparisonChartData();
    comparisonChart.data.datasets[0].data = comparisonData;
    comparisonChart.update();
  }
}

/// ==================== AI CHAT ====================
function initChat() {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  messages.innerHTML = "";

  setTimeout(() => {
    addAIMessage(
      `Hey there! 👋 I'm your SaveAI assistant!\n\nI can help you:\n• Track savings and expenses\n• Set and manage financial goals\n• Calculate how much you can save\n• Convert currencies automatically\n\n💡 Remember: You need to add income first before you can save money!\n\nJust type naturally or use the quick suggestions!`
    );
  }, 300);
}

function addAIMessage(text) {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedText = text.replace(/\n/g, "<br>");

  messages.innerHTML += `
    <div class="message ai">
      <div class="message-bubble">${formattedText}</div>
      <div class="message-time">${time}</div>
    </div>
  `;
  messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  messages.innerHTML += `
    <div class="message user">
      <div class="message-bubble">${text}</div>
      <div class="message-time">${time}</div>
    </div>
  `;
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  messages.innerHTML += `
    <div class="message ai" id="typingIndicator">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

function processAIResponse(input) {
  const lowerInput = input.toLowerCase().trim();
  const numbers = input.match(/[\d,]+\.?\d*/g);
  const amount = numbers ? parseFloat(numbers[0].replace(/,/g, "")) : null;
  const available = appData.availableBalance || 0;
  const savings = appData.savings || 0;

  // Greetings
  if (
    /^(hi|hello|hey|good morning|good evening|good afternoon|howdy)/i.test(
      lowerInput
    )
  ) {
    return AI_RESPONSES.greetings[
      Math.floor(Math.random() * AI_RESPONSES.greetings.length)
    ];
  }

  // How much can I save / available balance
  if (
    (lowerInput.includes("how much") &&
      (lowerInput.includes("save") || lowerInput.includes("available"))) ||
    lowerInput.includes("available balance") ||
    lowerInput.includes("can i save")
  ) {
    if (available <= 0) {
      return `💰 You have ${formatCurrency(
        0
      )} available to save.\n\nYou need to add income first before you can save! Use the "Add Income" button to get started.`;
    }
    return `💰 You have ${formatCurrency(
      available
    )} available to save!\n\nThis is your income minus what you've already saved and spent.\n\nWould you like to add some to your savings?`;
  }

  // Currency conversion
  if (lowerInput.includes("convert") && amount) {
    // Try to find currencies mentioned
    const currencies = Object.keys(CURRENCIES);
    let fromCurrency = null;
    let toCurrency = appData.settings.currency;

    currencies.forEach((curr) => {
      if (lowerInput.includes(curr.toLowerCase())) {
        if (!fromCurrency) {
          fromCurrency = curr;
        } else {
          toCurrency = curr;
        }
      }
    });

    if (fromCurrency) {
      const converted = convertCurrency(amount, fromCurrency, toCurrency);
      const rate = getExchangeRate(fromCurrency, toCurrency);
      return `💱 Currency Conversion:\n\n${
        CURRENCIES[fromCurrency].flag
      } ${formatCurrencyWithSymbol(amount, fromCurrency)} = ${
        CURRENCIES[toCurrency].flag
      } ${formatCurrencyWithSymbol(
        converted,
        toCurrency
      )}\n\nRate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    }
  }

  // Adding savings
  if (
    (lowerInput.includes("add") ||
      lowerInput.includes("save") ||
      lowerInput.includes("put")) &&
    (lowerInput.includes("saving") || lowerInput.includes("savings")) &&
    amount
  ) {
    if (amount > available) {
      return `❌ You can't save ${formatCurrency(
        amount
      )} because you only have ${formatCurrency(
        available
      )} available!\n\nYou need to add more income first. Your current available balance is ${formatCurrency(
        available
      )}.`;
    }

    appData.transactions.push({
      amount: amount,
      type: "saving",
      description: "Added via AI chat",
      category: "general",
      date: new Date().toISOString(),
    });

    appData.stats.totalSavedAllTime += amount;
    appData.stats.lastSaveDate = new Date().toISOString();
    appData.stats.streak++;

    saveData();
    updateUI();
    renderTransactions();
    renderGoals();
    updateCharts();

    const newAvailable = appData.availableBalance;
    const encouragement =
      AI_RESPONSES.encouragement[
        Math.floor(Math.random() * AI_RESPONSES.encouragement.length)
      ];
    return `Done! ${formatCurrency(
      amount
    )} added to savings! 🎉\n\nTotal savings: ${formatCurrency(
      appData.savings
    )}\nRemaining available: ${formatCurrency(
      newAvailable
    )}\n\n${encouragement}`;
  }

  // Spending money via chat
  if (
    (lowerInput.includes("spend") ||
      lowerInput.includes("spent") ||
      lowerInput.includes("bought") ||
      lowerInput.includes("purchase")) &&
    amount
  ) {
    // Check if spending from savings or available
    const fromSavings =
      lowerInput.includes("saving") || lowerInput.includes("savings");

    if (fromSavings) {
      if (amount > savings) {
        return `❌ You can't spend ${formatCurrency(
          amount
        )} from savings because you only have ${formatCurrency(
          savings
        )} saved!\n\nYour current savings: ${formatCurrency(savings)}`;
      }

      appData.transactions.push({
        amount: amount,
        type: "expense",
        description: "Spent via AI chat",
        category: "other",
        date: new Date().toISOString(),
        spendSource: "savings",
      });
    } else {
      if (amount > available) {
        return `❌ You can't spend ${formatCurrency(
          amount
        )} because you only have ${formatCurrency(
          available
        )} available!\n\nYour current available balance: ${formatCurrency(
          available
        )}`;
      }

      appData.transactions.push({
        amount: amount,
        type: "expense",
        description: "Spent via AI chat",
        category: "other",
        date: new Date().toISOString(),
        spendSource: "available",
      });
    }

    appData.stats.totalSpentAllTime =
      (appData.stats.totalSpentAllTime || 0) + amount;

    saveData();
    updateUI();
    renderTransactions();
    updateCharts();

    const warning =
      AI_RESPONSES.spending_warnings[
        Math.floor(Math.random() * AI_RESPONSES.spending_warnings.length)
      ];
    const sourceText = fromSavings ? "from savings" : "from available balance";
    return `💸 ${formatCurrency(
      amount
    )} spent ${sourceText}.\n\nAvailable balance: ${formatCurrency(
      appData.availableBalance
    )}\nSavings: ${formatCurrency(appData.savings)}\n\n${warning}`;
  }

  // Summary/Progress
  if (
    lowerInput.includes("summary") ||
    lowerInput.includes("progress") ||
    lowerInput.includes("status") ||
    lowerInput.includes("my savings")
  ) {
    let response =
      `📊 **Your Financial Summary**\n\n` +
      `💵 Total Income: ${formatCurrency(appData.totalIncome || 0)}\n` +
      `📦 Available Balance: ${formatCurrency(available)}\n` +
      `💰 Total Savings: ${formatCurrency(savings)}\n` +
      `💸 Total Spent: ${formatCurrency(
        appData.stats.totalSpentAllTime || 0
      )}\n` +
      `🔥 Saving Streak: ${appData.stats.streak} days\n`;

    if (appData.goals.length > 0) {
      response += `\n🎯 **Your Goals**\n`;
      appData.goals.forEach((goal) => {
        const progress = ((goal.current / goal.target) * 100).toFixed(0);
        const status = progress >= 100 ? "✅" : goal.emoji;
        response += `${status} ${goal.name}: ${progress}% (${formatCurrency(
          goal.current
        )}/${formatCurrency(goal.target)})\n`;
      });
    }

    return response;
  }

  // Savings tips
  if (
    lowerInput.includes("tip") ||
    lowerInput.includes("tips") ||
    lowerInput.includes("advice")
  ) {
    return (
      SAVINGS_TIPS[Math.floor(Math.random() * SAVINGS_TIPS.length)] +
      `\n\nWant another tip? Just ask!`
    );
  }

  // Help
  if (lowerInput.includes("help") || lowerInput.includes("what can you do")) {
    return (
      `🤖 **I can help with:**\n\n` +
      `💵 "Add 50 to savings" - saves from available balance\n` +
      `💸 "Spent 30" - records expense from available\n` +
      `💸 "Spent 30 from savings" - records expense from savings\n` +
      `💱 "Convert 100 PLN to USD" - currency conversion\n` +
      `📊 "Show my summary" - full financial overview\n` +
      `💰 "How much can I save?" - shows available balance\n` +
      `💡 "Give me a tip" - savings advice\n\n` +
      `Remember: You need income before you can save!`
    );
  }

  // Income related
  if (
    lowerInput.includes("income") &&
    (lowerInput.includes("add") ||
      lowerInput.includes("got") ||
      lowerInput.includes("received")) &&
    amount
  ) {
    return `To add income, please use the "Add Income" button in the app. This allows you to:\n\n• Choose the currency\n• Set a category\n• Add a description\n\nOr just say the amount and currency like "I got 100 EUR" and I'll help you convert it!`;
  }

  // Default
  return AI_RESPONSES.confused[
    Math.floor(Math.random() * AI_RESPONSES.confused.length)
  ];
}

function sendMessage() {
  const input = document.getElementById("aiInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  showTyping();

  setTimeout(() => {
    hideTyping();
    const response = processAIResponse(text);
    addAIMessage(response);
  }, 600 + Math.random() * 800);
}

function sendSuggestion(text) {
  const input = document.getElementById("aiInput");
  if (input) {
    input.value = text;
    sendMessage();
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}

// ==================== MOBILE ====================
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (sidebar && overlay) {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

function toggleAIPanel() {
  const panel = document.getElementById("aiPanel");
  const overlay = document.getElementById("aiOverlay");

  if (panel && overlay) {
    panel.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(type, title, message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const icons = {
    success: "check",
    error: "times",
    info: "info",
    warning: "exclamation-triangle",
  };

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas fa-${icons[type]}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// ==================== SPEND MODAL ====================
function openSpendModal() {
  const modal = document.getElementById("spendModal");
  if (!modal) return;

  modal.classList.add("active");

  document.getElementById("spendAmount").value = "";
  document.getElementById("spendDescription").value = "";
  document.getElementById(
    "spendCurrencyHint"
  ).textContent = `(${appData.settings.currency})`;

  // Calculate available and savings
  const available = appData.availableBalance || 0;
  const savings = appData.savings || 0;

  // Update amounts in toggle buttons
  const spendAvailableAmount = document.getElementById("spendAvailableAmount");
  const spendSavingsAmount = document.getElementById("spendSavingsAmount");

  if (spendAvailableAmount)
    spendAvailableAmount.textContent = formatCurrency(available);
  if (spendSavingsAmount)
    spendSavingsAmount.textContent = formatCurrency(savings);

  // Reset to available source
  setSpendSource("available");

  // Reset category selection
  document
    .querySelectorAll("#spendCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const defaultCat = document.querySelector(
    '#spendCategoryGrid .category-option[data-category="food"]'
  );
  if (defaultCat) defaultCat.classList.add("selected");
}

function closeSpendModal() {
  const modal = document.getElementById("spendModal");
  if (modal) modal.classList.remove("active");
}

function setSpendSource(source) {
  const spendSourceInput = document.getElementById("spendSource");
  if (spendSourceInput) spendSourceInput.value = source;

  const availableBtn = document.getElementById("spendFromAvailable");
  const savingsBtn = document.getElementById("spendFromSavings");
  const warning = document.getElementById("spendSavingsWarning");

  if (source === "available") {
    if (availableBtn) availableBtn.classList.add("active");
    if (savingsBtn) savingsBtn.classList.remove("active");
    if (warning) warning.style.display = "none";
  } else {
    if (availableBtn) availableBtn.classList.remove("active");
    if (savingsBtn) savingsBtn.classList.add("active");
    if (warning) warning.style.display = "flex";
  }
}

function selectSpendCategory(categoryId) {
  document
    .querySelectorAll("#spendCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const selected = document.querySelector(
    `#spendCategoryGrid .category-option[data-category="${categoryId}"]`
  );
  if (selected) selected.classList.add("selected");
}

function confirmSpend() {
  const amount = parseFloat(document.getElementById("spendAmount").value);
  const description = document.getElementById("spendDescription").value.trim();
  const selectedCategory = document.querySelector(
    "#spendCategoryGrid .category-option.selected"
  );
  const category = selectedCategory
    ? selectedCategory.dataset.category
    : "other";
  const spendSourceInput = document.getElementById("spendSource");
  const spendSource = spendSourceInput ? spendSourceInput.value : "available";

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  const available = appData.availableBalance || 0;
  const savings = appData.savings || 0;

  // Check if enough funds based on source
  if (spendSource === "available") {
    if (amount > available) {
      showToast(
        "error",
        "Insufficient Funds",
        `You only have ${formatCurrency(available)} available`
      );
      return;
    }
  } else {
    if (amount > savings) {
      showToast(
        "error",
        "Insufficient Savings",
        `You only have ${formatCurrency(savings)} in savings`
      );
      return;
    }
  }

  // Create expense transaction
  const transaction = {
    amount: amount,
    type: "expense",
    description: description || "Expense",
    category: category,
    date: new Date().toISOString(),
    spendSource: spendSource,
  };

  appData.transactions.push(transaction);
  appData.stats.totalSpentAllTime =
    (appData.stats.totalSpentAllTime || 0) + amount;

  saveData();
  updateUI();
  renderGoals();
  renderTransactions();
  updateCharts();
  closeSpendModal();

  const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.id === category) || {
    emoji: "📦",
    name: "Other",
  };
  const sourceText =
    spendSource === "savings" ? "from savings" : "from available balance";

  showToast(
    "info",
    "Expense Recorded",
    `${formatCurrency(amount)} spent on ${categoryInfo.name} ${sourceText}`
  );

  // AI response
  const spendingMessage =
    AI_RESPONSES.spending_warnings[
      Math.floor(Math.random() * AI_RESPONSES.spending_warnings.length)
    ];
  addAIMessage(
    `${categoryInfo.emoji} Recorded: ${formatCurrency(amount)} spent on "${
      description || categoryInfo.name
    }" ${sourceText}\n\nYour available balance: ${formatCurrency(
      appData.availableBalance
    )}\nYour savings: ${formatCurrency(appData.savings)}\n\n${spendingMessage}`
  );
}

// ==================== INCOME MODAL ====================
function openIncomeModal() {
  const modal = document.getElementById("incomeModal");
  if (!modal) return;

  modal.classList.add("active");

  const localAmountInput = document.getElementById("incomeLocalAmount");
  const foreignAmountInput = document.getElementById("incomeForeignAmount");
  const descriptionInput = document.getElementById("incomeDescription");

  if (localAmountInput) localAmountInput.value = "";
  if (foreignAmountInput) foreignAmountInput.value = "";
  if (descriptionInput) descriptionInput.value = "";

  const baseCurrency = appData.settings.currency;

  const incomeLocalCurrencyHint = document.getElementById(
    "incomeLocalCurrencyHint"
  );
  const localCurrencyLabel = document.getElementById("localCurrencyLabel");

  if (incomeLocalCurrencyHint)
    incomeLocalCurrencyHint.textContent = `(${baseCurrency})`;
  if (localCurrencyLabel) localCurrencyLabel.textContent = baseCurrency;

  // Set foreign currency to something different than base
  const foreignSelect = document.getElementById("incomeForeignCurrency");
  if (foreignSelect && foreignSelect.value === baseCurrency) {
    foreignSelect.value = baseCurrency === "PLN" ? "EUR" : "PLN";
  }

  setIncomeType("local");

  // Reset category
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const defaultCat = document.querySelector(
    '#incomeCategoryGrid .category-option[data-category="salary"]'
  );
  if (defaultCat) defaultCat.classList.add("selected");
}

function closeIncomeModal() {
  const modal = document.getElementById("incomeModal");
  if (modal) modal.classList.remove("active");
}

function setIncomeType(type) {
  const localBtn = document.getElementById("incomeTypeLocal");
  const foreignBtn = document.getElementById("incomeTypeForeign");
  const localForm = document.getElementById("incomeLocalForm");
  const foreignForm = document.getElementById("incomeForeignForm");

  if (type === "local") {
    if (localBtn) localBtn.classList.add("active");
    if (foreignBtn) foreignBtn.classList.remove("active");
    if (localForm) localForm.style.display = "block";
    if (foreignForm) foreignForm.style.display = "none";
  } else {
    if (localBtn) localBtn.classList.remove("active");
    if (foreignBtn) foreignBtn.classList.add("active");
    if (localForm) localForm.style.display = "none";
    if (foreignForm) foreignForm.style.display = "block";
    calculateIncomeConversion();
  }
}

function selectIncomeCategory(categoryId) {
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const selected = document.querySelector(
    `#incomeCategoryGrid .category-option[data-category="${categoryId}"]`
  );
  if (selected) selected.classList.add("selected");
}

function calculateIncomeConversion() {
  const amountInput = document.getElementById("incomeForeignAmount");
  const currencySelect = document.getElementById("incomeForeignCurrency");
  const preview = document.getElementById("incomeConversionPreview");

  if (!amountInput || !currencySelect || !preview) return;

  const amount = parseFloat(amountInput.value) || 0;
  const fromCurrency = currencySelect.value;
  const toCurrency = appData.settings.currency;

  if (amount > 0) {
    const converted = convertCurrency(amount, fromCurrency, toCurrency);
    const rate = getExchangeRate(fromCurrency, toCurrency);

    preview.innerHTML = `
      <i class="fas fa-arrow-down"></i>
      <span class="conversion-preview-result">
        ${CURRENCIES[fromCurrency].flag} ${formatCurrencyWithSymbol(
      amount,
      fromCurrency
    )} = 
        <strong>${CURRENCIES[toCurrency].flag} ${formatCurrencyWithSymbol(
      converted,
      toCurrency
    )}</strong>
      </span>
      <span class="conversion-preview-rate">(Rate: 1 ${fromCurrency} = ${rate.toFixed(
      4
    )} ${toCurrency})</span>
    `;
  } else {
    preview.innerHTML = `
      <i class="fas fa-arrow-down"></i>
      <span>Enter amount to see conversion to ${appData.settings.currency}</span>
    `;
  }
}

function confirmAddIncome() {
  const localBtn = document.getElementById("incomeTypeLocal");
  const isLocalType = localBtn ? localBtn.classList.contains("active") : true;

  const descriptionInput = document.getElementById("incomeDescription");
  const description = descriptionInput ? descriptionInput.value.trim() : "";

  const selectedCategory = document.querySelector(
    "#incomeCategoryGrid .category-option.selected"
  );
  const category = selectedCategory
    ? selectedCategory.dataset.category
    : "other";

  let amount, originalAmount, originalCurrency;

  if (isLocalType) {
    const localAmountInput = document.getElementById("incomeLocalAmount");
    amount = localAmountInput ? parseFloat(localAmountInput.value) : 0;
    originalAmount = amount;
    originalCurrency = appData.settings.currency;
  } else {
    const foreignAmountInput = document.getElementById("incomeForeignAmount");
    const foreignCurrencySelect = document.getElementById(
      "incomeForeignCurrency"
    );

    originalAmount = foreignAmountInput
      ? parseFloat(foreignAmountInput.value)
      : 0;
    originalCurrency = foreignCurrencySelect
      ? foreignCurrencySelect.value
      : "USD";

    // Convert from foreign currency to user's base currency
    amount = convertCurrency(
      originalAmount,
      originalCurrency,
      appData.settings.currency
    );
  }

  if (!amount || amount <= 0 || isNaN(amount)) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  // Create transaction with converted amount
  const transaction = {
    amount: amount, // Stored in user's base currency
    type: "income",
    description: description || "Income",
    category: category,
    date: new Date().toISOString(),
    originalAmount: originalAmount,
    originalCurrency: originalCurrency,
  };

  appData.transactions.push(transaction);
  saveData();
  updateUI();
  renderTransactions();
  updateCharts();
  closeIncomeModal();

  const categoryInfo = INCOME_CATEGORIES.find((c) => c.id === category) || {
    emoji: "💰",
    name: "Income",
  };

  let message = `${categoryInfo.emoji} Income recorded: ${formatCurrency(
    amount
  )}`;
  if (originalCurrency !== appData.settings.currency) {
    message += ` (from ${
      CURRENCIES[originalCurrency].flag
    } ${formatCurrencyWithSymbol(originalAmount, originalCurrency)})`;
  }

  showToast("success", "Income Added", message);

  // AI response
  const suggestedSaving = amount * (appData.settings.savingsPercentage / 100);
  let aiMessage = `💵 Income of ${formatCurrency(amount)} recorded!`;

  if (originalCurrency !== appData.settings.currency) {
    const rate = getExchangeRate(originalCurrency, appData.settings.currency);
    aiMessage += `\n\n💱 Converted from ${
      CURRENCIES[originalCurrency].flag
    } ${formatCurrencyWithSymbol(originalAmount, originalCurrency)}`;
    aiMessage += `\nRate: 1 ${originalCurrency} = ${rate.toFixed(4)} ${
      appData.settings.currency
    }`;
  }

  aiMessage += `\n\n💰 Your available balance is now: ${formatCurrency(
    appData.availableBalance
  )}`;
  aiMessage += `\n\n💡 I recommend saving ${formatCurrency(suggestedSaving)} (${
    appData.settings.savingsPercentage
  }%) from this income.`;

  addAIMessage(aiMessage);
}

// ==================== CURRENCY CONVERTER MODAL ====================
function openConverterModal() {
  const modal = document.getElementById("converterModal");
  if (!modal) return;

  modal.classList.add("active");

  const baseCurrency = appData.settings.currency;
  const available = appData.availableBalance || 0;

  // Set default currencies
  const converterFrom = document.getElementById("converterFrom");
  const converterTo = document.getElementById("converterTo");
  const converterAmount = document.getElementById("converterAmount");
  const converterAvailableBalance = document.getElementById(
    "converterAvailableBalance"
  );
  const ratesBaseCurrency = document.getElementById("ratesBaseCurrency");

  if (converterFrom)
    converterFrom.value = baseCurrency === "PLN" ? "EUR" : "PLN";
  if (converterTo) converterTo.value = baseCurrency;
  if (converterAmount) converterAmount.value = "100";
  if (converterAvailableBalance)
    converterAvailableBalance.textContent = formatCurrency(available);
  if (ratesBaseCurrency) ratesBaseCurrency.textContent = baseCurrency;

  updateConversion();
  updateRatesTable();
}

function closeConverterModal() {
  const modal = document.getElementById("converterModal");
  if (modal) modal.classList.remove("active");
}

function swapCurrencies() {
  const fromSelect = document.getElementById("converterFrom");
  const toSelect = document.getElementById("converterTo");

  if (fromSelect && toSelect) {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateConversion();
  }
}

function updateConversion() {
  const amountInput = document.getElementById("converterAmount");
  const fromSelect = document.getElementById("converterFrom");
  const toSelect = document.getElementById("converterTo");
  const resultEl = document.getElementById("converterResult");

  if (!amountInput || !fromSelect || !toSelect || !resultEl) return;

  const amount = parseFloat(amountInput.value) || 0;
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  const rate = getExchangeRate(fromCurrency, toCurrency);

  resultEl.innerHTML = `
    <div class="converter-result-label">${
      CURRENCIES[fromCurrency].flag
    } ${formatCurrencyWithSymbol(amount, fromCurrency)} =</div>
    <div class="converter-result-value">${
      CURRENCIES[toCurrency].flag
    } ${formatCurrencyWithSymbol(converted, toCurrency)}</div>
    <div class="converter-result-rate">1 ${fromCurrency} = ${rate.toFixed(
    4
  )} ${toCurrency}</div>
  `;
}

function updateRatesTable() {
  const table = document.getElementById("ratesTable");
  if (!table) return;

  const currentCurrency = appData.settings.currency;
  const allCurrencies = [
    "USD",
    "EUR",
    "PLN",
    "GBP",
    "JPY",
    "CHF",
    "CAD",
    "AUD",
  ];

  let html = "";

  allCurrencies.forEach((from) => {
    if (from !== currentCurrency && CURRENCIES[from]) {
      const rate = getExchangeRate(from, currentCurrency);
      html += `
        <div class="rate-item">
          <span class="rate-from">${CURRENCIES[from].flag} 1 ${from}</span>
          <span class="rate-equals">=</span>
          <span class="rate-to">${formatCurrencyWithSymbol(
            rate,
            currentCurrency
          )}</span>
        </div>
      `;
    }
  });

  table.innerHTML = html;
}

function addConvertedAsIncome() {
  const amountInput = document.getElementById("converterAmount");
  const fromSelect = document.getElementById("converterFrom");

  if (!amountInput || !fromSelect) return;

  const amount = parseFloat(amountInput.value) || 0;
  const fromCurrency = fromSelect.value;

  if (amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  closeConverterModal();

  // Open income modal with pre-filled values
  const incomeModal = document.getElementById("incomeModal");
  if (incomeModal) incomeModal.classList.add("active");

  setIncomeType("foreign");

  const foreignAmountInput = document.getElementById("incomeForeignAmount");
  const foreignCurrencySelect = document.getElementById(
    "incomeForeignCurrency"
  );

  if (foreignAmountInput) foreignAmountInput.value = amount;
  if (foreignCurrencySelect) foreignCurrencySelect.value = fromCurrency;

  calculateIncomeConversion();

  // Reset category
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const defaultCat = document.querySelector(
    '#incomeCategoryGrid .category-option[data-category="salary"]'
  );
  if (defaultCat) defaultCat.classList.add("selected");
}

// ==================== DATA EXPORT / IMPORT ====================
function exportData() {
  const exportObj = {
    ...appData,
    exportDate: new Date().toISOString(),
    version: "1.0",
  };

  const dataStr = JSON.stringify(exportObj, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `saveai-backup-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("success", "Export Complete", "Your data has been downloaded");
}

function importData() {
  const fileInput = document.getElementById("importFileInput");
  if (fileInput) fileInput.click();
}

function handleImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedData = JSON.parse(e.target.result);

      // Validate imported data
      if (
        !importedData.transactions ||
        !importedData.goals ||
        !importedData.settings
      ) {
        showToast(
          "error",
          "Import Failed",
          "Invalid data format - missing required fields"
        );
        return;
      }

      // Merge imported data
      appData = {
        savings: importedData.savings || 0,
        dailyIncome: importedData.dailyIncome || 0,
        goals: importedData.goals || [],
        transactions: importedData.transactions || [],
        settings: {
          currency: importedData.settings.currency || "USD",
          savingsPercentage: importedData.settings.savingsPercentage || 20,
          theme: importedData.settings.theme || "dark",
          notifications:
            importedData.settings.notifications !== undefined
              ? importedData.settings.notifications
              : true,
        },
        stats: {
          streak: importedData.stats?.streak || 0,
          lastSaveDate: importedData.stats?.lastSaveDate || null,
          totalSavedAllTime: importedData.stats?.totalSavedAllTime || 0,
          totalSpentAllTime: importedData.stats?.totalSpentAllTime || 0,
        },
        onboardingComplete:
          importedData.onboardingComplete !== undefined
            ? importedData.onboardingComplete
            : true,
        availableBalance: importedData.availableBalance || 0,
        totalIncome: importedData.totalIncome || 0,
      };

      saveData();

      // Refresh UI
      updateUI();
      renderGoals();
      renderTransactions();
      initCharts();
      updateCharts();

      // Update currency buttons
      document
        .querySelectorAll("#currencyOptions .currency-btn")
        .forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.dataset.currency === appData.settings.currency
          );
        });

      showToast(
        "success",
        "Import Complete",
        `Restored ${appData.transactions.length} transactions and ${appData.goals.length} goals`
      );
      addAIMessage(
        `📥 Data imported successfully!\n\n• ${
          appData.transactions.length
        } transactions restored\n• ${
          appData.goals.length
        } goals restored\n• Currency: ${
          appData.settings.currency
        }\n• Total savings: ${formatCurrency(
          appData.savings
        )}\n• Available balance: ${formatCurrency(appData.availableBalance)}`
      );
    } catch (err) {
      console.error("Import error:", err);
      showToast(
        "error",
        "Import Failed",
        "Could not parse the file. Make sure it's a valid SaveAI backup."
      );
    }
  };

  reader.readAsText(file);
  event.target.value = ""; // Reset input
}

// ==================== UTILITIES ====================
function resetApp() {
  if (
    confirm("Are you sure you want to reset all data? This cannot be undone!")
  ) {
    if (
      confirm(
        "This will delete ALL your savings, goals, and transactions. Continue?"
      )
    ) {
      localStorage.removeItem("saveAI_pro_data");
      location.reload();
    }
  }
}

function openBudgetCalculator() {
  const defaultIncome = appData.dailyIncome * 30 || 3000;
  const income = prompt("Enter your monthly income:", defaultIncome);

  if (income && !isNaN(income)) {
    const monthlyIncome = parseFloat(income);
    const needs = monthlyIncome * 0.5;
    const wants = monthlyIncome * 0.3;
    const savings = monthlyIncome * 0.2;

    addAIMessage(
      `📊 **50/30/20 Budget Calculator**\n\n` +
        `Based on ${formatCurrency(monthlyIncome)}/month:\n\n` +
        `🏠 Needs (50%): ${formatCurrency(needs)}\n` +
        `   Housing, food, utilities, insurance, transport\n\n` +
        `🎮 Wants (30%): ${formatCurrency(wants)}\n` +
        `   Entertainment, dining out, hobbies, subscriptions\n\n` +
        `💰 Savings (20%): ${formatCurrency(savings)}\n` +
        `   Emergency fund, investments, debt repayment\n\n` +
        `💡 Tip: Try to save at least ${formatCurrency(savings)} monthly!`
    );

    // Also toggle AI panel if on mobile
    const aiPanel = document.getElementById("aiPanel");
    if (aiPanel && window.innerWidth <= 1200) {
      aiPanel.classList.add("active");
      const overlay = document.getElementById("aiOverlay");
      if (overlay) overlay.classList.add("active");
    }
  }
}

// ==================== PANEL NAVIGATION ====================
function switchPanel(panelName) {
  currentPanel = panelName;

  // Update navigation
  document.querySelectorAll(".nav-item[data-panel]").forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-panel") === panelName
    );
  });

  // Hide all panels
  const dashboardPanel = document.getElementById("dashboardPanel");
  const goalsPanel = document.getElementById("goalsPanel");
  const transactionsPanel = document.getElementById("transactionsPanel");
  const analyticsPanel = document.getElementById("analyticsPanel");

  if (dashboardPanel) dashboardPanel.style.display = "none";
  if (goalsPanel) goalsPanel.style.display = "none";
  if (transactionsPanel) transactionsPanel.style.display = "none";
  if (analyticsPanel) analyticsPanel.style.display = "none";

  // Show selected panel
  switch (panelName) {
    case "dashboard":
      if (dashboardPanel) dashboardPanel.style.display = "block";
      break;
    case "goals":
      if (goalsPanel) {
        goalsPanel.style.display = "block";
        renderGoalsPanel();
      }
      break;
    case "transactions":
      if (transactionsPanel) {
        transactionsPanel.style.display = "block";
        renderTransactionsPanel();
      }
      break;
    case "analytics":
      if (analyticsPanel) {
        analyticsPanel.style.display = "block";
        renderAnalyticsPanel();
      }
      break;
  }

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  }
}

function showAllTransactions() {
  switchPanel("transactions");
}

// ==================== RENDER PANELS ====================
function renderGoalsPanel() {
  const grid = document.getElementById("goalsPanelGrid");
  if (!grid) return;

  let html = "";
  const available = appData.availableBalance || 0;

  appData.goals.forEach((goal, index) => {
    const progress = (goal.current / goal.target) * 100;
    const remaining = goal.target - goal.current;
    const dailySaving =
      appData.dailyIncome * (appData.settings.savingsPercentage / 100);
    const daysNeeded = dailySaving > 0 ? Math.ceil(remaining / dailySaving) : 0;

    let progressClass = "low";
    if (progress >= 75) progressClass = "high";
    else if (progress >= 40) progressClass = "medium";
    if (progress >= 100) progressClass = "complete";

    let etaText = "";
    if (progress >= 100) {
      etaText = "✅ Goal completed!";
    } else if (goal.deadline) {
      const deadline = new Date(goal.deadline);
      const daysLeft = Math.ceil(
        (deadline - new Date()) / (1000 * 60 * 60 * 24)
      );
      etaText =
        daysLeft > 0
          ? `📅 ${daysLeft} days until deadline`
          : "⚠️ Deadline passed";
    } else if (daysNeeded > 0) {
      etaText = `⏱️ ~${daysNeeded} days to reach goal`;
    } else {
      etaText = "💡 Set income for estimate";
    }

    html += `
      <div class="goal-card priority-${goal.priority || "medium"}">
        <div class="goal-header">
          <span class="goal-emoji">${goal.emoji}</span>
          <div class="goal-menu">
            <button class="goal-menu-btn" onclick="openAddToGoalModal(${index})" title="Add money">
              <i class="fas fa-plus"></i>
            </button>
            <button class="goal-menu-btn delete" onclick="deleteGoal(${index})" title="Delete goal">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="goal-name">${goal.name}</div>
        <div class="goal-amounts">
          <span class="goal-current">${formatCurrency(goal.current)}</span>
          <span class="goal-target">of ${formatCurrency(goal.target)}</span>
        </div>
        <div class="goal-progress">
          <div class="goal-progress-bar ${progressClass}" style="width: ${Math.min(
      progress,
      100
    )}%"></div>
        </div>
        <div class="goal-footer">
          <div class="goal-eta">${etaText}</div>
          <div class="goal-percentage">${Math.min(progress, 100).toFixed(
            0
          )}%</div>
        </div>
        <div class="goal-actions">
          <button class="goal-btn add" onclick="openAddToGoalModal(${index})">
            <i class="fas fa-plus"></i> Add Money
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="add-goal-card" onclick="openGoalModal()">
      <div class="add-goal-icon">
        <i class="fas fa-plus"></i>
      </div>
      <div class="add-goal-text">Add New Goal</div>
    </div>
  `;

  grid.innerHTML = html;
}

function renderTransactionsPanel() {
  const list = document.getElementById("transactionsPanelList");
  if (!list) return;

  let transactions = [...appData.transactions].reverse();

  if (currentTransactionFilter !== "all") {
    transactions = transactions.filter(
      (t) => t.type === currentTransactionFilter
    );
  }

  if (transactions.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-title">No transactions yet</div>
        <div class="empty-state-text">Start by adding your income, savings, or expenses!</div>
      </div>
    `;
    return;
  }

  list.innerHTML = transactions
    .map((t) => {
      const iconClass = t.type;
      const icon =
        t.type === "income"
          ? "arrow-down"
          : t.type === "saving"
          ? "piggy-bank"
          : "arrow-up";
      const amountClass = t.type === "expense" ? "negative" : "positive";
      const sign = t.type === "expense" ? "-" : "+";
      const date = new Date(t.date);
      const formattedDate = date.toLocaleDateString(
        CURRENCIES[appData.settings.currency].locale,
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
      const formattedTime = date.toLocaleTimeString(
        CURRENCIES[appData.settings.currency].locale,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      // Show original currency if different
      let currencyNote = "";
      if (
        t.originalCurrency &&
        t.originalCurrency !== appData.settings.currency
      ) {
        currencyNote = `<span class="transaction-original">(${formatCurrencyWithSymbol(
          t.originalAmount,
          t.originalCurrency
        )})</span>`;
      }

      // Show spend source for expenses
      let sourceNote = "";
      if (t.type === "expense" && t.spendSource === "savings") {
        sourceNote = `<span class="transaction-original">(from savings)</span>`;
      }

      return `
      <div class="transaction-item">
        <div class="transaction-icon ${iconClass}">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">${
            t.description || t.type.charAt(0).toUpperCase() + t.type.slice(1)
          } ${currencyNote}${sourceNote}</div>
          <div class="transaction-meta">
            <span class="transaction-category">${getCategoryEmoji(
              t.category
            )} ${t.category || "General"}</span>
            <span>${formattedDate} • ${formattedTime}</span>
          </div>
        </div>
        <div class="transaction-amount ${amountClass}">${sign}${formatCurrency(
        t.amount
      )}</div>
      </div>
    `;
    })
    .join("");
}

function renderAnalyticsPanel() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let monthlyIncome = 0;
  let monthlySaved = 0;
  let monthlySpent = 0;
  const categorySpending = {};

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    if (
      tDate.getMonth() === currentMonth &&
      tDate.getFullYear() === currentYear
    ) {
      if (t.type === "income") monthlyIncome += t.amount;
      if (t.type === "saving") monthlySaved += t.amount;
      if (t.type === "expense") {
        monthlySpent += t.amount;
        const cat = t.category || "other";
        categorySpending[cat] = (categorySpending[cat] || 0) + t.amount;
      }
    }
  });

  const savingsRate =
    monthlyIncome > 0 ? ((monthlySaved / monthlyIncome) * 100).toFixed(0) : 0;

  // Update analytics values
  const totalSavedEl = document.getElementById("analyticsTotalSaved");
  const allTimeSavedEl = document.getElementById("analyticsAllTimeSaved");
  const monthlySpentEl = document.getElementById("analyticsMonthlySpent");
  const allTimeSpentEl = document.getElementById("analyticsAllTimeSpent");
  const rateEl = document.getElementById("analyticsRate");
  const streakEl = document.getElementById("analyticsStreak");
  const availableEl = document.getElementById("analyticsAvailable");

  if (totalSavedEl) totalSavedEl.textContent = formatCurrency(appData.savings);
  if (allTimeSavedEl)
    allTimeSavedEl.textContent = formatCurrency(
      appData.stats.totalSavedAllTime
    );
  if (monthlySpentEl) monthlySpentEl.textContent = formatCurrency(monthlySpent);
  if (allTimeSpentEl)
    allTimeSpentEl.textContent = formatCurrency(
      appData.stats.totalSpentAllTime || 0
    );
  if (rateEl) rateEl.textContent = savingsRate + "%";
  if (streakEl) streakEl.textContent = appData.stats.streak + " days";
  if (availableEl)
    availableEl.textContent = formatCurrency(appData.availableBalance);

  // Render category breakdown
  const categoryBreakdown = document.getElementById("categoryBreakdown");
  if (categoryBreakdown) {
    if (Object.keys(categorySpending).length === 0) {
      categoryBreakdown.innerHTML =
        '<p class="empty-text">No expenses this month</p>';
    } else {
      const sortedCategories = Object.entries(categorySpending).sort(
        (a, b) => b[1] - a[1]
      );
      const totalSpent = Object.values(categorySpending).reduce(
        (a, b) => a + b,
        0
      );

      categoryBreakdown.innerHTML = sortedCategories
        .map(([cat, amount]) => {
          const percentage = ((amount / totalSpent) * 100).toFixed(0);
          const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.id === cat) || {
            emoji: "📦",
            name: cat,
          };

          return `
          <div class="category-item">
            <div class="category-info">
              <span class="category-emoji">${categoryInfo.emoji}</span>
              <span class="category-name">${categoryInfo.name}</span>
            </div>
            <div class="category-bar-container">
              <div class="category-bar" style="width: ${percentage}%"></div>
            </div>
            <div class="category-amount">${formatCurrency(
              amount
            )} (${percentage}%)</div>
          </div>
        `;
        })
        .join("");
    }
  }

  // Update inline converter to show current currency
  const inlineConverterTo = document.getElementById("inlineConverterTo");
  if (inlineConverterTo) {
    inlineConverterTo.value = appData.settings.currency;
  }
}

function convertInline() {
  const amountInput = document.getElementById("inlineConverterAmount");
  const fromSelect = document.getElementById("inlineConverterFrom");
  const toSelect = document.getElementById("inlineConverterTo");
  const resultEl = document.getElementById("inlineConverterResult");

  if (!amountInput || !fromSelect || !toSelect || !resultEl) return;

  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  if (!amount || amount <= 0) {
    resultEl.innerHTML =
      '<span class="error">Please enter a valid amount</span>';
    return;
  }

  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  const rate = getExchangeRate(fromCurrency, toCurrency);

  resultEl.innerHTML = `
    <div class="conversion-result">
      <span class="conversion-from">${
        CURRENCIES[fromCurrency].flag
      } ${formatCurrencyWithSymbol(amount, fromCurrency)}</span>
      <span class="conversion-equals">=</span>
      <span class="conversion-to">${
        CURRENCIES[toCurrency].flag
      } ${formatCurrencyWithSymbol(converted, toCurrency)}</span>
    </div>
    <div class="conversion-rate">Rate: 1 ${fromCurrency} = ${rate.toFixed(
    4
  )} ${toCurrency}</div>
  `;
}

// ==================== INITIALIZE APP ====================
document.addEventListener("DOMContentLoaded", init);
