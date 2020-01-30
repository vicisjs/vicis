# Rename - Переименовать

----------

◀ [Конфигурация](/ru/Configuration.md)

Переименовывает свойства в другое имя и удаляет оригинал

```js
const { rename } = require("vicis");
```

```js
import { rename } from "vicis/es";
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

----------
