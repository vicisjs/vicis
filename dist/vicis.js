!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).vicis={})}(this,(function(e){"use strict";const t=["boolean","flag","numeric","integer","string","json"];function _classPrivateFieldGet(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}function _classPrivateFieldSet(e,t,r){var i=t.get(e);if(!i)throw new TypeError("attempted to set private field on non-instance");if(i.set)i.set.call(e,r);else{if(!i.writable)throw new TypeError("attempted to set read only private field");i.value=r}return r}function arrayBasicIntersect(e,t){if(!e.length||!t.length)return[];const r=new Set(t);return[...new Set(e)].filter(e=>r.has(e))}function arrayHasSame(e,t){if(!e.length||!t.length)return!1;const r=new Set(t);return Boolean([...new Set(e)].filter(e=>r.has(e)).length)}function checkIsObjectLike(e){return e&&"object"==typeof e&&!Array.isArray(e)}function isFunction(e){return"[object Function]"===Object.prototype.toString.call(e)&&!/^class\s/.test(Function.prototype.toString.call(e))}function objectGetKeys(e){return Object.keys(e).sort((e,t)=>e.localeCompare(t))}const r=["cast","defaults","defined","exclude","omit","order","pick","sort","rename","replace","required","transform"];function isString(e){return"string"==typeof e}function objectIsEmpty(e){return 0===Object.keys(e).length}function jsonStringify(e){return JSON.stringify(e)}function castConfig(e){if(!checkIsObjectLike(e))throw new TypeError("Cast should be an object");return objectIsEmpty(e)?{}:(Object.keys(e).forEach(r=>{if(!isString(e[r]))throw new TypeError(`'Cast' expect object values to be strings. Not a string at key: '${jsonStringify(e[r])}'.`);if(!t.includes(e[r]))throw new TypeError(`'Cast' has unknown type in {${r}: "${e[r]}"}.`)}),e)}function castToString(e){if(null==e)return"";if("string"==typeof e)return e;const t=e.toString();return"0"===t&&Object.is(e,-0)?"-0":t}const i="boolean",s="flag",a="numeric",n="integer",c="string",o="json";function jsonParse(e){return JSON.parse(e)}function objectToPlain(e){return function objectDeserialize(e){return isString(e)?jsonParse(e):e}(function objectSerialize(e){let t;const{toJSON:r,toObject:i}=e;return t=isFunction(i)?e.toObject():isFunction(r)?e.toJSON():e,isString(t)?t:jsonStringify(t)}(e))}function castData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(r=>{const l=e[r];if(!(r in t))throw new Error(`Field '${r}' suppose to be converted to ${l}.`);switch(l){case i:t[r]=Boolean(t[r]);break;case s:t[r]=function convertToFlag(e,t=!1,r=!1){if(null==e)return t;if("boolean"==typeof e)return e;const i=e.toString().toLocaleLowerCase().trim();return 0===i.length?t:"true"===i||"1"===i||"false"!==i&&"0"!==i&&r}(t[r]);break;case a:{const e=Number(t[r]);if(Number.isFinite(e))t[r]=e;else{const e=Number.parseFloat(castToString(t[r]).trim());Number.isFinite(e)?t[r]=e:t[r]=0}break}case n:{const e=Number(t[r]);if(Number.isFinite(e))t[r]=Math.trunc(e);else{const i=Number.parseFloat(castToString(t[r]).trim());Number.isFinite(i)?t[r]=Math.trunc(e):t[r]=0}break}case c:t[r]=castToString(t[r]);break;case o:t[r]=objectToPlain(t[r]);break;default:throw new Error("Unknown value convert error")}}),t}function castToJson(e,t=!1){return t?function objectKeysSort(e,t=!0){if(!e||"object"!=typeof e||Array.isArray(e))return e;const r=Object.keys(e);return r.length?r.reduce((r,i)=>(t&&e[i]&&"object"==typeof e[i]&&!Array.isArray(e[i])?r[i]=objectKeysSort(e[i],t):r[i]=e[i],r),Object.create(Object.getPrototypeOf(e))):e}(jsonParse(jsonStringify(e)),!0):jsonParse(jsonStringify(e))}function clone(e){switch(typeOf(e)){case"array":return e.slice();case"object":return Object.assign({},e);case"date":return new e.constructor(Number(e));case"map":return new Map(e);case"set":return new Set(e);case"buffer":return function cloneBuffer(e){const t=e.length;let r;r=Buffer.allocUnsafe?Buffer.allocUnsafe(t):Buffer.from(t);return e.copy(r),r}(e);case"symbol":return function cloneSymbol(e){if(Symbol.prototype.valueOf)return Object(Symbol.prototype.valueOf.call(e));return{}}(e);case"arraybuffer":return function cloneArrayBuffer(e){const t=new e.constructor(e.byteLength);return new Uint8Array(t).set(new Uint8Array(e)),t}(e);case"float32array":case"float64array":case"int16array":case"int32array":case"int8array":case"uint16array":case"uint32array":case"uint8clampedarray":case"uint8array":return function cloneTypedArray(e){return new e.constructor(e.buffer,e.byteOffset,e.length)}(e);case"regexp":return function cloneRegExp(e){let t;t=void 0!==e.flags?e.flags:/\w+$/.exec(e)||void 0;const r=new e.constructor(e.source,t);return r.lastIndex=e.lastIndex,r}(e);case"error":return Object.create(e);default:return e}}function typeOf(e){if(void 0===e)return"undefined";if(null===e)return"null";if(!0===e||!1===e||e instanceof Boolean)return"boolean";if("string"==typeof e||e instanceof String)return"string";if("number"==typeof e||e instanceof Number)return"number";if("function"==typeof e||e instanceof Function)return"function";if(void 0!==Array.isArray&&Array.isArray(e))return"array";if(e instanceof RegExp)return"regexp";if(e instanceof Date)return"date";var t=toString.call(e);return"[object RegExp]"===t?"regexp":"[object Date]"===t?"date":"[object Arguments]"===t?"arguments":"[object Error]"===t?"error":function isBuffer(e){return null!==e&&Boolean(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}(e)?"buffer":"[object Set]"===t?"set":"[object WeakSet]"===t?"weakset":"[object Map]"===t?"map":"[object WeakMap]"===t?"weakmap":"[object Symbol]"===t?"symbol":"[object Int8Array]"===t?"int8array":"[object Uint8Array]"===t?"uint8array":"[object Uint8ClampedArray]"===t?"uint8clampedarray":"[object Int16Array]"===t?"int16array":"[object Uint16Array]"===t?"uint16array":"[object Int32Array]"===t?"int32array":"[object Uint32Array]"===t?"uint32array":"[object Float32Array]"===t?"float32array":"[object Float64Array]"===t?"float64array":"object"}function isObjectObject(e){return!0===function isObject(e){return"object"==typeof e&&null!==e}(e)&&"[object Object]"===Object.prototype.toString.call(e)}function cloneDeep(e,t){switch(typeOf(e)){case"object":return function cloneObjectDeep(e,t){if("function"==typeof t)return t(e);if(t||function isPlainObject(e){let t,r;return!1!==isObjectObject(e)&&(t=e.constructor,"function"==typeof t&&(r=t.prototype,!1!==isObjectObject(r)&&!1!==r.hasOwnProperty("isPrototypeOf")))}(e)){const r=new e.constructor;for(let i in e)r[i]=cloneDeep(e[i],t);return r}return e}(e,t);case"array":return function cloneArrayDeep(e,t){const r=new e.constructor(e.length);for(let i=0;i<e.length;i++)r[i]=cloneDeep(e[i],t);return r}(e,t);default:return clone(e)}}function clone$1(e){return function checkIsPrimitive(e){return Object(e)!==e}(e)?e:cloneDeep(e)}function defaultsConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Defaults' should be an object");return e}function defaultsData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(r=>{r in t&&void 0!==t[r]||(t[r]=e[r])}),t}function arrayGetUnique(e,t=!0){if(e.length<2)return e;let r=[...new Set(e)];if(r.includes(0)){const t=e.filter(e=>0===e);t.length>1&&t.some(e=>1/e===Number.NEGATIVE_INFINITY)&&r.push(-0)}if(r.filter(e=>"string"==typeof e).length){const t=e.filter(e=>"string"==typeof e);if(t.length>1){const e=[...new Set(t.map(e=>e.normalize()))];e.forEach(e=>{delete r[r.indexOf(e)]});const i=[];for(let e=0;e<r.length;e++)e in r&&i.push(r[e]);r=i.concat(e)}}return t?r.sort():r}function arrayIsEmpty(e){return 0===e.length}function definedConfig(e){if(!Array.isArray(e))throw new TypeError("'Defined' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Defined' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function definedData(e,t){const r=definedConfig(e);return arrayIsEmpty(r)||r.forEach(e=>{if(!(e in t))throw new Error(`Field '${e}' must be defined.`);if(void 0===t[e])throw new Error(`Field '${e}' should have value.`)}),t}function isRegExp(e){return e instanceof RegExp}function excludeConfig(e){if(!Array.isArray(e))throw new TypeError("'Exclude' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e)&&!isRegExp(e))throw new TypeError(`'Exclude' expect array of strings or regular expressions. Value: '${jsonStringify(e)}'.`);return e})}function omitConfig(e){if(!Array.isArray(e))throw new TypeError("'Omit' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Omit' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function orderConfig(e){if(!Array.isArray(e))throw new TypeError("'Order' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e,!1).map(e=>{if(!isString(e))throw new TypeError(`'Order' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function objectKeysOrder(e,t=[],r=!1){if(!Array.isArray(t)||0===t.length)return e;const i=t.filter(e=>"string"==typeof e);let s=new Set(Object.keys(e));const a={};return i.forEach(t=>{s.delete(t),t in e&&(a[t]=e[t])}),s=[...s],r&&(s=s.sort((e,t)=>e.localeCompare(t))),s.forEach(t=>a[t]=e[t]),a}function pickConfig(e){if(!Array.isArray(e))throw new TypeError("'Pick' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Pick' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function pickData(e,t){if(arrayIsEmpty(e))return t;const r={};return Object.keys(t).forEach(i=>{e.includes(i)&&(r[i]=t[i])}),r}function renameConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Rename' should be an object");if(objectIsEmpty(e))return{};Object.keys(e).forEach(e=>{if(!isString(e))throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${e}'.`)});const t=Object.values(e),r=arrayGetUnique(t);if(t.length!==r.length)throw new TypeError(`'Rename' has similar values: '${jsonStringify(r)}'.`);return e}function renameData(e,t){if(objectIsEmpty(e))return t;const r=Object.keys(e).sort((e,t)=>e.localeCompare(t)),i={};return r.forEach(r=>{if(!(r in t))throw new Error(`Field '${r}' suppose to be renamed.`);i[e[r]]=t[r]}),r.forEach(e=>{delete t[e]}),Object.assign(t,i),t}function replaceConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Replace' should be an object");return e}function replaceData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(r=>{t[r]=e[r]}),t}function requiredConfig(e){if(!Array.isArray(e))throw new TypeError("'Required' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Required' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function requiredData(e,t){return arrayIsEmpty(e)||e.forEach(e=>{if(!(e in t))throw new Error(`Field '${e}' is required.`)}),t}function transformConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Transform' should be an object");return objectIsEmpty(e)?{}:(Object.keys(e).forEach(t=>{if(!function checkIsCallable(e){return!!e&&(!!isFunction(e)||!!("toFunction"in e&&isFunction(e.toFunction)&&isFunction(e.toFunction())))}(e[t]))throw new TypeError(`'Transform' expect object values to be functions. Not a function at key: '${t}'.`)}),e)}function transformData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(r=>{if(!(r in t))throw new Error(`Field '${r}' suppose to be transformed.`);isFunction(e[r])?t[r]=e[r](t[r],r,clone$1(t)):t[r]=e[r].toFunction()(t[r],r,clone$1(t))}),t}class Vicis{constructor(e={},t){l.set(this,{writable:!0,value:{}}),u.set(this,{writable:!0,value:[]}),f.set(this,{writable:!0,value:[]}),h.set(this,{writable:!0,value:[]}),d.set(this,{writable:!0,value:[]}),y.set(this,{writable:!0,value:[]}),p.set(this,{writable:!0,value:[]}),b.set(this,{writable:!0,value:!1}),v.set(this,{writable:!0,value:{}}),F.set(this,{writable:!0,value:{}}),m.set(this,{writable:!0,value:[]}),g.set(this,{writable:!0,value:{}}),P.set(this,{writable:!0,value:{}}),w.set(this,{writable:!0,value:void 0}),_.set(this,{writable:!0,value:void 0}),j.set(this,{writable:!0,value:void 0}),_classPrivateFieldSet(this,_,function validateConfig(){const e=objectGetKeys(_classPrivateFieldGet(this,l)),t=objectGetKeys(_classPrivateFieldGet(this,v)),r=objectGetKeys(_classPrivateFieldGet(this,F)),i=objectGetKeys(_classPrivateFieldGet(this,g));if(arrayHasSame(_classPrivateFieldGet(this,d),e))throw new Error(`'omit' has same keys as 'cast': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),e)}.`);if(arrayHasSame(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,f)))throw new Error(`'omit' has same keys as 'defined': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,f))}.`);if(arrayHasSame(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,p)))throw new Error(`'omit' has same keys as 'pick': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,p))}.`);if(arrayHasSame(_classPrivateFieldGet(this,d),t))throw new Error(`'omit' has same keys as 'rename': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),t)}.`);if(arrayHasSame(_classPrivateFieldGet(this,d),r))throw new Error(`'omit' has same keys as 'replace': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),r)}.`);if(arrayHasSame(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,m)))throw new Error(`'omit' has same keys as 'required': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,m))}.`);if(arrayHasSame(_classPrivateFieldGet(this,d),i))throw new Error(`'omit' has same keys as 'transform': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),i)}.`);if(arrayHasSame(_classPrivateFieldGet(this,d),i))throw new Error(`'omit' has same keys as 'transform': ${arrayBasicIntersect(_classPrivateFieldGet(this,d),i)}.`);if(arrayHasSame(e,r))throw new Error(`'cast' has same keys as 'replace': ${arrayBasicIntersect(e,r)}.`);if(arrayHasSame(e,i))throw new Error(`'cast' has same keys as 'transform': ${arrayBasicIntersect(e,i)}.`);if(arrayHasSame(r,i))throw new Error(`'replace' has same keys as 'transform': ${arrayBasicIntersect(r,i)}.`);return this}.bind(this)),_classPrivateFieldSet(this,j,function validateData(){return void 0===_classPrivateFieldGet(this,w)||("toObject"in _classPrivateFieldGet(this,w)&&isFunction(_classPrivateFieldGet(this,w).toObject)?_classPrivateFieldSet(this,P,_classPrivateFieldGet(this,w).toObject()):"toJSON"in _classPrivateFieldGet(this,w)&&isFunction(_classPrivateFieldGet(this,w).toJSON)?_classPrivateFieldSet(this,P,_classPrivateFieldGet(this,w).toJSON()):_classPrivateFieldSet(this,P,_classPrivateFieldGet(this,w)),_classPrivateFieldSet(this,P,function omitData(e,t){if(arrayIsEmpty(e))return t;const r={};return Object.keys(t).forEach(i=>{e.includes(i)||(r[i]=t[i])}),r}(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,requiredData(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,definedData(_classPrivateFieldGet(this,f),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,castData(_classPrivateFieldGet(this,l),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,transformData(_classPrivateFieldGet(this,g),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,replaceData(_classPrivateFieldGet(this,F),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,renameData(_classPrivateFieldGet(this,v),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,defaultsData(_classPrivateFieldGet(this,u),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,pickData(_classPrivateFieldGet(this,p),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,function excludeData(e,t){if(arrayIsEmpty(e))return t;const r=e.filter(isString);if(r.length&&Object.keys(t).forEach(e=>{r.includes(e)&&delete t[e]}),0===objectGetKeys(t).length)return t;const i=e.filter(isRegExp);return i.length&&i.forEach(e=>{Object.keys(t).forEach(r=>{e.test(r)&&delete t[r]})}),t}(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,P))),_classPrivateFieldSet(this,P,castToJson(_classPrivateFieldGet(this,P),_classPrivateFieldGet(this,b))),_classPrivateFieldSet(this,P,function orderData(e,t,r=!1){return arrayIsEmpty(e)?t:objectKeysOrder(t,e,r)}(_classPrivateFieldGet(this,y),_classPrivateFieldGet(this,P),_classPrivateFieldGet(this,b)))),this}.bind(this)),this.config(e),void 0!==t&&this.data(t)}static factory(e={},t){return new Vicis(e,t)}static get BOOLEAN(){return"boolean"}static get FLAG(){return"flag"}static get NUMERIC(){return"numeric"}static get INTEGER(){return"integer"}static get STRING(){return"string"}static get JSON(){return"json"}getConfig(){return clone$1({cast:_classPrivateFieldGet(this,l),defaults:_classPrivateFieldGet(this,u),defined:_classPrivateFieldGet(this,f),exclude:_classPrivateFieldGet(this,h),omit:_classPrivateFieldGet(this,d),order:_classPrivateFieldGet(this,y),pick:_classPrivateFieldGet(this,p),sort:_classPrivateFieldGet(this,b),rename:_classPrivateFieldGet(this,v),replace:_classPrivateFieldGet(this,F),required:_classPrivateFieldGet(this,m),transform:_classPrivateFieldGet(this,g)})}resetConfig(){return _classPrivateFieldSet(this,l,{}),_classPrivateFieldSet(this,u,{}),_classPrivateFieldSet(this,f,[]),_classPrivateFieldSet(this,h,[]),_classPrivateFieldSet(this,d,[]),_classPrivateFieldSet(this,y,[]),_classPrivateFieldSet(this,p,[]),_classPrivateFieldSet(this,b,!1),_classPrivateFieldSet(this,v,{}),_classPrivateFieldSet(this,F,{}),_classPrivateFieldSet(this,m,[]),_classPrivateFieldSet(this,g,{}),this}config(e={}){if(!checkIsObjectLike(e))throw new TypeError("Config should be an object");const t=function arrayGetDifference(e,t){const r=new Set(t);return e.filter(e=>!r.has(e))}(objectGetKeys(e),r);if(t.length)throw new TypeError(`Config has unknown fields: '${t.join("', '")}'.`);return this.resetConfig(),this.sort(e.sort),this.omit(e.omit),this.cast(e.cast),this.defined(e.defined),this.pick(e.pick),this.rename(e.rename),this.replace(e.replace),this.required(e.required),this.transform(e.transform),this.defaults(e.defaults),this.exclude(e.exclude),this.order(e.order),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}cast(e={}){return _classPrivateFieldSet(this,l,castConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}defaults(e={}){return _classPrivateFieldSet(this,u,defaultsConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}defined(e=[]){return _classPrivateFieldSet(this,f,definedConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}exclude(e=[]){return _classPrivateFieldSet(this,h,excludeConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}omit(e=[]){return _classPrivateFieldSet(this,d,omitConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}order(e=[]){return _classPrivateFieldSet(this,y,orderConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}pick(e=[]){return _classPrivateFieldSet(this,p,pickConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}rename(e={}){return _classPrivateFieldSet(this,v,renameConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}replace(e={}){return _classPrivateFieldSet(this,F,replaceConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}required(e=[]){return _classPrivateFieldSet(this,m,requiredConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}sort(e=!1){if("boolean"!=typeof e)throw new TypeError("'sort' should be a boolean");return _classPrivateFieldSet(this,b,e),_classPrivateFieldGet(this,j).call(this),this}transform(e={}){return _classPrivateFieldSet(this,g,transformConfig(e)),_classPrivateFieldGet(this,_).call(this),_classPrivateFieldGet(this,j).call(this),this}getData(){return clone$1(_classPrivateFieldGet(this,P))}data(e){if(!checkIsObjectLike(e))throw new TypeError("Data should be an object");return _classPrivateFieldSet(this,w,e),_classPrivateFieldGet(this,j).call(this),this}clear(){return _classPrivateFieldSet(this,P,{}),_classPrivateFieldSet(this,w,void 0),this}toJSON(){return this.getData()}toString(){return jsonStringify(this.toJSON())}fromArray(e){return Array.from(e).map(e=>this.data(e).toJSON())}}var l=new WeakMap,u=new WeakMap,f=new WeakMap,h=new WeakMap,d=new WeakMap,y=new WeakMap,p=new WeakMap,b=new WeakMap,v=new WeakMap,F=new WeakMap,m=new WeakMap,g=new WeakMap,P=new WeakMap,w=new WeakMap,_=new WeakMap,j=new WeakMap;e.TYPES_ENUM=t,e.Vicis=Vicis,e.cast=function cast(e,t={}){const r=castConfig(t);return objectIsEmpty(r)?e:castData(r,e)},e.defaults=function defaults(e,t={}){return objectIsEmpty(defaultsConfig(t))?e:defaultsData(t,e)},e.defined=function defined(e,t=[]){return arrayIsEmpty(t)?e:definedData(t,e)},e.exclude=function exclude(e,t=[]){const r=excludeConfig(t);if(arrayIsEmpty(r))return e;const i=r.filter(isString);if(i.length&&Object.keys(e).forEach(t=>{i.includes(t)&&delete e[t]}),0===objectGetKeys(e).length)return e;const s=r.filter(isRegExp);return s.length&&s.forEach(t=>{Object.keys(e).forEach(r=>{t.test(r)&&delete e[r]})}),e},e.omit=function omit(e,t=[]){const r=omitConfig(t);if(arrayIsEmpty(r))return e;const i={};return Object.keys(e).forEach(t=>{r.includes(t)||(i[t]=e[t])}),i},e.order=function order(e,t=[],r=!1){return arrayIsEmpty(orderConfig(t))?e:objectKeysOrder(e,t,r)},e.pick=function pick(e,t=[]){const r=pickConfig(t);return arrayIsEmpty(r)?e:pickData(r,e)},e.rename=function rename(e,t={}){const r=renameConfig(t);return objectIsEmpty(r)?e:renameData(r,e)},e.replace=function replace(e,t={}){const r=replaceConfig(t);return objectIsEmpty(r)?e:replaceData(r,e)},e.required=function required(e,t=[]){const r=requiredConfig(t);return arrayIsEmpty(r)?e:requiredData(r,e)},e.transform=function transform(e,t={}){const r=transformConfig(t);return objectIsEmpty(r)?e:transformData(r,e)},Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=vicis.js.map
