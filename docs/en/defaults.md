# Defaults

---

◀ [Configuration](/en/configuration.md)

In case of property has undefined value it will be replaced with value from configuration

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

---
