# Установка

---

## NPM

```bash
npm install vicis
```

## Deno `importmap.json`

### Inline

```javascript
import { Vicis } from "https://deno.land/x/vicis/mod.ts";
```

### "importmap.json"

#### GitHub

```json
{
  "imports": {
    "vicis": "https://raw.githubusercontent.com/r37r0m0d3l/deno-vicis/master/mod.ts"
  }
}
```

#### DenoLand

```json
{
  "imports": {
    "vicis": "https://deno.land/x/vicis/mod.ts"
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

?> TypeScript definition находиться в npm пакете

---
