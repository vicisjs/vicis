# Pick

----------

◀ [Configuration](/en/Configuration.md)

Picks from object only listed properties and ignore all other properties

```js
const { pick } = require("vicis");
```

```js
import { pick } from "vicis/es";
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

----------
