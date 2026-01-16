// ==================== AI CONFIGURATION ====================
const AI_CONFIG = {
  provider: "local", // 'local', 'gemini', 'openai'
  apiKey: "",
  personality: "friendly",
  model: {
    gemini: "gemini-pro",
    openai: "gpt-3.5-turbo",
  },
  maxTokens: 1024,
  temperature: 0.7,
};

// ==================== AI SYSTEM PROMPTS ====================
const AI_PERSONALITIES = {
  friendly: `You are SaveAI, a friendly and encouraging personal finance assistant. You help users manage their savings, track expenses, and achieve financial goals. Be warm, supportive, and use emojis occasionally. Give practical advice while being positive about their progress.`,

  professional: `You are SaveAI, a professional financial advisor assistant. Provide clear, concise, and accurate financial guidance. Focus on data-driven insights and actionable recommendations. Maintain a formal but approachable tone.`,

  coach: `You are SaveAI, a motivational financial coach! You're enthusiastic about helping users crush their savings goals! Use encouraging language, celebrate wins (no matter how small), and push users to do better. Be energetic and inspiring! 💪🔥`,

  strict: `You are SaveAI, a strict budget advisor. You prioritize financial discipline and don't sugarcoat advice. Point out areas of concern directly and provide firm guidance on spending habits. Be honest and direct, but constructive.`,
};

// ==================== AI STATE ====================
let aiState = {
  isProcessing: false,
  conversationHistory: [],
  lastError: null,
};

// ==================== INITIALIZE AI ====================
function initAI() {
  loadAISettings();
  updateAIStatus();
  updatePoweredBy();

  // Initial greeting
  setTimeout(() => {
    const greeting = getPersonalizedGreeting();
    addAIMessageToChat(greeting);
  }, 500);
}

function loadAISettings() {
  const saved = localStorage.getItem("saveai_ai_settings");
  if (saved) {
    try {
      const settings = JSON.parse(saved);
      AI_CONFIG.provider = settings.provider || "local";
      AI_CONFIG.apiKey = settings.apiKey || "";
      AI_CONFIG.personality = settings.personality || "friendly";

      // Update UI
      const providerSelect = document.getElementById("aiProvider");
      const personalitySelect = document.getElementById("aiPersonality");
      const apiKeyInput = document.getElementById("aiApiKey");

      if (providerSelect) providerSelect.value = AI_CONFIG.provider;
      if (personalitySelect) personalitySelect.value = AI_CONFIG.personality;
      if (apiKeyInput) apiKeyInput.value = AI_CONFIG.apiKey;

      onProviderChange();
    } catch (e) {
      console.error("Error loading AI settings:", e);
    }
  }
}

function saveAISettings() {
  const providerSelect = document.getElementById("aiProvider");
  const personalitySelect = document.getElementById("aiPersonality");
  const apiKeyInput = document.getElementById("aiApiKey");
  const statusEl = document.getElementById("aiSettingsStatus");

  AI_CONFIG.provider = providerSelect ? providerSelect.value : "local";
  AI_CONFIG.personality = personalitySelect
    ? personalitySelect.value
    : "friendly";
  AI_CONFIG.apiKey = apiKeyInput ? apiKeyInput.value.trim() : "";

  // Validate API key if needed
  if (AI_CONFIG.provider !== "local" && !AI_CONFIG.apiKey) {
    if (statusEl) {
      statusEl.className = "ai-settings-status error";
      statusEl.textContent =
        "❌ API key is required for " + AI_CONFIG.provider.toUpperCase();
    }
    return;
  }

  // Save to localStorage
  localStorage.setItem(
    "saveai_ai_settings",
    JSON.stringify({
      provider: AI_CONFIG.provider,
      apiKey: AI_CONFIG.apiKey,
      personality: AI_CONFIG.personality,
    })
  );

  updateAIStatus();
  updatePoweredBy();

  if (statusEl) {
    statusEl.className = "ai-settings-status success";
    statusEl.textContent = "✓ Settings saved successfully!";
    setTimeout(() => {
      statusEl.className = "ai-settings-status";
    }, 3000);
  }

  // Test connection if using external API
  if (AI_CONFIG.provider !== "local") {
    testAIConnection();
  }
}

function onProviderChange() {
  const provider = document.getElementById("aiProvider").value;
  const apiKeyGroup = document.getElementById("apiKeyGroup");
  const apiKeyHint = document.getElementById("apiKeyHint");

  if (provider === "local") {
    if (apiKeyGroup) apiKeyGroup.style.display = "none";
  } else {
    if (apiKeyGroup) apiKeyGroup.style.display = "block";

    if (apiKeyHint) {
      if (provider === "gemini") {
        apiKeyHint.innerHTML =
          'Get your free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a>';
      } else if (provider === "openai") {
        apiKeyHint.innerHTML =
          'Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a>';
      }
    }
  }
}

function toggleAISettings() {
  const panel = document.getElementById("aiSettingsPanel");
  const btn = document.querySelector(".ai-settings-btn");

  if (panel) {
    panel.classList.toggle("active");
  }
  if (btn) {
    btn.classList.toggle("active");
  }
}

function toggleApiKeyVisibility() {
  const input = document.getElementById("aiApiKey");
  const icon = document.getElementById("apiKeyEyeIcon");

  if (input && icon) {
    if (input.type === "password") {
      input.type = "text";
      icon.className = "fas fa-eye-slash";
    } else {
      input.type = "password";
      icon.className = "fas fa-eye";
    }
  }
}

function updateAIStatus() {
  const dot = document.getElementById("aiStatusDot");
  const text = document.getElementById("aiStatusText");

  if (!dot || !text) return;

  if (AI_CONFIG.provider === "local") {
    dot.style.background = "var(--accent-green)";
    text.textContent = "Ready (Local)";
  } else if (AI_CONFIG.apiKey) {
    dot.style.background = "var(--accent-green)";
    text.textContent = `Connected (${AI_CONFIG.provider.toUpperCase()})`;
  } else {
    dot.style.background = "var(--accent-yellow)";
    text.textContent = "API Key Required";
  }
}

function updatePoweredBy() {
  const el = document.getElementById("aiPoweredBy");
  if (!el) return;

  const providers = {
    local: "🤖 Powered by Local AI",
    gemini: "✨ Powered by Google Gemini",
    openai: "🧠 Powered by OpenAI GPT",
  };

  el.innerHTML = `<span>${
    providers[AI_CONFIG.provider] || providers.local
  }</span>`;
}

async function testAIConnection() {
  try {
    const response = await sendToAI(
      'Hello, respond with just "Connected successfully!"'
    );
    if (response) {
      showToast(
        "success",
        "AI Connected",
        `Successfully connected to ${AI_CONFIG.provider.toUpperCase()}`
      );
    }
  } catch (error) {
    showToast("error", "Connection Failed", error.message);
  }
}

// ==================== GET FINANCIAL CONTEXT ====================
function getFinancialContext() {
  const available = appData.availableBalance || 0;
  const savings = appData.savings || 0;
  const totalIncome = appData.totalIncome || 0;
  const currency = appData.settings.currency;

  // Calculate monthly stats
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let monthlyIncome = 0;
  let monthlySavings = 0;
  let monthlyExpenses = 0;
  const expenseCategories = {};

  appData.transactions.forEach((t) => {
    const tDate = new Date(t.date);
    if (
      tDate.getMonth() === currentMonth &&
      tDate.getFullYear() === currentYear
    ) {
      if (t.type === "income") monthlyIncome += t.amount;
      if (t.type === "saving") monthlySavings += t.amount;
      if (t.type === "expense") {
        monthlyExpenses += t.amount;
        const cat = t.category || "other";
        expenseCategories[cat] = (expenseCategories[cat] || 0) + t.amount;
      }
    }
  });

  // Goals info
  const activeGoals = appData.goals.filter((g) => g.current < g.target);
  const completedGoals = appData.goals.filter((g) => g.current >= g.target);

  const goalsInfo = appData.goals.map((g) => ({
    name: g.name,
    target: g.target,
    current: g.current,
    progress: ((g.current / g.target) * 100).toFixed(0) + "%",
    remaining: g.target - g.current,
  }));

  return {
    currency,
    availableBalance: available,
    totalSavings: savings,
    totalIncome,
    monthlyIncome,
    monthlySavings,
    monthlyExpenses,
    savingsRate:
      monthlyIncome > 0
        ? ((monthlySavings / monthlyIncome) * 100).toFixed(0) + "%"
        : "0%",
    expenseBreakdown: expenseCategories,
    goals: goalsInfo,
    activeGoalsCount: activeGoals.length,
    completedGoalsCount: completedGoals.length,
    streak: appData.stats.streak || 0,
    recentTransactions: appData.transactions.slice(-5).reverse(),
  };
}

function getPersonalizedGreeting() {
  const hour = new Date().getHours();
  const context = getFinancialContext();

  let timeGreeting = "Hello";
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 17) timeGreeting = "Good afternoon";
  else if (hour < 21) timeGreeting = "Good evening";
  else timeGreeting = "Good night";

  let message = `${timeGreeting}! 👋 I'm your SaveAI assistant.\n\n`;

  if (context.availableBalance > 0) {
    message += `💰 You have **${formatCurrency(
      context.availableBalance
    )}** available.\n`;
    message += `🐷 Total savings: **${formatCurrency(
      context.totalSavings
    )}**\n`;
  } else if (context.totalIncome === 0) {
    message += `Looks like you're just getting started! Add your first income to begin your savings journey.\n`;
  } else {
    message += `Your funds are fully allocated. Great discipline! 💪\n`;
  }

  if (context.activeGoalsCount > 0) {
    message += `\n🎯 You have ${context.activeGoalsCount} active goal${
      context.activeGoalsCount > 1 ? "s" : ""
    } to work towards.`;
  }

  message += `\n\nHow can I help you today?`;

  return message;
}

// ==================== SEND MESSAGE ====================
async function sendAIMessage() {
  const input = document.getElementById("aiInput");
  const sendBtn = document.getElementById("aiSendBtn");

  if (!input || aiState.isProcessing) return;

  const message = input.value.trim();
  if (!message) return;

  // Clear input
  input.value = "";

  // Add user message
  addUserMessageToChat(message);

  // Show thinking indicator
  aiState.isProcessing = true;
  if (sendBtn) sendBtn.disabled = true;
  showThinking();

  try {
    let response;

    if (AI_CONFIG.provider === "local") {
      // Use local processing
      response = await processLocalAI(message);
    } else {
      // Use external API
      response = await sendToAI(message);
    }

    hideThinking();
    addAIMessageToChat(response);
  } catch (error) {
    hideThinking();
    console.error("AI Error:", error);
    addAIErrorMessage(
      error.message || "Failed to get response. Please try again."
    );
  } finally {
    aiState.isProcessing = false;
    if (sendBtn) sendBtn.disabled = false;
  }
}

function sendSuggestion(text) {
  const input = document.getElementById("aiInput");
  if (input) {
    input.value = text;
    sendAIMessage();
  }
}

function handleAIKeyPress(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendAIMessage();
  }
}

// ==================== API CALLS ====================
async function sendToAI(message) {
  const context = getFinancialContext();
  const systemPrompt = buildSystemPrompt(context);

  if (AI_CONFIG.provider === "gemini") {
    return await callGeminiAPI(systemPrompt, message);
  } else if (AI_CONFIG.provider === "openai") {
    return await callOpenAIAPI(systemPrompt, message);
  } else {
    return await processLocalAI(message);
  }
}

async function callGeminiAPI(systemPrompt, userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.model.gemini}:generateContent?key=${AI_CONFIG.apiKey}`;

  // Build conversation history for context
  const historyText = aiState.conversationHistory
    .slice(-6)
    .map((h) => `${h.role}: ${h.content}`)
    .join("\n");

  const fullPrompt = `${systemPrompt}\n\nConversation history:\n${historyText}\n\nUser: ${userMessage}\n\nAssistant:`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: AI_CONFIG.temperature,
        maxOutputTokens: AI_CONFIG.maxTokens,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Gemini API error");
  }

  const data = await response.json();
  const aiResponse =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

  // Save to history
  aiState.conversationHistory.push({ role: "user", content: userMessage });
  aiState.conversationHistory.push({ role: "assistant", content: aiResponse });

  return aiResponse;
}

async function callOpenAIAPI(systemPrompt, userMessage) {
  const url = "https://api.openai.com/v1/chat/completions";

  // Build messages array
  const messages = [
    { role: "system", content: systemPrompt },
    ...aiState.conversationHistory.slice(-6),
    { role: "user", content: userMessage },
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model.openai,
      messages: messages,
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "OpenAI API error");
  }

  const data = await response.json();
  const aiResponse =
    data.choices?.[0]?.message?.content || "No response generated.";

  // Save to history
  aiState.conversationHistory.push({ role: "user", content: userMessage });
  aiState.conversationHistory.push({ role: "assistant", content: aiResponse });

  return aiResponse;
}

function buildSystemPrompt(context) {
  const personality =
    AI_PERSONALITIES[AI_CONFIG.personality] || AI_PERSONALITIES.friendly;

  return `${personality}

CURRENT USER FINANCIAL DATA:
- Currency: ${context.currency}
- Available Balance: ${formatCurrency(context.availableBalance)}
- Total Savings: ${formatCurrency(context.totalSavings)}
- Total Income (all time): ${formatCurrency(context.totalIncome)}
- This Month's Income: ${formatCurrency(context.monthlyIncome)}
- This Month's Savings: ${formatCurrency(context.monthlySavings)}
- This Month's Expenses: ${formatCurrency(context.monthlyExpenses)}
- Current Savings Rate: ${context.savingsRate}
- Saving Streak: ${context.streak} days

EXPENSE BREAKDOWN THIS MONTH:
${
  Object.entries(context.expenseBreakdown)
    .map(([cat, amount]) => `- ${cat}: ${formatCurrency(amount)}`)
    .join("\n") || "No expenses recorded"
}

SAVINGS GOALS:
${
  context.goals
    .map(
      (g) =>
        `- ${g.name}: ${g.progress} complete (${formatCurrency(
          g.current
        )}/${formatCurrency(g.target)})`
    )
    .join("\n") || "No goals set"
}

INSTRUCTIONS:
1. Use the financial data above to give personalized advice
2. Be specific with numbers when discussing their finances
3. Always use their currency (${context.currency})
4. If they want to save or spend, remind them of their available balance
5. Encourage them to set and work towards goals
6. Keep responses concise but helpful
7. Format responses nicely with line breaks for readability`;
}

// ==================== LOCAL AI PROCESSING ====================
async function processLocalAI(message) {
  // Simulate thinking delay
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 500)
  );

  const context = getFinancialContext();
  const lowerMessage = message.toLowerCase();

  // Extract numbers from message
  const numbers = message.match(/[\d,]+\.?\d*/g);
  const amount = numbers ? parseFloat(numbers[0].replace(/,/g, "")) : null;

  // Check for action commands first
  if (
    (lowerMessage.includes("add") || lowerMessage.includes("save")) &&
    (lowerMessage.includes("saving") || lowerMessage.includes("savings")) &&
    amount
  ) {
    return handleSaveCommand(amount, context);
  }

  if (
    (lowerMessage.includes("spend") ||
      lowerMessage.includes("spent") ||
      lowerMessage.includes("bought")) &&
    amount
  ) {
    return handleSpendCommand(amount, context, lowerMessage.includes("saving"));
  }

  // Informational queries
  if (
    lowerMessage.includes("summary") ||
    lowerMessage.includes("overview") ||
    lowerMessage.includes("status")
  ) {
    return generateSummary(context);
  }

  if (
    lowerMessage.includes("available") ||
    lowerMessage.includes("balance") ||
    lowerMessage.includes("how much can i")
  ) {
    return generateAvailableInfo(context);
  }

  if (
    lowerMessage.includes("goal") &&
    (lowerMessage.includes("progress") ||
      lowerMessage.includes("status") ||
      lowerMessage.includes("how"))
  ) {
    return generateGoalsInfo(context);
  }

  if (
    lowerMessage.includes("spending") ||
    lowerMessage.includes("expense") ||
    lowerMessage.includes("analyze")
  ) {
    return generateSpendingAnalysis(context);
  }

  if (
    lowerMessage.includes("tip") ||
    lowerMessage.includes("advice") ||
    lowerMessage.includes("how can i save")
  ) {
    return generateSavingsTips(context);
  }

  if (lowerMessage.includes("budget") || lowerMessage.includes("plan")) {
    return generateBudgetPlan(context);
  }

  if (lowerMessage.includes("convert") && amount) {
    return handleCurrencyConversion(message, amount);
  }

  // Greetings
  if (
    /^(hi|hello|hey|good morning|good evening|good afternoon|howdy)/i.test(
      lowerMessage
    )
  ) {
    return getPersonalizedGreeting();
  }

  // Help
  if (
    lowerMessage.includes("help") ||
    lowerMessage.includes("what can you do")
  ) {
    return generateHelpMessage();
  }

  // Default response
  return generateDefaultResponse(context);
}

// ==================== LOCAL AI RESPONSE GENERATORS ====================
function handleSaveCommand(amount, context) {
  if (amount > context.availableBalance) {
    return `❌ You can't save **${formatCurrency(
      amount
    )}** because you only have **${formatCurrency(
      context.availableBalance
    )}** available.\n\nAdd more income first to increase your available balance!`;
  }

  // Actually save the money
  appData.transactions.push({
    amount: amount,
    type: "saving",
    description: "Saved via AI assistant",
    category: "general",
    date: new Date().toISOString(),
  });

  appData.stats.totalSavedAllTime =
    (appData.stats.totalSavedAllTime || 0) + amount;
  appData.stats.lastSaveDate = new Date().toISOString();
  appData.stats.streak = (appData.stats.streak || 0) + 1;

  saveData();
  updateUI();
  renderTransactions();
  renderGoals();
  updateCharts();

  const newContext = getFinancialContext();
  const tip = SAVINGS_TIPS[Math.floor(Math.random() * SAVINGS_TIPS.length)];

  return `✅ Done! **${formatCurrency(
    amount
  )}** added to your savings!\n\n📊 **Updated balances:**\n- Total Savings: **${formatCurrency(
    newContext.totalSavings
  )}**\n- Available: **${formatCurrency(
    newContext.availableBalance
  )}**\n- 🔥 Saving streak: ${newContext.streak} days\n\n${tip}`;
}

function handleSpendCommand(amount, context, fromSavings) {
  const source = fromSavings ? context.totalSavings : context.availableBalance;
  const sourceName = fromSavings ? "savings" : "available balance";

  if (amount > source) {
    return `❌ You can't spend **${formatCurrency(
      amount
    )}** from ${sourceName} because you only have **${formatCurrency(
      source
    )}**.\n\n${
      fromSavings
        ? "Consider spending from your available balance instead."
        : "You might need to use some of your savings."
    }`;
  }

  // Record the expense
  appData.transactions.push({
    amount: amount,
    type: "expense",
    description: "Spent via AI assistant",
    category: "other",
    date: new Date().toISOString(),
    spendSource: fromSavings ? "savings" : "available",
  });

  appData.stats.totalSpentAllTime =
    (appData.stats.totalSpentAllTime || 0) + amount;

  saveData();
  updateUI();
  renderTransactions();
  updateCharts();

  const newContext = getFinancialContext();

  return `💸 Recorded: **${formatCurrency(
    amount
  )}** spent from ${sourceName}.\n\n📊 **Updated balances:**\n- Available: **${formatCurrency(
    newContext.availableBalance
  )}**\n- Savings: **${formatCurrency(
    newContext.totalSavings
  )}**\n\n💡 Remember to track what you spent on for better insights!`;
}

function generateSummary(context) {
  let summary = `📊 **Your Financial Summary**\n\n`;
  summary += `💵 **Balances:**\n`;
  summary += `- Available: **${formatCurrency(context.availableBalance)}**\n`;
  summary += `- Total Savings: **${formatCurrency(context.totalSavings)}**\n`;
  summary += `- All-time Income: **${formatCurrency(
    context.totalIncome
  )}**\n\n`;

  summary += `📅 **This Month:**\n`;
  summary += `- Income: ${formatCurrency(context.monthlyIncome)}\n`;
  summary += `- Saved: ${formatCurrency(context.monthlySavings)}\n`;
  summary += `- Spent: ${formatCurrency(context.monthlyExpenses)}\n`;
  summary += `- Savings Rate: ${context.savingsRate}\n\n`;

  if (context.goals.length > 0) {
    summary += `🎯 **Goals Progress:**\n`;
    context.goals.forEach((g) => {
      const emoji =
        parseFloat(g.progress) >= 100
          ? "✅"
          : parseFloat(g.progress) >= 50
          ? "📈"
          : "🎯";
      summary += `${emoji} ${g.name}: ${g.progress}\n`;
    });
    summary += "\n";
  }

  summary += `🔥 **Streak:** ${context.streak} days of saving!`;

  return summary;
}

function generateAvailableInfo(context) {
  if (context.availableBalance <= 0) {
    return `💰 Your available balance is **${formatCurrency(
      0
    )}**.\n\nAll your income has been allocated to savings or expenses. Add more income to have funds available for saving or spending.\n\n📊 Current savings: **${formatCurrency(
      context.totalSavings
    )}**`;
  }

  const suggestedSave = context.availableBalance * 0.5;

  return `💰 You have **${formatCurrency(
    context.availableBalance
  )}** available!\n\nThis is money from your income that hasn't been saved or spent yet.\n\n💡 **Suggestion:** Consider saving **${formatCurrency(
    suggestedSave
  )}** (50%) to grow your savings faster!\n\nJust say "save ${suggestedSave.toFixed(
    0
  )}" and I'll add it for you.`;
}

function generateGoalsInfo(context) {
  if (context.goals.length === 0) {
    return `🎯 You don't have any savings goals yet!\n\nSetting specific goals makes you 42% more likely to save successfully.\n\n💡 Try setting a goal for:\n- Emergency fund (3-6 months expenses)\n- A vacation you've been dreaming of\n- A new gadget or purchase\n- Investment savings\n\nClick "New Goal" to get started!`;
  }

  let response = `🎯 **Your Savings Goals**\n\n`;

  context.goals.forEach((g) => {
    const progressNum = parseFloat(g.progress);
    let statusEmoji = "🎯";
    if (progressNum >= 100) statusEmoji = "✅";
    else if (progressNum >= 75) statusEmoji = "🔥";
    else if (progressNum >= 50) statusEmoji = "📈";
    else if (progressNum >= 25) statusEmoji = "🌱";

    response += `${statusEmoji} **${g.name}**\n`;
    response += `   Progress: ${g.progress} (${formatCurrency(
      g.current
    )} / ${formatCurrency(g.target)})\n`;
    response += `   Remaining: ${formatCurrency(g.remaining)}\n\n`;
  });

  if (context.availableBalance > 0) {
    response += `💰 You have **${formatCurrency(
      context.availableBalance
    )}** available to put towards your goals!`;
  }

  return response;
}

function generateSpendingAnalysis(context) {
  if (Object.keys(context.expenseBreakdown).length === 0) {
    return `📊 **Spending Analysis**\n\nNo expenses recorded this month yet. Great job keeping spending low! 🎉\n\nOr maybe you haven't been tracking expenses? Use the "Spend" button to log where your money goes.`;
  }

  let response = `📊 **Spending Analysis (This Month)**\n\n`;
  response += `Total Spent: **${formatCurrency(context.monthlyExpenses)}**\n\n`;

  const sortedCategories = Object.entries(context.expenseBreakdown).sort(
    (a, b) => b[1] - a[1]
  );

  response += `**Breakdown by Category:**\n`;
  sortedCategories.forEach(([cat, amount]) => {
    const percentage = ((amount / context.monthlyExpenses) * 100).toFixed(0);
    const emoji = EXPENSE_CATEGORIES.find((c) => c.id === cat)?.emoji || "📦";
    response += `${emoji} ${cat}: ${formatCurrency(amount)} (${percentage}%)\n`;
  });

  // Add insight
  const topCategory = sortedCategories[0];
  if (topCategory) {
    response += `\n💡 **Insight:** Your biggest expense is **${
      topCategory[0]
    }** at ${formatCurrency(topCategory[1])}. `;
    response += `Consider if there are ways to reduce spending in this area.`;
  }

  return response;
}

function generateSavingsTips(context) {
  const tips = [
    `💡 **The 50/30/20 Rule**\nAllocate 50% for needs, 30% for wants, and 20% for savings. Based on your income of ${formatCurrency(
      context.monthlyIncome
    )}, aim to save ${formatCurrency(context.monthlyIncome * 0.2)} monthly.`,

    `💡 **Pay Yourself First**\nWhen you get income, immediately put some into savings before spending on anything else. You have ${formatCurrency(
      context.availableBalance
    )} available - consider saving some now!`,

    `💡 **Track Every Expense**\nPeople who track expenses save 20% more on average. Use the "Spend" button to log everything, even small purchases.`,

    `💡 **Set Specific Goals**\nYou're 42% more likely to save with specific goals. ${
      context.goals.length === 0
        ? "Try setting your first goal!"
        : `You have ${context.goals.length} goals - keep working towards them!`
    }`,

    `💡 **The 24-Hour Rule**\nFor non-essential purchases over ${formatCurrency(
      50
    )}, wait 24 hours before buying. You'll often realize you don't need it!`,

    `💡 **Automate Your Savings**\nSet a regular schedule to save. Your current streak is ${context.streak} days - keep it going!`,

    `💡 **Review Subscriptions**\nUnused subscriptions can drain your funds. Review and cancel ones you don't use regularly.`,

    `💡 **Build an Emergency Fund**\nAim for 3-6 months of expenses. With your spending of ${formatCurrency(
      context.monthlyExpenses
    )}/month, target ${formatCurrency(
      context.monthlyExpenses * 3
    )} - ${formatCurrency(context.monthlyExpenses * 6)}.`,
  ];

  return tips[Math.floor(Math.random() * tips.length)];
}

function generateBudgetPlan(context) {
  const monthlyIncome =
    context.monthlyIncome ||
    context.availableBalance + context.monthlySavings + context.monthlyExpenses;

  if (monthlyIncome <= 0) {
    return `📝 **Budget Plan**\n\nI need to know your income to create a budget. Add some income first, or tell me your monthly income amount!`;
  }

  const needs = monthlyIncome * 0.5;
  const wants = monthlyIncome * 0.3;
  const savings = monthlyIncome * 0.2;

  let response = `📝 **Suggested Budget Plan**\n\n`;
  response += `Based on ${formatCurrency(monthlyIncome)} monthly income:\n\n`;

  response += `🏠 **Needs (50%):** ${formatCurrency(needs)}\n`;
  response += `   Housing, utilities, food, transport, insurance\n\n`;

  response += `🎮 **Wants (30%):** ${formatCurrency(wants)}\n`;
  response += `   Entertainment, dining out, hobbies, subscriptions\n\n`;

  response += `💰 **Savings (20%):** ${formatCurrency(savings)}\n`;
  response += `   Emergency fund, investments, goals\n\n`;

  // Compare with actual
  response += `📊 **Your Actual This Month:**\n`;
  response += `- Saved: ${formatCurrency(
    context.monthlySavings
  )} (Target: ${formatCurrency(savings)})\n`;
  response += `- Spent: ${formatCurrency(context.monthlyExpenses)}\n`;

  const savingsDiff = context.monthlySavings - savings;
  if (savingsDiff >= 0) {
    response += `\n✅ You're saving ${formatCurrency(
      savingsDiff
    )} more than the recommended 20%! Great job!`;
  } else {
    response += `\n⚠️ You're ${formatCurrency(
      Math.abs(savingsDiff)
    )} below the recommended savings. Try to save a bit more!`;
  }

  return response;
}

function handleCurrencyConversion(message, amount) {
  const currencies = Object.keys(CURRENCIES);
  let fromCurrency = null;
  let toCurrency = appData.settings.currency;

  const lowerMessage = message.toLowerCase();

  currencies.forEach((curr) => {
    if (lowerMessage.includes(curr.toLowerCase())) {
      if (!fromCurrency) {
        fromCurrency = curr;
      } else if (curr !== fromCurrency) {
        toCurrency = curr;
      }
    }
  });

  if (!fromCurrency) {
    fromCurrency = appData.settings.currency === "USD" ? "EUR" : "USD";
  }

  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  const rate = getExchangeRate(fromCurrency, toCurrency);

  return `💱 **Currency Conversion**\n\n${
    CURRENCIES[fromCurrency].flag
  } **${formatCurrencyWithSymbol(amount, fromCurrency)}**\n↓\n${
    CURRENCIES[toCurrency].flag
  } **${formatCurrencyWithSymbol(
    converted,
    toCurrency
  )}**\n\n📈 Rate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
}

function generateHelpMessage() {
  return `🤖 **I'm SaveAI, your personal finance assistant!**\n\nHere's what I can do:\n\n💰 **Manage Money**\n- "Save 100" - Add to savings\n- "Spent 50" - Record expense\n\n📊 **Get Information**\n- "Show my summary"\n- "How much can I save?"\n- "Goal progress"\n- "Analyze my spending"\n\n💡 **Get Advice**\n- "Give me a tip"\n- "Help me create a budget"\n- "How can I save more?"\n\n💱 **Convert Currency**\n- "Convert 100 EUR to USD"\n\nJust type naturally and I'll help! 😊`;
}

function generateDefaultResponse(context) {
  const responses = [
    `I'm here to help with your finances! 💰\n\nYou can ask me:\n- "What's my summary?"\n- "How much can I save?"\n- "Give me a saving tip"\n\nOr tell me to save or spend money!`,

    `Not sure I understood that, but I'm happy to help! 😊\n\nTry asking about your savings, goals, or spending. You can also say "help" to see all my capabilities.`,

    `Hmm, I didn't quite catch that. Here's a quick tip instead:\n\n${
      SAVINGS_TIPS[Math.floor(Math.random() * SAVINGS_TIPS.length)]
    }\n\nAsk me anything about your finances!`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

// ==================== CHAT UI FUNCTIONS ====================
function addUserMessageToChat(text) {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  messages.innerHTML += `
    <div class="message user">
      <div class="message-bubble">${escapeHtml(text)}</div>
      <div class="message-time">${time}</div>
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;
}

function addAIMessageToChat(text) {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedText = formatAIResponse(text);

  messages.innerHTML += `
    <div class="message ai">
      <div class="message-bubble">${formattedText}</div>
      <div class="message-time">${time}</div>
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;
}

function addAIErrorMessage(errorText) {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  messages.innerHTML += `
    <div class="message ai">
      <div class="ai-error-message">
        <i class="fas fa-exclamation-circle"></i>
        <span>${escapeHtml(errorText)}</span>
      </div>
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;
}

function showThinking() {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  messages.innerHTML += `
    <div class="message ai" id="aiThinking">
      <div class="ai-thinking">
        <div class="ai-thinking-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span>Thinking...</span>
      </div>
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;
}

function hideThinking() {
  const thinking = document.getElementById("aiThinking");
  if (thinking) thinking.remove();
}

function formatAIResponse(text) {
  // Escape HTML first
  let formatted = escapeHtml(text);

  // Convert markdown-like syntax
  // Bold: **text** or __text__
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic: *text* or _text_
  formatted = formatted.replace(/\*(.+?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/_(.+?)_/g, "<em>$1</em>");

  // Line breaks
  formatted = formatted.replace(/\n/g, "<br>");

  // Lists (basic)
  formatted = formatted.replace(/^- (.+)/gm, "• $1");

  return formatted;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ==================== INITIALIZE ON LOAD ====================
// Hook into the main app initialization
const originalInit = window.init || function () {};
window.init = function () {
  originalInit();
  setTimeout(initAI, 100);
};

// If already loaded
if (document.readyState === "complete") {
  setTimeout(initAI, 100);
}
