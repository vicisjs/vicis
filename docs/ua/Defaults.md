# Defaults - За Замовчуванням

----------

◀ [Конфігурація](/ua/Configuration.md)

Якщо властивість має невизначене значення, воно буде замінено значенням з конфігурації.

```js
const { defaults } = require("vicis");
```

```js
import { defaults } from "vicis/es";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
defaults(
  {
    login: "guest",
    active: undefined,
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

----------
