# Defined - Існує

---

◀ [Конфігурація](/ua/configuration.md)

Якщо властивість має невизначене значення, воно буде замінено значенням з конфігурації.

```js
const { defined } = require("vicis");
```

```js
import { defined } from "vicis";
```

```js
defined({ id: 12345 }, ["id"]);
```

!> Тут буде помилка

```js
try {
  defined({ id: 12345 }, ["login"]);
} catch (error) {
  console.warn(error.message); // Поле 'login' мусить бути визначеним.
  // Тут можна кинути 500 Internal Server Error і т.п.
}
```

---
