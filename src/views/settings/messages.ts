import { defineMessages } from "react-intl";

// Strings for the global settings panel (System / Settings / Persist). Other
// settings areas (background, per-widget panels) are localized separately.
export const messages = defineMessages({
  accountSync: {
    id: "settings.accountSync",
    defaultMessage: "Account Sync",
    description: "Heading of the account sync (sign in) settings section",
  },
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

  // Background & widget display/font settings (stage 2)
  displaySettings: {
    id: "settings.displaySettings",
    defaultMessage: "Display Settings",
    description: "Collapsible section name for display settings",
  },
  fontSettings: {
    id: "settings.fontSettings",
    defaultMessage: "Font Settings",
    description: "Collapsible section name for font settings",
  },
  blur: {
    id: "settings.blur",
    defaultMessage: "Blur",
    description: "Background blur slider label",
  },
  luminosity: {
    id: "settings.luminosity",
    defaultMessage: "Luminosity",
    description: "Background luminosity slider label",
  },
  darken: {
    id: "settings.darken",
    defaultMessage: "Darken",
    description: "Luminosity slider min marker",
  },
  lighten: {
    id: "settings.lighten",
    defaultMessage: "Lighten",
    description: "Luminosity slider max marker",
  },
  removeWidget: {
    id: "settings.removeWidget",
    defaultMessage: "Remove widget",
    description: "Tooltip on the remove-widget button",
  },
  editWidgetSettings: {
    id: "settings.editWidgetSettings",
    defaultMessage: "Edit widget settings",
    description: "Tooltip to open a widget's settings",
  },
  closeWidgetSettings: {
    id: "settings.closeWidgetSettings",
    defaultMessage: "Close widget settings",
    description: "Tooltip to close a widget's settings",
  },
  moveWidgetUp: {
    id: "settings.moveWidgetUp",
    defaultMessage: "Move widget up",
    description: "Tooltip to reorder a widget up",
  },
  moveWidgetDown: {
    id: "settings.moveWidgetDown",
    defaultMessage: "Move widget down",
    description: "Tooltip to reorder a widget down",
  },
  font: {
    id: "settings.font",
    defaultMessage: "Font",
    description: "Font family selector label",
  },
  fontDefault: {
    id: "settings.fontDefault",
    defaultMessage: "Default",
    description: "Default option for font family and weight",
  },
  weight: {
    id: "settings.weight",
    defaultMessage: "Weight",
    description: "Font weight selector label",
  },
  weightThin: { id: "settings.weightThin", defaultMessage: "Thin" },
  weightLight: { id: "settings.weightLight", defaultMessage: "Light" },
  weightRegular: { id: "settings.weightRegular", defaultMessage: "Regular" },
  weightMedium: { id: "settings.weightMedium", defaultMessage: "Medium" },
  weightBold: { id: "settings.weightBold", defaultMessage: "Bold" },
  weightBlack: { id: "settings.weightBlack", defaultMessage: "Black" },
  colour: {
    id: "settings.colour",
    defaultMessage: "Colour",
    description: "Widget text colour label",
  },
  size: {
    id: "settings.size",
    defaultMessage: "Size",
    description: "Widget size slider label",
  },
  toggleOpen: {
    id: "settings.toggleOpen",
    defaultMessage: "Open {name}",
    description: "Link to expand a collapsible settings section",
  },
  toggleClose: {
    id: "settings.toggleClose",
    defaultMessage: "Close {name}",
    description: "Link to collapse a collapsible settings section",
  },
});
