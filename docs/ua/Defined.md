# Defined - Існує

----------

◀ [Конфігурація](/ua/Configuration.md)

Якщо властивість має невизначене значення, воно буде замінено значенням з конфігурації

```js
const { defined } = require("vicis");
```

```js
import { defined } from "vicis/es";
```

```js
defined({ id: 12345 }, ["id"]);
```

!> Тут буде помилка

```js
try {
  defined({ id: 12345 }, ["login"]);
} catch (error) {
  console.warn(error.message); // Field 'login' must be defined.
  // Тут можна кинути 500 Internal Server Error і т.п.
}
```

----------
