# Defaults

----------

◀ [Configuration](Configuration.md)

In case of property has undefined value it will be replaced with value from configuration

```js
const { defaults } = require("vicis");
```

```js
import { defaults } from "vicis/es";
```

```js
defaults({ login: "guest", active: undefined }, { active: true });
```

```json
{
  "login": "guest",
  "active": true
}
```

----------
