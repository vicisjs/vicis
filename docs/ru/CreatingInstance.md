# Создание Экземпляра

----------

**Вызов конструктора**

```js
const serializer = new Vicis(/* configuration, data */);
```

**Вызов фабрики**

```js
const serializer = Vicis.factory(/* configuration, data */);
```

?> Вызов фабрики ничем не отличается от вызова конструктора, он используется только для удобной цепочки вызовов.

```js
const serializer = Vicis.factory()
  .defaults({ registered: true })
  .exclude([/^(?:_)(?:_)?/])
  .omit(["password"])
  .rename({ _id: "id" });
```

----------
