# Приклад на Express

---

Приклад використання з ["mongoose"](https://github.com/Automattic/mongoose)

```js
const { Vicis } = require("vicis");

const userSchema = mongoose.Schema({ name: String, password: String });
const UserModel = mongoose.model("user", userSchema);

const serializer = Vicis.factory({ pick: ["id", "name"], rename: { _id: "id" } });
```

<table>
<thead>
<tr><td colspan="3">

Шлях **"/superadmin"**

</td></tr>
</thead>
<tbody>
<tr>
<td>

```js
app.get("/superadmin", async (req, res) => {
  const user = await UserModel
    .findOne({ name: "Sir Mullich" });
  // {
  //   _id: "5e1e27aea68ed00f94ee6dba",
  //   name: "Sir Mullich",
  //   password: "Sir Mullich the Knight",
  //   __v: 0
  // }
  res.json(serializer.data(
    user.toObject()).toJSON()
  );
  // або дозвольте Vicis спробувати
  // подбати про це автоматично
  res.json(serializer.data(user));
});
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
</td>
<td>

```json
{
  "id": "5e1e27aea68ed00f94ee6dba",
  "name": "Sir Mullich"
}
```

</td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr><td colspan="3">

Шлях **"/users"**

</td></tr>
</thead>
<tbody>
<tr>
<td>

```js
app.get("/users", async (req, res) => {
  const users = await UserModel.find({});
  // [
  //   {
  //     _id: 5e1e27aea68ed00f94ee6dba,
  //     name: 'Sir Mullich',
  //     password: 'Sir Mullich the Knight',
  //     __v: 0
  //   },
  //   {
  //     _id: 5e1e2854df79770e20979738,
  //     name: 'Tiva',
  //     password: 'Tiva the Witch',
  //     __v: 0
  //   }
  // ]
  res.json(serializer.fromArray(
    users.map((model) => model.toObject()))
  );
  // або дозвольте Vicis спробувати
  // подбати про це автоматично
  res.json(serializer.fromArray(users));
});
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
[
  {
    "id": "5e1e27aea68ed00f94ee6dba",
    "name": "Sir Mullich"
  },
  {
    "id": "5e1e2854df79770e20979738",
    "name": "Tiva"
  }
]
```

</td>
</tr>
</tbody>
</table>

---
