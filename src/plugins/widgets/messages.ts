import { defineMessages } from "react-intl";

// Shared strings for the built-in widget settings panels. Added to per batch as
// widgets are localized.
export const messages = defineMessages({
  // Shared
  name: { id: "widget.name", defaultMessage: "Name" },
  optionalName: {
    id: "widget.optionalName",
    defaultMessage: "Optional name",
    description: "Placeholder for an optional widget name",
  },
  timeZone: { id: "widget.timeZone", defaultMessage: "Time Zone" },
  poweredBy: {
    id: "widget.poweredBy",
    defaultMessage: "Powered by {service}",
    description: "Attribution line; {service} is a link to the data source",
  },
  category: { id: "widget.category", defaultMessage: "Category" },
  every5Minutes: {
    id: "widget.every5Minutes",
    defaultMessage: "Every 5 minutes",
  },
  every15Minutes: {
    id: "widget.every15Minutes",
    defaultMessage: "Every 15 minutes",
  },
  everyHour: { id: "widget.everyHour", defaultMessage: "Every hour" },
  everyDay: { id: "widget.everyDay", defaultMessage: "Every day" },
  everyWeek: { id: "widget.everyWeek", defaultMessage: "Every week" },

  // Time
  timeAnalogue: { id: "widget.time.analogue", defaultMessage: "Analogue" },
  timeDigital12: {
    id: "widget.time.digital12",
    defaultMessage: "12-hour digital",
  },
  timeDigital24: {
    id: "widget.time.digital24",
    defaultMessage: "24-hour digital",
  },
  timeShowSeconds: {
    id: "widget.time.showSeconds",
    defaultMessage: "Display seconds",
  },
  timeShowMinutes: {
    id: "widget.time.showMinutes",
    defaultMessage: "Display minutes",
  },
  timeShowDayPeriod: {
    id: "widget.time.showDayPeriod",
    defaultMessage: "Display day period",
  },
  timeShowDate: { id: "widget.time.showDate", defaultMessage: "Display date" },

  // Todo
  todoTasksToShow: {
    id: "widget.todo.tasksToShow",
    defaultMessage: "Tasks to show",
  },
  todoTasksPlaceholder: {
    id: "widget.todo.tasksPlaceholder",
    defaultMessage: "Number of todo items to show",
  },
  todoKeybind: {
    id: "widget.todo.keybind",
    defaultMessage: "New task keybind",
  },

  // Message
  messageLabel: { id: "widget.message.label", defaultMessage: "Message" },

  // Quote
  quoteDaily: { id: "widget.quote.daily", defaultMessage: "Daily Quotes" },
  quoteHourly: { id: "widget.quote.hourly", defaultMessage: "Hourly Quotes" },

  // Countdown
  countdownEventName: {
    id: "widget.countdown.eventName",
    defaultMessage: "Event name",
  },
  countdownRemove: {
    id: "widget.countdown.remove",
    defaultMessage: "Remove event",
  },
  countdownAdd: { id: "widget.countdown.add", defaultMessage: "Add event" },

  // Joke
  jokeDaily: { id: "widget.joke.daily", defaultMessage: "Daily Joke" },
  jokeShowNew: {
    id: "widget.joke.showNew",
    defaultMessage: "Show a new joke",
  },

  // CSS / JS snippets
  cssSnippet: { id: "widget.css.snippet", defaultMessage: "CSS Snippet" },
  cssWarning: {
    id: "widget.css.warning",
    defaultMessage:
      "Warning: this functionality is intended for advanced users. Custom styles may break at any time.",
  },
  jsSnippet: {
    id: "widget.js.snippet",
    defaultMessage: "JavaScript Snippet",
  },
  jsApply: { id: "widget.js.apply", defaultMessage: "Apply" },
  jsWarning: {
    id: "widget.js.warning",
    defaultMessage:
      "Warning: this functionality is intended for advanced users. Custom scripts may break at any time. The snippet will run once after the dashboard has loaded. Be careful of persisting event listeners when editing the snippet.",
  },

  // IP Info
  ipDisplayCity: {
    id: "widget.ipInfo.displayCity",
    defaultMessage: "Display City",
  },
  ipDisplayCountry: {
    id: "widget.ipInfo.displayCountry",
    defaultMessage: "Display Country",
  },

  // NBA
  nbaDisplayLogo: {
    id: "widget.nba.displayLogo",
    defaultMessage: "Display team logo",
  },

  // Literature Clock
  litShowBookAuthor: {
    id: "widget.literatureClock.showBookAuthor",
    defaultMessage: "Display book and author",
  },
  litCenterText: {
    id: "widget.literatureClock.centerText",
    defaultMessage: "Align text at center",
  },

  // Work Hours
  workStartTime: {
    id: "widget.workHours.startTime",
    defaultMessage: "Start time",
  },
  workEndTime: {
    id: "widget.workHours.endTime",
    defaultMessage: "End time",
  },
  daySunday: { id: "widget.day.sunday", defaultMessage: "Sunday" },
  dayMonday: { id: "widget.day.monday", defaultMessage: "Monday" },
  dayTuesday: { id: "widget.day.tuesday", defaultMessage: "Tuesday" },
  dayWednesday: { id: "widget.day.wednesday", defaultMessage: "Wednesday" },
  dayThursday: { id: "widget.day.thursday", defaultMessage: "Thursday" },
  dayFriday: { id: "widget.day.friday", defaultMessage: "Friday" },
  daySaturday: { id: "widget.day.saturday", defaultMessage: "Saturday" },

  // Search
  searchProvider: {
    id: "widget.search.provider",
    defaultMessage: "Search Provider",
  },
  searchSuggestionsProvider: {
    id: "widget.search.suggestionsProvider",
    defaultMessage: "Suggestions Provider",
  },
  searchOff: { id: "widget.search.off", defaultMessage: "Off" },
  searchSuggestionQuantity: {
    id: "widget.search.suggestionQuantity",
    defaultMessage: "Suggestion Quantity",
  },

  // GitHub
  githubUsername: {
    id: "widget.github.username",
    defaultMessage: "GitHub Username",
  },

  // Links
  linksColumns: {
    id: "widget.links.columns",
    defaultMessage: "Number of columns",
  },
  linksAlwaysVisible: {
    id: "widget.links.alwaysVisible",
    defaultMessage: "Links are always visible",
  },
  linksNewTab: {
    id: "widget.links.newTab",
    defaultMessage: "Links open in a new tab",
  },
  linksAdd: { id: "widget.links.add", defaultMessage: "Add link" },
  linkRemove: { id: "widget.links.remove", defaultMessage: "Remove link" },
  linkMoveDown: {
    id: "widget.links.moveDown",
    defaultMessage: "Move link down",
  },
  linkMoveUp: { id: "widget.links.moveUp", defaultMessage: "Move link up" },
  linkShortcutN: {
    id: "widget.links.shortcutN",
    defaultMessage: "Keyboard shortcut {number}",
  },
  linkShortcut: {
    id: "widget.links.shortcut",
    defaultMessage: "Shortcut",
  },
  linkUrl: { id: "widget.links.url", defaultMessage: "URL" },
  optional: {
    id: "widget.optional",
    defaultMessage: "(optional)",
    description: "Suffix marking an optional field",
  },
  linkIcon: { id: "widget.links.icon", defaultMessage: "Icon" },
  linkIconNone: { id: "widget.links.iconNone", defaultMessage: "None" },
  linkIconWebsite: {
    id: "widget.links.iconWebsite",
    defaultMessage: "Website Icon",
  },

  // Weather
  weatherShowDetails: {
    id: "widget.weather.showDetails",
    defaultMessage: "Show extended details",
  },
  weatherMetric: {
    id: "widget.weather.metric",
    defaultMessage: "Metric units",
  },
  weatherImperial: {
    id: "widget.weather.imperial",
    defaultMessage: "Imperial units",
  },
  weatherAttribution: {
    id: "widget.weather.attribution",
    defaultMessage: "Weather data by Open-Meteo.com",
  },
  weatherSearchCity: {
    id: "widget.weather.searchCity",
    defaultMessage: "Search for city",
  },
  weatherCityPlaceholder: {
    id: "widget.weather.cityPlaceholder",
    defaultMessage: "City or location",
  },
  weatherLatitude: {
    id: "widget.weather.latitude",
    defaultMessage: "Latitude",
  },
  weatherLongitude: {
    id: "widget.weather.longitude",
    defaultMessage: "Longitude",
  },
  weatherEnterCoordinates: {
    id: "widget.weather.enterCoordinates",
    defaultMessage: "Enter coordinates",
  },
  weatherLocateError: {
    id: "widget.weather.locateError",
    defaultMessage: "Cannot determine your location: {error}",
  },

  // Auth
  authDashboardDisplay: {
    id: "widget.auth.dashboardDisplay",
    defaultMessage: "Dashboard display",
  },
  authDisplayIcon: { id: "widget.auth.displayIcon", defaultMessage: "Icon" },
  authDisplayFull: {
    id: "widget.auth.displayFull",
    defaultMessage: "Full text",
  },
  authDisplayHidden: {
    id: "widget.auth.displayHidden",
    defaultMessage: "Hidden",
  },
  authDeleteFailed: {
    id: "widget.auth.deleteFailed",
    defaultMessage: "Could not delete the account.",
  },
  authLoading: { id: "widget.auth.loading", defaultMessage: "Loading…" },
  authSignedIn: {
    id: "widget.auth.signedIn",
    defaultMessage:
      "Signed in. Your settings sync automatically across devices.",
  },
  authSignedInAs: {
    id: "widget.auth.signedInAs",
    defaultMessage:
      "Signed in as {email}. Your settings sync automatically across devices.",
  },
  authLastSynced: {
    id: "widget.auth.lastSynced",
    defaultMessage: "Last synced {time}",
  },
  authLogOut: { id: "widget.auth.logOut", defaultMessage: "Log out" },
  authDeleteAccount: {
    id: "widget.auth.deleteAccount",
    defaultMessage: "Delete account",
  },
  authDeleteWarning: {
    id: "widget.auth.deleteWarning",
    defaultMessage:
      "This permanently deletes your account and the settings synced to it. This cannot be undone. Your dashboard stays on this device.",
  },
  authCancel: { id: "widget.auth.cancel", defaultMessage: "Cancel" },
  authConfirmDelete: {
    id: "widget.auth.confirmDelete",
    defaultMessage: "Yes, delete",
  },
  authVerifyNotice: {
    id: "widget.auth.verifyNotice",
    defaultMessage: "Check your email to verify your account, then log in.",
  },
  authGenericError: {
    id: "widget.auth.genericError",
    defaultMessage: "Something went wrong.",
  },
  authIntro: {
    id: "widget.auth.intro",
    defaultMessage: "Sign in to save your dashboard and sync it across devices.",
  },
  authLogIn: { id: "widget.auth.logIn", defaultMessage: "Log in" },
  authCreateAccount: {
    id: "widget.auth.createAccount",
    defaultMessage: "Create account",
  },
  authEmail: { id: "widget.auth.email", defaultMessage: "Email" },
  authPassword: { id: "widget.auth.password", defaultMessage: "Password" },
  authAccept: {
    id: "widget.auth.accept",
    defaultMessage:
      "I accept the <terms>Terms</terms> and <privacy>Privacy Policy</privacy>",
  },
  authPasswordHint: {
    id: "widget.auth.passwordHint",
    defaultMessage: "Password must be at least 12 characters.",
  },
});
