# Transform

----------

◀ [Configuration](Configuration.md)

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

**More complex example**

```js
function textToBool(value) {
  return value === "1";
}

const res = transform(
  {
    female: true,
    name: "Tiva",
    active: "0",
    registered: "1",
    date: "2017-10-15"
  },
  {
    name: (value, name, data) => {
      if (data.female) {
        return `Witch ${value}`;
      } else {
        return `Witcher ${value}`;
      }
    },
    active: textToBool,
    registered: textToBool,
    date: value => {
      return new Date(value);
    }
  }
);
```

```json
{
  "female": true,
  "name": "Witch Tiva",
  "active": false,
  "registered": true,
  "date":"2017-10-15T00:00:00.000Z"
}
```

----------
