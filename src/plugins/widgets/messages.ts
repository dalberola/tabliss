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
});
