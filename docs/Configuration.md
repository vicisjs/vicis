# Configuration

----------

**Configuration object**

[Cast](Cast.md) [Defaults](Defaults.md) [Defined](Defined.md) [Omit](Omit.md) [Pick](Pick.md) [Rename](Rename.md) [Replace](Replace.md) [Required](Required.md) [Transform](Transform.md)

```js
const configuration = {
  // Typecast object value to BOOLEAN, NUMERIC, INTEGER, STRING, JSON
  cast: {},
  // In case of property has undefined value it will be replaced with value from configuration
  defaults: {},
  // If value id defined in object - no error thrown
  defined: [],
  // Remove from object listed properties
  omit: [],
  // Picks from object only listed properties and ignore all other properties
  pick: [],
  // Sorting object by property name
  sort: true,
  // Renames properties to another name and remove original
  rename: {},
  // Overrides object values
  replace: {},
  // If property defined in object - no error thrown
  required: [],
  // Transform property value with function
  transform: {},
};
```

**Set configuration**

```js
const configuration = { cast: { id: "integer" }, };
// Pass configuration in constructor
const serializer = new Vicis(configuration);
// Alternative - Vicis.factory(configuration)
// You can override configuration as many times as you want
serializer.config(configuration);
```

**Multiple API versions example**

```js
// Initial REST API
const configRestApiVer1 = { cast: { id: "integer" }, };
const serializerRestApiVer1 = new Vicis(configRestApiVer1);
// REST API Version 2
const configRestApiVer2 = serializerRestApiVer1.getConfig();
configRestApiVer2.omit = ["deletedAt"];
const serializerRestApiVer2 = new Vicis(configRestApiVer2);
// REST API Version 3
const configRestApiVer3 = serializerRestApiVer1.getConfig();
const omitList = ["createdAt", "updatedAt", "deletedAt"];
configRestApiVer3.omit = configRestApiVer3.omit.concat(omitList);
const serializerRestApiVer3 = new Vicis(configRestApiVer3);
```

**Chain configuration calls example**

```js
const serializer = new Vicis();
serializer
  .defaults({ registered: true })
  .omit(["password"])
  .rename({ _id: "id" });
```

```js
const serializer = Vicis.factory();
const omitList = ["password"];
if (omitList.length > 0) {
  serializer.omit(omitList);
}
```

----------

