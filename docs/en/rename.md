# Rename

---

◀ [Configuration](/en/configuration_object.md)

Renames properties to another name and remove original

```js
const { rename } = require("vicis");
```

```js
import { rename } from "vicis";
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
rename(
  {
    _id: 12345,
  },
  {
    _id: "ID",
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
  "ID": 12345
}
```

</td></tr>
</tbody></table>

---
