// ==================== FEATURES CONFIGURATION ====================
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
  }
}

// Disable Tags UI
document.addEventListener("DOMContentLoaded", () => {
  const tagsGroup = document.getElementById("tagsFormGroup");
  if (tagsGroup) tagsGroup.style.display = "none";
});
