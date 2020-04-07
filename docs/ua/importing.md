# Імпорт

---

Підключення через require()

```js
const { Vicis } = require("vicis");
```

Підключення декількох змінних

```js
const {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, exclude, omit,
  pick, rename, replace, required, transform,
} = require("vicis");
```

Імпортування як ECMAScript–модуль

```js
import Vicis from "vicis";
```

!> Імпортування як ES–module рекомендується, якщо ви використовуєте який-небудь бандлер

Імпортування декількох змінних

```js
import {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, omit, exclude,
  pick, rename, replace, required, transform,
} from "vicis";
```

---
