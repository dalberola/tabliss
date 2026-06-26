import { defineMessages } from "react-intl";

// Strings for the global settings panel (System / Settings / Persist). Other
// settings areas (background, per-widget panels) are localized separately.
export const messages = defineMessages({
  language: {
    id: "settings.language",
    defaultMessage: "Language",
    description: "Language selector label",
  },
  timeZone: {
    id: "settings.timeZone",
    defaultMessage: "Time Zone",
    description: "Time zone selector label",
  },
  opacity: {
    id: "settings.opacity",
    defaultMessage: "Opacity",
    description: "Sidebar opacity slider label",
  },
  manage: {
    id: "settings.manage",
    defaultMessage:
      "<importLink>Import</importLink>, <exportLink>export</exportLink> or <resetLink>reset</resetLink> your settings",
    description:
      "Sentence with links to import, export or reset all settings",
  },
  resetConfirm: {
    id: "settings.resetConfirm",
    defaultMessage:
      "Are you sure you want to delete all of your Tabliss settings? This cannot be undone.",
    description: "Confirmation before resetting all settings",
  },
  importError: {
    id: "settings.importError",
    defaultMessage: "Invalid import file: {error}",
    description: "Alert shown when an imported settings file cannot be read",
  },
  unknownError: {
    id: "settings.unknownError",
    defaultMessage: "Unknown error",
    description: "Fallback when an error has no message",
  },
  support: {
    id: "settings.support",
    defaultMessage: "Support Tabliss",
    description: "Heading of the support/donate section",
  },
  donateTitle: {
    id: "settings.donateTitle",
    defaultMessage: "I do love coffee",
    description: "Tooltip on the donate button",
  },
  donate: {
    id: "settings.donate",
    defaultMessage: "Donate a coffee 😍",
    description: "Donate button label",
  },
  website: {
    id: "settings.website",
    defaultMessage: "Website",
    description: "Link to the Tabliss website",
  },
  persistTitle: {
    id: "settings.persistTitle",
    defaultMessage: "Persist Settings",
    description: "Heading and button for opting in to persistent storage",
  },
  persistPrompt: {
    id: "settings.persistPrompt",
    defaultMessage:
      "Would you like Tabliss to ask your browser to save your settings permanently?",
    description: "Prompt to enable persistent storage",
  },
  persistError: {
    id: "settings.persistError",
    defaultMessage: "Could not persist settings at this time.",
    description: "Shown when persistent storage could not be enabled",
  },
});
