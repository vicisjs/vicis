# Конфігурація Функцією

---

## Конфігурація функцією з мінімальними параметрами

```js
const serializer = new Vicis(function (model) {
  return {
    castToBoolean: model.property_01.boolean,
    castToFlag: model.property_02.flag,
    castToInteger: model.property_03.integer,
    castToNumeric: model.property_04.numeric,
    castToString: model.property_05.string,
    castToJSON: model.property_06.json,
    mustBeDefined: model.property_07.defined,
    mustBeWithValue: model.property_08.required,
    defaultValue: model.property_09.default("no value"),
    transformedValue: model.property_10.transform((value) => value++),
    valueToBeReplaced: model.property_11.replace("Override value"),
    justValue: "You can put here anything",
  };
});

serializer.data(modelFromDatabase).toJSON();
```

```json
{
  "castToBoolean": true,
  "castToFlag": false,
  "castToInteger": 12345,
  "castToNumeric": 123.456,
  "castToString": "Title",
  "castToJSON": { "a": 1 },
  "mustBeDefined": "I'm defined",
  "mustBeWithValue": "Has value",
  "defaultValue": "no value",
  "transformedValue": 2,
  "justValue": "You can put here anything"
}
```

---

## Приклад викликів ланцюжком

```js
const serializer = new Vicis(function (model) {
  return {
    id: model.id.required.integer,
    title: model.title.defined.string,
    active: true,
    rating: model.rating.numeric,
    tested: model.tested.default(false),
  };
});

const modelFromDatabase = {
  id: "12345",
  title: "",
  active: "maybe",
  rating: "3.5",
  tested: undefined,
};

serializer.data(modelFromDatabase).toJSON();
```

```json
{
  "id": 12345,
  "title": "",
  "active": true,
  "rating": 3.5,
  "tested": false
}
```

---
