# Examples

----------

**Full example**

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
  .sort(true) // sorting object by property name
  .cast({ id: "integer" })
  .defined(["ok"])
  .defaults({ ok: true })
  .omit(["hidden"])
  .pick(["date", "domain", "ID", "ok"])
  .rename({ id: "ID" })
  .replace({ domain: "secondary" })
  .required(["id"])
  .transform({ date: (value) => new Date(value) })
  .data(databaseModel)
  .toJSON();
```

**Express framework in example**

```js
app.get("/", (req, res) => res.json(response))
```

----------

**Collection example**

```js
const arrayOfModels = MongooseUserModel.find({ age: { $gte: 18 }});
const configuration = { sort: true };
const serializer = Vicis.factory(configuration);
const response = serializer.fromArray(arrayOfModels);
```

**Express framework in example**

```js
app.get("/", (req, res) => res.json(response))
```

----------
