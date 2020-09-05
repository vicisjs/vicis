![Vicis](.github/assets/banner.webp?raw=true "Vicis")

# « Vicis »

Presentation and transformation layer for data output in RESTful APIs.

•• [Vicis Documentation](https://vicis.js.org) •• [JavaScript Repository](https://github.com/r37r0m0d3l/vicis) •• [Deno Repository](https://github.com/r37r0m0d3l/deno-vicis) ••

[![npm](https://badgen.net/npm/v/vicis?&icon=npm&label=npm&color=DD3636)](https://www.npmjs.com/package/vicis)
[![downloads](https://badgen.net/npm/dt/vicis?&icon=terminal&label=downloads&color=009688)](https://www.npmjs.com/package/vicis)
[![stars](https://badgen.net/github/stars/r37r0m0d3l/vicis?&icon=github&label=stars&color=ffcc33)](https://github.com/r37r0m0d3l/vicis)
[![types](https://badgen.net/npm/types/vicis?&icon=typescript&label=types&color=1E90FF)](https://github.com/r37r0m0d3l/vicis/blob/master/dist/vicis.d.ts)
[![build](https://badgen.net/travis/r37r0m0d3l/vicis?&icon=travis&label=build)](https://travis-ci.org/r37r0m0d3l/vicis)
[![lgtm](https://badgen.net/lgtm/grade/g/r37r0m0d3l/vicis?&icon=lgtm&label=lgtm:js/ts&color=00C853)](https://lgtm.com/projects/g/r37r0m0d3l/vicis/alerts/)

This is Node.js analogue to these libraries: 🐘 [Fractal](https://fractal.thephpleague.com/) for PHP, 💎 [Roar](https://github.com/trailblazer/roar) for Ruby, 🍢 [Marshmallow](https://marshmallow.readthedocs.io/en/stable/) for Python.

---

## 💬 Tl;dr

Code:

```js
import { Vicis } from "vicis";
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

## 🗺️ My other projects

[Full list here](https://r37r0m0d3l.icu/open_source_map)

<img src="https://raw.githubusercontent.com/r37r0m0d3l/r37r0m0d3l/master/osmap.svg" width="960" height="520" style="display:block;height:auto;margin-left:auto;margin-right:auto;min-height:520px;min-width:960px;width:100%;">

<!-- Badges -->

[buymeacoffee-url]: https://buymeacoffee.com/r37r0m0d3l
[buymeacoffee-img]: https://img.shields.io/badge/support-buymeacoffee-1E90FF.svg?&logo=buy-me-a-coffee&label=support