# Rename

----------

◀ [Configuration](Configuration.md)

Renames properties to another name and remove original

```js
const { rename } = require("vicis");
```

```js
import { rename } from "vicis/es";
```

```js
rename({ _id: 12345 }, { _id: "ID" });
```

```json
{
  "ID": 12345
}
```

----------
