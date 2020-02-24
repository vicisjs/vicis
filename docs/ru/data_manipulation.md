# Работа с Данными

---

## Установить данные для сериализации

```js
const databaseModel = {
  id: 10,
  login: "Guest",
  password: "bless",
};
const serializer = new Vicis({}, databaseModel);
// Ещё код, потом можно перезаписать ещё раз
serializer.data(databaseModel);
```

## Получить сериализованные данные

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

?> "getData" и "toJSON" на самом деле делают одно и то же

---
