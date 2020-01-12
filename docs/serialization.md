# Serialization

----------

**Set data for serialization**

```js
const databaseModel = {
  id: 10,
  login: "Guest",
  password: "bless",
};
const serializer = new Vicis(/* ...configuration */, databaseModel);
// do it later
serializer.data(databaseModel);
```

**Get serialized data**

```js
const serializer = new Vicis();
console.log(serializer.getData());
console.log(serializer.toJSON());
```

----------
