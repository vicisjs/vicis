# Required - Обов'язковий

---

◀ [Конфігурація](/ua/configuration.md)

Якщо властивість визначено в об'єкті - помилка не видається

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

!> Тут буде помилка

```js
try {
  required({ id: 12345, username: "Vicis" }, ["login"]);
} catch (error) {
  console.warn(error.message); // Field 'login' is required.
  // Тут можна кинути 500 Internal Server Error і т.п.
}
```

---
