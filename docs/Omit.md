# Omit

----------

◀ [Configuration](Configuration.md)

Remove from object listed properties

```js
const { omit } = require("vicis");
```

```js
import { omit } from "vicis/es";
```

```js
omit({ login: "guest", password: "secret" }, ["password"]);
```

```json
{
  "login": "guest"
}
```

----------
