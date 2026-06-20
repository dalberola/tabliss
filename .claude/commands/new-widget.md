Scaffold a new Tabliss widget plugin named $ARGUMENTS.

## Steps

1. **Derive names** from the argument:
   - `camelCase` for the directory name and import identifier (e.g. `myWidget`)
   - `PascalCase` for component names (e.g. `MyWidget`)
   - Key: `"widget/<camelCase>"` (e.g. `"widget/myWidget"`)

2. **Create** `src/plugins/widgets/<camelCase>/` with these four files:

**`types.ts`**
```ts
import { API } from "../../types";

type Data = { /* TODO: define widget data shape */ };

export type Props = API<Data>;

export const defaultData: Data = { /* TODO: default values */ };
```

**`<PascalCase>.tsx`**
```tsx
import React, { FC } from "react";
import { Props, defaultData } from "./types";

const <PascalCase>: FC<Props> = ({ data = defaultData }) => (
  <div className="<PascalCase>">
    {/* TODO: render widget */}
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
  key: "widget/<camelCase>",
  name: "<Human readable name>",
  description: "<One-line description of what this widget does>",
  dashboardComponent: lazy(() => import("./<PascalCase>")),
  settingsComponent: lazy(() => import("./<PascalCase>Settings")),
};

export default config;
```

3. **Register** the widget in `src/plugins/widgets/index.ts`:
   - Add `import <camelCase> from "./<camelCase>";` in alphabetical order with the other imports
   - Add `<camelCase>` to the `widgetConfigs` array in alphabetical position

4. **Confirm** the files were created and the import + array entry were added to `index.ts`.

Do not add a `.sass` file unless the user explicitly asks for one. Do not add `reducer.ts`, `actions.ts`, or `api.ts` unless the widget requires async data fetching (ask if unclear).
