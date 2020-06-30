# Встановлення

---

```bash
npm install vicis
```

```bash
yarn add vicis
```

---

## TypeScript definitions

```typescript
enum CAST_TYPE {
  BOOLEAN = "boolean",
  NUMERIC = "numeric", // Тільки скінченні числа
  INTEGER = "integer",
  STRING = "string",
  JSON = "json", // Перетворює в JSON
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

?> TypeScript definition знаходиться в npm пакеті

---
