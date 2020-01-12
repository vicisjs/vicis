# Functions

----------

**Call functions separately**

```js
import {
  TYPES_ENUM,
  cast, defaults, defined, omit, pick,
  rename, replace, required, transform,
} from "vicis/es";
```

----------

**Cast**

```js
cast({ id: "12345" }, { id: "integer" });
// { id: 12345 }
```

**Defaults**

```js
defaults({ login: "guest", active: undefined }, { active: true });
// { login: "guest", active: true }
```

**Defined**

```js
defined({ id: 12345 }, ["id"]);
// value defined, no error thrown
```

**Omit**

```js
omit({ login: "guest", password: "secret" }, ["password"]);
// { login: "guest" }
```

**Pick**

```js
pick({ id: 12345, login: "guest", active: true }, ["id", "login"]);
// { id: 12345, login: "guest" }
```

**Rename**

```js
rename({ _id: 12345 }, { _id: "ID" });
// { ID: 12345 }
```

**Replace**

```js
replace({ domain: "primary" }, { domain: "secondary" });
// { domain: "secondary" }
```

**Required**

```js
required({ id: null }, ["id"]);
// property defined, no error thrown
```

**Transform**

```js
transform({ date: "2017-10-15", }, { date: (value) => new Date(value) });
// { date: "2017-10-15T00:00:00.000Z" }
```

----------
