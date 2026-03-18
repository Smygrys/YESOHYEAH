// ============================
// SMYGRYSSAVE AI — FULL APP
// ============================

const Onboarding = {
  currentStep: 1,
  selectedCurrency: "PLN",

  next() {
    if (this.currentStep >= 3) return;
    document
      .getElementById(`ob-step-${this.currentStep}`)
      .classList.remove("active");
    this.currentStep++;
    document
      .getElementById(`ob-step-${this.currentStep}`)
      .classList.add("active");
  },
  prev() {
    if (this.currentStep <= 1) return;
    document
      .getElementById(`ob-step-${this.currentStep}`)
      .classList.remove("active");
    this.currentStep--;
    document
      .getElementById(`ob-step-${this.currentStep}`)
      .classList.add("active");
  },
  selectCurrency(el) {
    document
      .querySelectorAll(".ob-currency-card")
      .forEach((c) => c.classList.remove("selected"));
    el.classList.add("selected");
    this.selectedCurrency = el.dataset.currency;
    document.getElementById("ob-income-currency").textContent =
      this.selectedCurrency;
  },
  updateSlider() {
    document.getElementById("ob-slider-value").textContent =
      document.getElementById("ob-savings-slider").value + "%";
  },
  complete() {
    const income =
      parseFloat(document.getElementById("ob-daily-income").value) || 0;
    const goalPct =
      parseInt(document.getElementById("ob-savings-slider").value) || 20;
    AppData.user.primaryCurrency = this.selectedCurrency;
    AppData.user.displayCurrency = this.selectedCurrency;
    AppData.user.dailyIncome = income;
    AppData.user.savingsGoalPct = goalPct;
    AppData.user.onboardingDone = true;
    AppData.save();
    const overlay = document.getElementById("onboarding-overlay");
    overlay.classList.add("hidden");
    setTimeout(() => {
      overlay.style.display = "none";
      document.getElementById("app").style.display = "grid";
      App.init();
    }, 600);
  },
};

const App = {
  charts: {},
  activeTxFilter: "all",
  activeTxCurFilter: "all",
  activeGoalFilter: "all",
  notifications: [],
  recurringPayments: [],
  wishlistItems: [],

  init() {
    AppData.load();
    AppData.recalcTotals();
    this.loadExtras();
    this.syncCurrencyButtons();
    this.setGreeting();
    this.renderAll();
    this.initCharts();
    this.bindAllEvents();
    this.updateAIWelcome();
    this.calcExchange();
    this.generateNotifications();
  },

  loadExtras() {
    try {
      const ext = localStorage.getItem("smygrys_extras");
      if (ext) {
        const d = JSON.parse(ext);
        this.recurringPayments = d.recurringPayments || [];
        this.wishlistItems = d.wishlistItems || [];
      }
    } catch (e) {}
  },

  saveExtras() {
    try {
      localStorage.setItem(
        "smygrys_extras",
        JSON.stringify({
          recurringPayments: this.recurringPayments,
          wishlistItems: this.wishlistItems,
        }),
      );
    } catch (e) {}
  },

  renderAll() {
    this.renderAccounts();
    this.renderStats();
    this.renderGoals();
    this.renderTransactions();
    this.renderExchangeRates();
    this.updateHero();
    this.updateSidebar();
  },

  afterDataChange() {
    this.renderAll();
    this.updateCharts();
    this.generateNotifications();
  },

  setGreeting() {
    const h = new Date().getHours();
    const g =
      h < 5
        ? "Good Night!"
        : h < 12
          ? "Good Morning!"
          : h < 18
            ? "Good Afternoon!"
            : "Good Evening!";
    document.getElementById("greeting-text").textContent = g;
    document.getElementById("date-text").textContent =
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  },

  syncCurrencyButtons() {
    document
      .querySelectorAll(".cur-btn")
      .forEach((b) =>
        b.classList.toggle(
          "active",
          b.dataset.cur === AppData.user.displayCurrency,
        ),
      );
  },

  setDisplayCurrency(cur) {
    AppData.user.displayCurrency = cur;
    AppData.save();
    this.syncCurrencyButtons();
    this.renderAll();
    this.updateCharts();
    this.calcExchange();
    AI.addMessage(
      "bot",
      `🔄 Display currency changed to <strong>${cur}</strong>.`,
    );
  },

  generateNotifications() {
    this.notifications = [];
    if (AppData.accounts.length === 0)
      this.notifications.push({
        text: "💳 Add your first currency account!",
        action: "addAccount",
      });
    if (AppData.transactions.length === 0 && AppData.accounts.length > 0)
      this.notifications.push({
        text: "📝 Record your first income or expense.",
        action: "income",
      });
    if (AppData.goals.length === 0)
      this.notifications.push({
        text: "🎯 Create a savings goal!",
        action: "goal",
      });
    AppData.goals.forEach((g) => {
      const pct = g.target > 0 ? Math.round((g.saved / g.target) * 100) : 0;
      if (pct >= 100 && g.status === "active")
        this.notifications.push({ text: `🎉 "${g.name}" is complete!` });
      else if (pct >= 80)
        this.notifications.push({ text: `🔥 "${g.name}" is ${pct}% done!` });
    });
    AppData.accounts.forEach((a) => {
      if (a.balance < 0)
        this.notifications.push({ text: `⚠️ ${a.name} has negative balance!` });
    });
    const rate = AppData.getSavingsRate();
    if (AppData.totalIncome > 0 && rate < AppData.user.savingsGoalPct)
      this.notifications.push({
        text: `📊 Savings rate (${rate}%) below ${AppData.user.savingsGoalPct}% target.`,
      });
    this.recurringPayments.forEach((rp) => {
      this.notifications.push({
        text: `🔔 Recurring: ${rp.title} — ${AppData.currencySymbols[rp.currency]}${rp.amount} (${rp.frequency})`,
      });
    });
    const dot = document.querySelector(".notif-dot");
    if (dot)
      dot.style.display = this.notifications.length > 0 ? "block" : "none";
  },

  showNotifications() {
    if (this.notifications.length === 0) {
      this.rawModal(
        '<h3>🔔 Notifications</h3><p style="color:var(--text-secondary);margin:16px 0">All clear! ✅</p><div class="form-actions"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>',
      );
      return;
    }
    let html =
      '<h3>🔔 Notifications</h3><div style="display:flex;flex-direction:column;gap:8px;margin-top:16px;max-height:400px;overflow-y:auto">';
    this.notifications.forEach((n) => {
      html += `<div style="padding:12px;border-radius:10px;background:var(--bg-input);border:1px solid var(--border);font-size:12px;display:flex;align-items:center;gap:10px">
        <span style="flex:1">${n.text}</span>
        ${n.action ? `<button class="btn btn-gradient" style="padding:5px 12px;font-size:10px;white-space:nowrap" onclick="App.closeModalDirect();App.openModal('${n.action}')">Go</button>` : ""}
      </div>`;
    });
    html +=
      '</div><div class="form-actions" style="margin-top:16px"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>';
    this.rawModal(html);
  },

  performSearch(query) {
    if (!query || query.length < 1) return;
    const q = query.toLowerCase();
    const results = [];
    AppData.accounts.forEach((a) => {
      if (
        a.name.toLowerCase().includes(q) ||
        a.currency.toLowerCase().includes(q)
      )
        results.push({
          type: "Account",
          name: a.name,
          detail: `${AppData.currencySymbols[a.currency]}${a.balance.toFixed(2)}`,
          icon: "fas fa-wallet",
          action: `App.showAccountDetails('${a.id}')`,
        });
    });
    AppData.goals.forEach((g) => {
      if (
        g.name.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      )
        results.push({
          type: "Goal",
          name: g.name,
          detail: `${Math.round((g.saved / g.target) * 100)}%`,
          icon: "fas fa-bullseye",
          action: `App.showGoalDetails('${g.id}')`,
        });
    });
    AppData.transactions.forEach((t) => {
      if (
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.note && t.note.toLowerCase().includes(q))
      )
        results.push({
          type: "Transaction",
          name: t.title,
          detail: `${AppData.currencySymbols[t.currency]}${t.amount.toFixed(2)}`,
          icon: t.icon,
          action: `App.showTransactionDetail('${t.id}')`,
        });
    });
    if (results.length === 0) {
      this.rawModal(
        `<h3>🔍 Search</h3><p style="color:var(--text-secondary);margin:16px 0">No results for "${query}".</p><div class="form-actions"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`,
      );
      return;
    }
    let html = `<h3>🔍 "${query}"</h3><div style="display:flex;flex-direction:column;gap:6px;margin-top:16px;max-height:400px;overflow-y:auto">`;
    results.slice(0, 20).forEach((r) => {
      html += `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border);cursor:pointer" onclick="App.closeModalDirect();${r.action}">
        <i class="${r.icon}" style="color:var(--purple);width:18px;text-align:center"></i>
        <div style="flex:1"><div style="font-size:12px;font-weight:600">${r.name}</div><div style="font-size:10px;color:var(--text-muted)">${r.type}</div></div>
        <span style="font-size:12px;font-weight:700;color:var(--text-secondary)">${r.detail}</span>
      </div>`;
    });
    html +=
      '</div><div class="form-actions" style="margin-top:16px"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>';
    this.rawModal(html);
  },

  updateHero() {
    const dc = AppData.user.displayCurrency;
    const total = AppData.getTotalBalanceInDisplay();
    const income = AppData.convert(
      AppData.totalIncome,
      AppData.user.primaryCurrency,
      dc,
    );
    const expenses = AppData.convert(
      AppData.totalExpenses,
      AppData.user.primaryCurrency,
      dc,
    );
    const rate = AppData.getSavingsRate();
    document.getElementById("hero-balance").textContent = AppData.formatMoney(
      total,
      dc,
    );
    document.getElementById("hero-income").textContent = AppData.formatMoney(
      income,
      dc,
    );
    document.getElementById("hero-expenses").textContent = AppData.formatMoney(
      expenses,
      dc,
    );
    document.getElementById("hero-savings-rate").textContent = rate + "%";
    const bt = document.getElementById("hero-balance-trend");
    const it = document.getElementById("hero-income-trend");
    const et = document.getElementById("hero-expenses-trend");
    const rt = document.getElementById("hero-rate-trend");
    if (AppData.accounts.length === 0) {
      document.getElementById("hero-heading").textContent =
        "Welcome! Let's build your finances 💰";
      document.getElementById("hero-subtitle").textContent =
        "Start by adding accounts, recording income, and setting goals.";
      [bt, it, et, rt].forEach((el) => {
        if (el) el.textContent = "";
      });
    } else {
      document.getElementById("hero-heading").textContent =
        "Your money, organized intelligently 💰";
      const uq = [...new Set(AppData.accounts.map((a) => a.currency))];
      document.getElementById("hero-subtitle").textContent =
        `Managing ${AppData.accounts.length} account(s) in ${uq.join(", ")}.`;
      if (bt) {
        bt.className = "hero-stat-trend up";
        bt.innerHTML = `<i class="fas fa-arrow-up"></i> ${AppData.accounts.length} account(s)`;
      }
      if (it) {
        it.className = "hero-stat-trend up";
        it.textContent = `${AppData.transactions.filter((t) => t.type === "income").length} entries`;
      }
      if (et) {
        et.className = "hero-stat-trend";
        et.textContent = `${AppData.transactions.filter((t) => t.type === "expense").length} entries`;
      }
      if (rt) {
        rt.className =
          rate >= AppData.user.savingsGoalPct
            ? "hero-stat-trend up"
            : "hero-stat-trend down";
        rt.textContent =
          rate >= AppData.user.savingsGoalPct
            ? `✅ Above ${AppData.user.savingsGoalPct}% goal`
            : `⚠️ Below ${AppData.user.savingsGoalPct}% goal`;
      }
    }
  },

  updateSidebar() {
    const dc = AppData.user.displayCurrency;
    document.getElementById("sb-total-savings").textContent =
      AppData.formatMoney(AppData.getTotalSavingsInDisplay(), dc);
    document.getElementById("sb-available").textContent = AppData.formatMoney(
      AppData.getTotalBalanceInDisplay(),
      dc,
    );
    document.getElementById("sb-active-goals").textContent =
      AppData.goals.filter((g) => g.status === "active").length;
    document.getElementById("sb-currencies").textContent = [
      ...new Set(AppData.accounts.map((a) => a.currency)),
    ].length;
    document.getElementById("sb-transactions").textContent =
      AppData.transactions.length;
    const badge = document.getElementById("nav-goals-badge");
    if (badge) badge.textContent = AppData.goals.length;
  },

  renderAccounts() {
    const dc = AppData.user.displayCurrency;
    const c = document.getElementById("accounts-container");
    if (AppData.accounts.length === 0) {
      c.innerHTML = `<div class="empty-state" style="min-width:100%;padding:40px"><i class="fas fa-wallet empty-icon"></i><h4>No accounts yet</h4><p>Add your first currency account.</p><button class="btn btn-gradient" onclick="App.openModal('addAccount')"><i class="fas fa-plus"></i> Add Account</button></div>`;
      return;
    }
    c.innerHTML = AppData.accounts
      .map((a) => {
        const cc =
          AppData.currencyColors[a.currency] || AppData.currencyColors.PLN;
        const sym = AppData.currencySymbols[a.currency] || a.currency;
        const flag = AppData.currencyFlags[a.currency] || "🏦";
        const conv = AppData.convert(a.balance, a.currency, dc);
        const rt =
          a.currency !== dc
            ? `1 ${a.currency} = ${(AppData.exchangeRates[a.currency]?.[dc] || 1).toFixed(4)} ${dc}`
            : "Base currency";
        const ct =
          a.currency !== dc
            ? ` · <span>≈ ${AppData.formatMoney(conv, dc)}</span>`
            : "";
        return `<div class="account-card"><div class="accent-bar" style="background:${cc.bar}"></div>
        <div class="account-card-top"><div class="acc-flag-wrap"><div class="acc-flag" style="background:${cc.bg};color:${cc.text}">${flag}</div><span class="acc-name">${a.name}</span></div>
        <span class="acc-change ${a.change >= 0 ? "up" : "down"}">${a.change >= 0 ? "↑" : "↓"} ${Math.abs(a.change).toFixed(1)}%</span></div>
        <div class="acc-balance">${sym} ${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(a.balance)}</div>
        <div class="acc-available">Available: ${sym} ${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(a.available)}</div>
        <div class="acc-iban">${a.iban}</div><div class="acc-rate">${rt}${ct}</div>
        <div class="acc-actions">
          <button class="acc-action-btn" onclick="App.openModalForAcc('income','${a.id}')">Income</button>
          <button class="acc-action-btn" onclick="App.openModalForAcc('spend','${a.id}')">Spend</button>
          <button class="acc-action-btn" onclick="App.scrollToExchange('${a.currency}')">Exchange</button>
          <button class="acc-action-btn" onclick="App.topUpAccount('${a.id}')">Top Up</button>
          <button class="acc-action-btn" onclick="App.showAccountDetails('${a.id}')">Details</button>
          <button class="acc-action-btn delete" onclick="App.deleteAccountConfirm('${a.id}')">✕</button>
        </div></div>`;
      })
      .join("");
  },

  openModalForAcc(type, accId) {
    this.openModal(type);
    setTimeout(() => {
      const acc = AppData.accounts.find((a) => a.id === accId);
      if (!acc) return;
      const p = type === "income" ? "inc" : "exp";
      const as = document.getElementById(`m-${p}-acc`);
      const cs = document.getElementById(`m-${p}-cur`);
      if (as) as.value = acc.name;
      if (cs) cs.value = acc.currency;
    }, 60);
  },

  scrollToExchange(currency) {
    document.getElementById("ex-from-cur").value = currency;
    this.calcExchange();
    document
      .querySelector(".exchange-widget")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  },

  topUpAccount(accId) {
    const acc = AppData.accounts.find((a) => a.id === accId);
    if (!acc) return;
    const sym = AppData.currencySymbols[acc.currency];
    this.rawModal(`<h3>💳 Top Up: ${acc.name}</h3>
      <p style="color:var(--text-secondary);font-size:12px;margin-bottom:16px">Current: <strong>${sym}${acc.balance.toFixed(2)}</strong></p>
      <div class="form-group"><label>Amount (${acc.currency})</label><input id="m-topup-amt" type="number" placeholder="0.00" step="0.01"></div>
      <div class="form-group"><label>Source</label><select id="m-topup-src"><option>Bank Transfer</option><option>Debit Card</option><option>Credit Card</option><option>Cash</option><option>External</option></select></div>
      <div class="form-group"><label>Note</label><input id="m-topup-note" placeholder="Optional"></div>
      <div class="form-actions"><button class="btn btn-gradient" onclick="App.doTopUp('${accId}')"><i class="fas fa-plus"></i> Top Up</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`);
  },

  doTopUp(accId) {
    const amt = parseFloat(document.getElementById("m-topup-amt").value);
    const src = document.getElementById("m-topup-src").value;
    const note = document.getElementById("m-topup-note").value.trim();
    if (!amt || amt <= 0) return alert("Enter a valid amount.");
    const acc = AppData.accounts.find((a) => a.id === accId);
    if (!acc) return;
    acc.balance += amt;
    acc.available += amt;
    AppData.addTransaction(
      `Top Up: ${acc.name}`,
      "income",
      amt,
      acc.currency,
      "other",
      acc.name,
      note || `Via ${src}`,
    );
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage(
      "bot",
      `💳 Topped up <strong>${acc.name}</strong> with <strong>${AppData.formatMoney(amt, acc.currency)}</strong>.`,
    );
  },

  showAccountDetails(accId) {
    const a = AppData.accounts.find((x) => x.id === accId);
    if (!a) return;
    const dc = AppData.user.displayCurrency;
    const sym = AppData.currencySymbols[a.currency];
    const flag = AppData.currencyFlags[a.currency];
    const conv = AppData.convert(a.balance, a.currency, dc);
    const txs = AppData.transactions.filter(
      (t) => t.account && t.account.includes(a.name),
    );
    const inc = txs
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const exp = txs
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    this.rawModal(`<h3>${flag} ${a.name}</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
        <div style="padding:14px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border)"><div style="font-size:10px;color:var(--text-muted)">Balance</div><div style="font-size:18px;font-weight:800">${sym}${a.balance.toFixed(2)}</div></div>
        <div style="padding:14px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border)"><div style="font-size:10px;color:var(--text-muted)">In ${dc}</div><div style="font-size:18px;font-weight:800">${AppData.formatMoney(conv, dc)}</div></div>
        <div style="padding:14px;background:var(--green-dim);border-radius:10px"><div style="font-size:10px;color:var(--green)">Income</div><div style="font-size:16px;font-weight:700;color:var(--green)">${sym}${inc.toFixed(2)}</div></div>
        <div style="padding:14px;background:var(--red-dim);border-radius:10px"><div style="font-size:10px;color:var(--red)">Expenses</div><div style="font-size:16px;font-weight:700;color:var(--red)">${sym}${exp.toFixed(2)}</div></div>
      </div>
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">IBAN: <span style="font-family:monospace">${a.iban}</span></div>
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">Transactions: ${txs.length}</div>
      <div class="form-actions" style="margin-top:16px">
        <button class="btn btn-gradient" onclick="App.closeModalDirect();App.openModalForAcc('income','${a.id}')"><i class="fas fa-plus"></i> Income</button>
        <button class="btn btn-gradient" onclick="App.closeModalDirect();App.topUpAccount('${a.id}')">Top Up</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`);
  },

  deleteAccountConfirm(id) {
    const a = AppData.accounts.find((x) => x.id === id);
    if (!a) return;
    this
      .rawModal(`<h3>⚠️ Delete Account</h3><p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">Delete <strong>${a.name}</strong>? Balance: <strong>${AppData.currencySymbols[a.currency]}${a.balance.toFixed(2)}</strong></p>
      <div class="form-actions"><button class="btn btn-danger" onclick="App.doDeleteAccount('${id}')"><i class="fas fa-trash-alt"></i> Delete</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`);
  },

  doDeleteAccount(id) {
    const a = AppData.accounts.find((x) => x.id === id);
    AppData.removeAccount(id);
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage("bot", `🗑️ "${a?.name}" deleted.`);
  },

  renderStats() {
    const dc = AppData.user.displayCurrency;
    const pc = AppData.user.primaryCurrency;
    const nw =
      AppData.getTotalBalanceInDisplay() + AppData.getTotalSavingsInDisplay();
    const defs = [
      {
        l: "Total Balance",
        v: AppData.getTotalBalanceInDisplay(),
        i: "fas fa-wallet",
        c: "var(--green)",
        b: "var(--green-dim)",
      },
      {
        l: "Total Income",
        v: AppData.convert(AppData.totalIncome, pc, dc),
        i: "fas fa-arrow-down",
        c: "var(--green)",
        b: "var(--green-dim)",
      },
      {
        l: "Total Expenses",
        v: AppData.convert(AppData.totalExpenses, pc, dc),
        i: "fas fa-arrow-up",
        c: "var(--red)",
        b: "var(--red-dim)",
      },
      {
        l: "Total Savings",
        v: AppData.getTotalSavingsInDisplay(),
        i: "fas fa-piggy-bank",
        c: "var(--purple)",
        b: "var(--purple-dim)",
      },
      {
        l: "Savings Rate",
        v: AppData.getSavingsRate(),
        i: "fas fa-percentage",
        c: "var(--blue)",
        b: "var(--blue-dim)",
        pct: true,
      },
      {
        l: "Net Worth",
        v: nw,
        i: "fas fa-gem",
        c: "var(--cyan)",
        b: "var(--cyan-dim)",
      },
    ];
    document.getElementById("stats-container").innerHTML = defs
      .map(
        (s) =>
          `<div class="stat-card"><div class="stat-card-top"><div class="stat-icon" style="background:${s.b};color:${s.c}"><i class="${s.i}"></i></div></div><div class="stat-label">${s.l}</div><div class="stat-value">${s.pct ? s.v + "%" : AppData.formatMoney(s.v, dc)}</div></div>`,
      )
      .join("");
  },

  renderGoals() {
    const c = document.getElementById("goals-container");
    let list = AppData.goals;
    if (this.activeGoalFilter !== "all")
      list = list.filter((g) => g.status === this.activeGoalFilter);
    if (list.length === 0) {
      c.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-bullseye empty-icon"></i><h4>${this.activeGoalFilter === "all" ? "No goals yet" : `No ${this.activeGoalFilter} goals`}</h4><p>Create a savings goal!</p><button class="btn btn-gradient" onclick="App.openModal('goal')"><i class="fas fa-plus"></i> Create Goal</button></div>`;
      return;
    }
    const colors = [
      "var(--green)",
      "var(--blue)",
      "var(--purple)",
      "var(--orange)",
      "var(--cyan)",
      "var(--pink)",
    ];
    c.innerHTML = list
      .map((g, i) => {
        const pct = g.target > 0 ? Math.round((g.saved / g.target) * 100) : 0;
        const rem = Math.max(0, g.target - g.saved);
        const sym = AppData.currencySymbols[g.currency] || g.currency;
        const col = colors[i % colors.length];
        return `<div class="goal-card" onclick="App.showGoalDetails('${g.id}')">
        <button class="goal-delete" onclick="event.stopPropagation();App.deleteGoalConfirm('${g.id}')"><i class="fas fa-times"></i></button>
        <div class="goal-top"><div class="goal-icon" style="background:${col}18;color:${col}"><i class="${g.icon}"></i></div>
        <div class="goal-info"><h4>${g.name} ${g.status === "completed" ? "✅" : g.status === "paused" ? "⏸️" : ""}</h4><p>${g.category} · ${g.deadline || "No deadline"} · ${g.currency}</p></div></div>
        <div class="goal-amounts"><span class="current" style="color:${col}">${sym} ${g.saved.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span><span>of ${sym} ${g.target.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(pct, 100)}%;background:${col}"></div></div>
        <div class="goal-footer"><span>Remaining: ${sym} ${rem.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span><span class="pct" style="color:${col}">${pct}%</span></div></div>`;
      })
      .join("");
  },

  showGoalDetails(id) {
    const g = AppData.goals.find((x) => x.id === id);
    if (!g) return;
    const pct = g.target > 0 ? Math.round((g.saved / g.target) * 100) : 0;
    const rem = Math.max(0, g.target - g.saved);
    const sym = AppData.currencySymbols[g.currency];
    const accOpts =
      AppData.accounts.length > 0
        ? AppData.accounts
            .map(
              (a) =>
                `<option value="${a.name}">${a.name} (${AppData.currencySymbols[a.currency]}${a.balance.toFixed(2)})</option>`,
            )
            .join("")
        : '<option value="">No accounts</option>';
    this.rawModal(`<h3>🎯 ${g.name}</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
        <div style="padding:14px;background:var(--purple-dim);border-radius:10px"><div style="font-size:10px;color:var(--purple)">Saved</div><div style="font-size:18px;font-weight:800;color:var(--purple)">${sym}${g.saved.toFixed(2)}</div></div>
        <div style="padding:14px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border)"><div style="font-size:10px;color:var(--text-muted)">Target</div><div style="font-size:18px;font-weight:800">${sym}${g.target.toFixed(2)}</div></div>
      </div>
      <div class="progress-track" style="height:10px;margin-bottom:12px"><div class="progress-fill" style="width:${Math.min(pct, 100)}%;background:var(--purple)"></div></div>
      <div style="text-align:center;font-size:28px;font-weight:900;color:var(--purple);margin-bottom:16px">${pct}%</div>
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:16px">${g.category} · ${g.deadline || "No deadline"} · ${g.status} · Remaining: ${sym}${rem.toFixed(2)}</div>
      <hr style="border-color:var(--border);margin-bottom:16px">
      <div style="font-size:12px;font-weight:700;margin-bottom:8px">Quick Add</div>
      <div class="form-group"><label>Amount (${g.currency})</label><input id="m-gd-amt" type="number" placeholder="0.00" step="0.01"></div>
      <div class="form-group"><label>From Account</label><select id="m-gd-acc">${accOpts}</select></div>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="App.doGoalAdd('${g.id}')"><i class="fas fa-plus"></i> Save</button>
        ${g.status === "active" ? `<button class="btn btn-secondary" onclick="App.toggleGoalStatus('${g.id}','paused')"><i class="fas fa-pause"></i> Pause</button>` : ""}
        ${g.status === "paused" ? `<button class="btn btn-gradient" onclick="App.toggleGoalStatus('${g.id}','active')"><i class="fas fa-play"></i> Resume</button>` : ""}
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`);
  },

  doGoalAdd(id) {
    const amt = parseFloat(document.getElementById("m-gd-amt").value);
    const acc = document.getElementById("m-gd-acc").value;
    if (!amt || amt <= 0) return alert("Enter a valid amount.");
    if (!acc) return alert("Select an account.");
    const g = AppData.goals.find((x) => x.id === id);
    if (!g) return;
    AppData.addSavingsToGoal(id, amt);
    AppData.addTransaction(
      `Savings: ${g.name}`,
      "savings",
      amt,
      g.currency,
      "savings",
      acc,
      g.name,
    );
    this.closeModalDirect();
    this.afterDataChange();
    const pct = Math.round((g.saved / g.target) * 100);
    AI.addMessage(
      "bot",
      `🐷 <strong>${AppData.formatMoney(amt, g.currency)}</strong> → "${g.name}" — <strong>${pct}%</strong>${pct >= 100 ? " 🎉" : ""}`,
    );
  },

  toggleGoalStatus(id, status) {
    const g = AppData.goals.find((x) => x.id === id);
    if (g) {
      g.status = status;
      AppData.save();
    }
    this.closeModalDirect();
    this.renderAll();
    AI.addMessage(
      "bot",
      `${status === "paused" ? "⏸️" : "▶️"} "${g?.name}" → <strong>${status}</strong>.`,
    );
  },

  deleteGoalConfirm(id) {
    const g = AppData.goals.find((x) => x.id === id);
    if (!g) return;
    this
      .rawModal(`<h3>⚠️ Delete Goal</h3><p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">Delete "<strong>${g.name}</strong>"?</p>
      <div class="form-actions"><button class="btn btn-danger" onclick="App.doDeleteGoal('${id}')"><i class="fas fa-trash-alt"></i> Delete</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`);
  },

  doDeleteGoal(id) {
    AppData.removeGoal(id);
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage("bot", "🗑️ Goal deleted.");
  },

  renderTransactions() {
    const dc = AppData.user.displayCurrency;
    const c = document.getElementById("tx-container");
    let list = AppData.transactions;
    if (this.activeTxFilter !== "all")
      list = list.filter((t) => t.type === this.activeTxFilter);
    if (this.activeTxCurFilter !== "all")
      list = list.filter((t) => t.currency === this.activeTxCurFilter);
    if (list.length === 0) {
      c.innerHTML = `<div class="empty-state"><i class="fas fa-receipt empty-icon"></i><h4>${AppData.transactions.length === 0 ? "No transactions yet" : "No matching transactions"}</h4><p>${AppData.transactions.length === 0 ? "Add income or expenses." : "Try a different filter."}</p>${AppData.transactions.length === 0 ? '<button class="btn btn-gradient" onclick="App.openModal(\'income\')"><i class="fas fa-plus"></i> Add Income</button>' : ""}</div>`;
      return;
    }
    c.innerHTML = list
      .slice(0, 30)
      .map((t) => {
        const sym = AppData.currencySymbols[t.currency] || t.currency;
        const d = new Date(t.date);
        const ds = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const ts = d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const conv = AppData.convert(t.amount, t.currency, dc);
        let px = "",
          cl = "";
        if (t.type === "income") {
          px = "+";
          cl = "inc";
        } else if (t.type === "expense") {
          px = "-";
          cl = "exp";
        } else if (t.type === "savings") {
          px = "-";
          cl = "sav";
        } else if (t.type === "exchange") {
          cl = "xch";
        } else if (t.type === "transfer") {
          cl = "trf";
        }
        const tc = {
          income: "var(--green)",
          expense: "var(--red)",
          savings: "var(--purple)",
          exchange: "var(--blue)",
          transfer: "var(--orange)",
        };
        return `<div class="tx-row" style="cursor:pointer" onclick="App.showTransactionDetail('${t.id}')">
        <div class="tx-icon" style="background:${tc[t.type] || "var(--text-muted)"}15;color:${tc[t.type] || "var(--text-muted)"}"><i class="${t.icon}"></i></div>
        <div class="tx-details"><h5>${t.title}</h5><p>${ds} · ${ts} · ${t.account}${t.note ? " · " + t.note : ""}</p></div>
        <div class="tx-meta"><div class="tx-amount ${cl}">${px}${sym}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>${t.currency !== dc ? `<div class="tx-converted">≈ ${AppData.formatMoney(conv, dc)}</div>` : ""}</div></div>`;
      })
      .join("");
  },

  showTransactionDetail(txId) {
    const t = AppData.transactions.find((x) => x.id === txId);
    if (!t) return;
    const sym = AppData.currencySymbols[t.currency];
    const dc = AppData.user.displayCurrency;
    const conv = AppData.convert(t.amount, t.currency, dc);
    const d = new Date(t.date);
    const tc = {
      income: "var(--green)",
      expense: "var(--red)",
      savings: "var(--purple)",
      exchange: "var(--blue)",
      transfer: "var(--orange)",
    };
    const col = tc[t.type] || "var(--text)";
    const px =
      t.type === "income"
        ? "+"
        : t.type === "expense" || t.type === "savings"
          ? "-"
          : "";
    this.rawModal(`<h3>📋 Transaction</h3>
      <div style="text-align:center;margin:16px 0"><div style="font-size:28px;font-weight:900;color:${col}">${px}${sym}${t.amount.toFixed(2)}</div>${t.currency !== dc ? `<div style="font-size:12px;color:var(--text-muted)">≈ ${AppData.formatMoney(conv, dc)}</div>` : ""}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;margin-bottom:16px">
        <div><span style="color:var(--text-muted)">Title:</span> ${t.title}</div>
        <div><span style="color:var(--text-muted)">Type:</span> <span style="color:${col};text-transform:capitalize;font-weight:600">${t.type}</span></div>
        <div><span style="color:var(--text-muted)">Category:</span> ${t.category}</div>
        <div><span style="color:var(--text-muted)">Currency:</span> ${t.currency}</div>
        <div><span style="color:var(--text-muted)">Account:</span> ${t.account}</div>
        <div><span style="color:var(--text-muted)">Date:</span> ${d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
        ${t.note ? `<div style="grid-column:1/-1"><span style="color:var(--text-muted)">Note:</span> ${t.note}</div>` : ""}
      </div>
      <div class="form-actions"><button class="btn btn-danger" onclick="App.deleteTransaction('${t.id}')"><i class="fas fa-trash-alt"></i> Delete</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`);
  },

  deleteTransaction(txId) {
    const t = AppData.transactions.find((x) => x.id === txId);
    if (!t) return;
    const acc = AppData.accounts.find(
      (a) => a.name === t.account || (t.account && t.account.includes(a.name)),
    );
    if (acc) {
      if (t.type === "income") {
        acc.balance -= t.amount;
        acc.available -= t.amount;
      } else if (t.type === "expense" || t.type === "savings") {
        acc.balance += t.amount;
        acc.available += t.amount;
      }
    }
    if (t.type === "savings" && t.note) {
      const g = AppData.goals.find((gl) => t.note.includes(gl.name));
      if (g) {
        g.saved = Math.max(0, g.saved - t.amount);
        if (g.saved < g.target) g.status = "active";
      }
    }
    AppData.transactions = AppData.transactions.filter((x) => x.id !== txId);
    AppData.recalcTotals();
    AppData.save();
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage("bot", `🗑️ "${t.title}" deleted, balances reversed.`);
  },

  renderExchangeRates() {
    document.getElementById("rates-list").innerHTML = AppData.rateDisplay
      .map(
        (r) =>
          `<div class="rate-row"><span class="rate-pair">${r.pair}</span><div><span class="rate-value">${r.rate.toFixed(4)}</span><span class="rate-chg ${r.up ? "up" : "down"}">${r.up ? "↑" : "↓"}${Math.abs(r.change).toFixed(2)}%</span></div></div>`,
      )
      .join("");
  },

  calcExchange() {
    const a = parseFloat(document.getElementById("ex-from-amt").value) || 0;
    const f = document.getElementById("ex-from-cur").value;
    const t = document.getElementById("ex-to-cur").value;
    document.getElementById("ex-to-amt").value = AppData.convert(
      a,
      f,
      t,
    ).toFixed(2);
    document.getElementById("ex-rate-info").innerHTML =
      f !== t
        ? `Rate: 1 ${f} = <span>${(AppData.exchangeRates[f]?.[t] || 1).toFixed(4)} ${t}</span>`
        : "Same currency.";
  },

  swapExchange() {
    const f = document.getElementById("ex-from-cur");
    const t = document.getElementById("ex-to-cur");
    [f.value, t.value] = [t.value, f.value];
    this.calcExchange();
  },

  execExchange() {
    const amt = parseFloat(document.getElementById("ex-from-amt").value);
    const from = document.getElementById("ex-from-cur").value;
    const to = document.getElementById("ex-to-cur").value;
    if (!amt || amt <= 0) return alert("Enter a valid amount.");
    if (from === to) return alert("Choose different currencies.");
    const fa = AppData.accounts.find((a) => a.currency === from);
    const ta = AppData.accounts.find((a) => a.currency === to);
    if (!fa) return alert(`No ${from} account. Create one first.`);
    if (!ta) return alert(`No ${to} account. Create one first.`);
    if (fa.balance < amt) return alert(`Insufficient ${from} balance.`);
    const res = AppData.convert(amt, from, to);
    fa.balance -= amt;
    fa.available -= amt;
    ta.balance += res;
    ta.available += res;
    AppData.addTransaction(
      `${from} → ${to}`,
      "exchange",
      amt,
      from,
      "exchange",
      `${fa.name} → ${ta.name}`,
      `Rate: ${(AppData.exchangeRates[from]?.[to] || 1).toFixed(4)}`,
    );
    this.afterDataChange();
    AI.addMessage(
      "bot",
      `✅ <strong>${AppData.formatMoney(amt, from)}</strong> → <strong>${AppData.formatMoney(res, to)}</strong>`,
    );
  },

  // Charts
  initCharts() {
    Chart.defaults.color = "#8888a8";
    Chart.defaults.borderColor = "rgba(255,255,255,0.04)";
    this.buildSavingsChart();
    this.buildDonutChart();
    this.buildCurrencyChart();
    this.buildRateChart();
  },
  updateCharts() {
    this.buildSavingsChart();
    this.buildDonutChart();
    this.buildCurrencyChart();
  },

  buildSavingsChart() {
    const ctx = document.getElementById("savingsChart").getContext("2d");
    if (this.charts.s) this.charts.s.destroy();
    const dc = AppData.user.displayCurrency;
    const txs = [...AppData.transactions].reverse();
    let bal = 0,
      sav = 0;
    const labels = ["Start"],
      bD = [0],
      sD = [0];
    txs.forEach((t) => {
      const v = AppData.convert(t.amount, t.currency, dc);
      if (t.type === "income") bal += v;
      else if (t.type === "expense") bal -= v;
      else if (t.type === "savings") {
        bal -= v;
        sav += v;
      }
      labels.push(
        new Date(t.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );
      bD.push(bal);
      sD.push(sav);
    });
    const g1 = ctx.createLinearGradient(0, 0, 0, 260);
    g1.addColorStop(0, "rgba(34,197,94,0.2)");
    g1.addColorStop(1, "rgba(34,197,94,0)");
    const g2 = ctx.createLinearGradient(0, 0, 0, 260);
    g2.addColorStop(0, "rgba(168,85,247,0.2)");
    g2.addColorStop(1, "rgba(168,85,247,0)");
    this.charts.s = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Balance",
            data: bD,
            borderColor: "#22c55e",
            backgroundColor: g1,
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: bD.length > 15 ? 0 : 3,
            pointBackgroundColor: "#22c55e",
          },
          {
            label: "Savings",
            data: sD,
            borderColor: "#a855f7",
            backgroundColor: g2,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: sD.length > 15 ? 0 : 3,
            pointBackgroundColor: "#a855f7",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 16,
              font: { size: 11, weight: 600 },
            },
          },
        },
        scales: {
          y: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: { font: { size: 10 } },
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 }, maxTicksLimit: 8 },
          },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });
  },
  buildDonutChart() {
    const ctx = document.getElementById("donutChart").getContext("2d");
    if (this.charts.d) this.charts.d.destroy();
    const dc = AppData.user.displayCurrency,
      pc = AppData.user.primaryCurrency;
    const i = AppData.convert(AppData.totalIncome, pc, dc),
      e = AppData.convert(AppData.totalExpenses, pc, dc),
      s = AppData.convert(AppData.totalSavings, pc, dc),
      has = i > 0 || e > 0 || s > 0;
    this.charts.d = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: has ? ["Income", "Expenses", "Savings"] : ["No data"],
        datasets: [
          {
            data: has ? [i, e, s] : [1],
            backgroundColor: has
              ? ["#22c55e", "#ef4444", "#a855f7"]
              : ["rgba(255,255,255,0.06)"],
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 14,
              font: { size: 11, weight: 600 },
            },
          },
        },
      },
    });
  },
  buildCurrencyChart() {
    const ctx = document.getElementById("currencyChart").getContext("2d");
    if (this.charts.c) this.charts.c.destroy();
    const cols = [
        "#ef4444",
        "#3b82f6",
        "#22c55e",
        "#a855f7",
        "#f59e0b",
        "#ec4899",
        "#06b6d4",
      ],
      has = AppData.accounts.length > 0;
    this.charts.c = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: has ? AppData.accounts.map((a) => a.currency) : ["None"],
        datasets: [
          {
            data: has
              ? AppData.accounts.map((a) =>
                  Math.max(0, AppData.convert(a.balance, a.currency, "PLN")),
                )
              : [1],
            backgroundColor: has
              ? AppData.accounts.map((_, i) => cols[i % cols.length])
              : ["rgba(255,255,255,0.06)"],
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 12,
              font: { size: 10, weight: 600 },
            },
          },
        },
      },
    });
  },
  buildRateChart() {
    const ctx = document.getElementById("rateChart").getContext("2d");
    if (this.charts.r) this.charts.r.destroy();
    this.charts.r = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "EUR/PLN",
            data: [4.28, 4.29, 4.31, 4.3, 4.298, 4.31, 4.298],
            borderColor: "#3b82f6",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.3,
          },
          {
            label: "USD/PLN",
            data: [3.94, 3.95, 3.97, 3.96, 3.96, 3.95, 3.96],
            borderColor: "#22c55e",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.3,
          },
          {
            label: "GBP/PLN",
            data: [5.01, 5.02, 5.03, 5.02, 5.028, 5.03, 5.028],
            borderColor: "#a855f7",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.3,
          },
          {
            label: "CHF/PLN",
            data: [4.5, 4.51, 4.53, 4.52, 4.522, 4.53, 4.522],
            borderColor: "#f59e0b",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 6,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 8,
              font: { size: 9, weight: 600 },
            },
          },
        },
        scales: { y: { display: false }, x: { display: false } },
      },
    });
  },

  updateAIWelcome() {
    document.getElementById("ai-chat").innerHTML = "";
    AI.addMessage("bot", AI.generateWelcomeMessage());
  },

  rawModal(html) {
    document.getElementById("modal-card").innerHTML = html;
    document.getElementById("modal-backdrop").classList.add("show");
  },
  closeModal(e) {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove("show");
  },
  closeModalDirect() {
    document.getElementById("modal-backdrop").classList.remove("show");
  },

  // ===== NAVIGATION =====
  handleNav(page) {
    document
      .querySelectorAll(".nav-item")
      .forEach((i) => i.classList.remove("active"));
    document
      .querySelector(`.nav-item[data-page="${page}"]`)
      ?.classList.add("active");
    if (window.innerWidth <= 900)
      document.getElementById("sidebar").classList.remove("open");
    const scroll = document.querySelector(".main-scroll");
    switch (page) {
      case "dashboard":
        scroll.scrollTop = 0;
        break;
      case "goals":
        document
          .getElementById("goals-container")
          ?.scrollIntoView({ behavior: "smooth" });
        break;
      case "transactions":
        document
          .getElementById("tx-container")
          ?.scrollIntoView({ behavior: "smooth" });
        break;
      case "analytics":
        document
          .getElementById("savingsChart")
          ?.closest(".chart-card")
          ?.scrollIntoView({ behavior: "smooth" });
        break;
      case "calendar":
        Features.showCalendar();
        break;
    }
  },

  // ===== ALL FEATURES ROUTING — NO "COMING SOON" =====
  handleFeature(label) {
    if (window.innerWidth <= 900)
      document.getElementById("sidebar").classList.remove("open");
    switch (label) {
      case "Wallets":
        Features.showWallets();
        break;
      case "Recurring Payments":
        Features.showRecurring();
        break;
      case "Challenges":
        Features.showChallenges();
        break;
      case "Wishlist":
        Features.showWishlist();
        break;
      case "Achievements":
        Features.showAchievements();
        break;
      case "Net Worth":
        Features.showNetWorth();
        break;
      case "Investments":
        Features.showInvestments();
        break;
      case "Cards":
        Features.showCards();
        break;
      case "Loans":
        Features.showLoans();
        break;
      case "Currency Converter":
        document
          .querySelector(".exchange-widget")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      case "Budget Calculator":
        Features.showBudgetCalculator();
        break;
      case "Reports":
        Features.showReport();
        break;
      case "Predictions":
        Features.showPredictions();
        break;
      case "Settings":
        Features.showSettings();
        break;
      case "Export Data":
        Features.exportData();
        break;
      case "Import Data":
        Features.showImport();
        break;
      default:
        this.handleFeatureFallback(label);
        break;
    }
  },

  handleFeatureFallback(label) {
    // Instead of "coming soon", provide something useful for any unknown label
    AI.addMessage(
      "bot",
      `You clicked "<strong>${label}</strong>". Try using the quick action buttons or ask me for help with this feature!`,
    );
  },

  // ===== MODALS =====
  openModal(type) {
    const cur =
      '<option value="PLN">PLN</option><option value="EUR">EUR</option><option value="USD">USD</option><option value="GBP">GBP</option><option value="CHF">CHF</option>';
    const accOpts =
      AppData.accounts.length > 0
        ? AppData.accounts
            .map(
              (a) =>
                `<option value="${a.name}">${a.name} (${AppData.currencySymbols[a.currency]}${a.balance.toFixed(2)})</option>`,
            )
            .join("")
        : '<option value="">No accounts — create one first</option>';
    const goalOpts =
      AppData.goals.filter((g) => g.status === "active").length > 0
        ? AppData.goals
            .filter((g) => g.status === "active")
            .map(
              (g) =>
                `<option value="${g.id}">${g.name} (${Math.round((g.saved / g.target) * 100)}%)</option>`,
            )
            .join("")
        : '<option value="">No active goals</option>';
    const T = {
      addAccount: `<h3>💳 Add Account</h3><div class="form-group"><label>Name</label><input id="m-acc-name" placeholder="e.g., Main PLN Account"></div><div class="form-group"><label>Currency</label><select id="m-acc-cur">${cur}</select></div><div class="form-group"><label>Initial Balance</label><input id="m-acc-bal" type="number" value="0" step="0.01"></div><div class="form-actions"><button class="btn btn-gradient" onclick="App.doAddAccount()"><i class="fas fa-plus"></i> Create</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`,
      income: `<h3>➕ Add Income</h3><div class="form-group"><label>Title</label><input id="m-inc-title" placeholder="e.g., Salary"></div><div class="form-group"><label>Amount</label><input id="m-inc-amt" type="number" placeholder="0.00" step="0.01"></div><div class="form-group"><label>Currency</label><select id="m-inc-cur">${cur}</select></div><div class="form-group"><label>Account</label><select id="m-inc-acc">${accOpts}</select></div><div class="form-group"><label>Category</label><select id="m-inc-cat"><option>salary</option><option>freelance</option><option>investment</option><option>dividends</option><option>gift</option><option>other</option></select></div><div class="form-group"><label>Note</label><input id="m-inc-note" placeholder="Optional"></div><div class="form-actions"><button class="btn btn-gradient" onclick="App.doAddIncome()"><i class="fas fa-plus"></i> Add</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`,
      spend: `<h3>🛒 Expense</h3><div class="form-group"><label>Title</label><input id="m-exp-title" placeholder="e.g., Groceries"></div><div class="form-group"><label>Amount</label><input id="m-exp-amt" type="number" placeholder="0.00" step="0.01"></div><div class="form-group"><label>Currency</label><select id="m-exp-cur">${cur}</select></div><div class="form-group"><label>Account</label><select id="m-exp-acc">${accOpts}</select></div><div class="form-group"><label>Category</label><select id="m-exp-cat"><option>groceries</option><option>restaurant</option><option>transport</option><option>entertainment</option><option>shopping</option><option>subscriptions</option><option>bills</option><option>health</option><option>education</option><option>other</option></select></div><div class="form-group"><label>Note</label><input id="m-exp-note" placeholder="Optional"></div><div class="form-actions"><button class="btn btn-gradient" onclick="App.doAddExpense()"><i class="fas fa-shopping-cart"></i> Record</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`,
      save: `<h3>🐷 Savings</h3>${AppData.goals.filter((g) => g.status === "active").length === 0 ? '<p style="color:var(--orange);font-size:12px;margin-bottom:12px">⚠️ Create a goal first!</p>' : ""}<div class="form-group"><label>Goal</label><select id="m-sav-goal">${goalOpts}</select></div><div class="form-group"><label>Amount</label><input id="m-sav-amt" type="number" placeholder="0.00" step="0.01"></div><div class="form-group"><label>From Account</label><select id="m-sav-acc">${accOpts}</select></div><div class="form-group"><label>Note</label><input id="m-sav-note" placeholder="Optional"></div><div class="form-actions"><button class="btn btn-gradient" onclick="App.doAddSavings()"><i class="fas fa-piggy-bank"></i> Save</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`,
      goal: `<h3>🎯 New Goal</h3><div class="form-group"><label>Name</label><input id="m-goal-name" placeholder="e.g., Vacation"></div><div class="form-group"><label>Target</label><input id="m-goal-target" type="number" placeholder="0.00" step="0.01"></div><div class="form-group"><label>Currency</label><select id="m-goal-cur">${cur}</select></div><div class="form-group"><label>Deadline</label><input id="m-goal-dl" type="date"></div><div class="form-group"><label>Category</label><select id="m-goal-cat"><option>Travel</option><option>Technology</option><option>Safety</option><option>Investment</option><option>Education</option><option>Health</option><option>Home</option><option>Other</option></select></div><div class="form-actions"><button class="btn btn-gradient" onclick="App.doAddGoal()"><i class="fas fa-bullseye"></i> Create</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`,
      exchange: `<h3>💱 Exchange</h3><p style="color:var(--text-secondary);font-size:12px;margin-bottom:16px">Use the exchange widget below on the dashboard.</p><div class="form-actions"><button class="btn btn-gradient" onclick="App.closeModalDirect();document.querySelector('.exchange-widget')?.scrollIntoView({behavior:'smooth',block:'center'})">Go to Exchange</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`,
      transfer: `<h3>📤 Transfer</h3><div class="form-group"><label>From</label><select id="m-trf-from">${accOpts}</select></div><div class="form-group"><label>To</label><select id="m-trf-to">${accOpts}</select></div><div class="form-group"><label>Amount</label><input id="m-trf-amt" type="number" placeholder="0.00" step="0.01"></div><div class="form-group"><label>Note</label><input id="m-trf-note" placeholder="Optional"></div><div class="form-actions"><button class="btn btn-gradient" onclick="App.doTransfer()"><i class="fas fa-paper-plane"></i> Transfer</button><button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button></div>`,
    };
    if (T[type]) {
      this.rawModal(T[type]);
    } else {
      this.handleFeature(type.charAt(0).toUpperCase() + type.slice(1));
    }
  },

  // ===== FORM SUBMISSIONS =====
  doAddAccount() {
    const n = document.getElementById("m-acc-name").value.trim();
    const c = document.getElementById("m-acc-cur").value;
    const b = parseFloat(document.getElementById("m-acc-bal").value) || 0;
    if (!n) return alert("Enter a name.");
    if (AppData.accounts.some((a) => a.name.toLowerCase() === n.toLowerCase()))
      return alert("Name exists.");
    AppData.addAccount(n, c, b);
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage(
      "bot",
      `✅ "<strong>${n}</strong>" created with <strong>${AppData.formatMoney(b, c)}</strong>.`,
    );
  },
  doAddIncome() {
    const t = document.getElementById("m-inc-title").value.trim();
    const a = parseFloat(document.getElementById("m-inc-amt").value);
    const c = document.getElementById("m-inc-cur").value;
    const acc = document.getElementById("m-inc-acc").value;
    const cat = document.getElementById("m-inc-cat").value;
    const n = document.getElementById("m-inc-note").value.trim();
    if (!t) return alert("Enter a title.");
    if (!a || a <= 0) return alert("Enter valid amount.");
    if (!acc) return alert("Create an account first.");
    AppData.addTransaction(t, "income", a, c, cat, acc, n);
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage(
      "bot",
      `✅ <strong>+${AppData.formatMoney(a, c)}</strong> — ${t}`,
    );
  },
  doAddExpense() {
    const t = document.getElementById("m-exp-title").value.trim();
    const a = parseFloat(document.getElementById("m-exp-amt").value);
    const c = document.getElementById("m-exp-cur").value;
    const acc = document.getElementById("m-exp-acc").value;
    const cat = document.getElementById("m-exp-cat").value;
    const n = document.getElementById("m-exp-note").value.trim();
    if (!t) return alert("Enter a title.");
    if (!a || a <= 0) return alert("Enter valid amount.");
    if (!acc) return alert("Create an account first.");
    AppData.addTransaction(t, "expense", a, c, cat, acc, n);
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage(
      "bot",
      `💸 <strong>-${AppData.formatMoney(a, c)}</strong> — ${t}`,
    );
  },
  doAddSavings() {
    const gid = document.getElementById("m-sav-goal").value;
    const a = parseFloat(document.getElementById("m-sav-amt").value);
    const acc = document.getElementById("m-sav-acc").value;
    const n = document.getElementById("m-sav-note").value.trim();
    if (!gid) return alert("Select a goal.");
    if (!a || a <= 0) return alert("Enter valid amount.");
    if (!acc) return alert("Create an account first.");
    const g = AppData.goals.find((x) => x.id === gid);
    if (!g) return;
    AppData.addSavingsToGoal(gid, a);
    AppData.addTransaction(
      `Savings: ${g.name}`,
      "savings",
      a,
      g.currency,
      "savings",
      acc,
      n || g.name,
    );
    this.closeModalDirect();
    this.afterDataChange();
    const p = Math.round((g.saved / g.target) * 100);
    AI.addMessage(
      "bot",
      `🐷 <strong>${AppData.formatMoney(a, g.currency)}</strong> → "${g.name}" — <strong>${p}%</strong>${p >= 100 ? " 🎉" : ""}`,
    );
  },
  doAddGoal() {
    const n = document.getElementById("m-goal-name").value.trim();
    const t = parseFloat(document.getElementById("m-goal-target").value);
    const c = document.getElementById("m-goal-cur").value;
    const dl = document.getElementById("m-goal-dl").value;
    const cat = document.getElementById("m-goal-cat").value;
    if (!n) return alert("Enter a name.");
    if (!t || t <= 0) return alert("Enter valid target.");
    AppData.addGoal(n, t, c, dl, cat);
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage(
      "bot",
      `🎯 "<strong>${n}</strong>" — target <strong>${AppData.formatMoney(t, c)}</strong>${dl ? " by " + dl : ""}.`,
    );
  },
  doTransfer() {
    const fn = document.getElementById("m-trf-from").value;
    const tn = document.getElementById("m-trf-to").value;
    const a = parseFloat(document.getElementById("m-trf-amt").value);
    const n = document.getElementById("m-trf-note").value.trim();
    if (!fn || !tn) return alert("Select both accounts.");
    if (!a || a <= 0) return alert("Enter valid amount.");
    if (fn === tn) return alert("Choose different accounts.");
    const fa = AppData.accounts.find((x) => x.name === fn);
    const ta = AppData.accounts.find((x) => x.name === tn);
    if (!fa || !ta) return alert("Account not found.");
    if (fa.balance < a) return alert(`Insufficient balance.`);
    const conv = AppData.convert(a, fa.currency, ta.currency);
    fa.balance -= a;
    fa.available -= a;
    ta.balance += conv;
    ta.available += conv;
    AppData.addTransaction(
      `${fn} → ${tn}`,
      "transfer",
      a,
      fa.currency,
      "transfer",
      `${fn} → ${tn}`,
      n || `Received: ${AppData.formatMoney(conv, ta.currency)}`,
    );
    this.closeModalDirect();
    this.afterDataChange();
    AI.addMessage(
      "bot",
      `📤 <strong>${AppData.formatMoney(a, fa.currency)}</strong> → <strong>${AppData.formatMoney(conv, ta.currency)}</strong>`,
    );
  },

  // ===== RESET =====
  resetApp() {
    const dc = AppData.user.displayCurrency;
    document.getElementById("reset-data-preview").innerHTML =
      `<div class="rdp-row"><span class="rdp-label">Accounts</span><span class="rdp-value">${AppData.accounts.length}</span></div><div class="rdp-row"><span class="rdp-label">Transactions</span><span class="rdp-value">${AppData.transactions.length}</span></div><div class="rdp-row"><span class="rdp-label">Goals</span><span class="rdp-value">${AppData.goals.length}</span></div><div class="rdp-row"><span class="rdp-label">Balance</span><span class="rdp-value">${AppData.formatMoney(AppData.getTotalBalanceInDisplay(), dc)}</span></div>`;
    document.getElementById("reset-modal").classList.add("show");
  },
  closeResetModal(e) {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove("show");
  },
  closeResetModalDirect() {
    document.getElementById("reset-modal").classList.remove("show");
  },
  confirmReset() {
    AppData.resetAll();
    this.recurringPayments = [];
    this.wishlistItems = [];
    try {
      localStorage.removeItem("smygrys_extras");
    } catch (e) {}
    document.getElementById("reset-modal").classList.remove("show");
    document.getElementById("app").style.display = "none";
    document
      .querySelectorAll(".ob-step")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById("ob-step-1").classList.add("active");
    Onboarding.currentStep = 1;
    Onboarding.selectedCurrency = "PLN";
    document
      .querySelectorAll(".ob-currency-card")
      .forEach((c) =>
        c.classList.toggle("selected", c.dataset.currency === "PLN"),
      );
    document.getElementById("ob-daily-income").value = "";
    document.getElementById("ob-savings-slider").value = 20;
    document.getElementById("ob-slider-value").textContent = "20%";
    document.getElementById("ob-income-currency").textContent = "PLN";
    const ol = document.getElementById("onboarding-overlay");
    ol.style.display = "flex";
    ol.classList.remove("hidden");
    Object.values(this.charts).forEach((c) => {
      if (c) c.destroy();
    });
    this.charts = {};
  },

  toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
  },

  exportData() {
    Features.exportData();
  },

  // ===== BIND ALL EVENTS =====
  bindAllEvents() {
    document
      .querySelectorAll(".cur-btn")
      .forEach((b) =>
        b.addEventListener("click", () =>
          this.setDisplayCurrency(b.dataset.cur),
        ),
      );
    document.querySelectorAll(".nav-item[data-page]").forEach((i) =>
      i.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleNav(i.dataset.page);
      }),
    );
    document
      .querySelectorAll(".sidebar .nav-item:not([data-page]):not([onclick])")
      .forEach((i) => {
        i.addEventListener("click", (e) => {
          e.preventDefault();
          const label = i.querySelector("span")?.textContent?.trim();
          if (label) this.handleFeature(label);
        });
      });
    document.querySelectorAll("#tx-tabs .tx-tab").forEach((t) =>
      t.addEventListener("click", () => {
        document
          .querySelectorAll("#tx-tabs .tx-tab")
          .forEach((x) => x.classList.remove("active"));
        t.classList.add("active");
        this.activeTxFilter = t.dataset.filter;
        this.renderTransactions();
      }),
    );
    document.querySelectorAll("#goal-filters .filter-pill").forEach((p) =>
      p.addEventListener("click", () => {
        document
          .querySelectorAll("#goal-filters .filter-pill")
          .forEach((x) => x.classList.remove("active"));
        p.classList.add("active");
        this.activeGoalFilter = p.dataset.filter;
        this.renderGoals();
      }),
    );
    document
      .querySelector('.top-icon-btn[title="Notifications"]')
      ?.addEventListener("click", () => this.showNotifications());
    document
      .querySelector('.top-icon-btn[title="Settings"]')
      ?.addEventListener("click", () => Features.showSettings());
    document
      .querySelector(".reset-btn")
      ?.addEventListener("click", () => this.resetApp());
    document
      .getElementById("global-search")
      ?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.performSearch(e.target.value.trim());
      });
    document
      .getElementById("ex-from-amt")
      ?.addEventListener("input", () => this.calcExchange());
    document
      .getElementById("ex-from-cur")
      ?.addEventListener("change", () => this.calcExchange());
    document
      .getElementById("ex-to-cur")
      ?.addEventListener("change", () => this.calcExchange());
    document.querySelector(".see-all-link")?.addEventListener("click", () => {
      this.activeTxFilter = "all";
      document
        .querySelectorAll("#tx-tabs .tx-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelector('#tx-tabs .tx-tab[data-filter="all"]')
        ?.classList.add("active");
      this.renderTransactions();
      document
        .getElementById("tx-container")
        ?.scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("main-content")?.addEventListener("click", () => {
      if (window.innerWidth <= 900)
        document.getElementById("sidebar").classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModalDirect();
        this.closeResetModalDirect();
      }
      if (e.ctrlKey && e.shiftKey) {
        const k = e.key.toUpperCase();
        if (k === "I") {
          e.preventDefault();
          this.openModal("income");
        }
        if (k === "E") {
          e.preventDefault();
          this.openModal("spend");
        }
        if (k === "S") {
          e.preventDefault();
          this.openModal("save");
        }
        if (k === "G") {
          e.preventDefault();
          this.openModal("goal");
        }
        if (k === "A") {
          e.preventDefault();
          this.openModal("addAccount");
        }
        if (k === "T") {
          e.preventDefault();
          this.openModal("transfer");
        }
        if (k === "F") {
          e.preventDefault();
          document.getElementById("global-search")?.focus();
        }
        if (k === "X") {
          e.preventDefault();
          Features.exportData();
        }
        if (k === "R") {
          e.preventDefault();
          this.resetApp();
        }
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const has = AppData.load();
  if (has && AppData.user.onboardingDone) {
    document.getElementById("onboarding-overlay").style.display = "none";
    document.getElementById("app").style.display = "grid";
    App.init();
  } else {
    document.getElementById("onboarding-overlay").style.display = "flex";
  }
});
