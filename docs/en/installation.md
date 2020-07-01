# Installation

---

## NPM

```bash
npm install vicis
```

## Deno `importmap.json`

```json
{
  "imports": {
    "vicis": "https://raw.githubusercontent.com/r37r0m0d3l/deno-vicis/master/mod.ts"
  }
}
```

```bash
deno run --importmap=importmap.json --unstable your-script.js
```

---

## TypeScript definitions

```typescript
enum CAST_TYPE {
  BOOLEAN = "boolean",
  FLAG = "flag",
  NUMERIC = "numeric", // Only finite numbers
  INTEGER = "integer",
  STRING = "string",
  JSON = "json", // Call JSON.stringify on value
}
interface IVicisConfig {
  cast?: { [prop: string]: CAST_TYPE };
  defaults?: { [prop: string]: any };
  defined?: string[];
  exclude?: Array<string|RegExp>;
  omit?: string;
  order?: string[];
  pick?: string[];
  sort?: boolean;
  rename?: { [prop: string]: string };
  replace?: { [prop: string]: any };
  required?: string[];
  transform?: { [prop: string]: (value: any, key: string, data: object) => any | Function };
}
```

?> TypeScript definition file are included in npm package

---
