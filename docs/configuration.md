# Configuration

----------

**Configuration object**

```js
const configuration = {
  cast: {}, // typecast property to type: boolean, numeric etc.
  defaults: {}, // replace properties with undefined value to this
  defined: [], // properties must be defined and have value
  omit: [], // omit properties from serialization
  pick: [], // pick only these properties
  sort: true, // sorting object by property name
  rename: {}, // rename property and remove original
  replace: {}, // override object values
  required: [], // properties must be defined (can have any value)
  transform: {}, // transform property value with function
};
```

**Set configuration**

```js
const configuration = { cast: { id: "integer" }, };
// pass configuration in constructor
const serializer = new Vicis(configuration);
// alternative - Vicis.factory(configuration)
// do it later
serializer.config(configuration);
// get it for later use
serializer.getConfig(); // { cast: { id: "integer" } }
```

**Chain configuration calls**

```js
const serializer = new Vicis();
serializer
  .defaults({ registered: true })
  .omit(["password"])
  .rename({ _id: "id" });
```

----------

**TypeScript definitions**

```typescript
enum TYPES_ENUM {
  BOOLEAN = "boolean",
  NUMERIC = "numeric", // only finite numbers
  INTEGER = "integer",
  STRING = "string",
  JSON = "json", // call JSON.stringify on value
}
interface IVicisConfig {
  cast: { [prop: string]: TYPES_ENUM };
  defaults: { [prop: string]: any };
  defined: string[];
  omit: string[];
  pick: string[];
  sort: boolean;
  rename: { [prop: string]: string };
  replace: { [prop: string]: any };
  required: string[];
  transform: { [prop: string]: Function };
}
```

?> TypeScript definition file are included in npm package

----------
