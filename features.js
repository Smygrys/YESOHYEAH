// ============================
// SMYGRYSSAVE AI — FEATURES MODULE
// ============================

const Features = {
  // ==================== WALLETS ====================
  showWallets() {
    const dc = AppData.user.displayCurrency;
    if (AppData.accounts.length === 0) {
      App.rawModal(`<h3>💼 Wallets</h3>
        <div class="empty-state">
          <i class="fas fa-wallet empty-icon"></i>
          <h4>No wallets yet</h4>
          <p>Create your first currency account to see it here.</p>
        </div>
        <div class="form-actions">
          <button class="btn btn-gradient" onclick="App.closeModalDirect();App.openModal('addAccount')"><i class="fas fa-plus"></i> Add Account</button>
          <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
        </div>`);
      return;
    }

    const totalConverted = AppData.getTotalBalanceInDisplay();
    let html = `<h3>💼 Wallets</h3>
      <div style="text-align:center;margin:12px 0 20px">
        <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px">Total Across All Wallets</div>
        <div style="font-size:26px;font-weight:900;margin-top:4px;background:var(--gradient-purple-pink);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${AppData.formatMoney(totalConverted, dc)}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">`;

    AppData.accounts.forEach((a) => {
      const sym = AppData.currencySymbols[a.currency];
      const flag = AppData.currencyFlags[a.currency];
      const conv = AppData.convert(a.balance, a.currency, dc);
      const pctOfTotal =
        totalConverted > 0 ? Math.round((conv / totalConverted) * 100) : 0;
      const txCount = AppData.transactions.filter(
        (t) => t.account && t.account.includes(a.name),
      ).length;

      html += `<div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-input);border-radius:12px;border:1px solid var(--border);cursor:pointer;transition:all 0.2s" 
        onmouseover="this.style.borderColor='var(--purple)'" onmouseout="this.style.borderColor='var(--border)'"
        onclick="App.closeModalDirect();App.showAccountDetails('${a.id}')">
        <span style="font-size:24px">${flag}</span>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:700">${a.name}</div>
          <div style="font-size:10px;color:var(--text-muted)">${a.currency} · ${txCount} transaction(s) · ${pctOfTotal}% of total</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:16px;font-weight:800">${sym}${a.balance.toFixed(2)}</div>
          ${a.currency !== dc ? `<div style="font-size:10px;color:var(--text-muted)">≈ ${AppData.formatMoney(conv, dc)}</div>` : ""}
        </div>
        <i class="fas fa-chevron-right" style="color:var(--text-muted);font-size:10px"></i>
      </div>`;
    });

    html += `</div>
      <div class="form-actions" style="margin-top:16px">
        <button class="btn btn-gradient" onclick="App.closeModalDirect();App.openModal('addAccount')"><i class="fas fa-plus"></i> Add Wallet</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`;
    App.rawModal(html);
  },

  // ==================== RECURRING PAYMENTS ====================
  showRecurring() {
    let html = "<h3>🔄 Recurring Payments</h3>";

    if (App.recurringPayments.length > 0) {
      let totalMonthly = 0;
      html +=
        '<div style="display:flex;flex-direction:column;gap:6px;margin:12px 0">';
      App.recurringPayments.forEach((rp, i) => {
        const sym = AppData.currencySymbols[rp.currency] || rp.currency;
        const convAmt = AppData.convert(
          rp.amount,
          rp.currency,
          AppData.user.primaryCurrency,
        );
        let monthly = convAmt;
        if (rp.frequency === "Weekly") monthly = convAmt * 4.33;
        else if (rp.frequency === "Yearly") monthly = convAmt / 12;
        totalMonthly += monthly;

        const catIcons = {
          Subscription: "fas fa-tv",
          Rent: "fas fa-home",
          Insurance: "fas fa-shield-alt",
          Loan: "fas fa-hand-holding-usd",
          Utilities: "fas fa-bolt",
          Other: "fas fa-redo",
        };
        const icon = catIcons[rp.category] || "fas fa-redo";

        html += `<div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border)">
          <div style="width:34px;height:34px;border-radius:10px;background:var(--orange-dim);color:var(--orange);display:flex;align-items:center;justify-content:center"><i class="${icon}"></i></div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600">${rp.title}</div>
            <div style="font-size:10px;color:var(--text-muted)">${rp.frequency} · ${rp.category || "Other"} · Next: ${rp.nextDate || "Not set"}</div>
          </div>
          <span style="font-size:13px;font-weight:700;color:var(--red)">${sym}${rp.amount.toFixed(2)}</span>
          <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:12px;padding:4px" onclick="Features.payRecurring(${i})" title="Pay now"><i class="fas fa-check"></i></button>
          <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:12px;padding:4px" onclick="Features.editRecurring(${i})" title="Edit"><i class="fas fa-pen"></i></button>
          <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:12px;padding:4px" onclick="Features.removeRecurring(${i})" title="Delete"><i class="fas fa-times"></i></button>
        </div>`;
      });
      html += "</div>";
      html += `<div style="padding:12px;background:var(--red-dim);border-radius:10px;border:1px solid rgba(239,68,68,0.2);margin-bottom:12px">
        <div style="font-size:10px;color:var(--red);margin-bottom:2px">Estimated Monthly Total</div>
        <div style="font-size:16px;font-weight:800;color:var(--red)">${AppData.formatMoney(totalMonthly, AppData.user.primaryCurrency)}</div>
      </div>`;
    } else {
      html +=
        '<p style="color:var(--text-secondary);margin:16px 0">No recurring payments set up yet.</p>';
    }

    html += `<hr style="border-color:var(--border);margin:12px 0">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px">Add New Recurring Payment</div>
      <div class="form-group"><label>Title</label><input id="m-rec-title" placeholder="e.g., Netflix, Rent, Gym"></div>
      <div class="form-group"><label>Amount</label><input id="m-rec-amt" type="number" placeholder="0.00" step="0.01"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group"><label>Currency</label><select id="m-rec-cur"><option>PLN</option><option>EUR</option><option>USD</option><option>GBP</option><option>CHF</option></select></div>
        <div class="form-group"><label>Frequency</label><select id="m-rec-freq"><option>Monthly</option><option>Weekly</option><option>Yearly</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group"><label>Category</label><select id="m-rec-cat"><option>Subscription</option><option>Rent</option><option>Insurance</option><option>Loan</option><option>Utilities</option><option>Other</option></select></div>
        <div class="form-group"><label>Next Due Date</label><input id="m-rec-date" type="date"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="Features.addRecurring()"><i class="fas fa-plus"></i> Add</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`;
    App.rawModal(html);
  },

  addRecurring() {
    const title = document.getElementById("m-rec-title").value.trim();
    const amt = parseFloat(document.getElementById("m-rec-amt").value);
    const cur = document.getElementById("m-rec-cur").value;
    const freq = document.getElementById("m-rec-freq").value;
    const cat = document.getElementById("m-rec-cat").value;
    const nextDate = document.getElementById("m-rec-date").value;
    if (!title) return alert("Enter a title.");
    if (!amt || amt <= 0) return alert("Enter a valid amount.");
    App.recurringPayments.push({
      title,
      amount: amt,
      currency: cur,
      frequency: freq,
      category: cat,
      nextDate: nextDate || "",
    });
    App.saveExtras();
    App.closeModalDirect();
    App.generateNotifications();
    AI.addMessage(
      "bot",
      `🔄 Recurring payment added: <strong>${title}</strong> — ${AppData.currencySymbols[cur]}${amt.toFixed(2)} (${freq}).`,
    );
    setTimeout(() => Features.showRecurring(), 100);
  },

  removeRecurring(i) {
    const rp = App.recurringPayments[i];
    if (!rp) return;
    if (!confirm(`Remove "${rp.title}"?`)) return;
    App.recurringPayments.splice(i, 1);
    App.saveExtras();
    App.closeModalDirect();
    App.generateNotifications();
    setTimeout(() => Features.showRecurring(), 100);
  },

  editRecurring(i) {
    const rp = App.recurringPayments[i];
    if (!rp) return;
    App.rawModal(`<h3>✏️ Edit: ${rp.title}</h3>
      <div class="form-group"><label>Title</label><input id="m-rec-ed-title" value="${rp.title}"></div>
      <div class="form-group"><label>Amount</label><input id="m-rec-ed-amt" type="number" value="${rp.amount}" step="0.01"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group"><label>Currency</label><select id="m-rec-ed-cur">${["PLN", "EUR", "USD", "GBP", "CHF"].map((c) => `<option ${c === rp.currency ? "selected" : ""}>${c}</option>`).join("")}</select></div>
        <div class="form-group"><label>Frequency</label><select id="m-rec-ed-freq">${["Monthly", "Weekly", "Yearly"].map((f) => `<option ${f === rp.frequency ? "selected" : ""}>${f}</option>`).join("")}</select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group"><label>Category</label><select id="m-rec-ed-cat">${["Subscription", "Rent", "Insurance", "Loan", "Utilities", "Other"].map((c) => `<option ${c === rp.category ? "selected" : ""}>${c}</option>`).join("")}</select></div>
        <div class="form-group"><label>Next Due</label><input id="m-rec-ed-date" type="date" value="${rp.nextDate || ""}"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="Features.saveEditRecurring(${i})"><i class="fas fa-save"></i> Save</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect();setTimeout(()=>Features.showRecurring(),100)">Cancel</button>
      </div>`);
  },

  saveEditRecurring(i) {
    const rp = App.recurringPayments[i];
    if (!rp) return;
    rp.title =
      document.getElementById("m-rec-ed-title").value.trim() || rp.title;
    rp.amount =
      parseFloat(document.getElementById("m-rec-ed-amt").value) || rp.amount;
    rp.currency = document.getElementById("m-rec-ed-cur").value;
    rp.frequency = document.getElementById("m-rec-ed-freq").value;
    rp.category = document.getElementById("m-rec-ed-cat").value;
    rp.nextDate = document.getElementById("m-rec-ed-date").value;
    App.saveExtras();
    App.closeModalDirect();
    AI.addMessage(
      "bot",
      `✏️ Recurring payment "<strong>${rp.title}</strong>" updated.`,
    );
    setTimeout(() => Features.showRecurring(), 100);
  },

  payRecurring(i) {
    const rp = App.recurringPayments[i];
    if (!rp) return;
    const acc =
      AppData.accounts.find((a) => a.currency === rp.currency) ||
      AppData.accounts[0];
    if (!acc) return alert("No account available. Create one first.");
    if (acc.balance < rp.amount) {
      if (!confirm(`This will make ${acc.name} negative. Continue?`)) return;
    }
    AppData.addTransaction(
      rp.title,
      "expense",
      rp.amount,
      rp.currency,
      rp.category?.toLowerCase() || "other",
      acc.name,
      `Recurring: ${rp.frequency}`,
    );
    App.closeModalDirect();
    App.afterDataChange();
    AI.addMessage(
      "bot",
      `✅ Paid <strong>${rp.title}</strong>: -${AppData.currencySymbols[rp.currency]}${rp.amount.toFixed(2)}`,
    );
    setTimeout(() => Features.showRecurring(), 100);
  },

  // ==================== CHALLENGES ====================
  showChallenges() {
    const challenges = [
      {
        name: "First Account",
        desc: "Create your first currency account",
        icon: "fas fa-wallet",
        done: AppData.accounts.length > 0,
        reward: "🏦",
      },
      {
        name: "First Income",
        desc: "Record your first income",
        icon: "fas fa-plus-circle",
        done: AppData.transactions.some((t) => t.type === "income"),
        reward: "💰",
      },
      {
        name: "First Expense",
        desc: "Track your first expense",
        icon: "fas fa-shopping-cart",
        done: AppData.transactions.some((t) => t.type === "expense"),
        reward: "🧾",
      },
      {
        name: "Goal Setter",
        desc: "Create a savings goal",
        icon: "fas fa-bullseye",
        done: AppData.goals.length > 0,
        reward: "🎯",
      },
      {
        name: "First Save",
        desc: "Make your first savings contribution",
        icon: "fas fa-piggy-bank",
        done: AppData.totalSavings > 0,
        reward: "🐷",
      },
      {
        name: "Multi-Currency",
        desc: "Hold 3 or more currencies",
        icon: "fas fa-globe",
        done: [...new Set(AppData.accounts.map((a) => a.currency))].length >= 3,
        reward: "🌍",
      },
      {
        name: "10 Transactions",
        desc: "Record at least 10 transactions",
        icon: "fas fa-list",
        done: AppData.transactions.length >= 10,
        reward: "📊",
      },
      {
        name: "25 Transactions",
        desc: "Record at least 25 transactions",
        icon: "fas fa-chart-bar",
        done: AppData.transactions.length >= 25,
        reward: "📈",
      },
      {
        name: "Goal Achiever",
        desc: "Complete a savings goal",
        icon: "fas fa-trophy",
        done: AppData.goals.some((g) => g.status === "completed"),
        reward: "🏆",
      },
      {
        name: "20% Saver",
        desc: "Reach a 20% savings rate",
        icon: "fas fa-percentage",
        done: AppData.getSavingsRate() >= 20,
        reward: "💪",
      },
      {
        name: "Super Saver",
        desc: "Reach a 40% savings rate",
        icon: "fas fa-star",
        done: AppData.getSavingsRate() >= 40,
        reward: "🌟",
      },
      {
        name: "Exchanger",
        desc: "Make a currency exchange",
        icon: "fas fa-exchange-alt",
        done: AppData.transactions.some((t) => t.type === "exchange"),
        reward: "💱",
      },
      {
        name: "Recurring Setup",
        desc: "Add a recurring payment",
        icon: "fas fa-redo",
        done: App.recurringPayments.length > 0,
        reward: "🔄",
      },
      {
        name: "Wishlist Dreamer",
        desc: "Add an item to your wishlist",
        icon: "fas fa-heart",
        done: App.wishlistItems.length > 0,
        reward: "❤️",
      },
      {
        name: "Five Goals",
        desc: "Create 5 savings goals",
        icon: "fas fa-bullseye",
        done: AppData.goals.length >= 5,
        reward: "🎯×5",
      },
    ];

    const completed = challenges.filter((c) => c.done).length;
    const pct = Math.round((completed / challenges.length) * 100);

    let html = `<h3>🏆 Challenges</h3>
      <div style="text-align:center;margin:12px 0 16px">
        <div style="font-size:28px;font-weight:900;color:var(--purple)">${completed}/${challenges.length}</div>
        <div style="font-size:11px;color:var(--text-muted)">Challenges Completed (${pct}%)</div>
        <div style="height:8px;background:rgba(255,255,255,0.06);border-radius:4px;margin-top:8px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:var(--gradient-purple-pink);border-radius:4px;transition:width 1s"></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;max-height:400px;overflow-y:auto">`;

    challenges.forEach((c) => {
      html += `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${c.done ? "var(--green-dim)" : "var(--bg-input)"};border-radius:10px;border:1px solid ${c.done ? "rgba(34,197,94,0.25)" : "var(--border)"}">
        <div style="width:32px;height:32px;border-radius:8px;background:${c.done ? "var(--green-dim)" : "var(--bg-card)"};color:${c.done ? "var(--green)" : "var(--text-muted)"};display:flex;align-items:center;justify-content:center;font-size:13px"><i class="${c.done ? "fas fa-check" : c.icon}"></i></div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;${c.done ? "text-decoration:line-through;opacity:0.7" : ""}">${c.name}</div>
          <div style="font-size:10px;color:var(--text-muted)">${c.desc}</div>
        </div>
        <span style="font-size:16px">${c.done ? c.reward : "🔒"}</span>
      </div>`;
    });

    html += `</div>
      <div class="form-actions" style="margin-top:16px">
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`;
    App.rawModal(html);
  },

  // ==================== WISHLIST ====================
  showWishlist() {
    let html = "<h3>❤️ Wishlist</h3>";

    if (App.wishlistItems.length > 0) {
      let totalValue = 0;
      html +=
        '<div style="display:flex;flex-direction:column;gap:6px;margin:12px 0">';
      App.wishlistItems.forEach((w, i) => {
        const sym = AppData.currencySymbols[w.currency] || w.currency;
        totalValue += AppData.convert(
          w.price,
          w.currency,
          AppData.user.displayCurrency,
        );
        html += `<div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border)">
          <div style="width:34px;height:34px;border-radius:10px;background:var(--pink-dim);color:var(--pink);display:flex;align-items:center;justify-content:center"><i class="fas fa-heart"></i></div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600">${w.name}</div>
            <div style="font-size:10px;color:var(--text-muted)">${w.currency} · ${w.priority || "Normal"} priority</div>
          </div>
          <span style="font-size:13px;font-weight:700">${sym}${w.price.toFixed(2)}</span>
          <button class="btn btn-gradient" style="padding:4px 10px;font-size:9px" onclick="Features.wishlistToGoal(${i})" title="Convert to goal"><i class="fas fa-bullseye"></i> Goal</button>
          <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:12px;padding:4px" onclick="Features.editWishlistItem(${i})" title="Edit"><i class="fas fa-pen"></i></button>
          <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:12px;padding:4px" onclick="Features.removeWishlistItem(${i})" title="Remove"><i class="fas fa-times"></i></button>
        </div>`;
      });
      html += "</div>";
      html += `<div style="padding:10px;background:var(--pink-dim);border-radius:10px;border:1px solid rgba(236,72,153,0.2);margin-bottom:12px;text-align:center">
        <div style="font-size:10px;color:var(--pink)">Total Wishlist Value</div>
        <div style="font-size:16px;font-weight:800;color:var(--pink)">${AppData.formatMoney(totalValue, AppData.user.displayCurrency)}</div>
      </div>`;
    } else {
      html += `<div class="empty-state" style="padding:20px 0">
        <i class="fas fa-heart empty-icon" style="font-size:32px"></i>
        <h4>Your wishlist is empty</h4>
        <p>Add items you dream about. Convert them to savings goals when ready!</p>
      </div>`;
    }

    html += `<hr style="border-color:var(--border);margin:12px 0">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px">Add to Wishlist</div>
      <div class="form-group"><label>Item Name</label><input id="m-wl-name" placeholder="e.g., New Phone, Watch, Vacation"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group"><label>Price</label><input id="m-wl-price" type="number" placeholder="0.00" step="0.01"></div>
        <div class="form-group"><label>Currency</label><select id="m-wl-cur"><option>PLN</option><option>EUR</option><option>USD</option><option>GBP</option><option>CHF</option></select></div>
      </div>
      <div class="form-group"><label>Priority</label><select id="m-wl-priority"><option>Low</option><option selected>Normal</option><option>High</option><option>Must Have</option></select></div>
      <div class="form-group"><label>Notes</label><input id="m-wl-notes" placeholder="Optional"></div>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="Features.addWishlistItem()"><i class="fas fa-heart"></i> Add</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`;
    App.rawModal(html);
  },

  addWishlistItem() {
    const name = document.getElementById("m-wl-name").value.trim();
    const price = parseFloat(document.getElementById("m-wl-price").value);
    const cur = document.getElementById("m-wl-cur").value;
    const priority = document.getElementById("m-wl-priority").value;
    const notes = document.getElementById("m-wl-notes").value.trim();
    if (!name) return alert("Enter an item name.");
    if (!price || price <= 0) return alert("Enter a valid price.");
    App.wishlistItems.push({
      name,
      price,
      currency: cur,
      priority,
      notes,
      dateAdded: new Date().toISOString(),
    });
    App.saveExtras();
    App.closeModalDirect();
    AI.addMessage(
      "bot",
      `❤️ "<strong>${name}</strong>" added to wishlist (${AppData.formatMoney(price, cur)}).`,
    );
    setTimeout(() => Features.showWishlist(), 100);
  },

  removeWishlistItem(i) {
    const w = App.wishlistItems[i];
    if (!w) return;
    if (!confirm(`Remove "${w.name}" from wishlist?`)) return;
    App.wishlistItems.splice(i, 1);
    App.saveExtras();
    App.closeModalDirect();
    setTimeout(() => Features.showWishlist(), 100);
  },

  editWishlistItem(i) {
    const w = App.wishlistItems[i];
    if (!w) return;
    App.rawModal(`<h3>✏️ Edit: ${w.name}</h3>
      <div class="form-group"><label>Name</label><input id="m-wl-ed-name" value="${w.name}"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group"><label>Price</label><input id="m-wl-ed-price" type="number" value="${w.price}" step="0.01"></div>
        <div class="form-group"><label>Currency</label><select id="m-wl-ed-cur">${["PLN", "EUR", "USD", "GBP", "CHF"].map((c) => `<option ${c === w.currency ? "selected" : ""}>${c}</option>`).join("")}</select></div>
      </div>
      <div class="form-group"><label>Priority</label><select id="m-wl-ed-pri">${["Low", "Normal", "High", "Must Have"].map((p) => `<option ${p === w.priority ? "selected" : ""}>${p}</option>`).join("")}</select></div>
      <div class="form-group"><label>Notes</label><input id="m-wl-ed-notes" value="${w.notes || ""}"></div>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="Features.saveEditWishlist(${i})"><i class="fas fa-save"></i> Save</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect();setTimeout(()=>Features.showWishlist(),100)">Cancel</button>
      </div>`);
  },

  saveEditWishlist(i) {
    const w = App.wishlistItems[i];
    if (!w) return;
    w.name = document.getElementById("m-wl-ed-name").value.trim() || w.name;
    w.price =
      parseFloat(document.getElementById("m-wl-ed-price").value) || w.price;
    w.currency = document.getElementById("m-wl-ed-cur").value;
    w.priority = document.getElementById("m-wl-ed-pri").value;
    w.notes = document.getElementById("m-wl-ed-notes").value.trim();
    App.saveExtras();
    App.closeModalDirect();
    setTimeout(() => Features.showWishlist(), 100);
  },

  wishlistToGoal(i) {
    const w = App.wishlistItems[i];
    if (!w) return;
    AppData.addGoal(w.name, w.price, w.currency, "", "Other");
    App.wishlistItems.splice(i, 1);
    App.saveExtras();
    App.closeModalDirect();
    App.afterDataChange();
    AI.addMessage(
      "bot",
      `🎯 "${w.name}" converted to savings goal (${AppData.formatMoney(w.price, w.currency)}).`,
    );
  },

  // ==================== ACHIEVEMENTS ====================
  showAchievements() {
    const defs = [
      {
        name: "First Account",
        icon: "🏦",
        desc: "Created first account",
        check: () => AppData.accounts.length >= 1,
      },
      {
        name: "Multi-Currency",
        icon: "🌍",
        desc: "Hold 3+ currencies",
        check: () =>
          [...new Set(AppData.accounts.map((a) => a.currency))].length >= 3,
      },
      {
        name: "Currency Collector",
        icon: "💎",
        desc: "Hold 5 currencies",
        check: () =>
          [...new Set(AppData.accounts.map((a) => a.currency))].length >= 5,
      },
      {
        name: "First Transaction",
        icon: "📝",
        desc: "Recorded first tx",
        check: () => AppData.transactions.length >= 1,
      },
      {
        name: "Active Tracker",
        icon: "📊",
        desc: "10+ transactions",
        check: () => AppData.transactions.length >= 10,
      },
      {
        name: "Finance Pro",
        icon: "🔥",
        desc: "50+ transactions",
        check: () => AppData.transactions.length >= 50,
      },
      {
        name: "Data Master",
        icon: "🗄️",
        desc: "100+ transactions",
        check: () => AppData.transactions.length >= 100,
      },
      {
        name: "Goal Setter",
        icon: "🎯",
        desc: "Created first goal",
        check: () => AppData.goals.length >= 1,
      },
      {
        name: "Ambitious",
        icon: "🚀",
        desc: "5+ goals",
        check: () => AppData.goals.length >= 5,
      },
      {
        name: "Goal Achiever",
        icon: "🏆",
        desc: "Completed a goal",
        check: () => AppData.goals.some((g) => g.status === "completed"),
      },
      {
        name: "First Savings",
        icon: "🐷",
        desc: "Saved money",
        check: () => AppData.totalSavings > 0,
      },
      {
        name: "20% Saver",
        icon: "💪",
        desc: "20%+ savings rate",
        check: () => AppData.getSavingsRate() >= 20,
      },
      {
        name: "Super Saver",
        icon: "🌟",
        desc: "40%+ savings rate",
        check: () => AppData.getSavingsRate() >= 40,
      },
      {
        name: "Exchanger",
        icon: "💱",
        desc: "Made an exchange",
        check: () => AppData.transactions.some((t) => t.type === "exchange"),
      },
      {
        name: "Transfer Pro",
        icon: "📤",
        desc: "Made a transfer",
        check: () => AppData.transactions.some((t) => t.type === "transfer"),
      },
      {
        name: "Recurring",
        icon: "🔄",
        desc: "Set recurring payment",
        check: () => App.recurringPayments.length > 0,
      },
      {
        name: "Dreamer",
        icon: "❤️",
        desc: "Added wishlist item",
        check: () => App.wishlistItems.length > 0,
      },
      {
        name: "Big Spender",
        icon: "💸",
        desc: "Single expense > 1000",
        check: () =>
          AppData.transactions.some(
            (t) => t.type === "expense" && t.amount >= 1000,
          ),
      },
      {
        name: "Big Earner",
        icon: "🤑",
        desc: "Single income > 5000",
        check: () =>
          AppData.transactions.some(
            (t) => t.type === "income" && t.amount >= 5000,
          ),
      },
    ];

    const unlocked = defs.filter((d) => d.check());
    const locked = defs.filter((d) => !d.check());

    let html = `<h3>🏅 Achievements</h3>
      <div style="text-align:center;margin:12px 0 16px">
        <div style="font-size:28px;font-weight:900;color:var(--purple)">${unlocked.length}/${defs.length}</div>
        <div style="font-size:11px;color:var(--text-muted)">Unlocked</div>
      </div>`;

    if (unlocked.length > 0) {
      html +=
        '<div style="font-size:11px;font-weight:700;color:var(--green);margin-bottom:8px">✅ UNLOCKED</div>';
      html +=
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">';
      unlocked.forEach((a) => {
        html += `<div style="padding:10px 14px;background:var(--green-dim);border:1px solid rgba(34,197,94,0.25);border-radius:10px;font-size:12px;font-weight:600;text-align:center;min-width:80px" title="${a.desc}">
          <div style="font-size:20px;margin-bottom:2px">${a.icon}</div>${a.name}
        </div>`;
      });
      html += "</div>";
    }

    if (locked.length > 0) {
      html +=
        '<div style="font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:8px">🔒 LOCKED</div>';
      html +=
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">';
      locked.forEach((a) => {
        html += `<div style="padding:10px 14px;background:var(--bg-input);border:1px solid var(--border);border-radius:10px;font-size:12px;font-weight:600;text-align:center;min-width:80px;opacity:0.5" title="${a.desc}">
          <div style="font-size:20px;margin-bottom:2px">🔒</div>${a.name}
        </div>`;
      });
      html += "</div>";
    }

    html += `<div class="form-actions"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`;
    App.rawModal(html);
  },

  // ==================== NET WORTH ====================
  showNetWorth() {
    const dc = AppData.user.displayCurrency;
    const totalBal = AppData.getTotalBalanceInDisplay();
    const totalSav = AppData.getTotalSavingsInDisplay();
    const netWorth = totalBal + totalSav;

    // Build breakdown per currency
    let currencyBreakdown = "";
    if (AppData.accounts.length > 0) {
      const grouped = {};
      AppData.accounts.forEach((a) => {
        if (!grouped[a.currency]) grouped[a.currency] = 0;
        grouped[a.currency] += a.balance;
      });
      currencyBreakdown =
        '<div style="font-size:12px;font-weight:700;margin:16px 0 8px">By Currency</div><div style="display:flex;flex-direction:column;gap:6px">';
      Object.entries(grouped).forEach(([cur, bal]) => {
        const conv = AppData.convert(bal, cur, dc);
        const pct = netWorth > 0 ? Math.round((conv / netWorth) * 100) : 0;
        const cc = AppData.currencyColors[cur] || {
          bg: "var(--bg-input)",
          text: "var(--text)",
        };
        currencyBreakdown += `<div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg-input);border-radius:8px;border:1px solid var(--border)">
          <span style="font-size:18px">${AppData.currencyFlags[cur] || "🏦"}</span>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600">${cur}</div>
            <div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;margin-top:4px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${cc.text};border-radius:2px"></div></div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;font-weight:700">${AppData.currencySymbols[cur]}${bal.toFixed(2)}</div>
            <div style="font-size:10px;color:var(--text-muted)">${pct}%</div>
          </div>
        </div>`;
      });
      currencyBreakdown += "</div>";
    }

    App.rawModal(`<h3>📊 Net Worth</h3>
      <div style="text-align:center;margin:20px 0">
        <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Estimated Net Worth</div>
        <div style="font-size:34px;font-weight:900;background:var(--gradient-purple-pink);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${AppData.formatMoney(netWorth, dc)}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
        <div style="padding:16px;background:var(--green-dim);border-radius:12px;text-align:center;border:1px solid rgba(34,197,94,0.2)">
          <div style="font-size:10px;color:var(--green);margin-bottom:4px">Account Balances</div>
          <div style="font-size:18px;font-weight:800;color:var(--green)">${AppData.formatMoney(totalBal, dc)}</div>
        </div>
        <div style="padding:16px;background:var(--purple-dim);border-radius:12px;text-align:center;border:1px solid rgba(168,85,247,0.2)">
          <div style="font-size:10px;color:var(--purple);margin-bottom:4px">Saved in Goals</div>
          <div style="font-size:18px;font-weight:800;color:var(--purple)">${AppData.formatMoney(totalSav, dc)}</div>
        </div>
      </div>
      ${currencyBreakdown}
      <div class="form-actions" style="margin-top:16px"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`);
  },

  // ==================== INVESTMENTS (Placeholder) ====================
  showInvestments() {
    App.rawModal(`<h3>📈 Investments</h3>
      <div class="empty-state" style="padding:20px 0">
        <i class="fas fa-chart-line empty-icon" style="font-size:36px"></i>
        <h4>Coming Soon</h4>
        <p>Investment tracking and portfolio management will be available in a future update. Connect your brokerage account to start.</p>
      </div>
      <div class="form-actions"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`);
  },

  // ==================== CARDS ====================
  showCards() {
    App.rawModal(`<h3>💳 Cards</h3>
      <div class="empty-state" style="padding:20px 0">
        <i class="fas fa-credit-card empty-icon" style="font-size:36px"></i>
        <h4>No Cards Linked</h4>
        <p>Link your debit or credit cards to automatically track card spending and manage limits.</p>
      </div>
      <div class="form-actions"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`);
  },

  // ==================== LOANS ====================
  showLoans() {
    App.rawModal(`<h3>🏦 Loans</h3>
      <p style="color:var(--text-secondary);font-size:12px;margin:16px 0">Track your loan repayments by adding them as recurring payments. This helps you stay on top of monthly obligations.</p>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="App.closeModalDirect();setTimeout(()=>Features.showRecurring(),100)"><i class="fas fa-redo"></i> Manage Recurring</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`);
  },

  // ==================== REPORTS ====================
  showReport() {
    const dc = AppData.user.displayCurrency;
    const pc = AppData.user.primaryCurrency;
    const bal = AppData.getTotalBalanceInDisplay();
    const sav = AppData.getTotalSavingsInDisplay();
    const inc = AppData.convert(AppData.totalIncome, pc, dc);
    const exp = AppData.convert(AppData.totalExpenses, pc, dc);
    const net = bal + sav;
    const rate = AppData.getSavingsRate();
    const uniqueCur = [...new Set(AppData.accounts.map((a) => a.currency))];

    // Category breakdown
    let catBreakdown = "";
    if (AppData.transactions.filter((t) => t.type === "expense").length > 0) {
      const cats = {};
      AppData.transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
          const cat = t.category || "other";
          if (!cats[cat]) cats[cat] = 0;
          cats[cat] += AppData.convert(t.amount, t.currency, dc);
        });
      const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);
      catBreakdown =
        '<div style="font-size:12px;font-weight:700;margin:16px 0 8px">Expense Categories</div>';
      sorted.forEach(([cat, amt]) => {
        const pct = exp > 0 ? Math.round((amt / exp) * 100) : 0;
        catBreakdown += `<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:11px;border-bottom:1px solid var(--border)">
          <span style="text-transform:capitalize">${cat}</span>
          <span><strong>${AppData.formatMoney(amt, dc)}</strong> (${pct}%)</span>
        </div>`;
      });
    }

    App.rawModal(`<h3>📑 Financial Report</h3>
      <div style="font-size:10px;color:var(--text-muted);margin-bottom:16px">Generated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
        <div style="padding:12px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border)"><div style="font-size:10px;color:var(--text-muted)">Net Worth</div><div style="font-size:16px;font-weight:800">${AppData.formatMoney(net, dc)}</div></div>
        <div style="padding:12px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border)"><div style="font-size:10px;color:var(--text-muted)">Savings Rate</div><div style="font-size:16px;font-weight:800">${rate}%</div></div>
      </div>
      <div style="font-size:12px;line-height:2;color:var(--text-secondary)">
        Accounts: <strong>${AppData.accounts.length}</strong><br>
        Currencies: <strong>${uniqueCur.join(", ") || "None"}</strong><br>
        Total Balance: <strong>${AppData.formatMoney(bal, dc)}</strong><br>
        Total Income: <strong style="color:var(--green)">${AppData.formatMoney(inc, dc)}</strong><br>
        Total Expenses: <strong style="color:var(--red)">${AppData.formatMoney(exp, dc)}</strong><br>
        Total Savings: <strong style="color:var(--purple)">${AppData.formatMoney(sav, dc)}</strong><br>
        Goals: <strong>${AppData.goals.length}</strong> (${AppData.goals.filter((g) => g.status === "active").length} active, ${AppData.goals.filter((g) => g.status === "completed").length} completed)<br>
        Transactions: <strong>${AppData.transactions.length}</strong><br>
        Recurring Payments: <strong>${App.recurringPayments.length}</strong><br>
        Daily Income: <strong>${AppData.user.dailyIncome} ${pc}</strong><br>
        Savings Target: <strong>${AppData.user.savingsGoalPct}%</strong>
      </div>
      ${catBreakdown}
      <div class="form-actions" style="margin-top:16px">
        <button class="btn btn-gradient" onclick="App.exportData()"><i class="fas fa-download"></i> Export</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`);
  },

  // ==================== CALENDAR ====================
  showCalendar() {
    const now = new Date();
    const m = now.getMonth(),
      y = now.getFullYear();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const monthName = now.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const txByDay = {};
    AppData.transactions.forEach((t) => {
      const d = new Date(t.date);
      if (d.getMonth() === m && d.getFullYear() === y) {
        const day = d.getDate();
        if (!txByDay[day]) txByDay[day] = [];
        txByDay[day].push(t);
      }
    });

    // Monthly summary
    let monthIncome = 0,
      monthExpense = 0,
      monthSavings = 0;
    AppData.transactions.forEach((t) => {
      const d = new Date(t.date);
      if (d.getMonth() === m && d.getFullYear() === y) {
        const v = AppData.convert(
          t.amount,
          t.currency,
          AppData.user.displayCurrency,
        );
        if (t.type === "income") monthIncome += v;
        else if (t.type === "expense") monthExpense += v;
        else if (t.type === "savings") monthSavings += v;
      }
    });

    let html = `<h3>📅 ${monthName}</h3>`;

    // Monthly summary bar
    html += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:12px 0">
      <div style="padding:8px;background:var(--green-dim);border-radius:8px;text-align:center"><div style="font-size:9px;color:var(--green)">Income</div><div style="font-size:12px;font-weight:700;color:var(--green)">${AppData.formatMoney(monthIncome, AppData.user.displayCurrency)}</div></div>
      <div style="padding:8px;background:var(--red-dim);border-radius:8px;text-align:center"><div style="font-size:9px;color:var(--red)">Expenses</div><div style="font-size:12px;font-weight:700;color:var(--red)">${AppData.formatMoney(monthExpense, AppData.user.displayCurrency)}</div></div>
      <div style="padding:8px;background:var(--purple-dim);border-radius:8px;text-align:center"><div style="font-size:9px;color:var(--purple)">Saved</div><div style="font-size:12px;font-weight:700;color:var(--purple)">${AppData.formatMoney(monthSavings, AppData.user.displayCurrency)}</div></div>
    </div>`;

    // Calendar grid
    html +=
      '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin:8px 0">';
    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach((d) => {
      html += `<div style="text-align:center;font-size:9px;color:var(--text-muted);font-weight:700;padding:4px">${d}</div>`;
    });
    for (let i = 0; i < firstDay; i++) html += "<div></div>";
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === now.getDate();
      const dayTxs = txByDay[d];
      const hasIncome = dayTxs?.some((t) => t.type === "income");
      const hasExpense = dayTxs?.some((t) => t.type === "expense");
      const hasSavings = dayTxs?.some((t) => t.type === "savings");

      html += `<div style="text-align:center;padding:6px 2px;border-radius:8px;font-size:11px;font-weight:${isToday ? "800" : "500"};
        background:${isToday ? "var(--purple-dim)" : dayTxs ? "var(--bg-input)" : "transparent"};
        border:1px solid ${isToday ? "var(--purple)" : "transparent"};
        cursor:${dayTxs ? "pointer" : "default"}"
        ${dayTxs ? `onclick="Features.showDayTransactions(${d},${m},${y})"` : ""}>
        ${d}
        ${
          dayTxs
            ? `<div style="display:flex;gap:2px;justify-content:center;margin-top:2px">
          ${hasIncome ? '<div style="width:4px;height:4px;border-radius:50%;background:var(--green)"></div>' : ""}
          ${hasExpense ? '<div style="width:4px;height:4px;border-radius:50%;background:var(--red)"></div>' : ""}
          ${hasSavings ? '<div style="width:4px;height:4px;border-radius:50%;background:var(--purple)"></div>' : ""}
        </div>`
            : ""
        }
      </div>`;
    }
    html += "</div>";

    html += `<div style="display:flex;gap:12px;justify-content:center;margin-top:8px;font-size:9px;color:var(--text-muted)">
      <span><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--green);margin-right:3px"></span>Income</span>
      <span><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--red);margin-right:3px"></span>Expense</span>
      <span><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--purple);margin-right:3px"></span>Savings</span>
    </div>`;

    html += `<div class="form-actions" style="margin-top:16px"><button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button></div>`;
    App.rawModal(html);
  },

  showDayTransactions(day, month, year) {
    const dc = AppData.user.displayCurrency;
    const txs = AppData.transactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getDate() === day &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });
    const dateStr = new Date(year, month, day).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    let dayIncome = 0,
      dayExpense = 0;
    txs.forEach((t) => {
      const v = AppData.convert(t.amount, t.currency, dc);
      if (t.type === "income") dayIncome += v;
      else if (t.type === "expense" || t.type === "savings") dayExpense += v;
    });

    let html = `<h3>📅 ${dateStr}</h3>`;

    if (txs.length > 0) {
      html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0">
        <div style="padding:8px;background:var(--green-dim);border-radius:8px;text-align:center"><div style="font-size:9px;color:var(--green)">Income</div><div style="font-size:13px;font-weight:700;color:var(--green)">+${AppData.formatMoney(dayIncome, dc)}</div></div>
        <div style="padding:8px;background:var(--red-dim);border-radius:8px;text-align:center"><div style="font-size:9px;color:var(--red)">Spent</div><div style="font-size:13px;font-weight:700;color:var(--red)">-${AppData.formatMoney(dayExpense, dc)}</div></div>
      </div>`;

      html += '<div style="display:flex;flex-direction:column;gap:6px">';
      txs.forEach((t) => {
        const sym = AppData.currencySymbols[t.currency];
        const px =
          t.type === "income"
            ? "+"
            : t.type === "expense" || t.type === "savings"
              ? "-"
              : "";
        const tc = {
          income: "var(--green)",
          expense: "var(--red)",
          savings: "var(--purple)",
          exchange: "var(--blue)",
          transfer: "var(--orange)",
        };
        const col = tc[t.type] || "var(--text)";
        const time = new Date(t.date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        html += `<div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg-input);border-radius:10px;border:1px solid var(--border);cursor:pointer" onclick="App.closeModalDirect();App.showTransactionDetail('${t.id}')">
          <div style="width:32px;height:32px;border-radius:8px;background:${col}15;color:${col};display:flex;align-items:center;justify-content:center;font-size:12px"><i class="${t.icon}"></i></div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600">${t.title}</div>
            <div style="font-size:10px;color:var(--text-muted)">${time} · ${t.category}</div>
          </div>
          <div style="font-size:13px;font-weight:700;color:${col}">${px}${sym}${t.amount.toFixed(2)}</div>
        </div>`;
      });
      html += "</div>";
    } else {
      html +=
        '<p style="color:var(--text-secondary);margin:16px 0;text-align:center">No transactions on this day.</p>';
    }

    html += `<div class="form-actions" style="margin-top:16px">
      <button class="btn btn-secondary" onclick="App.closeModalDirect();setTimeout(()=>Features.showCalendar(),100)"><i class="fas fa-arrow-left"></i> Calendar</button>
      <button class="btn btn-gradient" onclick="App.closeModalDirect();App.openModal('income')"><i class="fas fa-plus"></i> Add</button>
      <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
    </div>`;
    App.rawModal(html);
  },

  // ==================== SETTINGS ====================
  showSettings() {
    const pc = AppData.user.primaryCurrency;
    App.rawModal(`<h3>⚙️ Settings</h3>
      <div class="form-group"><label>Daily Income (${pc})</label><input id="m-set-inc" type="number" value="${AppData.user.dailyIncome}" step="0.01"></div>
      <div class="form-group"><label>Savings Goal (%)</label><input id="m-set-pct" type="number" value="${AppData.user.savingsGoalPct}" min="1" max="80"></div>
      <div class="form-group"><label>Primary Currency</label>
        <select id="m-set-cur">${["PLN", "EUR", "USD", "GBP", "CHF"].map((c) => `<option ${c === pc ? "selected" : ""}>${c}</option>`).join("")}</select>
      </div>
      <hr style="border-color:var(--border);margin:16px 0">
      <div style="font-size:12px;font-weight:700;margin-bottom:10px">Data Management</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <button class="btn btn-gradient" style="width:100%" onclick="App.exportData()"><i class="fas fa-download"></i> Export All Data</button>
        <button class="btn btn-secondary" style="width:100%" onclick="App.closeModalDirect();App.openModal('importData')"><i class="fas fa-upload"></i> Import Data</button>
        <button class="btn btn-danger" style="width:100%" onclick="App.closeModalDirect();App.resetApp()"><i class="fas fa-trash-alt"></i> Reset Everything</button>
      </div>
      <hr style="border-color:var(--border);margin:16px 0">
      <div style="font-size:10px;color:var(--text-muted);text-align:center">SmygrysSave AI v1.0 · All data stored locally</div>
      <div class="form-actions" style="margin-top:16px">
        <button class="btn btn-gradient" onclick="Features.saveSettings()"><i class="fas fa-save"></i> Save Settings</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button>
      </div>`);
  },

  saveSettings() {
    AppData.user.dailyIncome =
      parseFloat(document.getElementById("m-set-inc").value) || 0;
    AppData.user.savingsGoalPct = Math.min(
      80,
      Math.max(1, parseInt(document.getElementById("m-set-pct").value) || 20),
    );
    AppData.user.primaryCurrency = document.getElementById("m-set-cur").value;
    AppData.save();
    App.closeModalDirect();
    App.renderAll();
    App.generateNotifications();
    AI.addMessage(
      "bot",
      `⚙️ Settings saved. Daily income: <strong>${AppData.user.dailyIncome} ${AppData.user.primaryCurrency}</strong>, Savings goal: <strong>${AppData.user.savingsGoalPct}%</strong>.`,
    );
  },

  // ==================== BUDGET CALCULATOR ====================
  showBudgetCalculator() {
    const pc = AppData.user.primaryCurrency;
    App.rawModal(`<h3>📋 Budget Calculator</h3>
      <div class="form-group"><label>Monthly Income (${pc})</label><input id="m-bud-inc" type="number" value="${AppData.user.dailyIncome * 30}" step="0.01"></div>
      <div class="form-group"><label>Savings Goal (%)</label><input id="m-bud-pct" type="number" value="${AppData.user.savingsGoalPct}" min="0" max="100"></div>
      <div id="bud-result"></div>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="Features.calcBudget()"><i class="fas fa-calculator"></i> Calculate</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Close</button>
      </div>`);
  },

  calcBudget() {
    const inc = parseFloat(document.getElementById("m-bud-inc").value) || 0;
    const pct = Math.min(
      100,
      Math.max(0, parseInt(document.getElementById("m-bud-pct").value) || 20),
    );
    const pc = AppData.user.primaryCurrency;
    const needsPct = Math.max(0, 100 - pct - 30);
    const needs = (inc * needsPct) / 100;
    const wants = inc * 0.3;
    const savings = (inc * pct) / 100;
    const daily = inc / 30;
    const weekly = inc / 4.33;

    document.getElementById("bud-result").innerHTML = `
      <div style="padding:16px;background:var(--bg-input);border-radius:12px;border:1px solid var(--border);margin-top:16px">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px">Monthly Budget Breakdown</div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:12px;border-bottom:1px solid var(--border)">
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--green);margin-right:6px"></span>Needs (${needsPct}%)</span>
          <strong>${AppData.formatMoney(needs, pc)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:12px;border-bottom:1px solid var(--border)">
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--blue);margin-right:6px"></span>Wants (30%)</span>
          <strong>${AppData.formatMoney(wants, pc)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:12px;border-bottom:1px solid var(--border)">
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--purple);margin-right:6px"></span>Savings (${pct}%)</span>
          <strong>${AppData.formatMoney(savings, pc)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:13px;font-weight:800;margin-top:4px">
          <span>Total</span><span>${AppData.formatMoney(inc, pc)}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
        <div style="padding:10px;background:var(--bg-input);border-radius:8px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:9px;color:var(--text-muted)">Daily Budget</div>
          <div style="font-size:14px;font-weight:700">${AppData.formatMoney(daily, pc)}</div>
        </div>
        <div style="padding:10px;background:var(--bg-input);border-radius:8px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:9px;color:var(--text-muted)">Weekly Budget</div>
          <div style="font-size:14px;font-weight:700">${AppData.formatMoney(weekly, pc)}</div>
        </div>
      </div>`;
  },

  // ==================== EXPORT / IMPORT ====================
  exportData() {
    const data = {
      exportDate: new Date().toISOString(),
      app: "SmygrysSave AI",
      version: "1.0",
      user: AppData.user,
      accounts: AppData.accounts,
      goals: AppData.goals,
      transactions: AppData.transactions,
      recurringPayments: App.recurringPayments,
      wishlistItems: App.wishlistItems,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `smygryssave-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    AI.addMessage(
      "bot",
      "📥 Data exported successfully! Check your downloads folder.",
    );
  },

  showImport() {
    App.rawModal(`<h3>📤 Import Data</h3>
      <p style="color:var(--text-secondary);font-size:12px;margin-bottom:16px">Select a SmygrysSave AI export file (.json) to restore your data. This will merge with existing data.</p>
      <div class="form-group">
        <label>Select File</label>
        <input type="file" accept=".json" id="import-file-input" style="width:100%;padding:10px;background:var(--bg-input);border:1px solid var(--border);border-radius:10px;color:var(--text);font-size:12px">
      </div>
      <div class="form-actions">
        <button class="btn btn-gradient" onclick="Features.doImport()"><i class="fas fa-upload"></i> Import</button>
        <button class="btn btn-secondary" onclick="App.closeModalDirect()">Cancel</button>
      </div>`);
  },

  doImport() {
    const input = document.getElementById("import-file-input");
    if (!input || !input.files[0]) return alert("Select a file first.");
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const d = JSON.parse(e.target.result);
        if (d.accounts) AppData.accounts = d.accounts;
        if (d.goals) AppData.goals = d.goals;
        if (d.transactions) AppData.transactions = d.transactions;
        if (d.user) Object.assign(AppData.user, d.user);
        if (d.recurringPayments) App.recurringPayments = d.recurringPayments;
        if (d.wishlistItems) App.wishlistItems = d.wishlistItems;
        // Fix ID counters
        AppData._nextAccId =
          Math.max(
            AppData._nextAccId,
            ...AppData.accounts.map(
              (a) => parseInt(a.id.replace("acc-", "")) || 0,
            ),
          ) + 1;
        AppData._nextGoalId =
          Math.max(
            AppData._nextGoalId,
            ...AppData.goals.map((g) => parseInt(g.id.replace("g-", "")) || 0),
          ) + 1;
        AppData._nextTxId =
          Math.max(
            AppData._nextTxId,
            ...AppData.transactions.map(
              (t) => parseInt(t.id.replace("tx-", "")) || 0,
            ),
          ) + 1;
        AppData.recalcTotals();
        AppData.save();
        App.saveExtras();
        App.closeModalDirect();
        App.afterDataChange();
        AI.addMessage(
          "bot",
          `📤 Data imported! ${d.accounts?.length || 0} accounts, ${d.transactions?.length || 0} transactions, ${d.goals?.length || 0} goals.`,
        );
      } catch (err) {
        alert("Invalid file format. Use a SmygrysSave AI export.");
      }
    };
    reader.readAsText(input.files[0]);
  },

  // ==================== PREDICTIONS ====================
  showPredictions() {
    const ctx = AppData.getFinancialContext();
    AI.action("budget");
  },
};
