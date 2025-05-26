export const trackEvent = (action, screen_name, event_name) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      screen_name: screen_name,
      event_name: event_name,
      custom_parameter_1: "button_click", // You can add more custom parameters as needed
    });
  }
};
