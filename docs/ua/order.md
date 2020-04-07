# Order - Порядок Властивостей

---

◀ [Конфігурація](/ua/configuration.md)

Встановлює порядок властивостей в об'єкті

```js
const { order } = require("vicis");
```

```js
import { order } from "vicis";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
order(
  {
    active: true,
    createdAt: null,
    id: 12345,
    login: "guest",
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
  "login": "guest",
  "active": true,
  "createdAt": null
}


```

</td></tr>
</tbody></table>

---
