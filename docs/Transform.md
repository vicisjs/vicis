# Transform

----------

Transform property value with function


```js
const { transform } = require("vicis");
```

```js
import { transform } from "vicis/es";
```

```js
transform({ date: "2017-10-15", }, { date: (value) => new Date(value) });
```

```json
{
  "date": "2017-10-15T00:00:00.000Z"
}
```

----------
