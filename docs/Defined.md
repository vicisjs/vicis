# Defined

---

◀ [Configuration](Configuration.md)

If value id defined in object - no error thrown

```js
const { defined } = require("vicis");
```

```js
import { defined } from "vicis/es";
```

```js
defined({ id: 12345 }, ["id"]);
```

!> This is error

```js
try {
  defined({ id: 12345 }, ["login"]);
} catch (error) {
  console.warn(error.message); // Field 'login' must be defined.
  // Throw 500 Internal Server Error etc.
}
```

---
