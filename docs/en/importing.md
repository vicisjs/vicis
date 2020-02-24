# Importing

---

Require default

```js
const Vicis = require("vicis").default;
```

Require multiple items

```js
const {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, exclude, omit,
  pick, rename, replace, required, transform,
} = require("vicis");
```

Import as ECMAScript module

```js
import Vicis from "vicis/es";
```

!> Importing as ES module is recommended way if you using bundler

Require multiple items

```js
import {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, omit, exclude,
  pick, rename, replace, required, transform,
} from "vicis/es";
```

---
