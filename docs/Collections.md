# Collections

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
