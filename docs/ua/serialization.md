# Серіалізация

---

```js
const genericDefaultConfig = { /* ... */ };
const databaseModel = {
  id: "1234",
  ok: undefined,
  hidden: "",
  domain: "main",
  date: "2017-10-15",
};
const response = Vicis.factory(/* ...configuration, ...data */)
  .config(genericDefaultConfig)
  .sort(true)
  .cast({ id: "integer" })
  .defined(["ok"])
  .defaults({ ok: true })
  .exclude([/^(?:_)(?:_)?/])
  .omit(["hidden"])
  .order(["ID", "ok"])
  .pick(["date", "domain", "ID", "ok"])
  .rename({ id: "ID" })
  .replace({ domain: "secondary" })
  .required(["id"])
  .transform({ date: (value) => new Date(value) })
  .data(databaseModel)
  .toJSON();
```

Декоратори

[Vicis Decorators Plugin](https://github.com/r37r0m0d3l/vicis-decorators)

```typescript
import { Vicis } from "vicis";
import { defined, exclude, Serialize, serialize } from "@vicis/decorators";

@Serialize({
  pick: ["id", "login"]
})
class MyClass {
  @serialize({
    cast: Vicis.INTEGER,
    required: true,
  })
  protected id: number | string;
  @defined
  protected login: string;
  @exclude
  protected password: string;
}
```

---
