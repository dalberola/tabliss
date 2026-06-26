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
});
