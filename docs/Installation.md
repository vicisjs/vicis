# Installation

----------

```bash
npm install vicis
```

```bash
yarn add vicis
```

----------

**TypeScript definitions**

```typescript
enum TYPES_ENUM {
  BOOLEAN = "boolean",
  NUMERIC = "numeric", // Only finite numbers
  INTEGER = "integer",
  STRING = "string",
  JSON = "json", // Call JSON.stringify on value
}
interface IVicisConfig {
  cast: { [prop: string]: TYPES_ENUM };
  defaults: { [prop: string]: any };
  defined: string[];
  omit: string[];
  pick: string[];
  sort: boolean;
  rename: { [prop: string]: string };
  replace: { [prop: string]: any };
  required: string[];
  transform: { [prop: string]: Function };
}
```

?> TypeScript definition file are included in npm package

----------
