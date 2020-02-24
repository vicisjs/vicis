# Конфигурация

---

## Конфигурационный объект

[Cast](/ru/cast.md) [Defaults](/ru/defaults.md) [Defined](/ru/defined.md) [Exclude](/ru/exclude.md) [Omit](/ru/omit.md) [Pick](/ru/pick.md) [Rename](/ru/rename.md) [Replace](/ru/replace.md) [Required](/ru/required.md) [Transform](/ru/transform.md)

```js
const configuration = {
  // Приведение типа объекта к BOOLEAN, NUMERIC, INTEGER, STRING, JSON
  cast: {},
  // Если свойство имеет неопределенное значение, оно будет заменено значением из конфигурации
  defaults: {},
  // Если в объекте определено свойство - ошибка не выдается
  defined: [],
  // Удалить из объекта перечисленные свойства.
  // Применяется после всех других преобразований.
  // Переопределяет `pick`.
  exclude: [],
  // Удалить из объекта перечисленные свойства.
  // Применяется перед всеми другими преобразованиями.
  omit: [],
  // Выбирает из объекта только перечисленные свойства и игнорирует все остальные свойства
  pick: [],
  // Сортировка объекта по имени свойства
  sort: true,
  // Переименовывает свойства в другое имя и удаляет оригинал
  rename: {},
  // Переопределяет свойства объекта
  replace: {},
  // Если свойство определено в объекте - ошибка не выдается
  required: [],
  // Преобразовать значение свойства с помощью функции
  transform: {},
};
```

## Установить или перезаписать конфигурацию

```js
const configuration = { cast: { id: "integer" }, };
// Передача конфигурации в конструктор
const serializer = new Vicis(configuration);
// Альтернатива - Vicis.factory(configuration)
// Вы можете изменить конфигурацию столько раз, сколько захотите
serializer.config(configuration);
```

## Пример нескольких версий API

```js
// Начальный REST API
const configRestApiVer1 = { cast: { id: "integer" }, };
const serializerRestApiVer1 = new Vicis(configRestApiVer1);
// REST API версии 2
const configRestApiVer2 = serializerRestApiVer1.getConfig();
configRestApiVer2.omit = ["deletedAt"];
const serializerRestApiVer2 = new Vicis(configRestApiVer2);
// REST API версии 3
const configRestApiVer3 = serializerRestApiVer1.getConfig();
const omitList = ["createdAt", "updatedAt", "deletedAt"];
configRestApiVer3.omit = configRestApiVer3.omit.concat(omitList);
const serializerRestApiVer3 = new Vicis(configRestApiVer3);
```

## Пример цепочки вызовов

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
