export const GA_TRACKING_ID = "G-HBN5S9YF1S";

// Track events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track specific button events
export const trackButtonClick = (screenName, buttonName) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "click", {
      event_category: "button",
      event_label: `${screenName} - ${buttonName}`,
      screen_name: screenName,
      button_name: buttonName,
    });
  }
};
