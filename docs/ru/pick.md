# Pick - Выбрать

---

◀ [Конфигурация](/ru/configuration_object.md)

Выбирает из объекта только перечисленные свойства и игнорирует все остальные свойства

```js
const { pick } = require("vicis");
```

```js
import { pick } from "vicis";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
pick(
  {
    id: 12345,
    login: "guest",
    active: true,
  },
  ["id", "login"],
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
</td>
<td>

```json
{
  "id": 12345,
  "login": "guest"
}
```

</td></tr>
</tbody></table>

---
