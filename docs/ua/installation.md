# Встановлення

---

## NPM

```bash
npm install vicis
```

## Deno `importmap.json`

Import from URL.

```typescript
// From URL
import { Vicis } from "https://deno.land/x/vicis/mod.ts";
// Bundled from URL
import { Vicis } from "https://deno.land/x/vicis/vicis.bundle.js";
```

Import from "importmap.json"

```json
{
  "imports": {
    "vicis": "https://deno.land/x/vicis/mod.ts"
  }
}
```

```typescript
import { Vicis } from "vicis";
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
interface IConfig {
  cast?: { [prop: string]: CAST_TYPE };
  defaults?: { [prop: string]: any };
  defined?: string[];
  exclude?: Array<string|RegExp>;
  nullish?: { [prop: string]: any };
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

?> TypeScript definition знаходиться в npm пакеті

---
