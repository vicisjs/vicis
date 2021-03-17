# Cast

---

◀ [Configuration](/en/configuration_object.md)

Typecast object value to BOOLEAN, NUMERIC, INTEGER, STRING, JSON

```js
const { cast } = require("vicis");
```

```js
import { cast } from "vicis";
```

<table><thead><tr><td colspan="3">

## Boolean

?> Almost everything in JavaScript casts to *TRUE*. [Transform](/en/transform.md) is better suited for that.

</td></tr></thead><tbody>
<tr><td>

```js
cast({ registered: null }, { registered: "boolean" });
cast({ registered: null }, { registered: CAST_TYPE.BOOLEAN });
cast({ registered: null }, { registered: Vicis.BOOLEAN });
```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
{
  "registered": false
}
```

</td></tr>
</tbody></table>

<table><thead><tr><td colspan="3">

## Flag

Turns: `undefined`, `null`, `0`, `0n`, `""`, `"false"`, `"FALSE"` to boolean false.

Turns: `1`, `1n`, `"1"`, `"true"`, `"TRUE"` to boolean true.

</td></tr></thead><tbody>
<tr><td>

```js
cast({ check: null }, { check: "flag" });
cast({ check: null }, { check: CAST_TYPE.FLAG });
cast({ check: null }, { check: Vicis.FLAG });
//
cast({ check: undefined }, { check: "flag" });
cast({ check: null }, { check: "flag" });
cast({ check: 0 }, { check: "flag" });
cast({ check: 0n }, { check: "flag" });
cast({ check: "" }, { check: "flag" });
cast({ check: "false" }, { check: "flag" });
cast({ check: "FALSE" }, { check: "flag" });
cast({ check: false }, { check: "flag" });
//
cast({ check: 1 }, { check: "flag" });
cast({ check: 1n }, { check: "flag" });
cast({ check: "1" }, { check: "flag" });
cast({ check: "true" }, { check: "flag" });
cast({ check: "TRUE" }, { check: "flag" });
cast({ check: true }, { check: "flag" });
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
<strong>&#x21E5;</strong><br>
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
  "check": false
}
//


{
  "check": false
}



//


{
  "check": true
}


```

</td></tr>
</tbody></table>

<table><thead><tr><td colspan="3">

## Integer or Numeric

?> Only finite numbers are valid for output.

</td></tr></thead><tbody>
<tr><td>

```js
cast({ id: "12345" }, { id: "integer" });
cast({ id: "12345" }, { id: CAST_TYPE.INTEGER });
cast({ id: "12345" }, { id: Vicis.INTEGER });
cast({ id: "12345" }, { id: "numeric" });
cast({ id: "12345" }, { id: CAST_TYPE.NUMERIC });
cast({ id: "12345" }, { id: Vicis.NUMERIC });
```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
{
  "id": 12345
}
```

</td></tr>
</tbody></table>

<table><thead><tr><td colspan="3">

## String

</td></tr></thead><tbody>
<tr><td>

```js
cast({ active: true }, { active: "string" });
cast({ active: true }, { active: CAST_TYPE.STRING });
cast({ active: true }, { active: Vicis.STRING });
```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
{
  "active": "true"
}
```

</td></tr>
</tbody></table>

<table><thead><tr><td colspan="3">

## JSON

Performs **JSON.parse(JSON.stringify(data))** on value.

</td></tr></thead><tbody>
<tr><td>

```js
cast(
  new (function () {
    this.createdAt = new Date;
  }),
  { createdAt: "json" }
);
cast(
  new (function () {
    this.createdAt = new Date;
  }),
  { createdAt: CAST_TYPE.JSON }
);
cast(
  new (function () {
    this.createdAt = new Date;
  }),
  { createdAt: Vicis.JSON }
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
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
{
  "createdAt": "2017-08-10T20:53:42.353Z"
}
```

</td></tr>
</tbody></table>

---
