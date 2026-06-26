import { API } from "../../types";

// The account session lives in the app-level AuthContext, not in per-widget
// data, so this widget persists nothing of its own.
export type Data = Record<string, never>;

export type Props = API<Data>;

export const defaultData: Data = {};
