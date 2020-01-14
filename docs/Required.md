# Required

----------

◀ [Configuration](Configuration.md)

If property defined in object - no error thrown

```js
const { required } = require("vicis");
```

```js
import { required } from "vicis/es";
```

```js
required({ id: 12345 }, ["id"]);
required({ id: null }, ["id"]);
required({ id: undefined }, ["id"]);
```

!> This is error

```js
try {
  required({ id: 12345, username: "Vicis" }, ["login"]);
} catch (error) {
  console.warn(error.message); // Field 'login' is required.
  // Throw 500 Internal Server Error etc.
}
```

----------
