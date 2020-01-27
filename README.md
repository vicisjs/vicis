![Vicis](docs/_media/logo.png?raw=true "Vicis")

Vicis
===========

Presentation and transformation layer for data output in RESTful APIs.

[Vicis Documentation](https://vicis.js.org)

[![NPM Version](https://img.shields.io/npm/v/vicis.svg?style=flat)]()
[![NPM Downloads](https://img.shields.io/npm/dt/vicis.svg?style=flat)]()
[![Build Status](https://travis-ci.org/r37r0m0d3l/vicis.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/vicis)
[![Issues](https://img.shields.io/github/issues-raw/r37r0m0d3l/vicis.svg?maxAge=25000)](https://github.com/r37r0m0d3l/vicis/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/r37r0m0d3l/vicis/badge.svg?targetFile=package.json)](https://snyk.io/test/github/r37r0m0d3l/vicis?targetFile=package.json)

[![Maintainability](https://api.codeclimate.com/v1/badges/272b5247f8b777c75360/maintainability)](https://codeclimate.com/github/r37r0m0d3l/vicis/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e4e2ebf8e0914668866536a898370ad2)](https://www.codacy.com/manual/r37r0m0d3l/vicis?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=r37r0m0d3l/vicis&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://david-dm.org/r37r0m0d3l/vicis.svg)](https://david-dm.org/r37r0m0d3l/vicis)
[![devDependencies Status](https://david-dm.org/r37r0m0d3l/vicis/dev-status.svg)](https://david-dm.org/r37r0m0d3l/vicis?type=dev)

[![GitHub stars](https://img.shields.io/github/stars/r37r0m0d3l/vicis.svg?style=social&label=Star)](https://github.com/r37r0m0d3l/vicis)
[![GitHub watchers](https://img.shields.io/github/watchers/r37r0m0d3l/vicis.svg?style=social&label=Watch)](https://github.com/r37r0m0d3l/vicis)
[![GitHub followers](https://img.shields.io/github/followers/r37r0m0d3l.svg?style=social&label=Follow)](https://github.com/r37r0m0d3l/vicis)
[![GitHub forks](https://img.shields.io/github/forks/r37r0m0d3l/vicis.svg?style=social&label=Fork)]()

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

Discover more:

-   🔎[Consono](https://consono.js.org)🔎 - The most informative and correct variable inspector for JavaScript on the web.

-   🌠[OF](https://of.js.org)🌠 - Promise wrapper with some sugar.

-   🔩[Local Storage Fallback](https://github.com/r37r0m0d3l/fallback-local-storage)🔩 - Universal localStorage fallback.

-   🔄[Publish Subscribe](https://publish-subscribe.js.org)🔄 - JavaScript implementation of the Publish-Subscribe pattern.

Or find useful these tools:

-   🧾[JSON Sorter](https://r37r0m0d3l.github.io/json_sort)🧾 - Neat online JSON sorter.
