# Імпорт

----------

Підключити через require()

```js
const Vicis = require("vicis").default;
```

Підключити декілька змінних

```js
const {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, exclude, omit,
  pick, rename, replace, required, transform,
} = require("vicis");
```

Імпортувати як ECMAScript модуль

```js
import Vicis from "vicis/es";
```

!> Імпорт як ES module рекомендується, якщо ви використовуєте який-небудь бандлер

Підключити декілька змінних

```js
import {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, omit, exclude,
  pick, rename, replace, required, transform,
} from "vicis/es";
```

----------
