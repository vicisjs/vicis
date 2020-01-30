# Импортирование

----------

Подключить через require()

```js
const Vicis = require("vicis").default;
```

Подключить несколько переменных

```js
const {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, exclude, omit,
  pick, rename, replace, required, transform,
} = require("vicis");
```

Импортировать как ECMAScript модуль

```js
import Vicis from "vicis/es";
```

!> Импортирование как ES module рекомендуется, если вы используете какой-либо бандлер

Подключить несколько переменных

```js
import {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, omit, exclude,
  pick, rename, replace, required, transform,
} from "vicis/es";
```

----------
