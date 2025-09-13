// src/services/analyticsService.js
import mixpanel from "mixpanel-browser";

export class AnalyticsService {
  static isInitialized = false;
  static currentPage = "";
  static previousPage = "";

  static init(mixpanelToken) {
    if (!mixpanelToken || this.isInitialized) return;

    mixpanel.init(mixpanelToken, {
      debug: process.env.NODE_ENV !== "production",
      persistence: "localStorage",
    });

    this.isInitialized = true;
    console.log("Mixpanel Initialized");
  }

  static setCurrentPage(path) {
    this.previousPage = this.currentPage;
    this.currentPage = path;
  }

  static sendEvent(eventName, params = {}) {
    if (!this.isInitialized) {
      console.warn("Analytics not initialized yet. Event dropped:", eventName);
      return;
    }

    const eventProperties = {
      ...params,
      currentPage: this.currentPage,
      previousPage: this.previousPage,
    };
    console.log(`[Analytics Event]: ${eventName}`, eventProperties);
    mixpanel.track(eventName, eventProperties);
  }

  // ✅ Reset when user logs out (optional)
  static resetSessionEvents() {
    this.firedEvents.clear();
    sessionStorage.removeItem("firedEvents");
  }
}
