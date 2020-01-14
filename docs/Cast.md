# Cast

----------

◀ [Configuration](Configuration.md)

Typecast object value to BOOLEAN, NUMERIC, INTEGER, STRING, JSON

```js
const { cast } = require("vicis");
```

```js
import { cast } from "vicis/es";
```

**Boolean**

```js
cast({ registered: null }, { id: "boolean" });
cast({ registered: null }, { id: TYPES_ENUM.BOOLEAN });
cast({ registered: null }, { id: Vicis.BOOLEAN });
```

```json
{
  "registered": false
}
```

**Integer or Numeric**

```js
cast({ id: "12345" }, { id: "integer" });
cast({ id: "12345" }, { id: TYPES_ENUM.INTEGER });
cast({ id: "12345" }, { id: Vicis.INTEGER });
cast({ id: "12345" }, { id: "numeric" });
cast({ id: "12345" }, { id: TYPES_ENUM.NUMERIC });
cast({ id: "12345" }, { id: Vicis.NUMERIC });
```

```json
{
  "id": 12345
}
```

**String**

```js
cast({ active: true }, { id: "string" });
cast({ active: true }, { id: TYPES_ENUM.STRING });
cast({ active: true }, { id: Vicis.STRING });
```

```json
{
  "active": "true"
}
```

**JSON**

```js
cast(new (function () { this.createdAt = new Date; }), { createdAt: "json" });
cast(new (function () { this.createdAt = new Date; }), { createdAt: TYPES_ENUM.JSON });
cast(new (function () { this.createdAt = new Date; }), { createdAt: Vicis.JSON });
```

```json
{
  "createdAt": "2017-08-10T20:53:42.353Z"
}
```

----------
