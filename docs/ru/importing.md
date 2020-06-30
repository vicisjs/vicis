# Импортирование

---

Подключить через require()

```js
const { Vicis } = require("vicis");
```

Подключить несколько переменных

```js
const {
  Vicis, CAST_TYPE,
  cast, defaults, defined, exclude, omit,
  pick, rename, replace, required, transform,
} = require("vicis");
```

Импортировать как ECMAScript модуль

```js
import Vicis from "vicis";
```

!> Импортирование как ES module рекомендуется, если вы используете какой-либо бандлер

Подключить несколько переменных

```js
import {
  Vicis, CAST_TYPE,
  cast, defaults, defined, omit, exclude,
  pick, rename, replace, required, transform,
} from "vicis";
```

---
