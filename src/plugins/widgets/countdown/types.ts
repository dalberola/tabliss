import { API } from "../../types";

export type Entry = {
  id: string;
  label: string;
  timestamp: number | null;
  createdAt?: number;
};

type Data = {
  entries: Entry[];
};

export type Props = API<Data>;

export const defaultData: Data = {
  entries: [],
};
