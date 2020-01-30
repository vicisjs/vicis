# Колекції

----------

**Приклад з колекцією**

```js
const arrayOfModels = getArrayOfModelsFromDatabase();
const configuration = { sort: true };
const serializer = Vicis.factory(configuration);
const response = serializer.fromArray(arrayOfModels);
```

----------
