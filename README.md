![Vicis](docs/logo.png?raw=true "Vicis")

Vicis
===========

Presentation and transformation layer for data output in RESTful APIs.

[![NPM Version](https://img.shields.io/npm/v/vicis.svg?style=flat)]()
[![NPM Downloads](https://img.shields.io/npm/dt/vicis.svg?style=flat)]()
[![Build Status](https://travis-ci.org/r37r0m0d3l/vicis.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/vicis)
[![Issues](https://img.shields.io/github/issues-raw/r37r0m0d3l/vicis.svg?maxAge=25000)](https://github.com/r37r0m0d3l/vicis/issues)

[![Maintainability](https://api.codeclimate.com/v1/badges/272b5247f8b777c75360/maintainability)](https://codeclimate.com/github/r37r0m0d3l/vicis/maintainability)
[![Dependecy Status](https://david-dm.org/r37r0m0d3l/vicis.svg)](https://david-dm.org/r37r0m0d3l/vicis)
[![devDependencies Status](https://david-dm.org/r37r0m0d3l/vicis/dev-status.svg)](https://david-dm.org/r37r0m0d3l/vicis?type=dev)

[![GitHub stars](https://img.shields.io/github/stars/r37r0m0d3l/vicis.svg?style=social&label=Star)](https://github.com/r37r0m0d3l/vicis)
[![GitHub watchers](https://img.shields.io/github/watchers/r37r0m0d3l/vicis.svg?style=social&label=Watch)](https://github.com/r37r0m0d3l/vicis)
[![GitHub followers](https://img.shields.io/github/followers/r37r0m0d3l.svg?style=social&label=Follow)](https://github.com/r37r0m0d3l/vicis)
[![GitHub forks](https://img.shields.io/github/forks/r37r0m0d3l/vicis.svg?style=social&label=Fork)]()
[![Twitter](https://img.shields.io/twitter/follow/r37r0m0d3l.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=r37r0m0d3l)

## Table of contents

[Examples](#examples)

[Installation](#installation)

[Motivation](#motivation)

## Examples

```js
const Vicis = require("vicis").default;
```

Require multiple items.

```js
const {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, omit, pick, rename, replace, required, transform,
} = require("vicis");
```

Import as ECMAScript module.

```js
import Vicis from "vicis/es";
```

Require multiple items.

```js
import {
  Vicis, TYPES_ENUM,
  cast, defaults, defined, omit, pick, rename, replace, required, transform,
} from "vicis/es";
```

Creating instance.

```js
const serializer = new Vicis(/* ...configuration, ...data */);
```

```js
const serializer = Vicis.factory(/* ...configuration, ...data */);
```

Configuration object.

```js
const configuration = {
  cast: {},
  defaults: {},
  defined: [],
  omit: [],
  pick: [],
  sort: true,
  rename: {},
  replace: {},
  required: [],
  transform: {},
};
```

TypeScript definitions.

```typescript
enum TYPES_ENUM {
  BOOLEAN = "boolean",
  NUMERIC = "numeric",
  INTEGER = "integer",
  STRING = "string",
  JSON = "json",
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

Set configuration.

```js
const configuration = { cast: { id: "integer" }, };
// pass configuration in constructor
const serializer = new Vicis(configuration); // Vicis.factory(configuration)
// do it later
serializer.config(configuration);
// get it for later use
serializer.getConfig(); // { cast: { id: "integer" } }
```

Chain configuration calls.

```js
const serializer = new Vicis();
serializer
  .defaults({ registered: true })
  .omit(["password"])
  .rename({ _id: "id" });
```

Call functions separately.

```js
cast({ id: "12345" }, { id: "integer" }); // { id: 12345 }
defaults({ login: "guest", active: undefined }, { active: true }); // { login: "guest", active: true }
defined({ id: 12345 }, ["id"]); // value defined, no error thrown
omit({ login: "guest", password: "secret" }, ["password"]); // { login: "guest" }
pick({ id: 12345, login: "guest", active: true }, ["id", "login"]); // { id: 12345, login: "guest" }
rename({ _id: 12345 }, { _id: "ID" }); // { ID: 12345 } 
replace({ domain: "primary" }, { domain: "secondary" }); // { domain: "secondary" }
required({ id: null }, ["id"]); // property defined, no error thrown
transform({ date: "2017-10-15", }, { date: (value) => new Date(value) }); // { date: "2017-10-15T00:00:00.000Z" } 
```

Set data for serialization.

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

Get **serialized** data.

```js
const serializer = new Vicis();
console.log(serializer.getData());
console.log(serializer.toJSON());
```

**Full example.**

```js
const genericDefaultConfig = { /* ... */ };
const databaseModel = {
  id: "1234",
  ok: undefined,
  hidden: "",
  domain: "main",
  date: "2017-10-15",
};
const response = Vicis.factory(/* ...configuration, ...data */)
  .config(genericDefaultConfig)
  .sort(true) // sorting object by property name
  .cast({ id: "integer" })
  .defined(["ok"])
  .defaults({ ok: true })
  .omit(["hidden"])
  .pick(["date", "domain", "ID", "ok"])
  .rename({ id: "ID" })
  .replace({ domain: "secondary" })
  .required(["id"])
  .transform({ date: (value) => new Date(value) })
  .data(databaseModel)
  .toJSON();
// Express framework in example
app.get("/", (req, res) => res.json(response))
```

## Installation

```bash
npm install vicis
```

```bash
yarn add vicis
```

## Motivation

Creating Node.js analogue to this libraries:

* [Fractal](https://fractal.thephpleague.com/) for PHP

* [Roar](https://github.com/trailblazer/roar) for Ruby

* [Marshmallow](https://marshmallow.readthedocs.io/en/stable/) for Python