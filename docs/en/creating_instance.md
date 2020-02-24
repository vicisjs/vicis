# Creating Instance

---

## Calling a constructor

```js
const serializer = new Vicis(/* configuration, data */);
```

## Calling a factory

```js
const serializer = Vicis.factory(/* configuration, data */);
```

?> Calling a factory is no different from calling a constructor it's used only for handy chain call

```js
const serializer = Vicis.factory()
  .defaults({ registered: true })
  .exclude([/^(?:_)(?:_)?/])
  .omit(["password"])
  .rename({ _id: "id" });
```

---
