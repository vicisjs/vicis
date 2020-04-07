# Exclude - Виключити

---

◀ [Конфігурація](/ua/configuration.md)

Видалити з об'єкта перераховані властивості.

Застосовується після всіх інших перетворень.

Перевизначає `pick`.

```js
const { exclude } = require("vicis");
```

```js
import { exclude } from "vicis";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
exclude(
  {
    login: "guest",
    Password: "secret",
    active: true,
    __v: 5,
  },
  [/(?:password)/gi, /^(?:_)(?:_)?/, "active"]
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
