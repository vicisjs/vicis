# Cast - Приведение Типов

---

◀ [Конфигурация](/ru/configuration.md)

Приведение типа объекта к BOOLEAN, NUMERIC, INTEGER, STRING, JSON

```js
const { cast } = require("vicis");
```

```js
import { cast } from "vicis";
```

<table><thead><tr><td colspan="3">

## Булевые

?> Почти все в JavaScript приводится к *TRUE*. [Transform](/ru/transform.md) лучше подходит для этого.

</td></tr></thead><tbody>
<tr><td>

```js
cast({ registered: null }, { registered: "boolean" });
cast({ registered: null }, { registered: TYPES_ENUM.BOOLEAN });
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

## Флаг

Приводит: `undefined`, `null`, `0`, `0n`, `""`, `"false"`, `"FALSE"` к булевому false.

Приводит: `1`, `1n`, `"1"`, `"true"`, `"TRUE"` к булевому true.

</td></tr></thead><tbody>
<tr><td>

```js
cast({ check: null }, { check: "flag" });
cast({ check: null }, { check: TYPES_ENUM.FLAG });
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

## Целое или Число

?> Только конечные числа считаются годными.

</td></tr></thead><tbody>
<tr><td>

```js
cast({ id: "12345" }, { id: "integer" });
cast({ id: "12345" }, { id: TYPES_ENUM.INTEGER });
cast({ id: "12345" }, { id: Vicis.INTEGER });
cast({ id: "12345" }, { id: "numeric" });
cast({ id: "12345" }, { id: TYPES_ENUM.NUMERIC });
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

## Строка

</td></tr></thead><tbody>
<tr><td>

```js
cast({ active: true }, { active: "string" });
cast({ active: true }, { active: TYPES_ENUM.STRING });
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

Проводит трансформацию у JSON через вызов **JSON.parse(JSON.stringify(data))**.

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
  { createdAt: TYPES_ENUM.JSON }
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
