# Transform - Трансформировать

---

◀ [Конфигурация](/ru/configuration.md)

Преобразовывает значение с помощью функции

```js
const { transform } = require("vicis");
```

```js
import { transform } from "vicis";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
transform(
  {
    date: "2017-10-15",
  },
  {
    date: (value) => new Date(value)
  }
);
```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
{
  "date": "2017-10-15T00:00:00.000Z"
}
```

</td></tr>
</tbody></table>

## Более сложный пример

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

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

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
{
  "female": true,
  "name": "Witch Tiva",
  "active": false,
  "registered": true,
  "date":"2017-10-15T00:00:00.000Z"
}
```

</td></tr>
</tbody></table>

---
