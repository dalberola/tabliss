import { defineMessages } from "react-intl";

// Dashboard-tile strings only. The settings panel is intentionally not
// translated, matching the rest of Tabliss (see TRANSLATING.md).
export const messages = defineMessages({
  synced: {
    id: "plugin.auth.synced",
    defaultMessage: "Synced",
    description: "Sync status shown on the dashboard when signed in",
  },
  syncedWithEmail: {
    id: "plugin.auth.syncedWithEmail",
    defaultMessage: "Synced · {email}",
    description: "Sync status with the account email appended",
  },
  notSignedIn: {
    id: "plugin.auth.notSignedIn",
    defaultMessage: "Not signed in",
    description: "Sync status shown on the dashboard when signed out",
  },
  checking: {
    id: "plugin.auth.checking",
    defaultMessage: "Checking sign-in…",
    description: "Sync status shown while the session is being restored",
  },
});
