# Usage

----------

**Installation**

```bash
npm install vicis
```

```bash
yarn add vicis
```

----------

**Importing**

```js
const Vicis = require("vicis").default;
```

Require multiple items

```js
const {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, omit, pick,
  rename, replace, required, transform,
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
  cast, defaults, defined, omit, pick,
  rename, replace, required, transform,
} from "vicis/es";
```

----------

**Creating instance**

```js
const serializer = new Vicis(/* ...configuration, ...data */);
```

```js
const serializer = Vicis.factory(/* ...configuration, ...data */);
```

----------
