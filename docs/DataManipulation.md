# Serialization

----------

**Set data for serialization**

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

**Get serialized data**

```js
const databaseModel = {
  id: 10,
  login: "Guest",
  password: "bless",
};
const serializer = Vicis.factory().data(databaseModel);
```

```js
serializer.getData();
serializer.toJSON();
```

```json
{
  "id": 10,
  "login": "Guest",
  "password": "bless"
}
```

?> "getData" and "toJSON" actually do the same thing

----------
