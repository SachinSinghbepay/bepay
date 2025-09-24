// src/services/analyticsService.js
import mixpanel from "mixpanel-browser";
import { v4 as uuidv4 } from 'uuid'; // Make sure you have installed uuid: npm install uuid

export class AnalyticsService {
  static isInitialized = false;

  static init(mixpanelToken) {
    if (!mixpanelToken || this.isInitialized) return;

    mixpanel.init(mixpanelToken, {
      debug: process.env.NODE_ENV !== "production",
      persistence: "localStorage",
      autotrack: false,
    });

    this.isInitialized = true;
    console.log("Mixpanel Initialized");

    
  }

  /**
   * Starts a new session if one doesn't exist in sessionStorage,
   * or resumes the existing one.
   */
  static startSession() {
    const existingSessionId = sessionStorage.getItem("sessionId");
    if (!existingSessionId) {
      const sessionId = uuidv4();
      const sessionStartTime = new Date().getTime();
      sessionStorage.setItem("sessionId", sessionId);
      sessionStorage.setItem("sessionStartTime", sessionStartTime);
      console.log(`[Analytics] New Session Started: ${sessionId}`);
    } else {
      console.log(`[Analytics] Session Resumed: ${existingSessionId}`);
    }
  }

  /**
   * Retrieves the current session ID and start time from sessionStorage.
   */
  static getSessionData() {
    const sessionId = sessionStorage.getItem("sessionId");
    const sessionStartTime = sessionStorage.getItem("sessionStartTime");
    return { sessionId, sessionStartTime };
  }

  static getDistinctId() {
    try {
      const distinctId = mixpanel.get_distinct_id();
      return distinctId;
    } catch (err) {
      console.error("err", err);
      return null;
    }
  }
  static createWaitlistUser(email, extraData = {}) {
  const distinctId = mixpanel.get_distinct_id() || email; // fallback to email if no ID

  // 1. Identify this user with distinct_id
  mixpanel.identify(distinctId);

  // 2. Create / update their Mixpanel People profile (Users tab)
  mixpanel.people.set({
    $email: email,                        // reserved property
    created_at: new Date().toISOString(), // join timestamp
    source: "waitlist",                       
  });

  console.log(`[Analytics] Waitlist user created: ${email}, distinctId: ${distinctId}`);
}


  /**
   * Tracks an event and automatically includes the sessionId.
   * @param {string} eventName - The name of the event.
   * @param {object} params - Additional properties for the event.
   */
  static async sendEvent(eventName, params = {}) {
    if (!this.isInitialized) {
      console.warn("Analytics not initialized yet. Event dropped:", eventName);
      return;
    }

    var distinctId = await mixpanel?.get_distinct_id();

    const { sessionId } = this.getSessionData();
    const eventProperties = {
      ...params,
      sessionId: sessionId,
    };

    this.checkcampaignId()

    console.log(`[Analytics Event]: ${eventName}`, eventProperties);
    mixpanel.track(eventName, eventProperties);
  }

  static checkcampaignId() {
    const campaignId = localStorage.getItem("campaignId");
    
    if (campaignId) {
      if (mixpanel.get_property("campaignId") !== campaignId) {
        mixpanel.register({ campaignId });
        console.log("✅ campaignId registered:", campaignId);
      }
    } else {
      if (mixpanel.get_property("campaignId")) {
        mixpanel.unregister("campaignId");
        console.log("🗑️ campaignId unregistered");
      }
    }
  }

  

  /**
   * Ends the current session, calculating duration and sending a final event.
   * Uses the reliable `sendBeacon` transport to ensure delivery.
   */
  static endSession() {
    if (!this.isInitialized) return;

    const { sessionId, sessionStartTime } = this.getSessionData();
    if (sessionId && sessionStartTime) {
      const sessionEndTime = new Date().getTime();
      const durationInSeconds = Math.round((sessionEndTime - parseInt(sessionStartTime, 10)) / 1000);

      const eventProperties = {
        sessionId: sessionId,
        sessionDuration_seconds: durationInSeconds,
      };
      

      // Use `sendBeacon` for reliability when the page is closing.
      mixpanel.track("Session End", eventProperties, { transport: 'sendBeacon' });

      // Clean up sessionStorage for the next visit.
      localStorage.removeItem("campaignId");
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("sessionStartTime");
      console.log(`[Analytics] Session End event queued via sendBeacon. Duration: ${durationInSeconds}s`);
    }
  }

  /**
   * Resets the Mixpanel instance on user logout.
   */
  static reset() {
    if (this.isInitialized) {
      mixpanel.reset();
      console.log("Mixpanel instance has been reset.");
    }
  }
}