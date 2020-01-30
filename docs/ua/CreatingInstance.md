# Створення Екземпляра

----------

**Виклик конструктора**

```js
const serializer = new Vicis(/* configuration, data */);
```

**Виклик фабрики**

```js
const serializer = Vicis.factory(/* configuration, data */);
```

?> Виклик фабрики нічим не відрізняється від виклику конструктора, він використовується тільки для зручної ланцюжки викликів.

```js
const serializer = Vicis.factory()
  .defaults({ registered: true })
  .exclude([/^(?:_)(?:_)?/])
  .omit(["password"])
  .rename({ _id: "id" });
```

----------
