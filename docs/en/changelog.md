# Changelog

---

## 2.1.0

-   ♻️ Changed applying function order: omit, defaults, nullish, required, defined, cast, transform, replace, rename, pick, exclude

---

## 2.0.9

-   ➕ Added experimentally `nullish`

---

## 2.0.8

-   🐛 Fix key sorting

---

## 2.0.7

-   ⬆️ Dependencies updated

---

## 2.0.6

-   🚚 Move git repository to another organization

---

## 2.0.5

-   ♻️ All private fields now are public

---

## 2.0.4

-   ⬆️ Dependencies updated

---

## 2.0.3

-   ⬆️ Dependencies updated

---

## 2.0.2

-   ⬆️ Typings updated

---

## 2.0.1

-   🐛 Fix minor warnings

---

## 2.0.0

-   ♻️ Rewritten from JavaScript to TypeScript

-   ♻️ Rename `TYPES_ENUM` to `CAST_TYPE`

-   ⬆️ Dependencies updated

---

## 1.6.1

-   ⬆️ Dependencies updated

---

## 1.6.0

-   ➕ Added static method `testConfig`

-   ♻️ Refactored exception handling. `Vicis.constructor` and `Vicis.config` now throws an `AggregateError` instead of `ValidationError`.

---

## 1.5.2

-   ⬆️ Dependencies updated

---

## 1.5.1

-   ⬆️ Dependencies updated

-   📚 Documentation updated

---

## 1.5.0

-   ⚡️ Change default export format

---

## 1.4.0

-   ➕ Added static methods `from` and `fromArray`

-   ➕ Added configuration from function

---

## 1.3.12

-   ⬆️ Dependencies updated

---

## 1.3.11

-   ⬆️ Dependencies updated

---

## 1.3.10

-   ⬆️ Dependencies updated

---

## 1.3.9

-   📚 Documentation updated

---

## 1.3.8

-   🐛 Fix error when transform accepts a class not a function

---

## 1.3.7

-   ♻️ Refactored transformation options

---

## 1.3.6

-   📚 Documentation updated

---

## 1.3.5

-   🐛 Fix TypeScript errors

---

## 1.3.4

-   🐛 Fix empty data error

---

## 1.3.3

-   ♻️ Refactored internal caching

---

## 1.3.2

-   ➖ Removed a dependency `lodash.clonedeep`

---

## 1.3.1

-   ➖ Default exports removed

---

## 1.3.0

-   ➕ Added method `order`

---

## 1.2.0

-   ➕ Added method `clear`

-   💥 Configuration value `sort` now always `false`

-   ♻️ Refactor cast type `JSON`

---

## 1.1.3

-   ⬆️ Dependencies updated

---

## 1.1.2

-   ⬆️ Dependencies updated

-   📚 Documentation updated

---

## 1.1.1

-   📚 Documentation updated

---

## 1.1.0

-   ♻️ Refactor method `data`. Now it try to call `toObject` or `toJSON` methods before serialization.

---

## 1.0.15

-   📚 Documentation updated

---

## 1.0.14

-   📚 Documentation updated

---

## 1.0.13

-   ⬆️ Dependencies updated

---

## 1.0.12

-   ⬆️ Dependencies updated

-   📚 Documentation updated

---

## 1.0.11

-   📚 Documentation updated

---

## 1.0.10

-   📚 Documentation updated

---

## 1.0.9

-   ♻️ Refactor cast type `INTEGER` and `NUMERIC`

---

## 1.0.8

-   📚 Documentation updated

---

## 1.0.7

-   ➕ Added new configuration type `exclude`

---

## 1.0.6

-   ➕ Added new cast type `FLAG`

---

## 1.0.5

-   ♻️ Refactor `toString` function.

---

## 1.0.4

-   ♻️ Refactor `transform` function. Now `data` argument is cloned. So actual data wont't be changed.

-   📚 Documentation updated

---

## 1.0.3

-   ♻️ Refactor `transform` function. Now it has `data` as third argument.

-   ⬆️ Dependencies updated

-   📚 Documentation updated

---

## 1.0.2

-   ➕ Added static properties for casting types: BOOLEAN, NUMERIC, INTEGER, STRING, JSON

-   ⬆️ Dependencies updated

-   📚 Documentation updated

---

## 1.0.1

-   🔨 Refactor method `fromArray`

-   📚 Documentation updated

---

## 1.0.0

-   🎉 Fully working code

-   📚 Complete documentation

---

## 0.0.1

-   🎉 Initial commit

---
