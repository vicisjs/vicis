# Робота з Даними

---

## Встановити дані для серіалізації

```js
const databaseModel = {
  id: 10,
  login: "Guest",
  password: "bless",
};
const serializer = new Vicis({}, databaseModel);
// Ще код, потім можна переписати ще раз
serializer.data(databaseModel);
```

## Отримати серіалізовані дані

```js
const databaseModel = {
  id: 10,
  login: "Guest",
  password: "bless",
};
const serializer = Vicis.factory().data(databaseModel);
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
serializer.getData();

serializer.toJSON();



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
  "id": 10,
  "login": "Guest",
  "password": "bless"
}
```

</td></tr>
</tbody></table>

?> "getData" та "toJSON" насправді роблять одне і те ж

---
