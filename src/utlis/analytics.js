"use client";
export const trackEvent = (action, screen_name, event_name) => {
  // Check if we're in the browser and gtag is available
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    console.log("Tracking event:", { action, screen_name, event_name }); // Debug log

    window.gtag("event", action, {
      screen_name: screen_name,
      event_name: event_name,
      custom_parameter_1: "button_click",
    });
  } else {
    console.log("gtag not available yet, queuing event:", {
      action,
      screen_name,
      event_name,
    });

    // Queue the event if gtag isn't ready yet
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "custom_event",
      event_action: action,
      screen_name: screen_name,
      event_name: event_name,
    });
  }
};

// Alternative method using dataLayer directly (more reliable)
export const trackEventDataLayer = (action, screen_name, event_name) => {
  if (typeof window !== "undefined") {
    console.log("Tracking event via dataLayer:", {
      action,
      screen_name,
      event_name,
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "custom_button_click",
      event_action: action,
      screen_name: screen_name,
      event_name: event_name,
      custom_parameter_1: "button_click",
    });
  }
};
