# Pick

----------

Picks from object only listed properties and ignore all other properties

```js
const { pick } = require("vicis");
```

```js
import { pick } from "vicis/es";
```

```js
pick({ id: 12345, login: "guest", active: true }, ["id", "login"]);
```

```json
{
  "id": 12345,
  "login": "guest"
}
```

----------
