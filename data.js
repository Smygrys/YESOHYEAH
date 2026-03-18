// ============================
// SMYGRYSSAVE AI — DATA LAYER
// ============================

const AppData = {
  user: {
    primaryCurrency: "PLN",
    displayCurrency: "PLN",
    dailyIncome: 0,
    savingsGoalPct: 20,
    onboardingDone: false,
  },

  exchangeRates: {
    PLN: { EUR: 0.2326, USD: 0.2525, GBP: 0.1989, CHF: 0.2212, PLN: 1 },
    EUR: { PLN: 4.298, USD: 1.0855, GBP: 0.855, CHF: 0.951, EUR: 1 },
    USD: { PLN: 3.96, EUR: 0.9212, GBP: 0.7875, CHF: 0.876, USD: 1 },
    GBP: { PLN: 5.028, EUR: 1.1696, USD: 1.27, CHF: 1.112, GBP: 1 },
    CHF: { PLN: 4.522, EUR: 1.0515, USD: 1.1416, GBP: 0.8993, CHF: 1 },
  },

  rateDisplay: [
    { pair: "EUR/PLN", rate: 4.298, change: 0.15, up: true },
    { pair: "USD/PLN", rate: 3.96, change: -0.08, up: false },
    { pair: "GBP/PLN", rate: 5.028, change: 0.22, up: true },
    { pair: "CHF/PLN", rate: 4.522, change: -0.05, up: false },
  ],

  currencySymbols: { PLN: "zł", EUR: "€", USD: "$", GBP: "£", CHF: "Fr" },
  currencyFlags: { PLN: "🇵🇱", EUR: "🇪🇺", USD: "🇺🇸", GBP: "🇬🇧", CHF: "🇨🇭" },
  currencyColors: {
    PLN: {
      bg: "rgba(239,68,68,0.15)",
      text: "#ef4444",
      bar: "linear-gradient(90deg,#ef4444,#f59e0b)",
    },
    EUR: {
      bg: "rgba(59,130,246,0.15)",
      text: "#3b82f6",
      bar: "linear-gradient(90deg,#3b82f6,#06b6d4)",
    },
    USD: {
      bg: "rgba(34,197,94,0.15)",
      text: "#22c55e",
      bar: "linear-gradient(90deg,#22c55e,#10b981)",
    },
    GBP: {
      bg: "rgba(168,85,247,0.15)",
      text: "#a855f7",
      bar: "linear-gradient(90deg,#a855f7,#ec4899)",
    },
    CHF: {
      bg: "rgba(245,158,11,0.15)",
      text: "#f59e0b",
      bar: "linear-gradient(90deg,#f59e0b,#ef4444)",
    },
  },

  accounts: [],
  goals: [],
  transactions: [],

  totalIncome: 0,
  totalExpenses: 0,
  totalSavings: 0,

  _nextAccId: 1,
  _nextGoalId: 1,
  _nextTxId: 1,

  convert(amount, from, to) {
    if (from === to) return amount;
    const rate = this.exchangeRates[from]?.[to];
    return rate ? amount * rate : amount;
  },

  formatMoney(amount, currency) {
    const sym = currency || this.user.displayCurrency;
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount) +
      " " +
      sym
    );
  },

  getTotalBalanceInDisplay() {
    const dc = this.user.displayCurrency;
    return this.accounts.reduce(
      (sum, a) => sum + this.convert(a.balance, a.currency, dc),
      0,
    );
  },

  getTotalSavingsInDisplay() {
    return this.convert(
      this.totalSavings,
      this.user.primaryCurrency,
      this.user.displayCurrency,
    );
  },

  recalcTotals() {
    const pc = this.user.primaryCurrency;
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalSavings = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      const t = this.transactions[i];
      const converted = this.convert(t.amount, t.currency, pc);
      if (t.type === "income") {
        this.totalIncome += converted;
      } else if (t.type === "expense") {
        this.totalExpenses += converted;
      } else if (t.type === "savings") {
        this.totalSavings += converted;
      }
    }
  },

  getSavingsRate() {
    if (this.totalIncome === 0) return 0;
    return Math.round((this.totalSavings / this.totalIncome) * 100);
  },

  addAccount(name, currency, initialBalance) {
    const acc = {
      id: "acc-" + this._nextAccId++,
      name: name,
      currency: currency,
      balance: parseFloat(initialBalance) || 0,
      available: parseFloat(initialBalance) || 0,
      iban: this._generateIban(),
      change: 0,
    };
    this.accounts.push(acc);
    this.save();
    return acc;
  },

  removeAccount(id) {
    this.accounts = this.accounts.filter((a) => a.id !== id);
    this.save();
  },

  addGoal(name, target, currency, deadline, category) {
    const icons = {
      Travel: "fas fa-plane",
      Technology: "fas fa-laptop",
      Safety: "fas fa-shield-alt",
      Investment: "fas fa-chart-line",
      Education: "fas fa-graduation-cap",
      Health: "fas fa-heart",
      Home: "fas fa-home",
      Other: "fas fa-star",
    };
    const goal = {
      id: "g-" + this._nextGoalId++,
      name: name,
      target: parseFloat(target),
      saved: 0,
      currency: currency,
      deadline: deadline || "",
      category: category || "Other",
      icon: icons[category] || "fas fa-star",
      status: "active",
    };
    this.goals.push(goal);
    this.save();
    return goal;
  },

  removeGoal(id) {
    this.goals = this.goals.filter((g) => g.id !== id);
    this.save();
  },

  addSavingsToGoal(goalId, amount) {
    const goal = this.goals.find((g) => g.id === goalId);
    if (goal) {
      goal.saved = Math.min(goal.saved + parseFloat(amount), goal.target);
      if (goal.saved >= goal.target) {
        goal.status = "completed";
      }
      this.save();
    }
  },

  addTransaction(title, type, amount, currency, category, account, note) {
    const icons = {
      salary: "fas fa-building",
      freelance: "fas fa-code",
      investment: "fas fa-chart-line",
      dividends: "fas fa-coins",
      gift: "fas fa-gift",
      other: "fas fa-ellipsis-h",
      groceries: "fas fa-shopping-cart",
      restaurant: "fas fa-utensils",
      transport: "fas fa-car",
      entertainment: "fas fa-film",
      shopping: "fas fa-shopping-bag",
      subscriptions: "fas fa-redo",
      bills: "fas fa-file-invoice-dollar",
      health: "fas fa-heartbeat",
      education: "fas fa-graduation-cap",
      savings: "fas fa-piggy-bank",
      exchange: "fas fa-exchange-alt",
      transfer: "fas fa-paper-plane",
    };

    const tx = {
      id: "tx-" + this._nextTxId++,
      title: title,
      type: type,
      amount: parseFloat(amount),
      currency: currency,
      category: category || "other",
      account: account || "General",
      note: note || "",
      icon: icons[category] || icons[type] || "fas fa-receipt",
      date: new Date().toISOString(),
      status: "completed",
    };

    this.transactions.unshift(tx);

    // Update account balance
    const acc = this.accounts.find(
      (a) => a.name === account || a.currency === currency,
    );
    if (acc) {
      if (type === "income") {
        acc.balance += tx.amount;
        acc.available += tx.amount;
      } else if (type === "expense" || type === "savings") {
        acc.balance -= tx.amount;
        acc.available -= tx.amount;
      }
    }

    this.recalcTotals();
    this.save();
    return tx;
  },

  _generateIban() {
    const r = () => Math.floor(Math.random() * 10);
    return `PL** **** **** **** **** ${r()}${r()}${r()}${r()}`;
  },

  save() {
    try {
      localStorage.setItem(
        "smygrys_data",
        JSON.stringify({
          user: this.user,
          accounts: this.accounts,
          goals: this.goals,
          transactions: this.transactions,
          _nextAccId: this._nextAccId,
          _nextGoalId: this._nextGoalId,
          _nextTxId: this._nextTxId,
        }),
      );
    } catch (e) {
      console.warn("Failed to save data:", e);
    }
  },

  load() {
    try {
      const raw = localStorage.getItem("smygrys_data");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.user) Object.assign(this.user, d.user);
        if (d.accounts) this.accounts = d.accounts;
        if (d.goals) this.goals = d.goals;
        if (d.transactions) this.transactions = d.transactions;
        if (d._nextAccId) this._nextAccId = d._nextAccId;
        if (d._nextGoalId) this._nextGoalId = d._nextGoalId;
        if (d._nextTxId) this._nextTxId = d._nextTxId;
        this.recalcTotals();
        return true;
      }
    } catch (e) {
      console.warn("Failed to load data:", e);
    }
    return false;
  },

  resetAll() {
    this.user = {
      primaryCurrency: "PLN",
      displayCurrency: "PLN",
      dailyIncome: 0,
      savingsGoalPct: 20,
      onboardingDone: false,
    };
    this.accounts = [];
    this.goals = [];
    this.transactions = [];
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalSavings = 0;
    this._nextAccId = 1;
    this._nextGoalId = 1;
    this._nextTxId = 1;
    try {
      localStorage.removeItem("smygrys_data");
    } catch (e) {
      console.warn("Failed to clear data:", e);
    }
  },

  getFinancialContext() {
    const dc = this.user.displayCurrency;
    const totalBal = this.getTotalBalanceInDisplay();
    const monthlyIncome = this.user.dailyIncome * 30;
    const savTarget = monthlyIncome * (this.user.savingsGoalPct / 100);

    return {
      displayCurrency: dc,
      totalBalance: this.formatMoney(totalBal, dc),
      totalSavings: this.formatMoney(this.getTotalSavingsInDisplay(), dc),
      totalIncome: this.formatMoney(
        this.convert(this.totalIncome, this.user.primaryCurrency, dc),
        dc,
      ),
      totalExpenses: this.formatMoney(
        this.convert(this.totalExpenses, this.user.primaryCurrency, dc),
        dc,
      ),
      accountCount: this.accounts.length,
      goalCount: this.goals.length,
      txCount: this.transactions.length,
      accounts: this.accounts.map((a) => ({
        name: a.name,
        balance: this.formatMoney(a.balance, a.currency),
        currency: a.currency,
        change: a.change,
      })),
      goals: this.goals.map((g) => ({
        name: g.name,
        pct: g.target > 0 ? Math.round((g.saved / g.target) * 100) : 0,
        remaining: this.formatMoney(
          Math.max(0, g.target - g.saved),
          g.currency,
        ),
        status: g.status,
      })),
      dailyIncome: this.user.dailyIncome,
      savingsGoalPct: this.user.savingsGoalPct,
      monthlyIncome: this.formatMoney(monthlyIncome, this.user.primaryCurrency),
      suggestedMonthlySavings: this.formatMoney(
        savTarget,
        this.user.primaryCurrency,
      ),
      savingsRate: this.getSavingsRate(),
      exchangeRates: this.rateDisplay,
    };
  },
};
