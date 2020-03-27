![Vicis](docs/_media/128.png?raw=true "Vicis")

# Vicis

Presentation and transformation layer for data output in RESTful APIs.

[🗎 Vicis Documentation 🗎](https://vicis.js.org)

[![NPM Version](https://img.shields.io/npm/v/vicis.svg?style=flat)]()
[![NPM Downloads](https://img.shields.io/npm/dt/vicis.svg?style=flat)]()
[![Build Status](https://travis-ci.org/r37r0m0d3l/vicis.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/vicis)
[![GitHub stars](https://img.shields.io/github/stars/r37r0m0d3l/vicis.svg?style=social&label=Star)](https://github.com/r37r0m0d3l/vicis)
[![GitHub followers](https://img.shields.io/github/followers/r37r0m0d3l.svg?style=social&label=Follow)](https://github.com/r37r0m0d3l)

This is Node.js analogue to this libraries:

-   🐘 [Fractal](https://fractal.thephpleague.com/) for PHP

-   💎 [Roar](https://github.com/trailblazer/roar) for Ruby

-   🍢 [Marshmallow](https://marshmallow.readthedocs.io/en/stable/) for Python

---

## Tl;dr

Code:

```js
import { Vicis } from "vicis/es";
const configuration = {
  cast: { _id: Vicis.INTEGER, registered: Vicis.FLAG },
  defaults: { confirmed: false },
  exclude: [/(?:password)/gi, /^(?:_)(?:_)?/],
  omit: ["createdAt", "updatedAt", "deletedAt"],
  rename: { _id: "id", email: "login" },
  replace: { url: null }
};
const model = {
  _id: "54759309034942804",
  email: "johnwick@gmail.com",
  userPassword: "36e80092ff7f1ed72903cda9409b9d2c",
  registered: "1",
  url: "example.com",
  createdAt: "2020-01-01 01:23:45",
  __v: 1
};
const serializer = new Vicis(configuration);
serializer.data(model);
console.log(serializer.getData());
```

Output:

```json
{
  "confirmed": false,
  "id": 54759309034942804,
  "login": "johnwick@gmail.com",
  "registered": true,
  "url": null
}
```

---

*If you use this project don't forget to give a ⭐
[star](https://github.com/r37r0m0d3l/vicis) ⭐ to it on GitHub!*

---

Discover more:

| URL | Description |
|:---|:---|
| [jsonsort.r37r0m0d3l.io](https://r37r0m0d3l.github.io/json_sort) | Neat online JSON sorter |
| [consono.js.org](https://consono.js.org) | The most informative & correct variable inspector |
| [of.js.org](https://of.js.org) | Promise wrapper with some sugar |
| [publish-subscribe.js.org](https://publish-subscribe.js.org) | Implementation of the Publish-Subscribe pattern |
| [vicis.js.org](https://vicis.js.org) | Present & transform for JSON in REST API |
| [npmjs.com/fallback-local-storage](https://npmjs.com/package/fallback-local-storage) | Universal localStorage fallback |
| [npmjs.com/@hilesystem](https://npmjs.com/package/@hilesystem/local) | Filesystem common function wrappers |
| [npmjs.com/@corefunc](https://npmjs.com/package/@corefunc/corefunc) | "Don’t repeat yourself" collection of functions |

---
