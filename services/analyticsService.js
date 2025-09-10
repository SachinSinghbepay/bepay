// src/services/analyticsService.js
import mixpanel from 'mixpanel-browser';

export class AnalyticsService {
  static isInitialized = false; // <-- 1. NEW: Add a flag to track initialization
  static currentPage = "";
  static previousPage = "";

  static init(mixpanelToken) {
    if (!mixpanelToken || this.isInitialized) {
      return;
    }
    mixpanel.init(mixpanelToken, {
      debug: process.env.NODE_ENV !== 'production',
      persistence: 'localStorage',
    });
    this.isInitialized = true; // <-- 2. UPDATED: Set the flag to true after init
    console.log("Mixpanel Initialized");
  }

  static setCurrentPage(path) {
    this.previousPage = this.currentPage;
    this.currentPage = path;
  }

  static sendEvent(eventName, params = {}) {
    // <-- 3. NEW: Add a check to prevent sending events before initialization
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
}