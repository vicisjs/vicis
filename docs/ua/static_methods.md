# Статичні Методи

---

## Серіалізувати один об'єкт

```js
const data = {
  id: 1,
  created_at: "2020-01-01",
};

const config = {
  rename: { created_at: "createdAt" },
};

Vicis.from(data, config);
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
Vicis
  .from(
    {
      id: 1,
      created_at: "2020-01-01"
    },
    {
      rename: { created_at: "createdAt" }
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
<strong>&#x21E5;</strong><br>
</td>
<td>

```json


{
  "id": 1,
  "createdAt": "2020-01-01"
}



```

</td></tr>
</tbody></table>

## Серіалізувати колекцію

```js
const collection = [
  { id: 1, created_at: "2020-01-01" },
  { id: 2, created_at: "2020-01-01" },
];

const config = { rename: { created_at: "createdAt" } };

Vicis.fromArray(collection, config);
```

<table width="100%"><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js

Vicis.fromArray(
  [
    { id: 1, created_at: "2020-01-01" },
    { id: 2, created_at: "2020-01-01" },
  ],
  { rename: { created_at: "createdAt" } },
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
[
  {
    "id": 1,
    "createdAt": "2020-01-01"
  },
  {
    "id": 2,
    "createdAt": "2020-01-01"
  }
]
```

</td></tr>
</tbody></table>

---
