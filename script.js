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

// Exchange rates (all rates relative to each currency)
const EXCHANGE_RATES = {
  EUR: {
    PLN: 4.21,
    GBP: 0.87,
    USD: 1.17,
    EUR: 1,
    JPY: 157.5,
    CHF: 0.97,
    CAD: 1.47,
    AUD: 1.62,
  },
  GBP: {
    PLN: 4.86,
    EUR: 1.15,
    USD: 1.35,
    GBP: 1,
    JPY: 181.03,
    CHF: 1.12,
    CAD: 1.69,
    AUD: 1.86,
  },
  USD: {
    PLN: 3.6,
    EUR: 0.85,
    GBP: 0.74,
    USD: 1,
    JPY: 134.07,
    CHF: 0.83,
    CAD: 1.25,
    AUD: 1.38,
  },
  PLN: {
    EUR: 0.24,
    GBP: 0.21,
    USD: 0.28,
    PLN: 1,
    JPY: 37.24,
    CHF: 0.23,
    CAD: 0.35,
    AUD: 0.38,
  },
  JPY: {
    EUR: 0.0063,
    GBP: 0.0055,
    USD: 0.0075,
    PLN: 0.027,
    JPY: 1,
    CHF: 0.0062,
    CAD: 0.0094,
    AUD: 0.01,
  },
  CHF: {
    EUR: 1.03,
    GBP: 0.89,
    USD: 1.21,
    PLN: 4.34,
    JPY: 162.37,
    CHF: 1,
    CAD: 1.52,
    AUD: 1.67,
  },
  CAD: {
    EUR: 0.68,
    GBP: 0.59,
    USD: 0.8,
    PLN: 2.88,
    JPY: 107.26,
    CHF: 0.66,
    CAD: 1,
    AUD: 1.1,
  },
  AUD: {
    EUR: 0.62,
    GBP: 0.54,
    USD: 0.72,
    PLN: 2.61,
    JPY: 97.06,
    CHF: 0.6,
    CAD: 0.91,
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
    "Hmm, I didn't catch that. Try asking 'how much should I save?' or 'show my progress'.",
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
  createConverterModal();
  createIncomeModal();
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
                        <span class="analytics-value" id="analyticsAllTimeSaved">$0</span>
                        <span class="analytics-label">All-Time Saved</span>
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
                                      `<option value="${c}" ${
                                        c === "EUR" ? "selected" : ""
                                      }>${CURRENCIES[c].flag} ${c}</option>`
                                  )
                                  .join("")}
                            </select>
                            <span class="converter-arrow"><i class="fas fa-arrow-right"></i></span>
                            <select id="inlineConverterTo" class="form-input">
                                ${Object.keys(CURRENCIES)
                                  .map(
                                    (c) =>
                                      `<option value="${c}" ${
                                        c === appData.settings.currency
                                          ? "selected"
                                          : ""
                                      }>${CURRENCIES[c].flag} ${c}</option>`
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
                    <span class="goal-current">${formatCurrency(
                      goal.current
                    )}</span>
                    <span class="goal-target">of ${formatCurrency(
                      goal.target
                    )}</span>
                </div>
                <div class="goal-progress">
                    <div class="goal-progress-bar ${progressClass}" style="width: ${Math.min(
      progress,
      100
    )}%"></div>
                </div>
                <div class="goal-footer">
                    <div class="goal-eta">${etaText}</div>
                    <div class="goal-percentage">${Math.min(
                      progress,
                      100
                    ).toFixed(0)}%</div>
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

      return `
            <div class="transaction-item">
                <div class="transaction-icon ${iconClass}">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="transaction-details">
                    <div class="transaction-name">${
                      t.description ||
                      t.type.charAt(0).toUpperCase() + t.type.slice(1)
                    } ${currencyNote}</div>
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
                            <span class="category-emoji">${
                              categoryInfo.emoji
                            }</span>
                            <span class="category-name">${
                              categoryInfo.name
                            }</span>
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
function createConverterModal() {
  if (document.getElementById("converterModal")) return;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "converterModal";
  modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="modal-title-icon">💱</span>
                    <span>Currency Converter</span>
                </h2>
                <button class="modal-close" onclick="closeConverterModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="converter-container">
                <div class="converter-input-group">
                    <label class="form-label">Amount</label>
                    <input type="number" class="form-input converter-amount" id="converterAmount" placeholder="100" oninput="updateConversion()">
                </div>
                
                <div class="converter-currencies">
                    <div class="converter-currency-group">
                        <label class="form-label">From</label>
                        <select class="form-input" id="converterFrom" onchange="updateConversion()">
                            ${Object.keys(CURRENCIES)
                              .map(
                                (c) => `
                                <option value="${c}">${CURRENCIES[c].flag} ${c} - ${CURRENCIES[c].name}</option>
                            `
                              )
                              .join("")}
                        </select>
                    </div>
                    
                    <button class="converter-swap" onclick="swapCurrencies()">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                    
                    <div class="converter-currency-group">
                        <label class="form-label">To</label>
                        <select class="form-input" id="converterTo" onchange="updateConversion()">
                            ${Object.keys(CURRENCIES)
                              .map(
                                (c) => `
                                <option value="${c}" ${
                                  c === "PLN" ? "selected" : ""
                                }>${CURRENCIES[c].flag} ${c} - ${
                                  CURRENCIES[c].name
                                }</option>
                            `
                              )
                              .join("")}
                        </select>
                    </div>
                </div>
                
                <div class="converter-result-box" id="converterResult">
                    <div class="converter-result-label">Converted Amount</div>
                    <div class="converter-result-value">0.00</div>
                    <div class="converter-result-rate">Enter an amount to convert</div>
                </div>
                
                <div class="converter-rates-table">
                    <h4>Quick Reference Rates</h4>
                    <div id="ratesTable"></div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeConverterModal()">Close</button>
                <button class="btn btn-primary" onclick="addConvertedAsIncome()">
                    <i class="fas fa-plus"></i> Add as Income
                </button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  updateRatesTable();
}

function openConverterModal() {
  createConverterModal();
  document.getElementById("converterModal").classList.add("active");
  document.getElementById("converterFrom").value = "EUR";
  document.getElementById("converterTo").value = appData.settings.currency;
  document.getElementById("converterAmount").value = "100";
  updateConversion();
}

function closeConverterModal() {
  const modal = document.getElementById("converterModal");
  if (modal) modal.classList.remove("active");
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

  const mainCurrencies = ["EUR", "USD", "GBP", "PLN"];
  const currentCurrency = appData.settings.currency;

  let html = '<div class="rates-grid">';

  mainCurrencies.forEach((from) => {
    if (from !== currentCurrency) {
      const rate = getExchangeRate(from, currentCurrency);
      html += `
                <div class="rate-item">
                    <span class="rate-from">${
                      CURRENCIES[from].flag
                    } 1 ${from}</span>
                    <span class="rate-equals">=</span>
                    <span class="rate-to">${formatCurrencyWithSymbol(
                      rate,
                      currentCurrency
                    )}</span>
                </div>
            `;
    }
  });

  html += "</div>";
  table.innerHTML = html;
}

function addConvertedAsIncome() {
  const amount =
    parseFloat(document.getElementById("converterAmount").value) || 0;
  const fromCurrency = document.getElementById("converterFrom").value;
  const toCurrency = document.getElementById("converterTo").value;

  if (amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  const converted = convertCurrency(amount, fromCurrency, toCurrency);

  closeConverterModal();

  // Open income modal with pre-filled values
  openIncomeModalWithValues(converted, fromCurrency, amount);
}

// ==================== INCOME MODAL WITH CURRENCY ====================
function createIncomeModal() {
  if (document.getElementById("incomeModal")) return;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "incomeModal";
  modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="modal-title-icon">💵</span>
                    <span>Add Income</span>
                </h2>
                <button class="modal-close" onclick="closeIncomeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="income-type-toggle">
                <button class="income-type-btn active" onclick="setIncomeType('local')" id="incomeTypeLocal">
                    <i class="fas fa-home"></i> Local Currency
                </button>
                <button class="income-type-btn" onclick="setIncomeType('foreign')" id="incomeTypeForeign">
                    <i class="fas fa-globe"></i> Foreign Currency
                </button>
            </div>
            
            <div id="incomeLocalForm">
                <div class="form-group">
                    <label class="form-label">Amount <span class="form-hint" id="incomeLocalCurrencyHint">(USD)</span></label>
                    <input type="number" class="form-input" id="incomeLocalAmount" placeholder="1000" step="0.01">
                </div>
            </div>
            
            <div id="incomeForeignForm" style="display: none;">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Amount</label>
                        <input type="number" class="form-input" id="incomeForeignAmount" placeholder="1000" step="0.01" oninput="calculateIncomeConversion()">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Currency</label>
                        <select class="form-input" id="incomeForeignCurrency" onchange="calculateIncomeConversion()">
                            ${Object.keys(CURRENCIES)
                              .map(
                                (c) => `
                                <option value="${c}">${CURRENCIES[c].flag} ${c}</option>
                            `
                              )
                              .join("")}
                        </select>
                    </div>
                </div>
                <div class="conversion-preview" id="incomeConversionPreview">
                    <i class="fas fa-arrow-down"></i>
                    <span>Enter amount to see conversion</span>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Description</label>
                <input type="text" class="form-input" id="incomeDescription" placeholder="e.g., Salary, Freelance project, Bonus">
            </div>
            
            <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid compact" id="incomeCategoryGrid">
                    ${INCOME_CATEGORIES.map(
                      (cat) => `
                        <button class="category-option ${
                          cat.id === "salary" ? "selected" : ""
                        }" data-category="${
                        cat.id
                      }" onclick="selectIncomeCategory('${cat.id}')">
                            <span class="category-option-emoji">${
                              cat.emoji
                            }</span>
                            <span class="category-option-name">${
                              cat.name
                            }</span>
                        </button>
                    `
                    ).join("")}
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeIncomeModal()">Cancel</button>
                <button class="btn btn-success" onclick="confirmAddIncome()">
                    <i class="fas fa-plus"></i> Add Income
                </button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
}

function openIncomeModal() {
  createIncomeModal();
  document.getElementById("incomeModal").classList.add("active");
  document.getElementById("incomeLocalAmount").value = "";
  document.getElementById("incomeForeignAmount").value = "";
  document.getElementById("incomeDescription").value = "";
  document.getElementById(
    "incomeLocalCurrencyHint"
  ).textContent = `(${appData.settings.currency})`;
  setIncomeType("local");

  // Reset category
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  document
    .querySelector(
      '#incomeCategoryGrid .category-option[data-category="salary"]'
    )
    .classList.add("selected");
}

function openIncomeModalWithValues(amount, originalCurrency, originalAmount) {
  openIncomeModal();

  if (originalCurrency !== appData.settings.currency) {
    setIncomeType("foreign");
    document.getElementById("incomeForeignAmount").value = originalAmount;
    document.getElementById("incomeForeignCurrency").value = originalCurrency;
    calculateIncomeConversion();
  } else {
    document.getElementById("incomeLocalAmount").value = amount;
  }
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
                <strong>${
                  CURRENCIES[toCurrency].flag
                } ${formatCurrencyWithSymbol(converted, toCurrency)}</strong>
            </span>
            <span class="conversion-preview-rate">(Rate: 1 ${fromCurrency} = ${rate.toFixed(
      4
    )} ${toCurrency})</span>
        `;
  } else {
    preview.innerHTML = `
            <i class="fas fa-arrow-down"></i>
            <span>Enter amount to see conversion</span>
        `;
  }
}

function selectIncomeCategory(categoryId) {
  document
    .querySelectorAll("#incomeCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  document
    .querySelector(
      `#incomeCategoryGrid .category-option[data-category="${categoryId}"]`
    )
    .classList.add("selected");
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
    amount = convertCurrency(
      originalAmount,
      originalCurrency,
      appData.settings.currency
    );
  }

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  // Create transaction
  const transaction = {
    amount: amount,
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
    aiMessage += `\n\n💱 Converted from ${
      CURRENCIES[originalCurrency].flag
    } ${formatCurrencyWithSymbol(originalAmount, originalCurrency)}`;
    aiMessage += `\nRate: 1 ${originalCurrency} = ${getExchangeRate(
      originalCurrency,
      appData.settings.currency
    ).toFixed(4)} ${appData.settings.currency}`;
  }

  aiMessage += `\n\n💡 I recommend saving ${formatCurrency(suggestedSaving)} (${
    appData.settings.savingsPercentage
  }%) from this income.`;
  aiMessage += `\n\nWould you like me to add it to your savings?`;

  addAIMessage(aiMessage);
}

// ==================== SPENDING / EXPENSES ====================
function createSpendModal() {
  if (document.getElementById("spendModal")) return;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "spendModal";
  modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="modal-title-icon">💸</span>
                    <span>Spend Money</span>
                </h2>
                <button class="modal-close" onclick="closeSpendModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="spend-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <span>This will deduct from your savings!</span>
            </div>

            <div class="form-group">
                <label class="form-label">Amount to Spend <span class="form-hint" id="spendCurrencyHint">(USD)</span></label>
                <input type="number" class="form-input" id="spendAmount" placeholder="50" step="0.01">
            </div>

            <div class="form-group">
                <label class="form-label">What did you spend on?</label>
                <input type="text" class="form-input" id="spendDescription" placeholder="e.g., Groceries, Restaurant, New shoes">
            </div>

            <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid" id="spendCategoryGrid">
                    ${EXPENSE_CATEGORIES.map(
                      (cat) => `
                        <button class="category-option ${
                          cat.id === "food" ? "selected" : ""
                        }" data-category="${
                        cat.id
                      }" onclick="selectSpendCategory('${cat.id}')">
                            <span class="category-option-emoji">${
                              cat.emoji
                            }</span>
                            <span class="category-option-name">${
                              cat.name
                            }</span>
                        </button>
                    `
                    ).join("")}
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Deduct from Goal? <span class="form-hint">(Optional)</span></label>
                <select class="form-input" id="spendFromGoal">
                    <option value="">No, from general savings</option>
                </select>
            </div>

            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeSpendModal()">Cancel</button>
                <button class="btn btn-danger" onclick="confirmSpend()">
                    <i class="fas fa-shopping-cart"></i> Confirm Spending
                </button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
}

function openSpendModal() {
  createSpendModal();

  const modal = document.getElementById("spendModal");
  modal.classList.add("active");

  document.getElementById("spendAmount").value = "";
  document.getElementById("spendDescription").value = "";
  document.getElementById(
    "spendCurrencyHint"
  ).textContent = `(${appData.settings.currency})`;

  // Reset category selection
  document
    .querySelectorAll("#spendCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  document
    .querySelector('#spendCategoryGrid .category-option[data-category="food"]')
    .classList.add("selected");

  // Update goals dropdown
  const goalSelect = document.getElementById("spendFromGoal");
  goalSelect.innerHTML = '<option value="">No, from general savings</option>';
  appData.goals.forEach((goal, index) => {
    if (goal.current > 0) {
      goalSelect.innerHTML += `<option value="${index}">${goal.emoji} ${
        goal.name
      } (${formatCurrency(goal.current)} available)</option>`;
    }
  });
}

function closeSpendModal() {
  const modal = document.getElementById("spendModal");
  if (modal) modal.classList.remove("active");
}

function selectSpendCategory(categoryId) {
  document
    .querySelectorAll("#spendCategoryGrid .category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  document
    .querySelector(
      `#spendCategoryGrid .category-option[data-category="${categoryId}"]`
    )
    .classList.add("selected");
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
  const goalIndex = document.getElementById("spendFromGoal").value;

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
  }

  // Check if enough savings
  if (goalIndex === "") {
    if (amount > appData.savings) {
      showToast(
        "error",
        "Insufficient Savings",
        `You only have ${formatCurrency(appData.savings)} in savings`
      );
      return;
    }
  } else {
    const goal = appData.goals[parseInt(goalIndex)];
    if (amount > goal.current) {
      showToast(
        "error",
        "Insufficient Funds",
        `This goal only has ${formatCurrency(goal.current)}`
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
    deductedFrom: goalIndex !== "" ? parseInt(goalIndex) : null,
  };

  appData.transactions.push(transaction);

  // Deduct from savings
  if (goalIndex !== "") {
    const idx = parseInt(goalIndex);
    appData.goals[idx].current -= amount;
  }

  appData.savings -= amount;
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

  showToast(
    "info",
    "Expense Recorded",
    `${formatCurrency(amount)} spent on ${categoryInfo.name}`
  );

  // AI response about spending
  const spendingMessage =
    AI_RESPONSES.spending_warnings[
      Math.floor(Math.random() * AI_RESPONSES.spending_warnings.length)
    ];
  addAIMessage(
    `${categoryInfo.emoji} Recorded: ${formatCurrency(amount)} spent on "${
      description || categoryInfo.name
    }"\n\nYour new savings balance: ${formatCurrency(
      appData.savings
    )}\n\n${spendingMessage}`
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
  document.querySelectorAll(".onboarding-card .currency-btn").forEach((btn) => {
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
      )} per day!\n\n💱 Tip: You can add income in different currencies and I'll convert it automatically!`
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
    `Now using ${CURRENCIES[currency].name} (${CURRENCIES[currency].symbol})`
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

  let monthlyIncome = 0;
  let monthlySaved = 0;
  let monthlyExpenses = 0;

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    if (
      tDate.getMonth() === currentMonth &&
      tDate.getFullYear() === currentYear
    ) {
      if (t.type === "income") monthlyIncome += t.amount;
      if (t.type === "saving") monthlySaved += t.amount;
      if (t.type === "expense") monthlyExpenses += t.amount;
    }
  });

  const savingsRate =
    monthlyIncome > 0 ? ((monthlySaved / monthlyIncome) * 100).toFixed(0) : 0;

  // Update main stats
  document.getElementById("totalSavings").textContent = formatCurrency(
    appData.savings
  );
  document.getElementById("monthlyIncome").textContent =
    formatCurrency(monthlyIncome);
  document.getElementById("monthlySaved").textContent =
    formatCurrency(monthlySaved);
  document.getElementById("savingsRate").textContent = savingsRate + "%";

  // Update sidebar
  document.getElementById("sidebarTotal").textContent = formatCurrency(
    appData.savings,
    false
  );
  document.getElementById("sidebarCurrency").textContent =
    appData.settings.currency;
  document.getElementById("sidebarMonthly").textContent = formatCurrency(
    monthlySaved,
    false
  );
  document.getElementById("sidebarGoals").textContent = appData.goals.filter(
    (g) => g.current < g.target
  ).length;

  // Update goals count badge
  document.getElementById("goalsCount").textContent = appData.goals.length;

  // Update welcome banner
  document.getElementById("welcomeSavingsRate").textContent = savingsRate + "%";
  document.getElementById("welcomeStreak").textContent =
    appData.stats.streak + " days";

  const goalsProgress = calculateOverallGoalsProgress();
  document.getElementById("welcomeGoalsProgress").textContent =
    goalsProgress + "%";

  // Update welcome message
  updateWelcomeMessage(savingsRate, goalsProgress);

  // Update date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("currentDate").textContent = now.toLocaleDateString(
    CURRENCIES[appData.settings.currency].locale,
    options
  );

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

  // Update trends
  updateTrends();
}

function updateWelcomeMessage(savingsRate, goalsProgress) {
  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeText = document.getElementById("welcomeText");

  if (!welcomeTitle || !welcomeText) return;

  let title = "Keep up the great work! 🎉";
  let text = "You're making excellent progress on your savings journey.";

  if (savingsRate >= 30) {
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
  } else {
    title = "Let's start saving! 🚀";
    text =
      "Add your first savings today and begin your journey to financial freedom.";
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
  updateTrendBadge("savedTrend", thisMonthSavings, lastMonthSavings);
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

  document.getElementById("greetingText").textContent = greeting;
  document.getElementById("greetingEmoji").textContent = emoji;
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
                    <span class="goal-current">${formatCurrency(
                      goal.current
                    )}</span>
                    <span class="goal-target">of ${formatCurrency(
                      goal.target
                    )}</span>
                </div>
                <div class="goal-progress">
                    <div class="goal-progress-bar ${progressClass}" style="width: ${Math.min(
      progress,
      100
    )}%"></div>
                </div>
                <div class="goal-footer">
                    <div class="goal-eta">${etaText}</div>
                    <div class="goal-percentage">${Math.min(
                      progress,
                      100
                    ).toFixed(0)}%</div>
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
      }"?\n\nYou have ${formatCurrency(goal.current)} saved towards this goal.`
    )
  ) {
    // Return money to general savings
    appData.savings -= goal.current; // It was already counted
    appData.goals.splice(index, 1);
    saveData();
    renderGoals();
    updateUI();
    showToast("info", "Goal Deleted", `"${goal.name}" has been removed`);
  }
}

function openAddToGoalModal(goalIndex) {
  const goal = appData.goals[goalIndex];
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
}

function closeAddToGoalModal() {
  document.getElementById("addToGoalModal").classList.remove("active");
}

function addMoneyToGoal() {
  const amount = parseFloat(document.getElementById("addToGoalAmount").value);
  const goalIndex = parseInt(document.getElementById("addToGoalId").value);

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
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

  appData.savings += amount;
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
                <div class="empty-state-text">Start by adding your income, savings, or expenses!</div>
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

      return `
            <div class="transaction-item">
                <div class="transaction-icon ${iconClass}">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="transaction-details">
                    <div class="transaction-name">${
                      t.description ||
                      t.type.charAt(0).toUpperCase() + t.type.slice(1)
                    }</div>
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
  const cat = EXPENSE_CATEGORIES.find((c) => c.id === category);
  if (cat) return cat.emoji;

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
  document.querySelectorAll(".transaction-tab").forEach((tab) => {
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
                    <div class="transaction-name">${
                      t.description || t.type
                    }</div>
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

  if (!amount || amount <= 0) {
    showToast("error", "Error", "Please enter a valid amount");
    return;
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
    appData.savings += amount;
    appData.stats.totalSavedAllTime += amount;
    appData.stats.lastSaveDate = new Date().toISOString();
    appData.stats.streak++;

    if (goalIndex !== "") {
      const idx = parseInt(goalIndex);
      appData.goals[idx].current += amount;
      transaction.goalId = idx;
    }
  } else if (type === "expense") {
    // Deduct from savings for expense via this modal
    if (amount > appData.savings) {
      showToast(
        "error",
        "Insufficient Savings",
        `You only have ${formatCurrency(appData.savings)}`
      );
      appData.transactions.pop(); // Remove the transaction we just added
      return;
    }
    appData.savings -= amount;
    appData.stats.totalSpentAllTime =
      (appData.stats.totalSpentAllTime || 0) + amount;
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
      )} added to your savings! 🎉\n\nYour new total is ${formatCurrency(
        appData.savings
      )}.\n\n${encouragement}`
    );
  } else if (type === "income") {
    const suggestedSaving = amount * (appData.settings.savingsPercentage / 100);
    addAIMessage(
      `Income of ${formatCurrency(amount)} recorded! 📝\n\nBased on your ${
        appData.settings.savingsPercentage
      }% savings goal, I recommend saving ${formatCurrency(
        suggestedSaving
      )} from this income.\n\nWould you like me to add it to your savings?`
    );
  } else if (type === "expense") {
    const warning =
      AI_RESPONSES.spending_warnings[
        Math.floor(Math.random() * AI_RESPONSES.spending_warnings.length)
      ];
    addAIMessage(
      `Expense of ${formatCurrency(
        amount
      )} recorded. 📊\n\nYour savings balance is now ${formatCurrency(
        appData.savings
      )}.\n\n${warning}`
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
    // Monthly data for year view
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString("en-US", { month: "short" }));

      // Calculate savings for that month
      let monthSavings = 0;
      appData.transactions.forEach((t) => {
        const tDate = new Date(t.date);
        if (
          tDate.getMonth() === date.getMonth() &&
          tDate.getFullYear() === date.getFullYear()
        ) {
          if (t.type === "saving") monthSavings += t.amount;
          if (t.type === "expense") monthSavings -= t.amount;
        }
      });
      data.push(monthSavings);
    }
  } else {
    // Daily data
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
          if (t.type === "expense") daySavings -= t.amount;
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

// ==================== AI CHAT ====================
function initChat() {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  messages.innerHTML = "";

  setTimeout(() => {
    addAIMessage(
      `Hey there! 👋 I'm your SaveAI assistant!\n\nI can help you:\n• Track savings and expenses\n• Set and manage financial goals\n• Calculate how much you should save\n• Give you personalized tips\n\nJust type naturally or use the quick suggestions!`
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

  // Spending money
  if (
    (lowerInput.includes("spend") ||
      lowerInput.includes("spent") ||
      lowerInput.includes("bought") ||
      lowerInput.includes("purchase")) &&
    amount
  ) {
    if (amount > appData.savings) {
      return `You don't have enough savings to spend ${formatCurrency(
        amount
      )}! 😅\n\nYour current balance is ${formatCurrency(
        appData.savings
      )}.\n\nConsider saving more before making this purchase!`;
    }

    appData.savings -= amount;
    appData.stats.totalSpentAllTime =
      (appData.stats.totalSpentAllTime || 0) + amount;
    appData.transactions.push({
      amount: amount,
      type: "expense",
      description: "Spent via AI chat",
      category: "other",
      date: new Date().toISOString(),
    });

    saveData();
    updateUI();
    renderTransactions();
    updateCharts();

    const warning =
      AI_RESPONSES.spending_warnings[
        Math.floor(Math.random() * AI_RESPONSES.spending_warnings.length)
      ];
    return `💸 ${formatCurrency(
      amount
    )} has been deducted from your savings.\n\nYour new balance: ${formatCurrency(
      appData.savings
    )}\n\n${warning}`;
  }

  // Daily income setting
  if (
    (lowerInput.includes("daily") || lowerInput.includes("per day")) &&
    (lowerInput.includes("income") ||
      lowerInput.includes("earn") ||
      lowerInput.includes("make")) &&
    amount
  ) {
    appData.dailyIncome = amount;
    const dailySuggestion = amount * (appData.settings.savingsPercentage / 100);
    saveData();
    updateUI();

    return (
      `Perfect! Daily income set to ${formatCurrency(amount)}. 📝\n\n` +
      `Based on your ${appData.settings.savingsPercentage}% savings goal:\n` +
      `• 💰 Save ${formatCurrency(dailySuggestion)} daily\n` +
      `• 📅 Save ${formatCurrency(dailySuggestion * 30)} monthly\n` +
      `• 💵 Spend up to ${formatCurrency(amount - dailySuggestion)} daily`
    );
  }

  // Adding savings
  if (
    (lowerInput.includes("add") ||
      lowerInput.includes("save") ||
      lowerInput.includes("put")) &&
    (lowerInput.includes("saving") || lowerInput.includes("savings")) &&
    amount
  ) {
    appData.savings += amount;
    appData.stats.totalSavedAllTime += amount;
    appData.stats.lastSaveDate = new Date().toISOString();
    appData.stats.streak++;

    appData.transactions.push({
      amount: amount,
      type: "saving",
      description: "Added via AI chat",
      category: "general",
      date: new Date().toISOString(),
    });

    saveData();
    updateUI();
    renderTransactions();
    renderGoals();
    updateCharts();

    const encouragement =
      AI_RESPONSES.encouragement[
        Math.floor(Math.random() * AI_RESPONSES.encouragement.length)
      ];
    return `Done! ${formatCurrency(
      amount
    )} added to savings! 🎉\n\nTotal: ${formatCurrency(
      appData.savings
    )}\n\n${encouragement}`;
  }

  // Summary/Progress
  if (
    lowerInput.includes("summary") ||
    lowerInput.includes("progress") ||
    lowerInput.includes("status") ||
    lowerInput.includes("my savings")
  ) {
    let response =
      `📊 **Your Summary**\n\n` +
      `💰 Savings: ${formatCurrency(appData.savings)}\n` +
      `💸 All-time spent: ${formatCurrency(
        appData.stats.totalSpentAllTime || 0
      )}\n` +
      `💵 Daily Income: ${formatCurrency(appData.dailyIncome)}\n` +
      `🔥 Streak: ${appData.stats.streak} days\n`;

    if (appData.goals.length > 0) {
      response += `\n🎯 **Goals**\n`;
      appData.goals.forEach((goal) => {
        const progress = ((goal.current / goal.target) * 100).toFixed(0);
        response += `${goal.emoji} ${goal.name}: ${progress}% (${formatCurrency(
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
      `💰 "Add 50 to savings"\n` +
      `💸 "I spent 30 on food"\n` +
      `📊 "Show my summary"\n` +
      `💡 "Give me a tip"\n` +
      `⚙️ "My daily income is 100"\n\n` +
      `Just type naturally!`
    );
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
  document.getElementById("aiInput").value = text;
  sendMessage();
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}

function voiceInput() {
  showToast("info", "Voice Input", "Voice input feature coming soon!");
}

// ==================== MOBILE ====================
function openMobileAI() {
  document.getElementById("mobileAIOverlay").classList.add("active");
}

function closeMobileAI(event) {
  if (event.target.id === "mobileAIOverlay") {
    document.getElementById("mobileAIOverlay").classList.remove("active");
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

// ==================== UTILITIES ====================
function exportData() {
  const dataStr = JSON.stringify(appData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `saveai-backup-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("success", "Export Complete", "Your data has been downloaded");
}

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
  const income = prompt("Enter your monthly income:", appData.dailyIncome * 30);
  if (income && !isNaN(income)) {
    const monthlyIncome = parseFloat(income);
    const needs = monthlyIncome * 0.5;
    const wants = monthlyIncome * 0.3;
    const savings = monthlyIncome * 0.2;

    addAIMessage(
      `📊 **50/30/20 Budget**\n\n` +
        `Based on ${formatCurrency(monthlyIncome)}/month:\n\n` +
        `🏠 Needs (50%): ${formatCurrency(needs)}\n` +
        `🎮 Wants (30%): ${formatCurrency(wants)}\n` +
        `💰 Savings (20%): ${formatCurrency(savings)}`
    );
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", init);
