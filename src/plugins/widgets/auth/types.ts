import { API } from "../../types";

/** How the sync status is shown on the dashboard. */
export type AuthDisplay = "full" | "icon" | "hidden";

// The account session lives in the app-level AuthContext, not in per-widget
// data. The only thing this widget persists is how its status is displayed.
export interface Data {
  display: AuthDisplay;
}

export type Props = API<Data>;

export const defaultData: Data = {
  display: "icon",
};
