# Nullish - Нулевой

---

◀ [Конфигурация](/ru/configuration_object.md)

Если свойство имеет неопределенное значение или null, оно будет заменено значением из конфигурации

```js
const { nullish } = require("vicis");
```

```js
import { nullish } from "vicis";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
nullish(
  {
    login: "guest",
    active: null,
  },
  {
    active: true,
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
  "active": true,
  "login": "guest"
}
```

</td></tr>
</tbody></table>

---
