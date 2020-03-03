# Сериализация

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

---
