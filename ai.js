// ============================
// SMYGRYSSAVE AI — AI ASSISTANT
// ============================

const AI = {
  getTimeString() {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  addMessage(role, html) {
    const chat = document.getElementById("ai-chat");
    if (!chat) return;
    const msg = document.createElement("div");
    msg.className = `ai-msg ${role}`;
    msg.innerHTML = `
      <div class="ai-msg-content">${html}</div>
      <span class="ai-msg-time">Today, ${this.getTimeString()}</span>
    `;
    chat.appendChild(msg);
    requestAnimationFrame(() => {
      chat.scrollTop = chat.scrollHeight;
    });
  },

  action(type) {
    const ctx = AppData.getFinancialContext();
    const labels = {
      summary: "📊 Show my financial summary",
      tips: "💡 Give me smart tips",
      analyze: "🔍 Analyze my finances",
      budget: "📋 Budget recommendation",
      exchange: "💱 Exchange rate advice",
      goalplan: "🎯 Goal strategy plan",
    };
    this.addMessage("user", labels[type] || type);
    setTimeout(
      () => {
        this.addMessage("bot", this.generateResponse(type, ctx));
      },
      400 + Math.random() * 500,
    );
  },

  generateResponse(type, ctx) {
    // Empty state
    if (ctx.accountCount === 0 && ctx.txCount === 0) {
      return `It looks like you haven't added any data yet! Here's how to start:<br><br>
        1. <strong>Add a currency account</strong> — click "Add Account"<br>
        2. <strong>Record your income</strong> — click "Add Income"<br>
        3. <strong>Set a goal</strong> — click "New Goal"<br><br>
        Once you have data, I'll provide personalized insights! 🚀`;
    }

    switch (type) {
      case "summary":
        return `📊 <strong>Financial Summary</strong><br><br>
          Accounts: <strong>${ctx.accountCount}</strong><br>
          Total Balance: <strong>${ctx.totalBalance}</strong><br>
          Total Income: <strong>${ctx.totalIncome}</strong><br>
          Total Expenses: <strong>${ctx.totalExpenses}</strong><br>
          Total Savings: <strong>${ctx.totalSavings}</strong><br>
          Savings Rate: <strong>${ctx.savingsRate}%</strong><br>
          Active Goals: <strong>${ctx.goalCount}</strong><br>
          Transactions: <strong>${ctx.txCount}</strong>
          ${
            ctx.accounts.length > 0
              ? "<br><br><strong>Accounts:</strong><br>" +
                ctx.accounts
                  .map(
                    (a) =>
                      `• ${a.name}: <strong>${a.balance}</strong> ${
                        a.change >= 0
                          ? `<span style="color:var(--green)">↑${a.change}%</span>`
                          : `<span style="color:var(--red)">↓${Math.abs(a.change)}%</span>`
                      }`,
                  )
                  .join("<br>")
              : ""
          }`;

      case "tips":
        if (ctx.dailyIncome > 0) {
          return `💡 <strong>Smart Tips</strong><br><br>
            1. Based on your daily income of <strong>${ctx.dailyIncome} ${AppData.user.primaryCurrency}</strong>, aim to save <strong>${ctx.suggestedMonthlySavings}</strong>/month.<br><br>
            2. ${
              ctx.savingsRate >= ctx.savingsGoalPct
                ? "✅ Great job! Your savings rate exceeds your target."
                : "⚠️ Your savings rate is below target. Try reducing discretionary spending."
            }<br><br>
            3. Consider diversifying across multiple currencies for stability.<br><br>
            4. Set up regular savings contributions to build consistency.<br><br>
            5. Review your expenses weekly to catch unnecessary spending early.`;
        }
        return `💡 <strong>Getting Started Tips</strong><br><br>
          1. Set your daily income in Settings for personalized recommendations.<br>
          2. Create at least one currency account.<br>
          3. Log every income and expense.<br>
          4. Create savings goals to stay motivated.`;

      case "analyze":
        if (ctx.txCount > 0) {
          return `🔍 <strong>Financial Analysis</strong><br><br>
            Total Transactions: <strong>${ctx.txCount}</strong><br>
            Income: <strong>${ctx.totalIncome}</strong><br>
            Expenses: <strong>${ctx.totalExpenses}</strong><br>
            Savings: <strong>${ctx.totalSavings}</strong><br>
            Net Balance: <strong>${ctx.totalBalance}</strong><br><br>
            ${
              ctx.savingsRate > 0
                ? `Your savings rate is <strong>${ctx.savingsRate}%</strong>. ${ctx.savingsRate >= 20 ? "✅ Above average — keep it up!" : "⚠️ Below 20% — try to save more."}`
                : "Start saving to see your rate improve!"
            }
            ${
              ctx.goalCount > 0
                ? "<br><br><strong>Goals:</strong><br>" +
                  ctx.goals
                    .map(
                      (g) =>
                        `• ${g.name}: ${g.pct}% ${g.status === "completed" ? "✅" : ""}`,
                    )
                    .join("<br>")
                : ""
            }`;
        }
        return "🔍 No transactions recorded yet. Add income and expenses to see analysis.";

      case "budget":
        if (ctx.dailyIncome > 0) {
          const pc = AppData.user.primaryCurrency;
          const monthly = ctx.dailyIncome * 30;
          const needsPct = Math.max(0, 100 - ctx.savingsGoalPct - 30);
          return `📋 <strong>Budget Recommendation</strong><br><br>
            Monthly income: <strong>${AppData.formatMoney(monthly, pc)}</strong><br>
            Savings goal: <strong>${ctx.savingsGoalPct}%</strong><br><br>
            <strong>Suggested 50/30/20 Split:</strong><br>
            • Needs (${needsPct}%): <strong>${AppData.formatMoney((monthly * needsPct) / 100, pc)}</strong><br>
            • Wants (30%): <strong>${AppData.formatMoney(monthly * 0.3, pc)}</strong><br>
            • Savings (${ctx.savingsGoalPct}%): <strong>${ctx.suggestedMonthlySavings}</strong><br><br>
            ${
              ctx.savingsRate >= ctx.savingsGoalPct
                ? "🎉 You're exceeding your savings target! Excellent discipline."
                : `⚠️ Currently at ${ctx.savingsRate}%. Increase contributions to reach ${ctx.savingsGoalPct}%.`
            }`;
        }
        return "📋 Set your daily income in Settings to get budget recommendations.";

      case "exchange":
        return `💱 <strong>Exchange Rate Info</strong><br><br>
          ${ctx.exchangeRates
            .map(
              (r) =>
                `<strong>${r.pair}</strong>: ${r.rate.toFixed(4)} ${
                  r.up
                    ? `<span style="color:var(--green)">↑${r.change}%</span>`
                    : `<span style="color:var(--red)">↓${Math.abs(r.change)}%</span>`
                }`,
            )
            .join("<br><br>")}<br><br>
          ${
            ctx.accountCount > 1
              ? "💡 You have multiple currency accounts. Use the Exchange tool to convert between them at current rates."
              : "💡 Add accounts in different currencies to take advantage of rate movements."
          }`;

      case "goalplan":
        if (ctx.goalCount > 0) {
          return `🎯 <strong>Goal Strategy</strong><br><br>
            ${ctx.goals
              .map(
                (g, i) =>
                  `<strong>${i + 1}. ${g.name}</strong> — ${g.pct}% complete ${g.status === "completed" ? "✅" : g.status === "paused" ? "⏸️" : ""}<br>
              Remaining: ${g.remaining}`,
              )
              .join("<br><br>")}<br><br>
            ${
              ctx.dailyIncome > 0
                ? `💡 Based on your income, you can allocate <strong>${ctx.suggestedMonthlySavings}</strong>/month across your goals.`
                : "💡 Set your daily income for personalized goal planning."
            }`;
        }
        return '🎯 No goals created yet. Click "New Goal" to set your first savings target!';

      default:
        return "Select a topic from the chips above for specific insights.";
    }
  },

  send() {
    const input = document.getElementById("ai-input");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    this.addMessage("user", text);
    input.value = "";

    setTimeout(
      () => {
        const ctx = AppData.getFinancialContext();
        const lower = text.toLowerCase();
        let response;

        if (ctx.accountCount === 0 && ctx.txCount === 0) {
          response = `You haven't added any financial data yet. Start by:<br>
          1. Adding a currency account<br>
          2. Recording your income<br>
          3. Setting savings goals<br><br>
          I'll give personalized advice once you have data! 💪`;
        } else if (
          lower.includes("balance") ||
          lower.includes("how much") ||
          lower.includes("money")
        ) {
          response = `Your total balance is <strong>${ctx.totalBalance}</strong> across ${ctx.accountCount} account(s).<br><br>
          ${ctx.accounts.map((a) => `• ${a.name}: <strong>${a.balance}</strong>`).join("<br>")}`;
        } else if (lower.includes("save") || lower.includes("saving")) {
          response = `Total savings: <strong>${ctx.totalSavings}</strong><br>
          Savings rate: <strong>${ctx.savingsRate}%</strong><br><br>
          ${
            ctx.dailyIncome > 0
              ? `Suggested monthly savings: <strong>${ctx.suggestedMonthlySavings}</strong>`
              : "Set your daily income in Settings for personalized targets."
          }`;
        } else if (lower.includes("goal") || lower.includes("target")) {
          response =
            ctx.goalCount > 0
              ? `Your goals:<br>${ctx.goals.map((g) => `• <strong>${g.name}</strong>: ${g.pct}% (${g.remaining} remaining)`).join("<br>")}`
              : "No goals yet. Create one to start tracking!";
        } else if (
          lower.includes("exchange") ||
          lower.includes("rate") ||
          lower.includes("convert") ||
          lower.includes("currency")
        ) {
          response = `Current rates:<br>${ctx.exchangeRates.map((r) => `• ${r.pair}: <strong>${r.rate.toFixed(4)}</strong>`).join("<br>")}<br><br>
          Use the exchange widget to convert between your accounts.`;
        } else if (
          lower.includes("expense") ||
          lower.includes("spend") ||
          lower.includes("cost")
        ) {
          response = `Total expenses: <strong>${ctx.totalExpenses}</strong><br>
          Total income: <strong>${ctx.totalIncome}</strong><br>
          Savings rate: <strong>${ctx.savingsRate}%</strong><br><br>
          ${ctx.savingsRate >= 20 ? "✅ You're doing well!" : "⚠️ Try to reduce unnecessary spending."}`;
        } else if (
          lower.includes("hello") ||
          lower.includes("hi") ||
          lower.includes("hey")
        ) {
          response = `Hello! 👋 I'm Smygrys AI. I can help with:<br><br>
          • 📊 Financial summaries<br>
          • 💡 Savings tips<br>
          • 💱 Exchange rate advice<br>
          • 🎯 Goal planning<br>
          • 📋 Budget recommendations<br><br>
          What would you like to know?`;
        } else if (lower.includes("reset")) {
          response = `To reset the app, click the <strong>Reset App</strong> button in the sidebar or the ↺ icon. This erases all data and returns to onboarding.`;
        } else if (lower.includes("help")) {
          response = `Here's what I can do:<br><br>
          • Ask about your <strong>balance</strong><br>
          • Ask about <strong>savings</strong> or <strong>goals</strong><br>
          • Ask about <strong>expenses</strong><br>
          • Ask about <strong>exchange rates</strong><br>
          • Use the quick chips above for detailed insights<br><br>
          Try typing: "How much money do I have?"`;
        } else {
          response = `I see you're asking about "<em>${text}</em>".<br><br>
          Here's your current status:<br>
          Balance: <strong>${ctx.totalBalance}</strong><br>
          Income: <strong>${ctx.totalIncome}</strong><br>
          Expenses: <strong>${ctx.totalExpenses}</strong><br>
          Savings: <strong>${ctx.totalSavings}</strong><br><br>
          Try the quick chips above for specific insights, or ask about balance, savings, goals, or rates!`;
        }

        this.addMessage("bot", response);
      },
      500 + Math.random() * 600,
    );
  },

  generateWelcomeMessage() {
    const ctx = AppData.getFinancialContext();

    if (ctx.accountCount === 0 && ctx.txCount === 0) {
      let msg = `Welcome to <strong>SmygrysSave AI</strong>! 👋<br><br>
        Your profile is set up with <strong>${AppData.user.primaryCurrency}</strong> as primary currency and a <strong>${AppData.user.savingsGoalPct}%</strong> savings goal.<br><br>`;

      if (AppData.user.dailyIncome > 0) {
        msg += `Based on your daily income of <strong>${AppData.user.dailyIncome} ${AppData.user.primaryCurrency}</strong>, you should save about <strong>${ctx.suggestedMonthlySavings}</strong>/month.<br><br>`;
      }

      msg += `<strong>Get started by:</strong><br>
        1. 💳 Adding a currency account<br>
        2. 💰 Recording your first income<br>
        3. 🎯 Creating a savings goal<br><br>
        I'll provide personalized insights as you add data! 🚀`;

      return msg;
    }

    return `Welcome back to <strong>SmygrysSave AI</strong>! 👋<br><br>
      You have <strong>${ctx.accountCount}</strong> account(s) with a total balance of <strong>${ctx.totalBalance}</strong>.<br>
      Income: <strong>${ctx.totalIncome}</strong> | Expenses: <strong>${ctx.totalExpenses}</strong><br>
      Savings rate: <strong>${ctx.savingsRate}%</strong> | Goals: <strong>${ctx.goalCount}</strong><br><br>
      ${
        ctx.savingsRate >= AppData.user.savingsGoalPct
          ? "✅ You're meeting your savings goal! Keep it up!"
          : `⚠️ Your savings rate (${ctx.savingsRate}%) is below your ${AppData.user.savingsGoalPct}% target.`
      }<br><br>
      Ask me anything about your finances! 💬`;
  },
};
