# Data Manipulation

---

## Set data for serialization

```js
const databaseModel = {
  id: 10,
  login: "Guest",
  password: "bless",
};
const serializer = new Vicis({}, databaseModel);
// Do some stuff, than set data later
serializer.data(databaseModel);
```

## Get serialized data

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

?> "getData" and "toJSON" actually do the same thing

---

## Clear any data references and cached values

```js
const databaseModel = {
  id: 10,
  login: "Guest",
  password: "bless",
};
const serializer = Vicis.factory().data(databaseModel);
// Do some stuff
serializer.clear();
```

---
