# Конфігурація

---

## Конфігураційний об'єкт

[Cast](/ua/cast.md) [Defaults](/ua/defaults.md) [Defined](/ua/defined.md) [Exclude](/ua/exclude.md) [Omit](/ua/omit.md) [Order](/ua/order.md) [Pick](/ua/pick.md) [Rename](/ua/rename.md) [Replace](/ua/replace.md) [Required](/ua/required.md) [Transform](/ua/transform.md)

```js
const configuration = {
  // Приведення типу об'єкта до BOOLEAN, NUMERIC, INTEGER, STRING, JSON
  cast: {},
  // Якщо властивість не має визначеного значення, воно буде замінено значенням з конфігурації
  defaults: {},
  // Якщо в об'єкті визначено властивість - помилка не видається
  defined: [],
  // Видалити з об'єкта перераховані властивості.
  // Застосовується після всіх інших перетворень.
  // Перевизначає `pick`.
  exclude: [],
  // Видалити з об'єкта вказані властивості.
  // Застосовується перед усіма іншими перетвореннями.
  omit: [],
  // Встановлює порядок властивостей в об'єкті
  order: [],
  // Вибирає з об'єкта тільки вказані властивості і ігнорує всі інші властивості
  pick: [],
  // Сортування об’єкта за назвою властивості
  sort: false,
  // Перейменовує властивості і видаляє оригінали
  rename: {},
  // Перевизначає властивості об'єкта
  replace: {},
  // Якщо властивість визначено в об'єкті - помилка не видається
  required: [],
  // Перетворити значення властивості за допомогою функції
  transform: {},
};
```

## Встановити або переписати конфігурацію

```js
const configuration = { cast: { id: "integer" }, };
// Передача конфігурації в конструктор
const serializer = new Vicis(configuration);
// Альтернатива - Vicis.factory(configuration)
// Ви можете змінити конфігурацію стільки раз, скільки захочете
serializer.config(configuration);
```

## Приклад декількох версій API

```js
// Початковий REST API
const configRestApiVer1 = { cast: { id: "integer" }, };
const serializerRestApiVer1 = new Vicis(configRestApiVer1);
// REST API версії 2
const configRestApiVer2 = serializerRestApiVer1.getConfig();
configRestApiVer2.omit = ["deletedAt"];
const serializerRestApiVer2 = new Vicis(configRestApiVer2);
// REST API версії 3
const configRestApiVer3 = serializerRestApiVer1.getConfig();
const omitList = ["createdAt", "updatedAt", "deletedAt"];
configRestApiVer3.omit = configRestApiVer3.omit.concat(omitList);
const serializerRestApiVer3 = new Vicis(configRestApiVer3);
```

## Приклад ланцюга викликів

```js
const serializer = new Vicis();
serializer
  .defaults({ registered: true })
  .omit(["password"])
  .exclude([/^(?:_)(?:_)?/])
  .rename({ _id: "id" });
```

```js
const serializer = Vicis.factory();
const omitList = ["password"];
if (omitList.length > 0) {
  serializer.omit(omitList);
}
```

---
