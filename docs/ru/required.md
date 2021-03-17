# Required - Обязательный

---

◀ [Конфигурация](/ru/configuration_object.md)

Если свойство определено в объекте - ошибка не выдается

```js
const { required } = require("vicis");
```

```js
import { required } from "vicis";
```

```js
required({ id: 12345 }, ["id"]);
required({ id: null }, ["id"]);
required({ id: undefined }, ["id"]);
```

!> Здесь будет ошибка

```js
try {
  required({ id: 12345, username: "Vicis" }, ["login"]);
} catch (error) {
  console.warn(error.message); // Field 'login' is required.
  // Здесь можно бросить 500 Internal Server Error и т.п.
}
```

---
