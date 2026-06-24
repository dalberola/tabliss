Scaffold a new Tabliss background plugin named $ARGUMENTS.

Backgrounds are structured exactly like widgets — see `/new-widget` — but live
under `src/plugins/backgrounds/` and use a `background/` key.

## Steps

1. **Derive names** from the argument:
   - `camelCase` for the directory name and import identifier (e.g. `myBackground`)
   - `PascalCase` for component names (e.g. `MyBackground`)
   - Key: `"background/<camelCase>"` (e.g. `"background/myBackground"`)

2. **Create** `src/plugins/backgrounds/<camelCase>/` with these four files:

**`types.ts`**
```ts
import { API } from "../../types";

type Data = { /* TODO: define background data shape */ };

export type Props = API<Data>;

export const defaultData: Data = { /* TODO: default values */ };
```

**`<PascalCase>.tsx`**
```tsx
import React, { FC } from "react";
import { Props, defaultData } from "./types";

const <PascalCase>: FC<Props> = ({ data = defaultData }) => (
  <div className="<PascalCase>">
    {/* TODO: render full-screen background */}
  </div>
);

export default <PascalCase>;
```

**`<PascalCase>Settings.tsx`**
```tsx
import React, { FC } from "react";
import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const <PascalCase>Settings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="<PascalCase>Settings">
      {/* TODO: settings form */}
    </div>
  );
};

export default <PascalCase>Settings;
```

**`index.ts`**
```ts
import { lazy } from "react";
import { Config } from "../../types";

const config: Config = {
  key: "background/<camelCase>",
  name: "<Human readable name>",
  description: "<One-line description of the background>",
  dashboardComponent: lazy(() => import("./<PascalCase>")),
  settingsComponent: lazy(() => import("./<PascalCase>Settings")),
  // Set `supportsBackdrop: true` if foreground widgets should get a readable
  // backdrop/scrim over this background.
};

export default config;
```

3. **Register** the background in `src/plugins/backgrounds/index.ts`:
   - Add `import <camelCase> from "./<camelCase>";` with the other imports.
   - Add `<camelCase>` to the `backgroundConfigs` array. Order does not matter —
     the array is re-sorted by `name` at the bottom of that file.

4. **Confirm** the files were created and the import + array entry were added.

Do not add a `.sass` file unless the user asks for one. Add `reducer.ts` /
`actions.ts` / `api.ts` only if the background fetches remote data (as the
`unsplash` and `giphy` backgrounds do) — ask if unclear.
