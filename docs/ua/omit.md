# Omit - Прибрати

---

◀ [Конфігурація](/ua/configuration_object.md)

Видалити з об'єкта вказані властивості.

Застосовується перед усіма іншими перетвореннями.

```js
const { omit } = require("vicis");
```

```js
import { omit } from "vicis";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
omit(
  {
    login: "guest",
    password: "secret",
  },
  ["password"]
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
</td>
<td>

```json
{
  "login": "guest"
}
```

</td></tr>
</tbody></table>

---
