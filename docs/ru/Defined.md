# Defined - Существует

----------

◀ [Конфигурация](/ru/Configuration.md)

Если в объекте определено свойство - ошибка не выдается

```js
const { defined } = require("vicis");
```

```js
import { defined } from "vicis/es";
```

```js
defined({ id: 12345 }, ["id"]);
```

!> Здесь будет ошибка

```js
try {
  defined({ id: 12345 }, ["login"]);
} catch (error) {
  console.warn(error.message); // Field 'login' must be defined.
  // Здесь можно бросить 500 Internal Server Error и т.п.
}
```

----------
